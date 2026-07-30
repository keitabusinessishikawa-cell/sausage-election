"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { SAUSAGES, scoreOf, type VoteAction } from "@/data/sausages";

type VoteTotals = Record<string, Partial<Record<VoteAction, number>>>;

interface VoteContextValue {
  voteCount: (sausageId: string, action: VoteAction) => number;
  addVote: (sausageId: string, action: VoteAction) => void;
  scores: Record<string, number>;
  ranking: string[];
}

const VoteContext = createContext<VoteContextValue | null>(null);

// Vercel's serverless functions don't support long-lived SSE connections,
// so cross-user sync relies on simple polling instead.
const POLL_INTERVAL_MS = 4000;

export function VoteProvider({ children }: { children: React.ReactNode }) {
  const [totals, setTotals] = useState<VoteTotals>({});

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

  const addVote = useCallback((sausageId: string, action: VoteAction) => {
    setTotals((prev) => {
      const current = prev[sausageId] ?? {};
      return {
        ...prev,
        [sausageId]: { ...current, [action]: (current[action] ?? 0) + 1 },
      };
    });

    fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sausageId, action }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { totals: VoteTotals } | null) => {
        if (data?.totals) setTotals(data.totals);
      })
      .catch(() => {
        // best-effort — the next poll tick will reconcile
      });
  }, []);

  const voteCount = useCallback(
    (sausageId: string, action: VoteAction) =>
      totals[sausageId]?.[action] ?? 0,
    [totals],
  );

  const scores = useMemo(() => {
    const entries = SAUSAGES.map((sausage) => [
      sausage.id,
      scoreOf(sausage, totals[sausage.id]),
    ] as const);
    return Object.fromEntries(entries);
  }, [totals]);

  const ranking = useMemo(
    () =>
      [...SAUSAGES]
        .sort((a, b) => scores[b.id] - scores[a.id])
        .map((sausage) => sausage.id),
    [scores],
  );

  const value = useMemo(
    () => ({ voteCount, addVote, scores, ranking }),
    [voteCount, addVote, scores, ranking],
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
