"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import heroLogo from "@/assets/images/hero-logo-bubble.png";
import { useVotes } from "@/context/VoteContext";
import { EATEN_QUANTITY_OPTIONS } from "@/data/sausages";

export function QuantityPicker({ onSelect }: { onSelect: () => void }) {
  const { chooseEatenQuantity } = useVotes();

  const handlePick = (quantity: number) => {
    chooseEatenQuantity(quantity);
    onSelect();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[#fff3de] px-6 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(245,166,35,0.18),transparent_65%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="animate-float-bob relative h-24 w-24"
      >
        <Image src={heroLogo} alt="いちのせきミート" fill className="object-cover rounded-full" priority />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-display relative text-2xl leading-[1.3] tracking-[0.02em] text-red-600"
      >
        今日は
        <br />
        何本食べますか？
      </motion.h1>

      <div className="relative flex w-full max-w-xs flex-col gap-3.5">
        {EATEN_QUANTITY_OPTIONS.map((quantity, i) => (
          <motion.button
            key={quantity}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.08, ease: "easeOut" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePick(quantity)}
            style={{ touchAction: "manipulation" }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-4 text-lg font-black text-white shadow-[0_6px_0_0_rgba(185,28,28,0.5)] ring-2 ring-white active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(185,28,28,0.5)]"
          >
            {quantity}本
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="absolute inset-x-0 bottom-10 text-sm font-bold tracking-[0.15em] text-neutral-500"
      >
        いちのせきミート
      </motion.p>
    </motion.div>
  );
}
