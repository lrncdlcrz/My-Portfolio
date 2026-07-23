import type { Metadata } from "next";
import { TechStackDashboard } from "@/components/tech-stack/tech-stack-dashboard";
import { TechStats } from "@/components/tech-stack/tech-stats";
import { ProjectTechShowcase } from "@/components/tech-stack/project-tech-showcase";
import { BuiltWith } from "@/components/tech-stack/built-with";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { elderCareLinkTech, ubUniversalKnowledgeTech } from "@/data/tech-catalog";
import { staggerContainer } from "@/animations/variants";

export const metadata: Metadata = {
  title: "Tech Stack",
  description:
    "An interactive breakdown of every technology, language, and tool Laurence Andrei C. Dela Cruz actually uses, from frontend and backend to cloud, cybersecurity, and software engineering practice.",
  alternates: {
    canonical: "/tech-stack",
  },
};

export default function TechStackPage() {
  return (
    <main>
      <section className="section pb-0 text-center">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Technology Dashboard
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
            Tech Stack
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every language, framework, and tool I actually use: searchable, filterable, and
            tied back to the real projects they were used on.
          </p>
        </ScrollReveal>
      </section>

      <section className="section">
        <ScrollReveal variants={staggerContainer(0.1)}>
          <TechStats />
        </ScrollReveal>
      </section>

      <section className="section">
        <TechStackDashboard />
      </section>

      <section className="section">
        <ScrollReveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            In Practice
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-heading text-3xl font-semibold sm:text-4xl">
            Technology by Project
          </h2>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          <ProjectTechShowcase
            title="Elder-Care Link"
            tagline="QR-Integrated Emergency SMS & Medical History System"
            roles={["Full Stack", "Frontend", "Backend", "UI/UX", "Database"]}
            tech={elderCareLinkTech}
          />
          <ProjectTechShowcase
            title="UB Universal Knowledge"
            tagline="A space-themed educational adventure game"
            roles={["Frontend"]}
            tech={ubUniversalKnowledgeTech}
          />
        </div>
      </section>

      <section className="section">
        <BuiltWith />
      </section>
    </main>
  );
}
