import { Sparkles } from "lucide-react";

import { RankingBoard } from "@/components/RankingBoard";

export function RankingSection() {
  return (
    <section className="bg-red-50 px-5 py-14">
      <div className="mx-auto flex max-w-md flex-col gap-1 text-center">
        <h2 className="font-display text-2xl leading-[1] tracking-[0.02em] text-red-600">
          総合ランキング
        </h2>
        <p className="text-sm font-medium text-neutral-500">
          お気に入り・食べる・気になるの合計ポイントです
        </p>
      </div>

      <div className="mt-8">
        <RankingBoard />
      </div>

      <div
        className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 rounded-2xl border-2 border-pink-200 bg-white p-5 text-center shadow-[0_4px_0_0_rgba(236,72,153,0.25)]"
      >
        <p className="text-sm font-bold text-neutral-600">
          実際に売れたソーセージランキングは、
          <br />
          Instagramで発表します。
        </p>
        <a
          href="https://www.instagram.com/ichinoseki_meat/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            touchAction: "manipulation",
            background: "linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)",
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-black text-white shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
        >
          <Sparkles className="h-5 w-5" strokeWidth={2.5} />
          Instagramで結果を見る
        </a>
      </div>
    </section>
  );
}
