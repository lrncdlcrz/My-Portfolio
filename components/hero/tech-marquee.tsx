"use client";

import { techStack } from "@/data/tech-stack";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function TechMarquee() {
  const reducedMotion = useReducedMotion();
  const items = [...techStack, ...techStack];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex w-max items-center gap-3 py-2",
          !reducedMotion && "animate-marquee",
        )}
      >
        {items.map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="glass flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-aurora-gradient" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
