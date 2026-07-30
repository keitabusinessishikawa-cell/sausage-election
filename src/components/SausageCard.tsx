import Image from "next/image";

import { VoteButton } from "@/components/VoteButton";
import type { Sausage, VoteAction } from "@/data/sausages";

const ACTIONS: VoteAction[] = ["favorite", "eaten", "curious"];

const ORDER_MARK = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];

export function SausageCard({ sausage }: { sausage: Sausage }) {
  return (
    <article className="overflow-hidden rounded-3xl border-2 border-amber-200 bg-white shadow-[0_6px_0_0_rgba(251,191,36,0.35)]">
      <div className="relative aspect-4/5 w-full">
        <Image
          src={sausage.image}
          alt={sausage.name}
          fill
          sizes="(max-width: 480px) 100vw, 420px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/5 to-neutral-950/10" />

        <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-red-600 shadow">
          {ORDER_MARK[sausage.order - 1]}
        </span>

        {sausage.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
            {sausage.badge}
          </span>
        )}

        <h3 className="absolute bottom-3 left-4 text-xl font-black text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          {sausage.name}
        </h3>
      </div>

      <div className="flex gap-2 p-3">
        {ACTIONS.map((action) => (
          <VoteButton key={action} sausageId={sausage.id} action={action} />
        ))}
      </div>
    </article>
  );
}
