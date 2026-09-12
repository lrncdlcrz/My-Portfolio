"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CaseStudy } from "@/components/projects/case-study";
import { caseStudyProjects } from "@/data/projects";

/**
 * Opens a full case study in an overlay, so the one-page layout keeps the
 * showcase's summary on the page and the case study's depth one click away.
 *
 * `children` is the trigger and must be a single element that accepts a ref
 * and onClick (a <button>). Radix only mounts the content while open, so the
 * case study's images cost nothing until someone asks for them.
 */
export function CaseStudyDialog({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactElement;
}) {
  const project = caseStudyProjects.find((p) => p.slug === slug);
  if (!project) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        // The content itself does not scroll: the inner div does. That keeps
        // the close button, a direct child here, pinned to the corner instead
        // of scrolling away with a case study that runs several screens long.
        className="flex max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-6xl flex-col overflow-hidden p-0 [&>button]:z-10 [&>button]:bg-background/70 [&>button]:backdrop-blur"
      >
        {/* The visible heading lives inside CaseStudy; these give the dialog
            its accessible name and description without duplicating it. */}
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <DialogDescription className="sr-only">{project.tagline}</DialogDescription>
        <div className="overflow-y-auto overscroll-contain [&>section]:py-10 sm:[&>section]:py-14">
          <CaseStudy
            project={project}
            eyebrow={
              project.slug === "elder-care-link"
                ? "Featured Case Study"
                : "Case Study · Practice Build"
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
