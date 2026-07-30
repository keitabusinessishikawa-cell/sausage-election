import Image from "next/image";

import heroBackground from "@/assets/images/hero-bg-beer.png";
import heroLogo from "@/assets/images/hero-logo-bubble.png";
import { BeerBubbles } from "@/components/BeerBubbles";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-amber-800">
      <Image
        src={heroBackground}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover brightness-[0.9] saturate-125 blur-[3px]"
        style={{ objectPosition: "2% 26%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/55 via-orange-900/40 to-[#fff3de]" />
      <div className="animate-glow-pulse absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_15%,rgba(255,214,138,0.3),transparent_65%)]" />

      <BeerBubbles />

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-24 pt-16 text-center">
        <div className="animate-sway relative">
          <div className="animate-glow-pulse absolute inset-0 -z-10 scale-150 rounded-full bg-amber-200/40 blur-2xl" />
          <div className="h-28 w-28 overflow-hidden rounded-full shadow-[0_6px_24px_rgba(245,166,35,0.5)] ring-4 ring-white/70">
            <Image
              src={heroLogo}
              alt="いちのせきミート"
              width={112}
              height={112}
              preload
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium tracking-[0.3em] text-amber-100">
            ICHINOSEKI MEAT
          </p>
          <h1 className="flex flex-col items-center">
            <span className="text-refined font-display text-5xl leading-[1] tracking-[0.02em] sm:text-6xl">
              ソーセージ
            </span>
            <span className="text-refined font-display text-[3.9rem] leading-[1] tracking-[0.02em] sm:text-[4.875rem]">
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
