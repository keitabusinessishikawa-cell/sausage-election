import Image from "next/image";
import { Sparkles } from "lucide-react";

import heroBackground from "@/assets/images/hero-bg-keyvisual1.png";
import heroLogo from "@/assets/images/hero-logo-bubble.png";
import { BeerBubbles } from "@/components/BeerBubbles";

const TITLE_TILES = [
  { char: "ソ", bg: "bg-red-500", rotate: -6, y: 2 },
  { char: "ー", bg: "bg-amber-500", rotate: 5, y: -6 },
  { char: "セ", bg: "bg-teal-500", rotate: -4, y: 4 },
  { char: "ー", bg: "bg-sky-500", rotate: 6, y: -5 },
  { char: "ジ", bg: "bg-pink-500", rotate: -3, y: 3 },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-amber-800">
      <Image
        src={heroBackground}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover brightness-[0.9] saturate-125 blur-[6px]"
        style={{ objectPosition: "38% 40%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/55 via-orange-900/40 to-[#fff3de]" />
      <div className="animate-glow-pulse absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_15%,rgba(255,214,138,0.3),transparent_65%)]" />

      <BeerBubbles />

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-24 pt-16 text-center">
        <div className="animate-float-bob aspect-square w-[min(21rem,78vw)] overflow-hidden rounded-full">
          <Image
            src={heroLogo}
            alt="いちのせきミート"
            width={336}
            height={336}
            preload
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium tracking-[0.3em] text-amber-100">
            ICHINOSEKI MEAT
          </p>
          <h1 className="animate-sway-text flex flex-col items-center gap-4">
            <div className="relative flex items-center gap-1.5 sm:gap-2.5">
              <Sparkles
                className="absolute -right-3 -top-4 h-5 w-5 rotate-12 text-amber-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] sm:-right-4 sm:-top-5 sm:h-6 sm:w-6"
                strokeWidth={2.5}
              />
              {TITLE_TILES.map((tile, i) => (
                <span
                  key={i}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tile.bg} font-display text-2xl font-black text-white shadow-[0_4px_0_rgba(0,0,0,0.2)] sm:h-20 sm:w-20 sm:text-4xl`}
                  style={{ transform: `rotate(${tile.rotate}deg) translateY(${tile.y}px)` }}
                >
                  {tile.char}
                </span>
              ))}
            </div>
            <span
              className="font-display px-8 py-2 text-2xl font-black tracking-[0.05em] text-white sm:text-3xl"
              style={{
                background: "#dc2626",
                clipPath:
                  "polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
              }}
            >
              総選挙
            </span>
          </h1>
          <p className="mt-1 text-lg font-medium text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            あなたのお気に入りを決めよう！
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fff3de] to-transparent" />
    </section>
  );
}
