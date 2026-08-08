"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { legalLinks, navLinks, siteConfig, socialLinks } from "@/constants/site";
import { SocialIcon } from "@/components/shared/social-icon";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="section grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="font-heading text-xl font-semibold tracking-tight">
            Laurence<span className="text-gradient">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
            <a
              href={`mailto:${siteConfig.email}`}
              data-cursor-hover
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" /> {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/[\s-]/g, "")}`}
              data-cursor-hover
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4" /> {siteConfig.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {siteConfig.location}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor-hover
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Legal
          </h3>
          <ul className="mt-4 space-y-2.5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor-hover
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Elsewhere
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <motion.a
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
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-px w-full bg-mono-gradient opacity-40" />

      <div className="section flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p>Designed &amp; developed by Laurence Andrei C. Dela Cruz</p>
      </div>
    </footer>
  );
}
