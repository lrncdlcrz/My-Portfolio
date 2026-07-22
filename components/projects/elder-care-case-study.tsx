"use client";

import Image from "next/image";
import { CheckCircle2, Users2, Layers } from "lucide-react";
import { featuredProject } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ComingSoonButton } from "@/components/projects/coming-soon-button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { fadeLeft, fadeRight, staggerContainer, scaleIn, blurReveal } from "@/animations/variants";
import { motion } from "framer-motion";

export function ElderCareCaseStudy() {
  const project = featuredProject;

  return (
    <section id={project.slug} className="section scroll-mt-32">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Featured Case Study
        </p>
      </ScrollReveal>

      <ScrollReveal variants={blurReveal} delay={0.1} className="mt-4">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {project.logoImage && (
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-white/5 shadow-glow">
              <Image
                src={project.logoImage}
                alt={`${project.title} logo`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
                {project.title}
              </h1>
              <Badge>{project.status}</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-muted-foreground">{project.tagline}</p>
            {project.teamName && project.team && (
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Users2 className="h-4 w-4" />
                {project.teamName}: {project.team.join(", ")}
              </p>
            )}
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-6 flex flex-wrap gap-3">
        <ComingSoonButton label="GitHub" />
        <ComingSoonButton label="Live Demo" />
      </div>

      {/* Problem / Solution */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <ScrollReveal variants={fadeRight} className="glass-card p-8">
          <h2 className="font-heading text-xl font-semibold text-destructive">The Problem</h2>
          <p className="mt-4 text-muted-foreground">{project.problem}</p>
        </ScrollReveal>
        <ScrollReveal variants={fadeLeft} delay={0.1} className="glass-card p-8">
          <h2 className="font-heading text-xl font-semibold text-primary">The Solution</h2>
          <p className="mt-4 text-muted-foreground">{project.solution}</p>
        </ScrollReveal>
      </div>

      {/* Objectives */}
      {project.objectives && (
        <div className="mt-16">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-semibold">Objectives</h2>
          </ScrollReveal>
          <ScrollReveal
            variants={staggerContainer(0.08)}
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            {project.objectives.map((objective) => (
              <motion.div
                key={objective}
                variants={fadeLeft}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">{objective}</p>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      )}

      {/* Features */}
      <div className="mt-16">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-semibold">Key Features</h2>
        </ScrollReveal>
        <ScrollReveal variants={staggerContainer(0.1)} className="mt-6 grid gap-5 sm:grid-cols-2">
          {project.features.map((feature) => (
            <motion.div key={feature.title} variants={scaleIn} className="glass-card p-6">
              <h3 className="font-heading font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </ScrollReveal>
      </div>

      {/* Tech stack */}
      <div className="mt-16">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-semibold">Technology Stack</h2>
        </ScrollReveal>
        <ScrollReveal
          variants={staggerContainer(0.06)}
          className="mt-5 flex flex-wrap gap-3"
        >
          {project.techStack.map((tech) => (
            <motion.span key={tech} variants={scaleIn}>
              <Badge className="px-4 py-2 text-sm">{tech}</Badge>
            </motion.span>
          ))}
        </ScrollReveal>
      </div>

      {/* Architecture / Timeline image + phases */}
      {project.timeline && (
        <div className="mt-16">
          <ScrollReveal>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-2xl font-semibold">Project Timeline</h2>
            </div>
          </ScrollReveal>

          {project.timelineImage && (
            <ScrollReveal variants={scaleIn} delay={0.1} className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={project.timelineImage}
                alt="Elder-Care Link project Gantt timeline"
                width={1920}
                height={1080}
                sizes="(min-width: 1024px) 900px, 100vw"
                className="w-full"
              />
            </ScrollReveal>
          )}

          <ScrollReveal
            variants={staggerContainer(0.1)}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {project.timeline.map((phase) => (
              <motion.div key={phase.label} variants={fadeLeft} className="glass-card p-5">
                <p className="text-xs uppercase tracking-widest text-primary">{phase.period}</p>
                <h3 className="mt-2 font-heading font-semibold">{phase.label}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {phase.details.map((detail) => (
                    <li key={detail}>&bull; {detail}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      )}

      {/* Beneficiaries */}
      {project.beneficiaries && (
        <ScrollReveal className="mt-16 glass-card p-8 text-center">
          <h2 className="font-heading text-xl font-semibold">Who This Helps</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {project.beneficiaries.map((b) => (
              <Badge key={b} variant="accent">
                {b}
              </Badge>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <ScrollReveal variants={blurReveal} className="mt-16 glass-card p-8 text-center sm:p-12">
          <p className="font-heading text-xl leading-relaxed sm:text-2xl">
            &ldquo;{project.testimonial.quoteTranslation}&rdquo;
          </p>
          <p className="mt-4 text-sm italic text-muted-foreground">
            &ldquo;{project.testimonial.quote}&rdquo;
          </p>
          <div className="mt-6">
            <p className="font-medium">{project.testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
          </div>
        </ScrollReveal>
      )}

      {/* Role */}
      {project.role && (
        <ScrollReveal className="mt-16 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 sm:p-8">
          <h2 className="font-heading text-lg font-semibold text-primary">My Role</h2>
          <p className="mt-2 text-muted-foreground">{project.role}</p>
        </ScrollReveal>
      )}
    </section>
  );
}
