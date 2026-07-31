"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { FavoriteCelebration } from "@/components/FavoriteCelebration";
import { FavoriteConfirmModal } from "@/components/FavoriteConfirmModal";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { useVotes } from "@/context/VoteContext";
import { ACTION_LABEL_BASE, type Sausage } from "@/data/sausages";

const ORDER_MARK = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];

type Modal = "favorite-confirm" | "favorite-celebration" | "eaten-detail" | "curious-detail" | null;

export function SausageCard({ sausage }: { sausage: Sausage }) {
  const { eatenRemaining, eatenCountFor, voteEaten, hasFavorited, favoritedSausageId, voteFavorite, voteCurious } =
    useVotes();
  const [modal, setModal] = useState<Modal>(null);

  const isMyFavorite = favoritedSausageId === sausage.id;
  const eatenCount = eatenCountFor(sausage.id);
  const eatenDisabled = eatenRemaining <= 0;

  const handleEat = () => {
    if (voteEaten(sausage.id) === "voted") {
      setModal("eaten-detail");
    }
  };

  const handleCurious = () => {
    voteCurious(sausage.id);
    setModal("curious-detail");
  };

  const handleFavoriteConfirm = () => {
    voteFavorite(sausage.id);
    setModal("favorite-celebration");
  };

  return (
    <article
      className="overflow-hidden rounded-3xl border-2 bg-white shadow-[0_6px_0_0_rgba(0,0,0,0.08)]"
      style={{ borderColor: isMyFavorite ? sausage.themeColor : "#fde68a" }}
    >
      <div className="relative aspect-4/5 w-full">
        <Image
          src={sausage.image}
          alt={sausage.name}
          fill
          sizes="(max-width: 480px) 100vw, 420px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/5 to-neutral-950/10" />

        <span
          className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-black shadow-lg"
          style={{ color: sausage.themeColor }}
        >
          {ORDER_MARK[sausage.order - 1]}
        </span>

        {sausage.badge && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
            style={{ backgroundColor: sausage.themeColor }}
          >
            {sausage.badge}
          </span>
        )}

        {isMyFavorite && (
          <span className="absolute right-3 top-14 flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-black text-white shadow-lg">
            <Heart className="h-3 w-3" strokeWidth={2.5} fill="currentColor" />
            あなたの一票
          </span>
        )}

        <h3 className="absolute bottom-3 left-4 text-xl font-black text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          {sausage.name}
        </h3>
      </div>

      <div className="flex flex-col gap-3 p-3.5">
        <p className="text-center text-sm font-bold text-neutral-500">{sausage.tasteCopy}</p>

        <motion.button
          type="button"
          disabled={hasFavorited}
          whileTap={hasFavorited ? undefined : { scale: 0.97 }}
          onClick={() => setModal("favorite-confirm")}
          style={{
            touchAction: "manipulation",
            backgroundColor: hasFavorited && !isMyFavorite ? "#e5e7eb" : sausage.themeColor,
          }}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-black text-white shadow-[0_4px_0_0_rgba(0,0,0,0.18)] active:translate-y-0.5 active:shadow-none ${
            hasFavorited && !isMyFavorite ? "text-neutral-400" : ""
          }`}
        >
          <Heart className="h-5 w-5" strokeWidth={2.5} fill={isMyFavorite ? "currentColor" : "none"} />
          {isMyFavorite ? "投票済み（あなたの一票）" : hasFavorited ? "投票は終了しました" : "お気に入りに投票"}
        </motion.button>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={eatenDisabled}
            onClick={handleEat}
            style={{ touchAction: "manipulation" }}
            className={`relative flex flex-1 flex-col items-center gap-1 rounded-xl border-2 py-2.5 text-neutral-600 ${
              eatenDisabled
                ? "border-neutral-200 bg-neutral-100 text-neutral-300"
                : "border-amber-300 bg-amber-50"
            }`}
          >
            {eatenCount > 0 && (
              <span className="font-numeric absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
                ×{eatenCount}
              </span>
            )}
            <UtensilsCrossed className="h-4 w-4" strokeWidth={2.25} />
            <span className="text-xs font-bold">
              {ACTION_LABEL_BASE.eaten}
              <span className={`font-black ${eatenDisabled ? "" : "text-red-600"}`}>投票</span>
            </span>
          </button>

          <button
            type="button"
            onClick={handleCurious}
            style={{ touchAction: "manipulation" }}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl border-2 border-neutral-200 bg-white py-2.5 text-neutral-500"
          >
            <Eye className="h-4 w-4" strokeWidth={2.25} />
            <span className="text-xs font-bold">
              {ACTION_LABEL_BASE.curious}
              <span className="font-black text-red-600">投票</span>
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modal === "favorite-confirm" && (
          <FavoriteConfirmModal
            sausage={sausage}
            onConfirm={handleFavoriteConfirm}
            onCancel={() => setModal(null)}
          />
        )}
        {modal === "favorite-celebration" && (
          <FavoriteCelebration sausage={sausage} onDone={() => setModal(null)} />
        )}
        {modal === "eaten-detail" && (
          <ProductDetailModal sausage={sausage} mode="eaten" onClose={() => setModal(null)} />
        )}
        {modal === "curious-detail" && (
          <ProductDetailModal sausage={sausage} mode="curious" onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </article>
  );
}
