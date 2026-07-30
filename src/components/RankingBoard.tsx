"use client";

import { motion } from "framer-motion";
import { Crown, Heart, Lock, Medal } from "lucide-react";
import Image from "next/image";

import { useVotes } from "@/context/VoteContext";
import { SAUSAGES } from "@/data/sausages";

const RANK_STYLE = [
  { badge: "bg-amber-400 text-neutral-900", bar: "bg-amber-400", Icon: Crown },
  { badge: "bg-neutral-300 text-neutral-900", bar: "bg-neutral-300", Icon: Medal },
  { badge: "bg-amber-700 text-white", bar: "bg-amber-700", Icon: Medal },
];
const DEFAULT_STYLE = {
  badge: "bg-red-600 text-white",
  bar: "bg-red-500",
  Icon: null,
};

const RANK_EMPHASIS = [
  {
    card: "gap-3.5 px-4 py-4",
    badge: "h-9 w-9",
    icon: "h-5 w-5",
    thumb: "h-14 w-14",
    name: "text-lg",
    bar: "h-3.5",
    points: "text-lg",
    pointsSub: "text-xs",
  },
  {
    card: "gap-3 px-3.5 py-3.5",
    badge: "h-8 w-8",
    icon: "h-4 w-4",
    thumb: "h-12 w-12",
    name: "text-base",
    bar: "h-2.5",
    points: "text-base",
    pointsSub: "text-[11px]",
  },
];
const DEFAULT_EMPHASIS = {
  card: "gap-2.5 px-3 py-3",
  badge: "h-7 w-7",
  icon: "h-3.5 w-3.5",
  thumb: "h-10 w-10",
  name: "text-sm",
  bar: "h-2",
  points: "text-sm",
  pointsSub: "text-[10px]",
};

export function RankingBoard() {
  const { ranking, favoriteCount, hasFavorited, favoritedSausageId } = useVotes();
  const sausageById = Object.fromEntries(
    SAUSAGES.map((sausage) => [sausage.id, sausage]),
  );
  const maxCount = Math.max(...ranking.map((id) => favoriteCount(id)), 1);

  return (
    <div className="relative mx-auto flex max-w-md flex-col gap-2.5">
      <div className={hasFavorited ? "" : "pointer-events-none select-none blur-md"}>
        {ranking.map((id, index) => {
          const sausage = sausageById[id];
          const style = RANK_STYLE[index] ?? DEFAULT_STYLE;
          const emphasis = RANK_EMPHASIS[index] ?? DEFAULT_EMPHASIS;
          const count = favoriteCount(id);
          const widthPercent = Math.max((count / maxCount) * 100, 6);
          const isMine = favoritedSausageId === id;

          return (
            <motion.div
              key={id}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`mb-2.5 flex items-center rounded-2xl border-2 bg-white shadow-[0_3px_0_0_rgba(251,191,36,0.35)] ${emphasis.card} ${
                isMine ? "border-red-400" : "border-amber-200"
              }`}
            >
              <span
                className={`flex shrink-0 items-center justify-center rounded-full font-black ${style.badge} ${emphasis.badge}`}
              >
                {style.Icon ? (
                  <style.Icon
                    className={emphasis.icon}
                    strokeWidth={2.5}
                    fill="currentColor"
                  />
                ) : (
                  <span className="text-xs">{index + 1}位</span>
                )}
              </span>

              <div
                className={`relative shrink-0 overflow-hidden rounded-xl ${emphasis.thumb}`}
              >
                <Image
                  src={sausage.image}
                  alt={sausage.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span
                  className={`flex items-center gap-1 truncate font-bold text-neutral-800 ${emphasis.name}`}
                >
                  {sausage.name}
                  {isMine && <Heart className="h-3.5 w-3.5 shrink-0 text-red-500" fill="currentColor" />}
                </span>
                <div
                  className={`w-full overflow-hidden rounded-full bg-amber-100 ${emphasis.bar}`}
                >
                  <motion.div
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 26 }}
                    className={`h-full rounded-full ${style.bar}`}
                  />
                </div>
              </div>

              <span
                className={`font-numeric shrink-0 font-black text-red-600 ${emphasis.points}`}
              >
                {count.toLocaleString()}
                <span
                  className={`ml-0.5 font-bold text-neutral-400 ${emphasis.pointsSub}`}
                >
                  票
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>

      {!hasFavorited && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="flex max-w-[15rem] flex-col items-center gap-2 rounded-2xl bg-white/95 px-5 py-4 text-center shadow-lg">
            <Lock className="h-5 w-5 text-neutral-400" strokeWidth={2.25} />
            <p className="text-sm font-bold text-neutral-600">
              お気に入りに投票すると、
              <br />
              現在の順位が見られます。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
