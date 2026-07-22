"use client";

import { CheckCircle2 } from "lucide-react";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ComingSoonButton } from "@/components/projects/coming-soon-button";

export function ProjectModal({ project }: { project: Project }) {
  return (
    <DialogContent>
      <DialogHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{project.category}</Badge>
          <Badge>{project.status}</Badge>
        </div>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>{project.tagline}</DialogDescription>
      </DialogHeader>

      {project.solution && (
        <p className="text-sm text-muted-foreground">{project.solution}</p>
      )}

      {project.objectives && project.objectives.length > 0 && (
        <div className="space-y-2">
          {project.objectives.map((objective) => (
            <div key={objective} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">{objective}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
          Features
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {project.features.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-sm font-medium">{feature.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <ComingSoonButton label="GitHub" />
        <ComingSoonButton label="Live Demo" />
      </div>
    </DialogContent>
  );
}
