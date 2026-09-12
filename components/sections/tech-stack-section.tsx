import { TechStackDashboard } from "@/components/tech-stack/tech-stack-dashboard";
import { ProjectTechShowcase } from "@/components/tech-stack/project-tech-showcase";
import { BuiltWith } from "@/components/tech-stack/built-with";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  elderCareLinkTech,
  ubUniversalKnowledgeTech,
  keplerTech,
  eclaireTech,
} from "@/data/tech-catalog";

/**
 * Formerly the /tech-stack page. The TechStats tiles that sat under the
 * heading were dropped in the move: the homepage stat bar already shows the
 * same counts, and the tiles carried a hardcoded "Major Projects: 2".
 */
export function TechStackSection() {
  return (
    <>
      <section className="section pb-0 text-center">
        <ScrollReveal>
          <p className="eyebrow">
            Technology Dashboard
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every language, framework, and tool I actually use: searchable, filterable, and
            tied back to the real projects they were used on.
          </p>
        </ScrollReveal>
      </section>

      <section className="section">
        <TechStackDashboard />
      </section>

      <section className="section">
        <ScrollReveal className="text-center">
          <p className="eyebrow">
            In Practice
          </p>
          <h3 className="mx-auto mt-3 max-w-xl font-heading text-3xl font-semibold sm:text-4xl">
            Technology by Project
          </h3>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          <ProjectTechShowcase
            title="Elder-Care Link"
            tagline="QR-Integrated Emergency SMS & Medical History System"
            roles={["Full Stack", "Frontend", "Backend", "UI/UX", "Database"]}
            tech={elderCareLinkTech}
          />
          <ProjectTechShowcase
            title="Kepler"
            tagline="Mission control for your operations, a motion-heavy AI ops landing page"
            roles={["Frontend", "3D / WebGL", "Motion", "UI/UX"]}
            tech={keplerTech}
          />
          <ProjectTechShowcase
            title="Eclaire Coffee Shop"
            tagline="A scroll-driven, farm-to-cup single-origin brand site"
            roles={["Frontend", "Motion", "Asset Pipeline"]}
            tech={eclaireTech}
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
    </>
  );
}
