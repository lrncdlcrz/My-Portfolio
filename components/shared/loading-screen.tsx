"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const NAME = "LAURENCE DELA CRUZ";

export function LoadingScreen() {
  const reducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const duration = reducedMotion ? 400 : 2000;
    const timer = window.setTimeout(() => {
      setLoading(false);
      if (window.location.hash) {
        const target = document.getElementById(window.location.hash.slice(1));
        target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
    }, duration);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap items-center justify-center px-6 font-heading text-2xl font-semibold tracking-[0.15em] sm:text-4xl">
            {NAME.split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className={letter === " " ? "w-3 sm:w-5" : "text-gradient"}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: reducedMotion ? 0 : index * 0.045,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="h-px w-40 overflow-hidden rounded-full bg-white/10 sm:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full w-1/2 bg-aurora-gradient shadow-glow"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                repeat: reducedMotion ? 0 : Infinity,
                duration: 1.1,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
