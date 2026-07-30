"use client";

import { ChevronRight, Trophy } from "lucide-react";

import { useVotes } from "@/context/VoteContext";
import { SAUSAGES } from "@/data/sausages";

function scrollToVote() {
  document.getElementById("vote")?.scrollIntoView({ behavior: "smooth" });
}

export function StickyCTA() {
  const { ranking, scores } = useVotes();
  const leaderId = ranking[0];
  const leader = SAUSAGES.find((sausage) => sausage.id === leaderId);

  return (
    <div className="safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-3">
      <button
        type="button"
        onClick={scrollToVote}
        style={{ touchAction: "manipulation" }}
        className="pointer-events-auto mx-auto flex w-full max-w-md items-center gap-3 rounded-full bg-red-600 py-2.5 pl-4 pr-3 text-white shadow-[0_8px_24px_rgba(220,38,38,0.4)] ring-2 ring-white active:bg-red-700"
      >
        <Trophy className="h-5 w-5 shrink-0 text-amber-300" strokeWidth={2.25} />
        <span className="flex min-w-0 flex-1 flex-col items-start leading-tight">
          <span className="text-[10px] font-medium text-red-100">現在1位</span>
          {leader ? (
            <span className="font-numeric truncate text-sm font-black">
              {leader.name}
              <span className="ml-1 font-sans text-[11px] font-bold text-amber-200">
                {scores[leaderId]?.toLocaleString()}pt
              </span>
            </span>
          ) : (
            <span className="text-sm font-black">投票する</span>
          )}
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-red-100" strokeWidth={2.5} />
      </button>
    </div>
  );
}
