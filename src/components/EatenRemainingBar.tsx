"use client";

import { UtensilsCrossed } from "lucide-react";

import { useVotes } from "@/context/VoteContext";

export function EatenRemainingBar() {
  const { eatenQuantity, eatenRemaining } = useVotes();

  if (eatenQuantity === null) return null;

  const isDone = eatenRemaining <= 0;

  return (
    <div className="safe-top fixed inset-x-0 top-0 z-40 flex justify-center bg-[#fff3de]/95 px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur">
      <div
        className={`flex items-center gap-1.5 text-sm font-bold ${
          isDone ? "text-neutral-400" : "text-red-600"
        }`}
      >
        <UtensilsCrossed className="h-4 w-4" strokeWidth={2.5} />
        食べる登録：残り{eatenRemaining}本
      </div>
    </div>
  );
}
