"use client";

import { Quote } from "lucide-react";
import { featuredProject } from "@/data/projects";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { blurReveal } from "@/animations/variants";

export function TestimonialTeaser() {
  const testimonial = featuredProject.testimonial;
  if (!testimonial) return null;

  return (
    <section className="section">
      <ScrollReveal variants={blurReveal}>
        <div className="glass-card relative mx-auto max-w-3xl overflow-hidden p-8 text-center sm:p-12">
          <Quote className="mx-auto h-8 w-8 text-primary/50" />
          <p className="mt-6 font-heading text-xl leading-relaxed sm:text-2xl">
            &ldquo;{testimonial.quoteTranslation}&rdquo;
          </p>
          <p className="mt-4 text-sm italic text-muted-foreground">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="mt-6">
            <p className="font-medium text-foreground">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
