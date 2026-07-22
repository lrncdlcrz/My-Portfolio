"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { scaleIn } from "@/animations/variants";

export function ResumeViewer() {
  const [loaded, setLoaded] = useState(false);

  // Some browsers load the PDF fine but never fire the iframe's load event
  // (the native PDF viewer doesn't always bubble it) -- fall back to just
  // clearing the spinner after a short delay so it never gets stuck.
  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

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
        <div className="relative aspect-[8.5/11] w-full bg-white sm:aspect-[8.5/9]">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm">Loading preview...</p>
            </div>
          )}
          <iframe
            src="/resume.pdf#toolbar=0"
            title="Resume preview"
            className="h-full w-full border-0"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <p className="border-t border-white/10 p-4 text-center text-xs text-muted-foreground">
          Preview not showing?{" "}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="underline">
            Open it directly
          </a>{" "}
          instead.
        </p>
      </div>
    </ScrollReveal>
  );
}
