"use client";

import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { useEffect, useRef } from "react";

import type { Sausage } from "@/data/sausages";

const CONFETTI_COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#eab308"];

const CONFETTI = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: 6 + ((i * 11) % 10),
  delay: (i * 0.05) % 0.6,
  duration: 1.4 + ((i * 13) % 7) / 10,
  drift: ((i * 19) % 60) - 30,
}));

export function FavoriteCelebration({
  sausage,
  onDone,
}: {
  sausage: Sausage;
  onDone: () => void;
}) {
  // Keep a stable ref so re-renders from unrelated context updates (e.g. the
  // 4s vote poll) don't reset this timer before it fires.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    const timer = setTimeout(() => onDoneRef.current(), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {CONFETTI.map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "-10%", x: 0, opacity: 1, rotate: 0 }}
          animate={{ y: "115vh", x: c.drift, opacity: [1, 1, 0], rotate: 360 }}
          transition={{ duration: c.duration, delay: c.delay, ease: "easeIn" }}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size * 0.6,
            background: c.color,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-3xl bg-white px-8 py-6 text-center shadow-2xl"
      >
        <PartyPopper className="h-8 w-8 text-red-600" strokeWidth={2.25} />
        <p className="text-lg font-black text-neutral-800">投票ありがとうございます！</p>
        <p className="text-sm font-bold text-neutral-500">{sausage.name}に投票しました</p>
      </motion.div>
    </motion.div>
  );
}
