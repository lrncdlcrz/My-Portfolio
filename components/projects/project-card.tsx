"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProjectModal } from "@/components/projects/project-modal";
import { useTilt } from "@/hooks/use-tilt";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ProjectCard({ project }: { project: Project }) {
  const reducedMotion = useReducedMotion();
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          ref={ref as React.RefObject<HTMLButtonElement>}
          onMouseMove={reducedMotion ? undefined : onMouseMove}
          onMouseLeave={reducedMotion ? undefined : onMouseLeave}
          style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
          whileHover={{ y: -6 }}
          data-cursor-hover
          className="glass-card group flex h-full w-full flex-col gap-4 p-6 text-left transition-shadow hover:shadow-glow"
        >
          <div className="flex items-start justify-between gap-2">
            <Badge variant="outline">{project.category}</Badge>
            <Badge variant={project.status === "Completed" ? "default" : "accent"}>
              {project.status}
            </Badge>
          </div>
          <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
          <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-foreground/[0.02] px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
            View Details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </motion.button>
      </DialogTrigger>
      <ProjectModal project={project} />
    </Dialog>
  );
}
