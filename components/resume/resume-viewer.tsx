"use client";

import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { scaleIn } from "@/animations/variants";

export function ResumeViewer() {
  return (
    <ScrollReveal variants={scaleIn}>
      <div className="glass-card flex flex-col items-center gap-6 p-10 text-center">
        <div className="relative flex h-32 w-24 items-center justify-center rounded-xl bg-aurora-gradient shadow-glow-lg">
          <FileText className="h-12 w-12 text-white" />
          <span className="absolute inset-x-3 bottom-3 rounded bg-white/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            PDF
          </span>
        </div>

        <div>
          <p className="font-heading text-lg font-semibold">resume.pdf</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Full resume: experience, skills, certifications, and projects.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href="/resume.pdf" download>
              Download Resume <Download className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Open in New Tab <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </ScrollReveal>
  );
}
