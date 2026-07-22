"use client";

import { techCatalog, techCategoryLabels } from "@/data/tech-catalog";
import { certificates } from "@/data/certificates";
import { useCounter } from "@/hooks/use-counter";
import { motion } from "framer-motion";
import { scaleIn } from "@/animations/variants";

const stats = [
  { label: "Technologies", value: techCatalog.length, suffix: "+" },
  { label: "Major Projects", value: 2 },
  { label: "Professional Certifications", value: certificates.length },
  { label: "Skill Categories", value: Object.keys(techCategoryLabels).length },
];

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

export function TechStats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
