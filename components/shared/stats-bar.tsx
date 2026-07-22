"use client";

import { stats } from "@/data/stats";
import { useCounter } from "@/hooks/use-counter";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { staggerContainer, scaleIn } from "@/animations/variants";
import { motion } from "framer-motion";

function StatCard({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  const { ref, value: animated } = useCounter(value);

  return (
    <motion.div
      variants={scaleIn}
      ref={ref as React.RefObject<HTMLDivElement>}
      className="glass-card flex flex-col items-center gap-1 px-6 py-8 text-center"
    >
      <span className="font-heading text-4xl font-semibold text-gradient sm:text-5xl">
        {animated}
        {suffix ?? ""}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </motion.div>
  );
}

export function StatsBar() {
  return (
    <ScrollReveal variants={staggerContainer(0.12)} className="section py-12 sm:py-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </ScrollReveal>
  );
}
