"use client";

import { GraduationCap, MapPin, CalendarClock, Sparkles } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { staggerContainer, scaleIn } from "@/animations/variants";
import { motion } from "framer-motion";

const facts = [
  { icon: GraduationCap, label: "University", value: siteConfig.university },
  { icon: Sparkles, label: "Course", value: "BS Information Technology" },
  { icon: CalendarClock, label: "Status", value: siteConfig.status },
  { icon: MapPin, label: "Location", value: siteConfig.location },
];

export function QuickFacts() {
  return (
    <ScrollReveal
      variants={staggerContainer(0.1)}
      className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {facts.map((fact) => (
        <motion.div
          key={fact.label}
          variants={scaleIn}
          className="glass-card flex items-center gap-4 p-5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aurora-gradient text-white shadow-glow">
            <fact.icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {fact.label}
            </p>
            <p className="font-medium text-foreground">{fact.value}</p>
          </div>
        </motion.div>
      ))}
    </ScrollReveal>
  );
}
