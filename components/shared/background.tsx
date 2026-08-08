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
      size: rand() * 2.2 + 1,
      delay: rand() * 4,
      duration: rand() * 3 + 3,
    }));
  }, [count]);
}

export function Background() {
  const reducedMotion = useReducedMotion();
  const stars = useStars(95);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/*
        Grid pattern, fading toward the edges. Drawn with `currentColor` so the
        lines follow the theme: it used to be `opacity-0 dark:opacity-100`,
        which meant the grid simply did not exist on light. Light mode gets a
        slightly stronger alpha because dark lines on near-white read fainter
        than white lines on near-black at the same value.
      */}
      <div
        className="absolute inset-0 text-foreground/[0.09] dark:text-foreground/[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
        }}
      />

      {/* Slow-drifting luminance band, grayscale only */}
      <div
        className={cn(
          "absolute -top-1/3 left-1/2 h-[140%] w-[140%] -translate-x-1/2 text-foreground opacity-[0.07] dark:opacity-[0.12]",
          !reducedMotion && "animate-aurora",
        )}
        style={{
          backgroundImage:
            "linear-gradient(115deg, currentColor 0%, transparent 25%, currentColor 50%, transparent 75%, currentColor 100%)",
          backgroundSize: "200% 200%",
          filter: "blur(90px)",
        }}
      />

      {/* Floating light blobs */}
      <div
        className={cn(
          "absolute left-[-10%] top-[10%] h-[36rem] w-[36rem] rounded-full bg-foreground/10 blur-[110px] dark:bg-foreground/[0.06]",
          !reducedMotion && "animate-blob",
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-15%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-foreground/10 blur-[120px] dark:bg-foreground/[0.05]",
          !reducedMotion && "animate-blob [animation-delay:2s]",
        )}
      />
      <div
        className={cn(
          "absolute right-[15%] top-[35%] h-64 w-64 rounded-full bg-foreground/10 blur-[90px] dark:bg-foreground/[0.04]",
          !reducedMotion && "animate-float-slow",
        )}
      />

      {/*
        Drifting topographic contours.
        Replaces the two spinning rings, which read as a generic loader and
        competed with the wireframe globe's own circles. These are gentle
        stacked sine curves at very low opacity, each drifting at a slightly
        different rate so the field never visibly loops. Purely CSS transforms
        on three groups, so it costs nothing to animate.

        Light mode carries more opacity on purpose: dark lines on a near-white
        page read considerably fainter than white lines on near-black at the
        same alpha, so matching the two values made the waves vanish on light.
      */}
      <svg
        className="absolute left-1/2 top-1/2 h-[130vmin] w-[160vmin] -translate-x-1/2 -translate-y-1/2 text-foreground opacity-[0.2] dark:opacity-[0.13]"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {[0, 1, 2].map((band) => (
          <g
            key={band}
            className={
              !reducedMotion
                ? ["animate-drift-a", "animate-drift-b", "animate-drift-c"][band]
                : undefined
            }
            style={{ animationDuration: `${34 + band * 11}s` }}
          >
            {Array.from({ length: 9 }, (_, i) => {
              const y = 90 + band * 240 + i * 22;
              const amp = 26 + i * 3 + band * 6;
              // One period across the viewBox, phase-shifted per line so the
              // stack reads as terrain rather than parallel waves.
              const phase = i * 26 + band * 60;
              const d = `M -100 ${y} C ${180 + phase} ${y - amp}, ${420 - phase} ${y + amp}, 650 ${y} S ${1020 + phase} ${y - amp}, 1300 ${y}`;
              return (
                <path
                  key={i}
                  d={d}
                  stroke="currentColor"
                  strokeOpacity={0.34 + (i % 3) * 0.16}
                  strokeWidth={i % 4 === 0 ? 1.1 : 0.7}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/*
        Particles render in both themes. They used to be `hidden dark:block`,
        which made the field vanish entirely on light. `bg-foreground` flips
        them to dark specks on a light page; the lower light-mode opacity keeps
        them from reading as dust on white.
      */}
      <div className="absolute inset-0 opacity-[0.85] dark:opacity-100">
        {stars.map((star) => {
          // One element can only carry a single Tailwind animation utility, so
          // the outer span drifts and the inner one twinkles.
          const drift = ["animate-drift-a", "animate-drift-b", "animate-drift-c"][
            star.id % 3
          ];
          return (
            <span
              key={star.id}
              className={cn("absolute", !reducedMotion && drift)}
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDelay: `${star.delay}s`,
              }}
            >
              <span
                className={cn(
                  "block rounded-full bg-foreground",
                  !reducedMotion && "animate-twinkle",
                )}
                style={{
                  width: star.size,
                  height: star.size,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                }}
              />
            </span>
          );
        })}
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
