import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    description: "Building fast, accessible, and beautiful interfaces.",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    category: "Backend",
    description: "Designing reliable APIs and server-side logic.",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "PHP", icon: "php" },
      { name: "Python", icon: "python" },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    category: "Database",
    description: "Structuring and integrating data that scales.",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "Database Design", icon: "database" },
      { name: "API Integration", icon: "plug" },
    ],
  },
  {
    category: "Cloud & Tools",
    description: "Deploying and versioning with confidence.",
    skills: [
      { name: "AWS", icon: "aws" },
      { name: "IBM Cloud", icon: "ibm" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
  {
    category: "UI/UX",
    description: "Designing experiences before writing a line of code.",
    skills: [
      { name: "Figma", icon: "figma" },
      { name: "Wireframing", icon: "wireframe" },
      { name: "Responsive Design", icon: "responsive" },
      { name: "Accessibility", icon: "accessibility" },
    ],
  },
  {
    category: "Soft Skills",
    description: "What makes the collaboration actually work.",
    skills: [
      { name: "Communication", icon: "message" },
      { name: "Problem Solving", icon: "puzzle" },
      { name: "Teamwork", icon: "users" },
      { name: "Adaptability", icon: "refresh" },
    ],
  },
];
