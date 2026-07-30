import { Eye, Heart, UtensilsCrossed } from "lucide-react";

import { ACTION_LABEL, POINTS, type VoteAction } from "@/data/sausages";

const ICON: Record<VoteAction, typeof UtensilsCrossed> = {
  favorite: Heart,
  eaten: UtensilsCrossed,
  curious: Eye,
};

const ORDER: VoteAction[] = ["favorite", "eaten", "curious"];

export function PointRules() {
  return (
    <section className="bg-[#fff3de] px-6 py-14">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
        {ORDER.map((action) => {
          const Icon = ICON[action];
          return (
            <div
              key={action}
              className="flex flex-col items-center gap-3 rounded-3xl border-2 border-amber-200 bg-white py-5 text-center shadow-[0_4px_0_0_rgba(251,191,36,0.4)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 ring-2 ring-red-100">
                <Icon className="h-7 w-7 text-red-600" strokeWidth={2.25} />
              </div>
              <p className="font-numeric text-2xl font-black text-neutral-800">
                {POINTS[action]}
                <span className="ml-0.5 text-sm font-bold text-amber-500">
                  pt
                </span>
              </p>
              <p className="text-xs font-bold text-neutral-500">
                {ACTION_LABEL[action]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
