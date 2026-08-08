"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Quote } from "lucide-react";
import { ProjectShowcase, Testimonial } from "@/types";
import { showcaseProjects, stackIconKeys } from "@/data/showcase";
import { TechIcon } from "@/components/tech-stack/tech-icon";
import { BrowserFrame } from "@/components/projects/browser-frame";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_OUT } from "@/animations/variants";
import { cn } from "@/lib/utils";

function StackPills({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {stack.map((tech) => {
        const iconKey = stackIconKeys[tech];
        return (
          <li
            key={tech}
            className="group flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {iconKey && <TechIcon iconKey={iconKey} className="h-3.5 w-3.5" />}
            {tech}
          </li>
        );
      })}
    </ul>
  );
}

function ShowcaseTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur-xl sm:p-10"
    >
      <Quote aria-hidden className="mx-auto h-6 w-6 text-foreground/45" />
      {/* Lead with the translation when there is one, with the speaker's own
          words kept underneath rather than replaced. */}
      <blockquote className="mt-5 font-heading text-lg leading-relaxed text-foreground sm:text-xl">
        &ldquo;{testimonial.quoteTranslation ?? testimonial.quote}&rdquo;
      </blockquote>
      {testimonial.quoteTranslation && (
        <p lang="fil" className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      )}
      <figcaption className="mt-6">
        <span className="block font-medium text-foreground">{testimonial.author}</span>
        <span className="block text-sm text-foreground/60">{testimonial.role}</span>
      </figcaption>
    </motion.figure>
  );
}

function ShowcasePanel({
  project,
  index,
  pinned,
}: {
  project: ProjectShowcase;
  index: number;
  pinned: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const seq = String(index + 1).padStart(2, "0");

  const content = (
    <div className="grid items-center gap-10 xl:grid-cols-2 xl:gap-16">
      {/* Copy */}
      <motion.div
        initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <div className="flex items-center gap-3">
          <p className="eyebrow">
            Seq {seq} &middot; {project.status}
          </p>
          <span aria-hidden className="h-px w-10 bg-foreground/25" />
        </div>

        <h3 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-1.5 font-heading text-base text-foreground/60">{project.tagline}</p>

        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-5 max-w-lg space-y-2.5">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm text-muted-foreground">
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50"
              />
              {bullet}
            </li>
          ))}
        </ul>

        <StackPills stack={project.stack} />

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Link
            href={`/projects#${project.slug}`}
            data-cursor-hover
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            View Case Study
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Live site
              <ExternalLink aria-hidden className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Two framed screenshots, offset so they read as a pair. */}
      <motion.div
        initial={reducedMotion ? undefined : { opacity: 0, y: 36 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
        className="relative"
      >
        <BrowserFrame
          src={project.media[0].src}
          alt={project.media[0].alt}
          label={project.name}
          priority={index === 0}
          className="relative z-10"
        />
        {project.media[1] && (
          <BrowserFrame
            src={project.media[1].src}
            alt={project.media[1].alt}
            className="relative z-20 -mt-8 ml-8 w-[82%] sm:-mt-14 sm:ml-16"
            sizes="(min-width: 1024px) 440px, 80vw"
          />
        )}
      </motion.div>
    </div>
  );

  if (!pinned) {
    return <div className="border-t border-border py-16 first:border-t-0">{content}</div>;
  }

  return (
    // The outer track is what actually scrolls; the inner panel pins to the
    // viewport for its duration, so each project holds the screen while the
    // next scrolls up behind it.
    //
    // Track height is deliberately modest: at 190vh each panel held for ~90vh
    // of scrolling, which read as the page being stuck. 132vh gives roughly a
    // third of a screen of hold per project - enough to register the pin,
    // short enough that scrolling still feels like it is going somewhere.
    //
    // Pinning starts at `xl`, not `lg`: between 1024px and 1280px the
    // two-column split is too narrow and the copy wraps awkwardly, so those
    // widths get ordinary stacked sections instead.
    <div className="xl:h-[132vh]">
      <div className="xl:sticky xl:top-0 xl:flex xl:min-h-screen xl:items-center">
        <div
          className={cn(
            "w-full border-t border-border py-16 first:border-t-0",
            // No panel background needed: tracks are sequential, so panels
            // never overlap and an opaque card edge only adds visual noise.
            "xl:border-t-0 xl:py-12",
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export function ShowcaseSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section py-16 lg:py-20" aria-labelledby="showcase-heading">
      <p className="eyebrow">Showcase</p>
      <h2
        id="showcase-heading"
        className="mt-3 max-w-2xl font-heading text-3xl font-semibold text-foreground sm:text-4xl"
      >
        Three builds, start to finish.
      </h2>

      <div className="mt-12">
        {showcaseProjects.map((project, index) => (
          <div key={project.slug}>
            <ShowcasePanel
              project={project}
              index={index}
              // Under reduced motion the pin is dropped entirely and the panels
              // become ordinary stacked sections.
              pinned={!reducedMotion}
            />
            {/* Sits outside the pinned track so it scrolls in normally
                directly beneath the project it belongs to. */}
            {project.testimonial && (
              <ShowcaseTestimonial testimonial={project.testimonial} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
