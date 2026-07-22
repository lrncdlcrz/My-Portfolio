"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { secondaryProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";
import { Project } from "@/types";

const filters = ["All", "Game", "Practice"] as const;

export function ProjectsGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo<Project[]>(() => {
    if (active === "All") return secondaryProjects;
    return secondaryProjects.filter((p) => p.category === active);
  }, [active]);

  return (
    <section className="section">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          More Work
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
          Other Projects
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            data-cursor-hover
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === filter
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground",
            )}
          >
            {filter}
          </button>
        ))}
      </ScrollReveal>

      <motion.div
        key={active}
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
