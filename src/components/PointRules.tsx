import { Eye, Heart, UtensilsCrossed } from "lucide-react";

const RULES = [
  {
    action: "favorite",
    Icon: Heart,
    label: "お気に入りに投票",
    detail: "1人1票！ランキングに反映",
  },
  {
    action: "eaten",
    Icon: UtensilsCrossed,
    label: "食べた！",
    detail: "食べた本数を記録しよう",
  },
  {
    action: "curious",
    Icon: Eye,
    label: "気になる",
    detail: "商品詳細をチェック",
  },
] as const;

export function PointRules() {
  return (
    <section className="bg-[#fff3de] px-6 py-14">
      <h2 className="font-display mb-6 text-center text-2xl leading-[1] tracking-[0.02em] text-red-600">
        投票のつかいかた
      </h2>
      <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
        {RULES.map(({ action, Icon, label, detail }) => (
          <div
            key={action}
            className="flex flex-col items-center gap-2.5 rounded-3xl border-2 border-amber-200 bg-white px-2 py-5 text-center shadow-[0_4px_0_0_rgba(251,191,36,0.4)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 ring-2 ring-red-100">
              <Icon className="h-7 w-7 text-red-600" strokeWidth={2.25} />
            </div>
            <p className="text-sm font-black text-neutral-800">{label}</p>
            <p className="text-[11px] font-bold text-neutral-500">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
