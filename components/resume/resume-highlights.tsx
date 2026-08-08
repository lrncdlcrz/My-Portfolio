"use client";

import { motion } from "framer-motion";
import { professionalSummary, resumeHighlights } from "@/data/resume-highlights";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { staggerContainer, scaleIn, fadeRight } from "@/animations/variants";

export function ResumeHighlights() {
  return (
    <ScrollReveal variants={fadeRight} className="glass-card p-8">
      <p className="eyebrow">
        Professional Summary
      </p>
      <p className="mt-4 text-muted-foreground">{professionalSummary}</p>

      <p className="mb-3 mt-8 text-xs uppercase tracking-widest text-muted-foreground">
        Core Highlights
      </p>
      <motion.div
        variants={staggerContainer(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {resumeHighlights.map((item) => (
          <motion.span key={item} variants={scaleIn}>
            <Badge className="px-3 py-1.5">{item}</Badge>
          </motion.span>
        ))}
      </motion.div>
    </ScrollReveal>
  );
}
