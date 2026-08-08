import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

/** Shared shell so /privacy and /terms stay typographically identical. */
export function LegalLayout({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="section max-w-3xl">
      <ScrollReveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{intro}</p>
        <p className="mt-4 font-heading text-xs uppercase tracking-[0.2em] text-foreground/45">
          Last updated {updated}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-12 space-y-10 border-t border-border pt-10">{children}</div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <Link
          href="/"
          data-cursor-hover
          className="mt-16 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
      </ScrollReveal>
    </main>
  );
}

export function LegalSection({
  number,
  heading,
  children,
}: {
  number: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="font-heading text-sm font-semibold text-foreground/45">
          {number}
        </span>
        <span aria-hidden className="h-px w-8 bg-foreground/25" />
        <h2 className="font-heading text-xl font-semibold">{heading}</h2>
      </div>
      <div className="mt-4 space-y-3 text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_li]:leading-relaxed [&_p]:leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
