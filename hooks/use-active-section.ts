"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy for the one-page layout. Returns the id of the section that
 * currently crosses a thin band a third of the way down the viewport, or null
 * when disabled (on /privacy and /terms, where the section ids don't exist).
 *
 * `ids` should be a stable array (a module-level constant): it is an effect
 * dependency, so a fresh array each render would rebuild the observer.
 */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const intersecting = new Map<string, boolean>();

    // The band is 5% of the viewport tall, starting 35% from the top. Sections
    // are contiguous, so at most one crosses it; in the rare gap between two,
    // the previous section simply stays active rather than flickering to none.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersecting.set(entry.target.id, entry.isIntersecting);
        }
        const current = ids.find((id) => intersecting.get(id));
        if (current) setActive(current);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    elements.forEach((el) => observer.observe(el));

    // The last section can be too short to ever reach the band before the
    // page runs out, so reaching the bottom of the document selects it.
    const lastId = ids[ids.length - 1];
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(lastId);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ids, enabled]);

  return active;
}
