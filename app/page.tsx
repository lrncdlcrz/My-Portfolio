import { Hero } from "@/components/hero/hero";
import { StatsBar } from "@/components/shared/stats-bar";
import { FeaturedProjectTeaser } from "@/components/projects/featured-project-teaser";
import { TestimonialTeaser } from "@/components/shared/testimonial-teaser";
import { FinalCTA } from "@/components/shared/final-cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <FeaturedProjectTeaser />
      <TestimonialTeaser />
      <FinalCTA />
    </main>
  );
}
