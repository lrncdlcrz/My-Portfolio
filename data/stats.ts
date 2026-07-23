import { StatItem } from "@/types";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";
import { techCatalog } from "@/data/tech-catalog";

export const stats: StatItem[] = [
  { label: "Projects Built", value: projects.length },
  { label: "Certifications Earned", value: certificates.length },
  { label: "Technologies", value: techCatalog.length, suffix: "+" },
  { label: "Years Learning", value: 3, suffix: "+" },
];
