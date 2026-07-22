"use client";

import { skillCategories } from "@/data/skills";
import { SkillCategoryCard } from "@/components/skills/skill-category-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { staggerContainer } from "@/animations/variants";

export function SkillsGrid() {
  return (
    <section id="skills" className="section scroll-mt-32">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          What I Work With
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">Skills</h2>
      </ScrollReveal>

      <ScrollReveal
        variants={staggerContainer(0.1)}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category) => (
          <SkillCategoryCard key={category.category} {...category} />
        ))}
      </ScrollReveal>
    </section>
  );
}
