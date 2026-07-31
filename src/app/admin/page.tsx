"use client";

import { useEffect, useState } from "react";

import { ACTION_LABEL_BASE, POINTS, SAUSAGES, type VoteAction } from "@/data/sausages";

type Status = "idle" | "loading" | "done" | "error";
type VoteTotals = Record<string, Partial<Record<VoteAction, number>>>;

const REFRESH_MS = 5000;

// Light gate to keep casual visitors out — not meant to guard secret data
// (the totals API itself is public), just to keep /admin off the beaten path.
const ADMIN_PASSCODE = "1029";
const SESSION_KEY = "sausage-election:admin-unlocked";

function LoginGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(window.sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      // ignore
    }
    setChecked(true);
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (input === ADMIN_PASSCODE) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      setUnlocked(true);
      setFailed(false);
    } else {
      setFailed(true);
    }
  }

  function handleLogout() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setUnlocked(false);
    setInput("");
  }

  if (!checked) return null;

  if (!unlocked) {
    return (
      <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6 py-16">
        <h1 className="text-xl font-bold text-neutral-800">管理者ログイン</h1>
        <p className="text-sm text-neutral-500">パスコードを入力してください。</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            inputMode="numeric"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setFailed(false);
            }}
            placeholder="パスコード"
            autoFocus
            className="w-full rounded-lg border-2 border-neutral-200 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={!input}
            className="w-full rounded-lg bg-neutral-800 py-3 text-sm font-bold text-white disabled:opacity-40"
          >
            ログイン
          </button>
        </form>
        {failed && (
          <p className="text-sm font-medium text-red-600">パスコードが違います。</p>
        )}
      </main>
    );
  }

  return (
    <>
      {children}
      <div className="mx-auto max-w-lg px-6 pb-16">
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs font-medium text-neutral-400 underline"
        >
          ログアウト
        </button>
      </div>
    </>
  );
}

function useVoteTotals() {
  const [totals, setTotals] = useState<VoteTotals | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/votes", { cache: "no-store" });
        if (!res.ok) throw new Error("failed");
        const data = (await res.json()) as { totals: VoteTotals };
        if (!cancelled) {
          setTotals(data.totals);
          setUpdatedAt(new Date());
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return { totals, updatedAt, error };
}

function scoreOf(totals: VoteTotals, sausageId: string) {
  const t = totals[sausageId] ?? {};
  return (
    (t.favorite ?? 0) * POINTS.favorite +
    (t.eaten ?? 0) * POINTS.eaten +
    (t.curious ?? 0) * POINTS.curious
  );
}

function ResultsTable() {
  const { totals, updatedAt, error } = useVoteTotals();

  if (error) {
    return <p className="text-sm font-medium text-red-600">投票結果の取得に失敗しました。</p>;
  }

  if (!totals) {
    return <p className="text-sm text-neutral-400">読み込み中…</p>;
  }

  const ranked = [...SAUSAGES].sort((a, b) => scoreOf(totals, b.id) - scoreOf(totals, a.id));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-neutral-700">現在の投票結果</h2>
        {updatedAt && (
          <span className="text-xs text-neutral-400">
            更新: {updatedAt.toLocaleTimeString("ja-JP")}
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs text-neutral-500">
            <tr>
              <th className="px-3 py-2 font-medium">商品</th>
              <th className="px-2 py-2 text-right font-medium">{ACTION_LABEL_BASE.favorite}</th>
              <th className="px-2 py-2 text-right font-medium">{ACTION_LABEL_BASE.eaten}</th>
              <th className="px-2 py-2 text-right font-medium">{ACTION_LABEL_BASE.curious}</th>
              <th className="px-3 py-2 text-right font-medium">合計pt</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((sausage, index) => {
              const t = totals[sausage.id] ?? {};
              return (
                <tr key={sausage.id} className="border-t border-neutral-100">
                  <td className="px-3 py-2">
                    <span className="mr-1.5 text-xs text-neutral-400">{index + 1}位</span>
                    <span className="font-bold text-neutral-800">{sausage.name}</span>
                  </td>
                  <td className="px-2 py-2 text-right text-neutral-600">{t.favorite ?? 0}</td>
                  <td className="px-2 py-2 text-right text-neutral-600">{t.eaten ?? 0}</td>
                  <td className="px-2 py-2 text-right text-neutral-600">{t.curious ?? 0}</td>
                  <td className="px-3 py-2 text-right font-black text-red-600">
                    {scoreOf(totals, sausage.id).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <LoginGate>
      <AdminDashboard />
    </LoginGate>
  );
}

function AdminDashboard() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleReset() {
    if (!token) return;
    if (!window.confirm("投票結果を本当にリセットしますか？この操作は取り消せません。")) {
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/votes/reset", {
        method: "POST",
        headers: { "x-admin-token": token },
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-10 px-6 py-16">
      <ResultsTable />

      <div className="flex flex-col gap-4 border-t border-neutral-200 pt-8">
        <h1 className="text-xl font-bold text-neutral-800">
          投票結果リセット（管理用）
        </h1>
        <p className="text-sm text-neutral-500">
          管理トークンを入力し、投票結果をゼロに戻します。イベント開始前の動作確認後などにご利用ください。
        </p>

        <input
          type="password"
          value={token}
          onChange={(event) => {
            setToken(event.target.value);
            setStatus("idle");
          }}
          placeholder="管理トークン"
          className="w-full rounded-lg border-2 border-neutral-200 px-3 py-2 text-sm"
        />

        <button
          type="button"
          onClick={handleReset}
          disabled={!token || status === "loading"}
          className="w-full rounded-lg bg-red-600 py-3 text-sm font-bold text-white disabled:opacity-40"
        >
          {status === "loading" ? "リセット中…" : "投票結果をリセットする"}
        </button>

        {status === "done" && (
          <p className="text-sm font-medium text-emerald-600">
            リセットしました。
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-600">
            失敗しました。トークンが正しいか確認してください。
          </p>
        )}
      </div>
    </main>
  );
}
