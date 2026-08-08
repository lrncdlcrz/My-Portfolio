"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sparkles, Rocket } from "lucide-react";
import { experience } from "@/data/experience";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { fadeLeft } from "@/animations/variants";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="section">
      <ScrollReveal>
        <p className="eyebrow">Journey</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">Experience</h2>
      </ScrollReveal>

      <div ref={containerRef} className="relative mt-14 pl-10 sm:pl-12">
        <div className="absolute left-3 top-1 h-full w-px bg-foreground/10 sm:left-4" />
        <motion.div
          className="absolute left-3 top-1 w-px origin-top bg-mono-gradient shadow-glow sm:left-4"
          style={{ scaleY: progress, height: "100%" }}
        />

        <div className="flex flex-col gap-10">
          {experience.map((item) => (
            <ScrollReveal key={item.id} variants={fadeLeft} className="relative">
              <span
                className="absolute -left-10 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-background ring-2 ring-primary/50 sm:-left-12"
                aria-hidden
              >
                {item.type === "future" ? (
                  <Rocket className="h-3 w-3 text-accent" />
                ) : (
                  <Sparkles className="h-3 w-3 text-primary" />
                )}
              </span>
              <div className="glass-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-lg font-semibold">{item.role}</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-primary">{item.organization}</p>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
