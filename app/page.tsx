import { Hero } from "@/components/hero/hero";
import { BentoGrid } from "@/components/home/bento-grid";
import { StatsBar } from "@/components/shared/stats-bar";
import { ShowcaseSection } from "@/components/projects/showcase-section";
import { FinalCTA } from "@/components/shared/final-cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BentoGrid />
      <StatsBar />
      {/* Mr. Sandiwa's testimonial now renders inside ShowcaseSection, directly
          beneath the Elder-Care Link panel it refers to. */}
      <ShowcaseSection />
      <FinalCTA />
    </main>
  );
}
