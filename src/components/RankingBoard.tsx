"use client";

import { motion } from "framer-motion";

import { useVotes } from "@/context/VoteContext";
import { SAUSAGES } from "@/data/sausages";

const RANK_STYLE = [
  { badge: "bg-amber-400 text-neutral-900", bar: "bg-amber-400" },
  { badge: "bg-neutral-300 text-neutral-900", bar: "bg-neutral-300" },
  { badge: "bg-amber-700 text-white", bar: "bg-amber-700" },
];
const DEFAULT_STYLE = { badge: "bg-red-600 text-white", bar: "bg-red-500" };

export function RankingBoard() {
  const { ranking, scores } = useVotes();
  const sausageById = Object.fromEntries(
    SAUSAGES.map((sausage) => [sausage.id, sausage]),
  );
  const maxScore = Math.max(...ranking.map((id) => scores[id]), 1);

  return (
    <div className="mx-auto flex max-w-md flex-col gap-2.5">
      {ranking.map((id, index) => {
        const sausage = sausageById[id];
        const style = RANK_STYLE[index] ?? DEFAULT_STYLE;
        const widthPercent = Math.max((scores[id] / maxScore) * 100, 6);

        return (
          <motion.div
            key={id}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center gap-3 rounded-2xl border-2 border-amber-200 bg-white px-3 py-3 shadow-[0_3px_0_0_rgba(251,191,36,0.35)]"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${style.badge}`}
            >
              {index + 1}
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="truncate text-sm font-bold text-neutral-800">
                {sausage.name}
              </span>
              <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                <motion.div
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 26 }}
                  className={`h-full rounded-full ${style.bar}`}
                />
              </div>
            </div>

            <span className="font-numeric shrink-0 text-sm font-black text-red-600">
              {scores[id].toLocaleString()}
              <span className="ml-0.5 text-[10px] font-bold text-neutral-400">
                pt
              </span>
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
