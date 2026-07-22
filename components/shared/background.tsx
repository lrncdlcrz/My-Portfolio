"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

// Deterministic seeded PRNG so star positions match between server and client render.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useStars(count: number) {
  return useMemo(() => {
    const rand = mulberry32(1337);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 2 + 0.5,
      delay: rand() * 4,
      duration: rand() * 3 + 3,
    }));
  }, [count]);
}

export function Background() {
  const reducedMotion = useReducedMotion();
  const stars = useStars(70);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Grid pattern, fading toward the edges */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
        }}
      />

      {/* Aurora gradient band */}
      <div
        className={cn(
          "absolute -top-1/3 left-1/2 h-[140%] w-[140%] -translate-x-1/2 opacity-20 dark:opacity-40",
          !reducedMotion && "animate-aurora",
        )}
        style={{
          backgroundImage:
            "linear-gradient(115deg, #2563EB 0%, #6366F1 25%, #8B5CF6 50%, #A855F7 75%, #3B82F6 100%)",
          backgroundSize: "200% 200%",
          filter: "blur(90px)",
        }}
      />

      {/* Floating glow blobs */}
      <div
        className={cn(
          "absolute left-[-10%] top-[10%] h-[36rem] w-[36rem] rounded-full bg-aurora-blue/30 blur-[110px] dark:bg-aurora-blue/40",
          !reducedMotion && "animate-blob",
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-15%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-aurora-purple/20 blur-[120px] dark:bg-aurora-purple/35",
          !reducedMotion && "animate-blob [animation-delay:2s]",
        )}
      />
      <div
        className={cn(
          "absolute right-[15%] top-[35%] h-64 w-64 rounded-full bg-aurora-indigo/20 blur-[90px] dark:bg-aurora-indigo/30",
          !reducedMotion && "animate-float-slow",
        )}
      />

      {/* Infinity-inspired rotating rings, abstract geometry, not imagery */}
      <svg
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] dark:opacity-[0.14]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <ellipse
          cx="130"
          cy="200"
          rx="120"
          ry="120"
          stroke="url(#ring-gradient-a)"
          strokeWidth="1.5"
          className={!reducedMotion ? "origin-center animate-spin-slow" : undefined}
        />
        <ellipse
          cx="270"
          cy="200"
          rx="120"
          ry="120"
          stroke="url(#ring-gradient-b)"
          strokeWidth="1.5"
          className={!reducedMotion ? "origin-center animate-spin-reverse" : undefined}
        />
        <defs>
          <linearGradient id="ring-gradient-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="ring-gradient-b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>

      {/* Stars / particles, dark mode only */}
      <div className="absolute inset-0 hidden dark:block">
        {stars.map((star) => (
          <span
            key={star.id}
            className={cn(
              "absolute rounded-full bg-white",
              !reducedMotion && "animate-twinkle",
            )}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Soft light ray */}
      <div
        className="absolute -top-24 left-1/4 h-[60rem] w-[18rem] rotate-12 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Base vignette toward the bottom so content stays readable */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
