export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: Skill[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
  description: string;
  verifyUrl?: string;
  certificatePdf?: string;
  date?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface TimelinePhase {
  label: string;
  period: string;
  details: string[];
}

export interface Testimonial {
  quote: string;
  quoteTranslation?: string;
  author: string;
  role: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  /** Renders as a full numbered case study rather than a card in the grid. */
  caseStudy?: boolean;
  category: "Web App" | "Game" | "Practice" | "Marketing Site";
  status: "Coming Soon" | "In Progress" | "Completed" | "Practice Build";
  team?: string[];
  teamName?: string;
  role: string;
  problem?: string;
  solution?: string;
  objectives?: string[];
  features: ProjectFeature[];
  techStack: string[];
  beneficiaries?: string[];
  timeline?: TimelinePhase[];
  timelineImage?: string;
  logoImage?: string;
  images: string[];
  testimonial?: Testimonial;
  links: {
    github?: string;
    liveDemo?: string;
    caseStudy?: string;
  };
}

/**
 * Single source of truth for the projects that appear BOTH in the homepage
 * pinned showcase and as full case studies on /projects. The practice-project
 * grid stays in `Project[]` because it renders differently.
 */
export interface ProjectShowcase {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  stack: string[];
  media: { src: string; alt: string }[];
  liveUrl?: string;
  repoUrl?: string;
  status: "Completed" | "In Progress" | "Practice Build";
  role: string;
  /** Rendered directly beneath this project's showcase panel. */
  testimonial?: Testimonial;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  type: "current" | "future";
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export type TechCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "api"
  | "mobile"
  | "cloud"
  | "uiux"
  | "motion"
  | "vcs"
  | "tools"
  | "engineering"
  | "security";

export interface TechEntry {
  id: string;
  name: string;
  description: string;
  category: TechCategoryId;
  iconKey: string;
  projects?: string[];
}
