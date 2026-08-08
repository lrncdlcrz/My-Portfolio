"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Two-part cursor: a small solid dot that tracks the pointer precisely, and a
 * thin outline ring that trails it with a softer spring. Over interactive
 * targets the ring expands and the dot shrinks away, so the ring reads as a
 * selection reticle rather than a blurred glow.
 *
 * Both parts are drawn with `currentColor`-style tokens rather than a blend
 * mode, which keeps the cursor crisp on the site's glass panels; the previous
 * blurred `mix-blend-mode` blob smeared over them.
 */
export function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  // The dot is nearly rigid; the ring lags slightly for a sense of weight.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 1600, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1600, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.42 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.42 });

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
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setHovering(
        Boolean(target?.closest?.("a, button, input, textarea, select, [data-cursor-hover]")),
      );
    };

    const handleLeave = () => setVisible(false);
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? 44 : 26;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full border border-foreground/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? (hovering ? 0.9 : 0.45) : 0,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      />

      {/* Leading dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full bg-foreground"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 4 : 6,
          height: hovering ? 4 : 6,
          opacity: visible ? (hovering ? 0.6 : 1) : 0,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 32 }}
      />
    </>
  );
}
