"use client";

import { motion } from "framer-motion";
import { builtWithStack } from "@/data/tech-catalog";
import { TechIcon } from "@/components/tech-stack/tech-icon";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { staggerContainer, scaleIn } from "@/animations/variants";

export function BuiltWith() {
  return (
    <div>
      <ScrollReveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Under The Hood
        </p>
        <h2 className="mx-auto mt-3 max-w-xl font-heading text-3xl font-semibold sm:text-4xl">
          Built With
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          What actually powers this portfolio, end to end.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {builtWithStack.map((group) => (
          <motion.div key={group.group} variants={scaleIn} className="glass-card p-5">
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              {group.group}
            </p>
            <div className="space-y-3">
              {group.items.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <TechIcon iconKey={item.iconKey} className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
