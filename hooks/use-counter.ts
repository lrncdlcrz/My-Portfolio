"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Counts up to `target` when the element scrolls into view.
 *
 * The resting value is `target`, never 0. That matters: the previous version
 * initialised to 0 and only left it when an IntersectionObserver fired, so the
 * server-rendered HTML said "0 Projects Built" and any view that never tripped
 * the observer (already on screen at mount, no-JS, a screenshot taken before
 * scrolling) showed zeros. The count-up is now strictly a progressive
 * enhancement layered on top of a correct value.
 */
export function useCounter(target: number, duration = 1600) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(target);

  // Only animate for elements that start below the fold. If the stat is
  // already on screen at mount there is nothing to reveal, and animating would
  // mean visibly resetting a correct number back to zero.
  const eligible = useRef<boolean | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (eligible.current === null) {
      const el = ref.current;
      eligible.current = el
        ? el.getBoundingClientRect().top > window.innerHeight
        : false;
    }
  }, []);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    if (reducedMotion || !eligible.current) {
      setValue(target);
      return;
    }

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        // Always land exactly on the target, never a rounding artifact.
        setValue(target);
      }
    };

    setValue(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, reducedMotion]);

  return { ref, value };
}
