"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { navLinks } from "@/constants/site";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { direction, scrolled } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: direction === "down" && scrolled && !mobileOpen ? -100 : 0,
        opacity: 1,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "glass flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-shadow sm:px-5",
            scrolled && "shadow-glass",
          )}
        >
          <Link
            href="/"
            data-cursor-hover
            className="font-heading text-lg font-semibold tracking-tight"
          >
            Laurence<span className="text-gradient">.</span>
          </Link>

          {/* `whitespace-nowrap` is the important bit: without it "Tech Stack"
              breaks onto two lines and pushes the whole bar taller. */}
          <nav className="hidden items-center gap-0.5 md:flex lg:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground lg:px-3.5",
                  isActive(link.href) && "text-foreground",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-1 h-px bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-cursor-hover
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              title="Search this site"
              className="hidden h-9 items-center gap-2 rounded-full border border-border px-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground lg:flex"
              aria-label="Search this site"
            >
              <Search className="h-3.5 w-3.5" aria-hidden />
              <span>Search</span>
            </button>
            <ThemeToggle />
            <Button asChild size="sm" className="hidden md:inline-flex" magnetic>
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="glass flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-2 overflow-hidden rounded-2xl md:hidden"
            >
              <div className="flex flex-col p-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground",
                      isActive(link.href) && "bg-foreground/[0.06] text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 rounded-xl bg-mono-gradient px-4 py-3 text-center text-sm font-medium text-background"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
