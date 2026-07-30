"use client";

import { motion } from "framer-motion";
import { Eye, Heart, UtensilsCrossed } from "lucide-react";
import { useState } from "react";

import { useVotes } from "@/context/VoteContext";
import { ACTION_LABEL, POINTS, type VoteAction } from "@/data/sausages";

interface VoteButtonProps {
  sausageId: string;
  action: VoteAction;
}

const ICON: Record<VoteAction, typeof UtensilsCrossed> = {
  favorite: Heart,
  eaten: UtensilsCrossed,
  curious: Eye,
};

const BUBBLE_OFFSETS = [-16, -6, 4, 14, -10, 8];

export function VoteButton({ sausageId, action }: VoteButtonProps) {
  const Icon = ICON[action];
  const { voteCount, addVote } = useVotes();
  const count = voteCount(sausageId, action);
  const [tapId, setTapId] = useState(0);

  const handleTap = () => {
    addVote(sausageId, action);
    setTapId((id) => id + 1);
  };

  return (
    <motion.button
      type="button"
      onClick={handleTap}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.12 }}
      style={{ touchAction: "manipulation" }}
      className="relative isolate flex flex-1 flex-col items-center gap-1 overflow-visible rounded-2xl border-2 border-amber-300 bg-amber-50 py-3 text-neutral-600 shadow-[0_3px_0_0_rgba(251,191,36,0.5)] active:translate-y-0.5 active:shadow-none"
    >
      {tapId > 0 && (
        <motion.span
          key={`flash-${tapId}`}
          aria-hidden
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-0 -z-10 rounded-2xl bg-red-500"
        />
      )}

      {count > 0 && (
        <span className="font-numeric absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
          ×{count}
        </span>
      )}

      <Icon className="h-5 w-5" strokeWidth={2.25} />
      <span className="text-[11px] font-bold">{ACTION_LABEL[action]}</span>

      {tapId > 0 && (
        <span
          key={`burst-${tapId}`}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0"
        >
          {BUBBLE_OFFSETS.map((x, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.4 }}
              animate={{
                opacity: 0,
                y: -36 - (i % 3) * 8,
                x,
                scale: 1,
              }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
              className="absolute left-1/2 top-2 h-2 w-2 rounded-full bg-amber-400"
            />
          ))}
          <motion.span
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], y: -26, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-numeric absolute left-1/2 top-0 -translate-x-1/2 text-xs font-bold whitespace-nowrap text-red-600"
          >
            +{POINTS[action]}pt
          </motion.span>
        </span>
      )}
    </motion.button>
  );
}
