"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { SAUSAGES, type VoteAction } from "@/data/sausages";

type VoteTotals = Record<string, Partial<Record<VoteAction, number>>>;
type VoteResult = "voted" | "blocked";

interface MyState {
  eatenQuantity: number | null;
  eatenRemaining: number;
  eatenCounts: Record<string, number>;
  favoritedSausageId: string | null;
}

interface VoteContextValue {
  isMyStateReady: boolean;
  eatenQuantity: number | null;
  eatenRemaining: number;
  chooseEatenQuantity: (quantity: number) => void;
  eatenCountFor: (sausageId: string) => number;
  voteEaten: (sausageId: string) => VoteResult;

  hasFavorited: boolean;
  favoritedSausageId: string | null;
  voteFavorite: (sausageId: string) => VoteResult;

  voteCurious: (sausageId: string) => void;

  favoriteCount: (sausageId: string) => number;
  ranking: string[];
}

const VoteContext = createContext<VoteContextValue | null>(null);

// Vercel's serverless functions don't support long-lived SSE connections,
// so cross-user sync relies on simple polling instead.
const POLL_INTERVAL_MS = 4000;

// The server only ever stores anonymous per-item totals (sausage × action).
// Everything about "which person did what" lives here, in the browser only.
const MY_STATE_STORAGE_KEY = "sausage-election:my-state:v2";

const DEFAULT_MY_STATE: MyState = {
  eatenQuantity: null,
  eatenRemaining: 0,
  eatenCounts: {},
  favoritedSausageId: null,
};

function loadMyState(): MyState {
  if (typeof window === "undefined") return DEFAULT_MY_STATE;
  try {
    const raw = window.localStorage.getItem(MY_STATE_STORAGE_KEY);
    if (!raw) return DEFAULT_MY_STATE;
    return { ...DEFAULT_MY_STATE, ...(JSON.parse(raw) as Partial<MyState>) };
  } catch {
    return DEFAULT_MY_STATE;
  }
}

function persistMyState(state: MyState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MY_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable (private browsing, quota) — safe to ignore
  }
}

function postVote(sausageId: string, action: VoteAction) {
  fetch("/api/votes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sausageId, action }),
  }).catch(() => {
    // best-effort — the next poll tick will reconcile totals anyway
  });
}

export function VoteProvider({ children }: { children: React.ReactNode }) {
  const [totals, setTotals] = useState<VoteTotals>({});
  const [myState, setMyState] = useState<MyState>(DEFAULT_MY_STATE);
  const [isMyStateReady, setIsMyStateReady] = useState(false);

  useEffect(() => {
    setMyState(loadMyState());
    setIsMyStateReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchTotals() {
      try {
        const res = await fetch("/api/votes", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { totals: VoteTotals };
        if (!cancelled) setTotals(data.totals);
      } catch {
        // network hiccup — the next poll tick will retry
      }
    }

    fetchTotals();
    const intervalId = setInterval(fetchTotals, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  const chooseEatenQuantity = useCallback((quantity: number) => {
    setMyState((prev) => {
      const next: MyState = { ...prev, eatenQuantity: quantity, eatenRemaining: quantity };
      persistMyState(next);
      return next;
    });
  }, []);

  const voteEaten = useCallback(
    (sausageId: string): VoteResult => {
      if (myState.eatenRemaining <= 0) return "blocked";

      setMyState((prev) => {
        if (prev.eatenRemaining <= 0) return prev;
        const next: MyState = {
          ...prev,
          eatenRemaining: prev.eatenRemaining - 1,
          eatenCounts: {
            ...prev.eatenCounts,
            [sausageId]: (prev.eatenCounts[sausageId] ?? 0) + 1,
          },
        };
        persistMyState(next);
        return next;
      });

      setTotals((prev) => {
        const current = prev[sausageId] ?? {};
        return {
          ...prev,
          [sausageId]: { ...current, eaten: (current.eaten ?? 0) + 1 },
        };
      });
      postVote(sausageId, "eaten");

      return "voted";
    },
    [myState.eatenRemaining],
  );

  const voteFavorite = useCallback(
    (sausageId: string): VoteResult => {
      if (myState.favoritedSausageId) return "blocked";

      setMyState((prev) => {
        if (prev.favoritedSausageId) return prev;
        const next: MyState = { ...prev, favoritedSausageId: sausageId };
        persistMyState(next);
        return next;
      });

      setTotals((prev) => {
        const current = prev[sausageId] ?? {};
        return {
          ...prev,
          [sausageId]: { ...current, favorite: (current.favorite ?? 0) + 1 },
        };
      });
      postVote(sausageId, "favorite");

      return "voted";
    },
    [myState.favoritedSausageId],
  );

  const voteCurious = useCallback((sausageId: string) => {
    setTotals((prev) => {
      const current = prev[sausageId] ?? {};
      return {
        ...prev,
        [sausageId]: { ...current, curious: (current.curious ?? 0) + 1 },
      };
    });
    postVote(sausageId, "curious");
  }, []);

  const eatenCountFor = useCallback(
    (sausageId: string) => myState.eatenCounts[sausageId] ?? 0,
    [myState.eatenCounts],
  );

  const favoriteCount = useCallback(
    (sausageId: string) => totals[sausageId]?.favorite ?? 0,
    [totals],
  );

  const ranking = useMemo(
    () =>
      [...SAUSAGES]
        .sort((a, b) => (totals[b.id]?.favorite ?? 0) - (totals[a.id]?.favorite ?? 0))
        .map((sausage) => sausage.id),
    [totals],
  );

  const value = useMemo<VoteContextValue>(
    () => ({
      isMyStateReady,
      eatenQuantity: myState.eatenQuantity,
      eatenRemaining: myState.eatenRemaining,
      chooseEatenQuantity,
      eatenCountFor,
      voteEaten,
      hasFavorited: myState.favoritedSausageId !== null,
      favoritedSausageId: myState.favoritedSausageId,
      voteFavorite,
      voteCurious,
      favoriteCount,
      ranking,
    }),
    [
      isMyStateReady,
      myState.eatenQuantity,
      myState.eatenRemaining,
      myState.favoritedSausageId,
      chooseEatenQuantity,
      eatenCountFor,
      voteEaten,
      voteFavorite,
      voteCurious,
      favoriteCount,
      ranking,
    ],
  );

  return (
    <VoteContext.Provider value={value}>{children}</VoteContext.Provider>
  );
}

export function useVotes() {
  const ctx = useContext(VoteContext);
  if (!ctx) {
    throw new Error("useVotes must be used within a VoteProvider");
  }
  return ctx;
}
