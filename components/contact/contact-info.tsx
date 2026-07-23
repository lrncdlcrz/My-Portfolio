"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, socialLinks } from "@/constants/site";
import { socialIconMap } from "@/lib/social-icons";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { fadeRight } from "@/animations/variants";
import { cn } from "@/lib/utils";

export function ContactInfo() {
  return (
    <ScrollReveal variants={fadeRight} className="glass-card flex h-full flex-col justify-between p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Get In Touch
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
          Let&apos;s build something great together.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Whether it&apos;s a freelance project, an internship, or a full-time role,
          I&apos;m open to hearing about it. I typically reply within a day or two.
        </p>

        <div className="mt-8 space-y-4">
          <a
            href={`mailto:${siteConfig.email}`}
            data-cursor-hover
            className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-aurora-gradient text-white shadow-glow">
              <Mail className="h-4 w-4" />
            </span>
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/[\s-]/g, "")}`}
            data-cursor-hover
            className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-aurora-gradient text-white shadow-glow">
              <Phone className="h-4 w-4" />
            </span>
            {siteConfig.phone}
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-aurora-gradient text-white shadow-glow">
              <MapPin className="h-4 w-4" />
            </span>
            {siteConfig.location}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
          Find me elsewhere
        </p>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social) => {
            const entry = socialIconMap[social.icon];
            const isMonochrome = entry?.color === "currentColor";
            return (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                data-cursor-hover
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-white/30"
              >
                {entry ? (
                  <entry.Icon
                    className={cn("h-5 w-5", isMonochrome && "text-foreground")}
                    style={isMonochrome ? undefined : { color: entry.color }}
                  />
                ) : (
                  social.label[0]
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}
