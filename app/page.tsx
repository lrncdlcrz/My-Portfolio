import { Hero } from "@/components/hero/hero";
import { BentoGrid } from "@/components/home/bento-grid";
import { StatsBar } from "@/components/shared/stats-bar";
import { Story } from "@/components/about/story";
import { Timeline } from "@/components/experience/timeline";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { ShowcaseSection } from "@/components/projects/showcase-section";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import { ResumeSection } from "@/components/sections/resume-section";
import { ContactSection } from "@/components/sections/contact-section";

/**
 * The whole portfolio on one page. Each wrapper id matches a navLinks anchor in
 * constants/site.ts; the old routes redirect here from next.config.ts.
 *
 * `scroll-mt-12` clears the fixed header when a nav link lands on a section.
 * Home uses a larger margin so jumping to it always settles at the very top.
 */
export default function HomePage() {
  return (
    <main>
      <div id="home" className="scroll-mt-32">
        <Hero />
        <BentoGrid />
        <StatsBar />
      </div>

      {/* Straight after Home so visitors reach the work first. */}
      <div id="projects" className="scroll-mt-12">
        {/* Mr. Sandiwa's testimonial renders inside ShowcaseSection, directly
            beneath the Elder-Care Link panel it refers to. The full case
            studies open from each panel's "View Case Study". */}
        <ShowcaseSection />
        <ProjectsGrid />
      </div>

      <div id="about" className="scroll-mt-12">
        <Story />
        <Timeline />
      </div>

      <div id="tech-stack" className="scroll-mt-12">
        <TechStackSection />
      </div>

      <div id="certificates" className="scroll-mt-12">
        <CertificateGallery />
      </div>

      <div id="resume" className="scroll-mt-12">
        <ResumeSection />
      </div>

      <div id="contact" className="scroll-mt-12">
        <ContactSection />
      </div>
    </main>
  );
}
