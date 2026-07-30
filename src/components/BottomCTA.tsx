"use client";

import { ShoppingBag, Sparkles, Vote } from "lucide-react";

function scrollToVote() {
  document.getElementById("vote")?.scrollIntoView({ behavior: "smooth" });
}

const LINKS = [
  {
    href: "https://www.instagram.com/ichinoseki_meat/",
    label: "いちのせきミートの最新情報はコチラ",
    Icon: Sparkles,
  },
  {
    href: "https://ichimeat.base.shop/",
    label: "オンラインショップはコチラ",
    Icon: ShoppingBag,
  },
];

export function BottomCTA() {
  return (
    <section className="bg-[#fff3de] px-6 pb-28 pt-6">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
        <p className="text-sm font-medium text-neutral-500">
          あなたの一票が、次の1位を決める。
        </p>
        <button
          type="button"
          onClick={scrollToVote}
          style={{ touchAction: "manipulation" }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-4 text-base font-black text-white shadow-[0_6px_0_0_rgba(185,28,28,0.5)] ring-2 ring-white active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(185,28,28,0.5)]"
        >
          <Vote className="h-5 w-5" strokeWidth={2.5} />
          タップして投票
        </button>

        <div className="mt-4 flex w-full flex-col gap-3">
          {LINKS.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ touchAction: "manipulation" }}
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-amber-200 bg-white py-3.5 text-sm font-bold text-neutral-700 shadow-[0_4px_0_0_rgba(251,191,36,0.35)] active:translate-y-0.5 active:shadow-none"
            >
              <Icon className="h-4 w-4 text-red-600" strokeWidth={2.25} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
