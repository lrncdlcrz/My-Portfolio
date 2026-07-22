"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProject } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { blurReveal } from "@/animations/variants";

export function FeaturedProjectTeaser() {
  return (
    <section className="section">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Featured Work
        </p>
      </ScrollReveal>

      <ScrollReveal variants={blurReveal} delay={0.1}>
        <Link
          href={`/projects#${featuredProject.slug}`}
          data-cursor-hover
          className="group mt-6 block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-primary/40 sm:p-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[220px_1fr]">
            <div className="relative mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-white/5 shadow-glow sm:h-48 sm:w-48">
              {featuredProject.logoImage && (
                <Image
                  src={featuredProject.logoImage}
                  alt={`${featuredProject.title} logo`}
                  fill
                  sizes="192px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>

            <div>
              <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
                {featuredProject.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{featuredProject.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {featuredProject.techStack.slice(0, 6).map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary">
                View Case Study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      <ScrollReveal delay={0.15} className="mt-8 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/projects">See All Projects</Link>
        </Button>
      </ScrollReveal>
    </section>
  );
}
