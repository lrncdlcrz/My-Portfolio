"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "@/types";
import { skillCategoryIconMap } from "@/lib/skill-category-icons";
import { scaleIn } from "@/animations/variants";

export function SkillCategoryCard({ category, description, skills }: SkillCategory) {
  const Icon = skillCategoryIconMap[category];

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6 }}
      className="glass-card group flex flex-col gap-4 p-6 transition-shadow hover:shadow-glow"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-aurora-gradient text-white shadow-glow">
          {Icon && <Icon className="h-5 w-5" />}
        </span>
        <div>
          <h3 className="font-heading text-lg font-semibold">{category}</h3>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors group-hover:border-primary/20"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
