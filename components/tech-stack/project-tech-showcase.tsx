"use client";

import { motion } from "framer-motion";
import { TechEntry } from "@/types";
import { TechIcon } from "@/components/tech-stack/tech-icon";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { staggerContainer, scaleIn } from "@/animations/variants";

interface ProjectTechShowcaseProps {
  title: string;
  tagline: string;
  roles: string[];
  tech: TechEntry[];
}

export function ProjectTechShowcase({ title, tagline, roles, tech }: ProjectTechShowcaseProps) {
  return (
    <ScrollReveal className="glass-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-border bg-foreground/[0.06] px-2.5 py-1 text-xs text-foreground"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        variants={staggerContainer(0.04)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7"
      >
        {tech.map((item) => (
          <motion.div
            key={item.id}
            variants={scaleIn}
            title={item.name}
            data-cursor-hover
            className="group glass flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors hover:border-foreground/70"
          >
            <TechIcon iconKey={item.iconKey} className="h-6 w-6" />
            <span className="text-[11px] leading-tight text-muted-foreground">
              {item.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  );
}
