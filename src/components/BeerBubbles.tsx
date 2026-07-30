interface BeerBubblesProps {
  count?: number;
  className?: string;
}

const SEEDED_BUBBLES = Array.from({ length: 22 }, (_, i) => {
  const left = (i * 23) % 100;
  const size = 10 + ((i * 13) % 30);
  const duration = 4 + ((i * 7) % 7);
  const delay = (i * 0.9) % 7;
  const drift = ((i * 17) % 36) - 18;
  return { left, size, duration, delay, drift };
});

export function BeerBubbles({ count = 22, className = "" }: BeerBubblesProps) {
  const bubbles = SEEDED_BUBBLES.slice(0, count);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
    >
      {bubbles.map((bubble, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-0 rounded-full"
          style={{
            left: `${bubble.left}%`,
            width: bubble.size,
            height: bubble.size,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.15) 75%)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow:
              "0 0 6px rgba(255,255,255,0.8), inset 0 0 4px rgba(255,255,255,0.6)",
            ["--drift" as string]: `${bubble.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
