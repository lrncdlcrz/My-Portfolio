"use client";

import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { scaleIn } from "@/animations/variants";

export function ResumeViewer() {
  return (
    <ScrollReveal variants={scaleIn}>
      <div className="glass-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5">
          <p className="text-sm text-muted-foreground">resume.pdf</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm" variant="outline">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Open in New Tab <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button asChild size="sm">
              <a href="/resume.pdf" download>
                Download Resume <Download className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="aspect-[8.5/11] w-full bg-white sm:aspect-[8.5/9]">
          <object data="/resume.pdf" type="application/pdf" className="h-full w-full">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center text-muted-foreground">
              <p>Your browser can&apos;t preview PDFs inline.</p>
              <Button asChild>
                <a href="/resume.pdf" download>
                  Download Resume <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </object>
        </div>
      </div>
    </ScrollReveal>
  );
}
