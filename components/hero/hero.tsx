"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { WireframeDottedGlobe } from "@/components/ui/wireframe-dotted-globe";
import { TechMarquee } from "@/components/hero/tech-marquee";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { heroRoles } from "@/constants/site";
import { EASE_OUT } from "@/animations/variants";

/** Hoisted so the globe never sees a new object identity on re-render. */
const HOME_CENTER: [number, number] = [121.06, 13.76];
const HOME_MARKER = { lng: 121.06, lat: 13.76, label: "Batangas City" };

export function Hero() {
  const reducedMotion = useReducedMotion();
  const role = useTypingEffect(heroRoles, { disabled: reducedMotion });

  return (
    <section className="section pb-12 pt-8 lg:pb-16">
      {/*
        Two columns on desktop: copy left, 3D form right. The previous layout
        stacked a 384px portrait above centred copy, which made the hero 957px
        tall, pushed the CTAs to the fold, and left wide empty gutters.
      */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT }}
            className="eyebrow"
          >
            Batangas City, Philippines &middot; Open for Work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.7, ease: EASE_OUT }}
            className="mt-5 font-heading text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-gradient">Laurence</span>.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.32, duration: 0.7, ease: EASE_OUT }}
            className="mt-3 flex min-h-[1.4em] flex-wrap items-baseline justify-center font-heading text-2xl font-semibold leading-tight text-foreground/90 sm:text-3xl lg:justify-start lg:text-4xl"
          >
            Aspiring&nbsp;<span className="text-gradient">{role}</span>
            <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-foreground align-middle" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.6, ease: EASE_OUT }}
            className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground lg:mx-0"
          >
            I design, develop, and deploy modern web applications with beautiful user
            experiences and scalable backend architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.6, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Button asChild>
              <Link href="/projects">
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="/resume.pdf" download>
                Download Resume <Download className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contact">
                Let&apos;s Talk <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[23rem] lg:max-w-[27rem]"
        >
          <WireframeDottedGlobe
            center={HOME_CENTER}
            marker={HOME_MARKER}
            spinSpeed={5}
            label="Interactive globe of the world, marked at Batangas City, Philippines. Drag, or use the arrow keys, to rotate it."
          />
          {/* Interaction is not discoverable on its own, so say so quietly. */}
          <p className="pointer-events-none absolute inset-x-0 -bottom-1 text-center font-heading text-[10px] uppercase tracking-[0.28em] text-foreground/45">
            Drag to rotate
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 w-full lg:mt-16"
      >
        <TechMarquee />
      </motion.div>
    </section>
  );
}
