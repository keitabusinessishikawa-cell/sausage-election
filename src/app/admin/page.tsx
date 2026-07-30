"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

export default function AdminPage() {
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
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6 py-16">
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
    </main>
  );
}
