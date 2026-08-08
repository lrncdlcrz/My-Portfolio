"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, socialLinks } from "@/constants/site";
import { SocialIcon } from "@/components/shared/social-icon";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { fadeRight } from "@/animations/variants";

export function ContactInfo() {
  return (
    <ScrollReveal variants={fadeRight} className="glass-card flex h-full flex-col justify-between p-8">
      <div>
        <p className="eyebrow">
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
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mono-gradient text-background shadow-glow">
              <Mail className="h-4 w-4" />
            </span>
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/[\s-]/g, "")}`}
            data-cursor-hover
            className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mono-gradient text-background shadow-glow">
              <Phone className="h-4 w-4" />
            </span>
            {siteConfig.phone}
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mono-gradient text-background shadow-glow">
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
          {socialLinks.map((social) => (
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
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-foreground/40"
            >
              <SocialIcon iconKey={social.icon} className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
