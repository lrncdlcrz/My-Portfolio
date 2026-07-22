import { StatItem } from "@/types";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";
import { skillCategories } from "@/data/skills";

const technologyCount = new Set(skillCategories.flatMap((c) => c.skills.map((s) => s.name))).size;

export const stats: StatItem[] = [
  { label: "Projects Built", value: projects.length },
  { label: "Certifications Earned", value: certificates.length },
  { label: "Technologies", value: technologyCount, suffix: "+" },
  { label: "Years Learning", value: 3, suffix: "+" },
];
