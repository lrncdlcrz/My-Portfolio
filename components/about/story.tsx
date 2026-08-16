"use client";

import Link from "next/link";
import { Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickFacts } from "@/components/about/quick-facts";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { FadeImage } from "@/components/shared/fade-image";
import { fadeRight, blurReveal } from "@/animations/variants";

export function Story() {
  return (
    <section className="section grid gap-14 lg:grid-cols-[380px_1fr] lg:items-start">
      <ScrollReveal variants={fadeRight} className="mx-auto w-full max-w-sm">
        <div className="glass-card relative overflow-hidden p-3">
          <div className="project-media relative aspect-square overflow-hidden rounded-2xl">
            {/* A 3:4 portrait in a square frame, so the crop is anchored
                toward the top to keep the subject rather than centring on
                the wall below. */}
            <FadeImage
              src="/images/about-portrait.jpg"
              alt="Laurence Andrei C. Dela Cruz"
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover object-[50%_28%]"
            />
          </div>
        </div>
      </ScrollReveal>

      <div>
        <ScrollReveal variants={blurReveal}>
          <p className="eyebrow">
            About Me
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Building software with a purpose, not just a portfolio.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-6 space-y-4 text-muted-foreground">
          <p>
            I&apos;m Laurence Andrei C. Dela Cruz, a Bachelor of Science in Information
            Technology student at the University of Batangas, currently heading into my
            incoming 4th year this August. Over the past few years I&apos;ve moved from
            learning the fundamentals to actually shipping working software, from
            capstone systems to small practice builds, and that hands-on process is
            what keeps me hooked on this field.
          </p>
          <p>
            What draws me to development is solving real problems for real people. My
            capstone project, Elder-Care Link, came out of watching how much friction
            senior citizens and health workers deal with in emergencies. That&apos;s the
            kind of problem I want to keep building for: practical, people-facing, and
            genuinely useful.
          </p>
          <p>
            I&apos;m actively exploring freelance work and enjoy the craft side of
            building software as much as the engineering side: clean UI, thoughtful UX,
            and interfaces that feel considered rather than templated. Outside of client
            and coursework, I spend time learning cloud computing, cybersecurity, and
            whatever&apos;s next in the web ecosystem.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-8 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/contact">
              Let&apos;s Talk <MessageCircle className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href="/resume.pdf" download>
              Download Resume <Download className="h-4 w-4" />
            </a>
          </Button>
        </ScrollReveal>

        <QuickFacts />
      </div>
    </section>
  );
}
