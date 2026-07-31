"use client";

import { Heart } from "lucide-react";

import { useVotes } from "@/context/VoteContext";
import { ACTION_LABEL_BASE } from "@/data/sausages";

export function FavoriteStatusBar() {
  const { eatenQuantity, hasFavorited } = useVotes();

  if (eatenQuantity === null) return null;

  const remaining = hasFavorited ? 0 : 1;

  return (
    <div className="safe-top fixed inset-x-0 top-0 z-40 flex justify-center bg-[#fff3de]/95 px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur">
      <div
        className={`flex items-center gap-1.5 text-sm font-bold ${
          hasFavorited ? "text-neutral-400" : "text-red-600"
        }`}
      >
        <Heart className="h-4 w-4" strokeWidth={2.5} fill={hasFavorited ? "none" : "currentColor"} />
        <span>
          {ACTION_LABEL_BASE.favorite}
          <span className="text-base font-black">投票</span>：残り{remaining}本
        </span>
      </div>
    </div>
  );
}
