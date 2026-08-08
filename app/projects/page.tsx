import type { Metadata } from "next";
import { CaseStudy } from "@/components/projects/case-study";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { caseStudyProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies for Elder-Care Link, a QR-integrated emergency SMS and medical history system, Kepler, a motion-heavy AI operations landing page, and Eclaire, a scroll-driven single-origin coffee brand site.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="section pb-0 text-center">
        <ScrollReveal>
          <p className="eyebrow">Selected Work</p>
          <h1 className="mx-auto mt-3 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
            Projects built to solve real problems.
          </h1>
        </ScrollReveal>
      </section>

      {caseStudyProjects.map((project) => (
        <CaseStudy
          key={project.slug}
          project={project}
          eyebrow={
            project.slug === "elder-care-link"
              ? "Featured Case Study"
              : "Case Study · Practice Build"
          }
        />
      ))}

      <ProjectsGrid />
    </main>
  );
}
