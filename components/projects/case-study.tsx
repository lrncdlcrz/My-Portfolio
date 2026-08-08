"use client";

import { CheckCircle2, Users2, Layers, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { elderCareLinkTech } from "@/data/tech-catalog";
import { stackIconKeys } from "@/data/showcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComingSoonButton } from "@/components/projects/coming-soon-button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { FadeImage } from "@/components/shared/fade-image";
import { BrowserFrame } from "@/components/projects/browser-frame";
import { TechIcon } from "@/components/tech-stack/tech-icon";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  scaleIn,
  blurReveal,
} from "@/animations/variants";

function SectionEyebrow({
  number,
  label,
  icon,
}: {
  number: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-heading text-sm font-semibold text-foreground/60">{number}</span>
      <span aria-hidden className="h-px w-8 bg-foreground/25" />
      {icon}
      <h2 className="font-heading text-2xl font-semibold">{label}</h2>
    </div>
  );
}

/**
 * One numbered case study. Every project on /projects renders through this, so
 * Elder-Care Link, Kepler, and Eclaire stay structurally consistent; sections
 * with no data for a given project are simply skipped and the numbering
 * closes up behind them.
 */
export function CaseStudy({ project, eyebrow }: { project: Project; eyebrow: string }) {
  // Running section counter, so a project without Objectives doesn't leave a
  // gap in the sequence.
  let step = 0;
  const next = () => String(++step).padStart(2, "0");

  // Elder-Care Link has curated catalog entries with real logos; the newer
  // builds map their stack labels onto the same icon registry.
  const catalogTech = project.slug === "elder-care-link" ? elderCareLinkTech : null;

  return (
    <section id={project.slug} className="section scroll-mt-32">
      <ScrollReveal>
        <p className="eyebrow">{eyebrow}</p>
      </ScrollReveal>

      {/* Header */}
      <ScrollReveal variants={blurReveal} delay={0.1} className="mt-6">
        <div className="border-gradient relative overflow-hidden rounded-3xl bg-foreground/[0.03] p-6 sm:p-10">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-mono-gradient opacity-[0.08] blur-3xl"
          />
          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            {project.logoImage && (
              <div className="project-media relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-foreground/5 shadow-glow-lg sm:h-40 sm:w-40">
                <FadeImage
                  src={project.logoImage}
                  alt={`${project.title} logo`}
                  fill
                  sizes="160px"
                  priority
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
                  <Users2 className="h-4 w-4" aria-hidden />
                  {project.teamName}: {project.team.join(", ")}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.liveDemo ? (
                  <Button asChild size="sm">
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Visit Live Site <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                  </Button>
                ) : (
                  <ComingSoonButton label="Live Demo" />
                )}
                {project.links.github ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={project.links.github} target="_blank" rel="noreferrer noopener">
                      GitHub <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                  </Button>
                ) : (
                  <ComingSoonButton label="GitHub" />
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Screenshot gallery */}
      {project.images.length > 0 && (
        <ScrollReveal
          variants={staggerContainer(0.12)}
          className="mt-10 grid gap-6 sm:grid-cols-2"
        >
          {project.images.map((src, index) => (
            <motion.div key={src} variants={scaleIn}>
              <BrowserFrame
                src={src}
                alt={`${project.title} interface, view ${index + 1}`}
                label={project.title}
                sizes="(min-width: 640px) 560px, 100vw"
              />
            </motion.div>
          ))}
        </ScrollReveal>
      )}

      {/* Problem / Solution */}
      {(project.problem || project.solution) && (
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {project.problem && (
            <ScrollReveal variants={fadeRight} className="glass-card p-8">
              <SectionEyebrow number={next()} label="The Problem" />
              <p className="mt-4 text-muted-foreground">{project.problem}</p>
            </ScrollReveal>
          )}
          {project.solution && (
            <ScrollReveal variants={fadeLeft} delay={0.1} className="glass-card p-8">
              <SectionEyebrow number={next()} label="The Solution" />
              <p className="mt-4 text-muted-foreground">{project.solution}</p>
            </ScrollReveal>
          )}
        </div>
      )}

      {/* Objectives */}
      {project.objectives && (
        <div className="mt-20">
          <ScrollReveal>
            <SectionEyebrow number={next()} label="Objectives" />
          </ScrollReveal>
          <ScrollReveal
            variants={staggerContainer(0.08)}
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            {project.objectives.map((objective) => (
              <motion.div
                key={objective}
                variants={fadeLeft}
                className="flex items-start gap-3 rounded-xl border border-border bg-foreground/[0.02] p-4"
              >
                <CheckCircle2
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 text-foreground/60"
                />
                <p className="text-sm text-muted-foreground">{objective}</p>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      )}

      {/* Features */}
      <div className="mt-20">
        <ScrollReveal>
          <SectionEyebrow number={next()} label="Key Features" />
        </ScrollReveal>
        <ScrollReveal variants={staggerContainer(0.1)} className="mt-6 grid gap-5 sm:grid-cols-2">
          {project.features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="glass-card p-6 transition-shadow hover:shadow-glow"
            >
              <h3 className="font-heading font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </ScrollReveal>
      </div>

      {/* Tech stack */}
      <div className="mt-20">
        <ScrollReveal>
          <SectionEyebrow number={next()} label="Technology Stack" />
        </ScrollReveal>
        <ScrollReveal
          variants={staggerContainer(0.05)}
          className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7"
        >
          {(catalogTech
            ? catalogTech.map((t) => ({ key: t.id, name: t.name, iconKey: t.iconKey }))
            : project.techStack.map((label) => ({
                key: label,
                name: label,
                iconKey: stackIconKeys[label],
              }))
          ).map((tech) => (
            <motion.div
              key={tech.key}
              variants={scaleIn}
              title={tech.name}
              data-cursor-hover
              className="group glass flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors hover:border-foreground/70"
            >
              {tech.iconKey && <TechIcon iconKey={tech.iconKey} className="h-7 w-7" />}
              <span className="text-[11px] leading-tight text-muted-foreground">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </ScrollReveal>
      </div>

      {/* Timeline */}
      {project.timeline && (
        <div className="mt-20">
          <ScrollReveal>
            <SectionEyebrow
              number={next()}
              label="Project Timeline"
              icon={<Layers className="h-5 w-5 text-foreground/60" aria-hidden />}
            />
          </ScrollReveal>

          {project.timelineImage && (
            <ScrollReveal
              variants={scaleIn}
              delay={0.1}
              className="project-media mt-6 overflow-hidden rounded-2xl border border-border"
            >
              <FadeImage
                src={project.timelineImage}
                alt={`${project.title} project Gantt timeline`}
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
                <p className="text-xs uppercase tracking-widest text-foreground/60">
                  {phase.period}
                </p>
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
        <ScrollReveal className="mt-20 glass-card p-8 text-center">
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
        <ScrollReveal variants={blurReveal} className="mt-20 glass-card p-8 text-center sm:p-12">
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
        <ScrollReveal className="mt-20 rounded-2xl border border-border bg-foreground/[0.04] p-6 sm:p-8">
          <h2 className="font-heading text-lg font-semibold text-foreground">My Role</h2>
          <p className="mt-2 text-muted-foreground">{project.role}</p>
        </ScrollReveal>
      )}
    </section>
  );
}
