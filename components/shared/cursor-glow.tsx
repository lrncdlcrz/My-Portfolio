"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 800, damping: 45, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 800, damping: 45, mass: 0.25 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(supportsFinePointer && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target as HTMLElement;
      setHovering(Boolean(target.closest("a, button, [data-cursor-hover]")));
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
        mixBlendMode: isDark ? "screen" : "multiply",
      }}
      animate={{
        width: hovering ? 56 : 20,
        height: hovering ? 56 : 20,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(59,130,246,0.9) 0%, rgba(139,92,246,0.5) 45%, transparent 75%)"
            : "radial-gradient(circle, rgba(37,99,235,0.55) 0%, rgba(139,92,246,0.4) 45%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}
