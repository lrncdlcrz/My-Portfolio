"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { FadeImage } from "@/components/shared/fade-image";

export function ProfileRing() {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.6 });

  const translateX = useTransform(springX, [-1, 1], [-14, 14]);
  const translateY = useTransform(springY, [-1, 1], [-14, 14]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80 lg:h-96 lg:w-96"
    >
      {/* Blue aura glow */}
      <motion.div
        className="absolute -inset-8 rounded-full bg-aurora-gradient opacity-40 blur-3xl dark:opacity-60"
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ x: translateX, y: translateY }}
        className={cn("relative h-full w-full", !reducedMotion && "animate-float")}
      >
        {/* Rotating gradient ring */}
        <div className="absolute inset-0 rounded-full p-[3px]">
          <div
            className={reducedMotion ? "h-full w-full rounded-full" : "h-full w-full animate-spin-slow rounded-full"}
            style={{
              background:
                "conic-gradient(from 0deg, #2563EB, #6366F1, #8B5CF6, #A855F7, #3B82F6, #2563EB)",
            }}
          />
        </div>

        {/* Photo */}
        <div className="relative m-[4px] h-[calc(100%-8px)] w-[calc(100%-8px)] overflow-hidden rounded-full bg-background shadow-glow-lg">
          <FadeImage
            src="/images/profile.png"
            alt="Laurence Andrei C. Dela Cruz"
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 256px"
            priority
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
