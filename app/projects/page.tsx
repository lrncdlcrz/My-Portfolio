import type { Metadata } from "next";
import { ElderCareCaseStudy } from "@/components/projects/elder-care-case-study";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured work including Elder-Care Link, a QR-integrated emergency SMS and medical history system, and UB Universal Knowledge.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="section pb-0 text-center">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Selected Work
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
            Projects built to solve real problems.
          </h1>
        </ScrollReveal>
      </section>
      <ElderCareCaseStudy />
      <ProjectsGrid />
    </main>
  );
}
