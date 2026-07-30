"use client";

import { motion } from "framer-motion";
import { ExternalLink, UtensilsCrossed, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import type { Sausage } from "@/data/sausages";

const ORDER_MARK = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];

interface ProductDetailModalProps {
  sausage: Sausage;
  mode: "eaten" | "curious";
  onClose: () => void;
}

export function ProductDetailModal({ sausage, mode, onClose }: ProductDetailModalProps) {
  // Keep a stable ref so re-renders from unrelated context updates (e.g. the
  // 4s vote poll) don't reset this timer before it fires.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (mode !== "eaten") return;
    const timer = setTimeout(() => onCloseRef.current(), 2200);
    return () => clearTimeout(timer);
  }, [mode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white pb-6 sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          style={{ touchAction: "manipulation" }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="relative aspect-video w-full">
          <Image
            src={sausage.image}
            alt={sausage.name}
            fill
            sizes="(max-width: 480px) 100vw, 448px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
          <span
            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-base font-bold shadow"
            style={{ color: sausage.themeColor }}
          >
            {ORDER_MARK[sausage.order - 1]}
          </span>
          <h3 className="absolute bottom-3 left-4 text-xl font-black text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            {sausage.name}
          </h3>
        </div>

        <div className="flex flex-col items-center gap-4 px-6 pt-5 text-center">
          <p className="text-lg font-bold text-neutral-800">{sausage.tasteCopy}</p>

          {mode === "eaten" ? (
            <p className="flex items-center gap-1.5 text-sm font-bold text-red-600">
              <UtensilsCrossed className="h-4 w-4" strokeWidth={2.5} />
              食べる登録をしました！
            </p>
          ) : (
            <a
              href={sausage.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ touchAction: "manipulation", backgroundColor: sausage.themeColor }}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-black text-white shadow-[0_4px_0_0_rgba(0,0,0,0.15)] active:translate-y-0.5 active:shadow-none"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
              オンラインショップで見る
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
