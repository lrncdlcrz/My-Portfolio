"use client";

import { techStack } from "@/data/tech-stack";
import { TechIcon } from "@/components/tech-stack/tech-icon";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Marquee labels mapped to keys in the shared icon registry. */
const MARQUEE_ICONS: Record<string, string> = {
  React: "react",
  "Next.js": "nextjs",
  TypeScript: "typescript",
  JavaScript: "javascript",
  "Tailwind CSS": "tailwind",
  "Node.js": "nodejs",
  Express: "express",
  PHP: "php",
  Python: "python",
  MySQL: "mysql",
  "REST APIs": "restApi",
  AWS: "aws",
  "Git & GitHub": "github",
  Figma: "figma",
};

function MarqueeItem({ tech }: { tech: string }) {
  return (
    <span className="group flex shrink-0 items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-4 py-2 text-sm text-muted-foreground">
      <TechIcon iconKey={MARQUEE_ICONS[tech]} className="h-4 w-4" />
      {tech}
    </span>
  );
}

export function TechMarquee() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="group/marquee relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      {/*
        Two identical halves inside one track. The keyframe translates exactly
        -50%, so the second half lands where the first began and the loop has
        no visible seam. Pauses on hover; frozen outright under reduced motion.
      */}
      <div
        className={cn(
          "flex w-max items-center py-2",
          !reducedMotion &&
            "animate-marquee group-hover/marquee:[animation-play-state:paused]",
        )}
      >
        <span className="flex items-center gap-3 pr-3">
          {techStack.map((tech) => (
            <MarqueeItem key={`a-${tech}`} tech={tech} />
          ))}
        </span>
        {/* Duplicate exists only to close the loop; the first half already
            conveys the full list to assistive tech. */}
        <span aria-hidden className="flex items-center gap-3 pr-3">
          {techStack.map((tech) => (
            <MarqueeItem key={`b-${tech}`} tech={tech} />
          ))}
        </span>
      </div>
    </div>
  );
}
