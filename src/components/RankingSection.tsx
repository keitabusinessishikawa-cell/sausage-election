import { RankingBoard } from "@/components/RankingBoard";

export function RankingSection() {
  return (
    <section className="bg-[#fff3de] px-5 py-14">
      <div className="mx-auto flex max-w-md flex-col gap-1 text-center">
        <h2 className="font-display text-2xl leading-[1] tracking-[0.02em] text-red-600">
          リアルタイムランキング
        </h2>
        <p className="text-sm font-medium text-neutral-500">
          投票するとすぐに反映されます
        </p>
      </div>

      <div className="mt-8">
        <RankingBoard />
      </div>
    </section>
  );
}
