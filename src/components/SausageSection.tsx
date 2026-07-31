import { SausageCard } from "@/components/SausageCard";
import { SAUSAGES } from "@/data/sausages";

export function SausageSection() {
  return (
    <section id="vote" className="bg-white px-5 py-14">
      <div className="mx-auto flex max-w-md flex-col gap-3 text-center">
        <h2 className="font-display text-3xl leading-[1] tracking-[0.02em] text-red-600">
          投票する
        </h2>
        <p className="text-sm font-medium text-neutral-500">
          食べたソーセージをタップして投票しよう
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-6">
        {SAUSAGES.map((sausage) => (
          <SausageCard key={sausage.id} sausage={sausage} />
        ))}
      </div>
    </section>
  );
}
