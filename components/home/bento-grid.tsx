"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, MapPin, Plus, Sparkles, Target } from "lucide-react";
import { SocialIcon } from "@/components/shared/social-icon";
import { AnalogClock, ManilaTimeLabel } from "@/components/home/analog-clock";
import { InteractiveCube } from "@/components/home/interactive-cube";
import { WireframeDottedGlobe } from "@/components/ui/wireframe-dotted-globe";
import { BrowserFrame } from "@/components/projects/browser-frame";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { siteConfig, socialLinks } from "@/constants/site";
import { showcaseBySlug } from "@/data/showcase";
import { staggerContainer, scaleIn } from "@/animations/variants";
import { cn } from "@/lib/utils";

/**
 * Glass surface: the card tone is kept but made translucent and blurred, so
 * the grid lines and drifting particles read faintly through every panel
 * instead of the cards sitting on the background as opaque blocks.
 */
const CARD =
  "relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl";


/** Every profile from the shared config: the two GitHubs, LinkedIn, and all
 *  three hiring platforms. Nothing invented, nothing left out. */
const BENTO_SOCIALS = socialLinks;

/** Hoisted so the globe never sees a new object identity on re-render. */
const HOME_CENTER: [number, number] = [121.06, 13.76];
const HOME_MARKER = { lng: 121.06, lat: 13.76, label: "Batangas City" };

/* ------------------------------------------------------------------ */
/* 1. Identity                                                         */
/* ------------------------------------------------------------------ */

function IdentityCard() {
  return (
    <motion.div variants={scaleIn} className={cn(CARD, "flex flex-col")}>
      <div>
        <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground">
          Laurence <span className="font-normal italic text-foreground/60">Dela Cruz</span>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 font-heading text-[11px] uppercase tracking-[0.18em] text-foreground/60">
          <MapPin className="h-3 w-3" aria-hidden />
          Batangas City, PH &middot; <ManilaTimeLabel />
        </p>
      </div>

      {/* Focal object, sized to fill the middle of the card. */}
      <div className="my-6 flex flex-1 items-center justify-center">
        <div className="aspect-square w-full max-w-[200px]">
          <InteractiveCube />
        </div>
      </div>
      <p className="-mt-2 text-center font-heading text-[10px] uppercase tracking-[0.24em] text-foreground/40">
        Drag to rotate
      </p>

      <div className="mt-auto border-t border-border pt-4">
        {/*
          Uniform chips rather than bare glyphs: Fiverr's mark is a wide
          wordmark, not a square icon, so inline it wrapped onto its own line
          and broke the row. A fixed circle normalises every platform.
        */}
        <div className="flex flex-wrap items-center gap-2">
          {BENTO_SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label}
              title={social.label}
              data-cursor-hover
              className="group flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <SocialIcon
                iconKey={social.icon}
                className="h-[15px] w-[15px] max-w-[15px] object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Clock                                                            */
/* ------------------------------------------------------------------ */

function ClockCard() {
  return (
    <motion.div
      variants={scaleIn}
      className={cn(CARD, "hidden flex-col items-center justify-center gap-4 sm:flex lg:hidden")}
    >
      <AnalogClock className="h-32 w-32" />
      <div className="text-center">
        <p className="eyebrow">Local time</p>
        <p className="mt-1.5 font-heading text-sm text-muted-foreground">
          Asia/Manila &middot; UTC+8
        </p>
      </div>
    </motion.div>
  );
}

function FloatingClock() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      {/*
        No backdrop of its own: the gap around the dial is a real hole masked
        out of the two card rows (see CLOCK_CUTOUT), so the page background,
        grid lines and particles all show through it.
      */}
      <div className="flex h-[212px] w-[212px] items-center justify-center xl:h-[240px] xl:w-[240px]">
        <AnalogClock className="h-full w-full" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Philosophy                                                       */
/* ------------------------------------------------------------------ */

const PRINCIPLES = ["Clean Code", "Accessible", "Scalable", "Secure"] as const;
const ACTIVE_PRINCIPLE = "Accessible";

function PhilosophyCard() {
  return (
    <motion.div variants={scaleIn} className={cn(CARD, "flex flex-col")}>
      {/* Header rail: label left, section marker right. */}
      <div className="flex items-start justify-between gap-4">
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-foreground/60">
            <Sparkles className="h-3 w-3" aria-hidden />
          </span>
          <span className="eyebrow">How I work</span>
        </span>
        <span className="flex items-center gap-1.5 font-heading text-[10px] uppercase tracking-[0.24em] text-foreground/45">
          Philosophy
          <Plus className="h-3 w-3" aria-hidden />
        </span>
      </div>

      {/*
        A two-column grid rather than a wrapping flex row. With flex-wrap the
        right-hand column dropped underneath the headline at narrower widths
        and the pills and caption ended up stranded mid-card.
      */}
      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
        <div>
          <h3 className="font-heading text-3xl font-semibold leading-[1.1] text-foreground">
            Code you
            <br />
            <span className="font-normal italic text-foreground/70">can trust.</span>
          </h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Every feature ships tested, accessible, and built to scale, because a
            portfolio piece and production code should hold the same bar.
          </p>
        </div>

        <div className="md:max-w-[15rem] md:text-right">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {PRINCIPLES.map((principle) => {
              const active = principle === ACTIVE_PRINCIPLE;
              return (
                <span
                  key={principle}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {principle}
                </span>
              );
            })}
          </div>
          <p className="mt-4 font-heading text-sm font-semibold text-foreground">
            Accessible by default
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/60">
            Interfaces built for every user, not just the default one.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Availability + contact                                           */
/* ------------------------------------------------------------------ */

function AvailabilityCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions or an insecure origin. The
      // address stays selectable on screen either way, so fail quietly.
    }
  };

  return (
    <motion.div variants={scaleIn} className={cn(CARD, "flex flex-col")}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-foreground/60">
          <Target className="h-3 w-3" aria-hidden />
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
          </span>
          Open for Work
        </span>
      </div>

      <h3 className="mt-6 font-heading text-xl font-semibold uppercase leading-tight tracking-tight text-foreground">
        Let&apos;s build something
      </h3>
      <p className="font-heading text-xl font-normal italic leading-tight text-foreground/70">
        that actually ships.
      </p>

      <div className="mt-6 border-t border-border pt-5">
        <button
          type="button"
          onClick={copyEmail}
          data-cursor-hover
          aria-label={`Copy email address ${siteConfig.email} to clipboard`}
          className="group/copy flex w-full items-center gap-3 text-left"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors group-hover/copy:text-foreground">
            {copied ? (
              <Check className="h-3 w-3" aria-hidden />
            ) : (
              <Copy className="h-3 w-3" aria-hidden />
            )}
          </span>
          <span className="truncate font-heading text-[15px] text-foreground">
            {siteConfig.email}
          </span>
        </button>
        <p className="mt-2 pl-9 font-heading text-[10px] uppercase tracking-[0.22em] text-foreground/45">
          {copied ? "Copied to clipboard" : "Tap to copy email"}
        </p>
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? "Email address copied to clipboard" : ""}
        </span>
      </div>

      <Link
        href="/contact"
        data-cursor-hover
        className="group/cta mt-auto flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-5 py-3 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:border-foreground hover:bg-transparent hover:text-foreground"
      >
        Start a Conversation
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Location + remote availability                                   */
/* ------------------------------------------------------------------ */

const AVAILABILITY_CHIPS = [
  { label: "Remote-Ready", active: true },
  { label: "Freelance", active: false },
  { label: "Internship", active: false },
];

function LocationCard() {
  return (
    <motion.div variants={scaleIn} className={cn(CARD, "overflow-hidden")}>
      <div className="relative z-10">
        <p className="eyebrow">Available remotely</p>
        <h3 className="mt-3 max-w-[15rem] font-heading text-2xl font-semibold leading-tight text-foreground">
          Adaptable across
          <br />
          time zones
        </h3>
      </div>

      {/* Globe bleeds off the bottom-left corner, as in the reference. It is
          interactive, so unlike the rest of the card it accepts pointers. */}
      <div className="absolute -bottom-14 -left-12 h-[300px] w-[300px] sm:-bottom-16 sm:h-[330px] sm:w-[330px]">
        <WireframeDottedGlobe
          center={HOME_CENTER}
          marker={HOME_MARKER}
          spinSpeed={4}
          fill={0.8}
          label="Interactive globe of the world, marked at Batangas City, Philippines. Drag, or use the arrow keys, to rotate it."
        />
      </div>

      <div className="relative z-10 ml-auto mt-8 flex w-fit flex-col items-end gap-2">
        {AVAILABILITY_CHIPS.map((chip) => (
          <span
            key={chip.label}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              chip.active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground",
            )}
          >
            {chip.label}
          </span>
        ))}
      </div>

      <div className="relative z-10 mt-10 text-right">
        <p className="flex items-center justify-end gap-1.5 font-heading text-[10px] uppercase tracking-[0.22em] text-foreground/45">
          <MapPin className="h-3 w-3" aria-hidden />
          Based in
        </p>
        <p className="mt-1 font-heading text-sm font-semibold text-foreground">
          Batangas City, PH
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Signature project                                                */
/* ------------------------------------------------------------------ */

function SignatureProjectCard() {
  const project = showcaseBySlug["elder-care-link"];

  return (
    <motion.div variants={scaleIn} className={cn(CARD, "p-0")}>
      <Link
        href="/projects#elder-care-link"
        data-cursor-hover
        className="group flex h-full flex-col p-6 transition-colors hover:bg-muted/40"
      >
        <div className="text-right">
          <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground">
            Building{" "}
            <span className="bg-mono-gradient bg-clip-text text-transparent">
              Elder-Care Link
            </span>
          </h3>
          <p className="mt-1.5 font-heading text-xs italic text-foreground/60">
            &lt; QR-Integrated Emergency SMS &amp; Medical History System /&gt;
          </p>
        </div>

        <span className="mt-5 flex items-center justify-end gap-2 font-heading text-[10px] uppercase tracking-[0.22em] text-foreground/45">
          View case study
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>

        {/*
          Real product screenshots as an overlapping stack anchored to the
          bottom edge. Like the reference's phone mockups they run past the
          card and are clipped by it, which reads as depth rather than as a
          cropping mistake.
        */}
        <div className="relative mt-6 min-h-[130px] flex-1">
          <div className="absolute inset-x-0 -bottom-10 flex items-end justify-center gap-4 transition-transform duration-500 group-hover:-translate-y-2">
            <BrowserFrame
              src={project.media[1].src}
              alt={project.media[1].alt}
              className="w-[38%] rotate-[-5deg]"
              sizes="220px"
            />
            <BrowserFrame
              src={project.media[0].src}
              alt={project.media[0].alt}
              className="w-[48%] rotate-[3deg] shadow-glow"
              sizes="280px"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export function BentoGrid() {
  return (
    <ScrollReveal variants={staggerContainer(0.08)} className="section py-8 sm:py-10">
      {/*
        Reference mosaic:
          row 1  identity (3) | philosophy (6) | availability (3)
          row 2  location (6) | signature (6)
        with the clock floated over the seam between the rows. Cards adjacent
        to that seam carry extra padding so their content never collides with
        the circle. Below `lg` the clock drops back into the flow and the grid
        collapses to a single column in reading order.
      */}
      <div>
        {/* `bento-row-top` masks a circular hole out of this row's bottom edge
            so the clock sits in real negative space. See globals.css. */}
        <div className="bento-row-top grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <IdentityCard />
          </div>
          {/* `[&>div]` targets the card itself, so it keeps full grid height
              and only its content clears the clock. */}
          <div className="sm:col-span-2 lg:col-span-6 [&>div]:lg:pb-32">
            <PhilosophyCard />
          </div>
          <div className="lg:col-span-3">
            <AvailabilityCard />
          </div>
        </div>

        {/* Zero-height rail sitting exactly on the seam between the rows, so
            the clock stays centred on it however tall either row grows. */}
        <div className="relative z-20 hidden h-0 lg:block">
          <FloatingClock />
        </div>

        <div className="bento-row-bottom mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6 [&>div]:lg:pt-28">
            <LocationCard />
          </div>
          {/* Signature card is `p-0`, so padding goes on its inner link. */}
          <div className="sm:col-span-2 lg:col-span-6 [&>div>a]:lg:pt-28">
            <SignatureProjectCard />
          </div>
          {/* Only rendered below lg; the floating version takes over above. */}
          <div className="sm:col-span-2 lg:hidden">
            <ClockCard />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
