"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TechEntry } from "@/types";
import { TechIcon } from "@/components/tech-stack/tech-icon";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TechModal } from "@/components/tech-stack/tech-modal";
import { useTilt } from "@/hooks/use-tilt";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { scaleIn } from "@/animations/variants";

export function TechCard({ tech }: { tech: TechEntry }) {
  const reducedMotion = useReducedMotion();
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(8);
  const [hovering, setHovering] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          ref={ref as React.RefObject<HTMLButtonElement>}
          variants={scaleIn}
          onMouseMove={(e) => {
            if (!reducedMotion) onMouseMove(e);
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false);
            if (!reducedMotion) onMouseLeave();
          }}
          whileHover={reducedMotion ? undefined : { y: -6 }}
          style={
            reducedMotion
              ? undefined
              : { rotateX, rotateY, transformPerspective: 800 }
          }
          data-cursor-hover
          title={tech.name}
          className="glass-card group relative flex flex-col items-center gap-3 overflow-hidden p-5 text-center transition-shadow duration-300 hover:shadow-glow"
        >
          {/* animated gradient border on hover */}
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(168,85,247,0.15))",
            }}
          />
          {/* glass reflection sweep */}
          <span
            className={
              hovering
                ? "pointer-events-none absolute -inset-y-4 -left-1/2 w-1/3 -skew-x-12 bg-white/10 transition-transform duration-700 ease-out translate-x-[420%]"
                : "pointer-events-none absolute -inset-y-4 -left-1/2 w-1/3 -skew-x-12 bg-white/10 transition-transform duration-700 ease-out translate-x-0"
            }
          />

          <span
            className={
              !reducedMotion
                ? "relative flex h-12 w-12 items-center justify-center animate-float-slow"
                : "relative flex h-12 w-12 items-center justify-center"
            }
          >
            <TechIcon iconKey={tech.iconKey} className="h-9 w-9" />
          </span>
          <p className="relative font-heading text-sm font-semibold leading-snug">
            {tech.name}
          </p>
        </motion.button>
      </DialogTrigger>
      <TechModal tech={tech} />
    </Dialog>
  );
}
