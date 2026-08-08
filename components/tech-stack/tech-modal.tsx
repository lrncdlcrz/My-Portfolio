"use client";

import { TechEntry } from "@/types";
import { techCategoryLabels } from "@/data/tech-catalog";
import { TechIcon } from "@/components/tech-stack/tech-icon";
import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function TechModal({ tech }: { tech: TechEntry }) {
  return (
    <DialogContent className="max-w-md">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-foreground/5 shadow-glow">
        <TechIcon iconKey={tech.iconKey} className="h-11 w-11" />
      </div>
      <DialogHeader className="text-center">
        <DialogTitle>{tech.name}</DialogTitle>
        <DialogDescription>{tech.description}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="outline">{techCategoryLabels[tech.category]}</Badge>
      </div>

      {tech.projects && tech.projects.length > 0 && (
        <div className="text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Used In
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tech.projects.map((project) => (
              <Badge key={project} variant="accent">
                {project}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </DialogContent>
  );
}
