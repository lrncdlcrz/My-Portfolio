"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { ProfileRing } from "@/components/hero/profile-ring";
import { TechMarquee } from "@/components/hero/tech-marquee";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { heroRoles } from "@/constants/site";
import { EASE_OUT } from "@/animations/variants";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const role = useTypingEffect(heroRoles, { disabled: reducedMotion });

  return (
    <section className="section flex flex-col items-center pb-16 pt-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <ProfileRing />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: EASE_OUT }}
        className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground"
      >
        Batangas City, Philippines &middot; Open for Work
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE_OUT }}
        className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
      >
        Hi, I&apos;m <span className="text-gradient">Laurence</span>.
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.45, duration: 0.7, ease: EASE_OUT }}
        className="mt-2 flex min-h-[1.4em] max-w-4xl items-baseline justify-center font-heading text-3xl font-semibold leading-tight text-foreground/90 sm:text-4xl lg:text-5xl"
      >
        Aspiring&nbsp;<span className="text-gradient">{role}</span>
        <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-primary align-middle" />
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: EASE_OUT }}
        className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground"
      >
        I design, develop, and deploy modern web applications with beautiful user
        experiences and scalable backend architectures.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.6, ease: EASE_OUT }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Button asChild size="lg">
          <Link href="/projects">
            View Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="/resume.pdf" download>
            Download Resume <Download className="h-4 w-4" />
          </a>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/contact">
            Let&apos;s Talk <MessageCircle className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-16 w-full max-w-3xl"
      >
        <TechMarquee />
      </motion.div>
    </section>
  );
}
