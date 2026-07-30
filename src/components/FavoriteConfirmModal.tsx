"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

import type { Sausage } from "@/data/sausages";

interface FavoriteConfirmModalProps {
  sausage: Sausage;
  onConfirm: () => void;
  onCancel: () => void;
}

export function FavoriteConfirmModal({
  sausage,
  onConfirm,
  onCancel,
}: FavoriteConfirmModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
      >
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-2xl">
          <Image src={sausage.image} alt={sausage.name} fill sizes="96px" className="object-cover" />
        </div>

        <p className="mt-4 text-lg font-black text-neutral-800">{sausage.name}</p>
        <p className="mt-2 text-sm font-bold text-neutral-500">
          お気に入りに投票します。
          <br />
          全商品を通じて1人1票のみ、投票後は変更できません。
          <br />
          よろしいですか？
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onConfirm}
            style={{ touchAction: "manipulation" }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 text-sm font-black text-white shadow-[0_4px_0_0_rgba(185,28,28,0.5)] active:translate-y-0.5 active:shadow-none"
          >
            <Heart className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
            投票する
          </motion.button>
          <button
            type="button"
            onClick={onCancel}
            style={{ touchAction: "manipulation" }}
            className="w-full rounded-full py-3 text-sm font-bold text-neutral-500"
          >
            キャンセル
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
