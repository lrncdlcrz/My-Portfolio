import type { Metadata } from "next";
import { Story } from "@/components/about/story";
import { Timeline } from "@/components/experience/timeline";
import { SkillsGrid } from "@/components/skills/skills-grid";

export const metadata: Metadata = {
  title: "About",
  description:
    "BS Information Technology student at the University of Batangas, building modern web applications and exploring cloud computing and cybersecurity.",
};

export default function AboutPage() {
  return (
    <main>
      <Story />
      <Timeline />
      <SkillsGrid />
    </main>
  );
}
