"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

import brandLogo from "@/assets/images/brand-logo.png";

const SPLASH_DURATION_MS = 1500;

export function BrandSplash({ onDone }: { onDone: () => void }) {
  // Keep a stable ref so re-renders from unrelated context updates (e.g. the
  // 4s vote poll) don't reset this timer before it fires.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    const timer = setTimeout(() => onDoneRef.current(), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-[#fff3de] px-6 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(245,166,35,0.18),transparent_65%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-28 w-28"
      >
        <Image src={brandLogo} alt="一関ミート" fill className="object-contain" priority />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="relative text-base font-bold text-[#2b1a12]"
      >
        岩手・一関のクラフトソーセージ。
      </motion.p>
    </motion.div>
  );
}
