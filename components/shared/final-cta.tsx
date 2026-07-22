"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { scaleIn } from "@/animations/variants";

export function FinalCTA() {
  return (
    <section className="section">
      <ScrollReveal variants={scaleIn}>
        <div className="border-gradient relative overflow-hidden rounded-3xl bg-white/[0.03] px-8 py-16 text-center sm:px-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Open for Work
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-semibold sm:text-4xl">
            Have a project in mind? Let&apos;s build something great together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Available for freelance projects, remote collaboration, and internship
            opportunities — from a single feature to a full application.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/resume">View Resume</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
