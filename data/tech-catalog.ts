import { TechCategoryId, TechEntry } from "@/types";

export const techCategoryLabels: Record<TechCategoryId, string> = {
  languages: "Programming Languages",
  frontend: "Frontend Development",
  backend: "Backend Development",
  database: "Database",
  api: "API Integration",
  mobile: "Mobile Development",
  cloud: "Cloud Computing",
  uiux: "UI/UX Design",
  motion: "3D & Motion",
  vcs: "Version Control",
  tools: "Development Tools",
  engineering: "Software Engineering",
  security: "Cybersecurity",
};

export const techCatalog: TechEntry[] = [
  // Programming Languages
  { id: "lang-html5", name: "HTML5", description: "Semantic markup for every interface I build.", category: "languages", iconKey: "html5" },
  { id: "lang-css3", name: "CSS3", description: "Styling, layout, and animation fundamentals.", category: "languages", iconKey: "css3" },
  { id: "lang-js", name: "JavaScript (ES6+)", description: "The language behind every interactive feature.", category: "languages", iconKey: "javascript" },
  { id: "lang-ts", name: "TypeScript", description: "Type-safe JavaScript for larger, safer codebases.", category: "languages", iconKey: "typescript" },
  { id: "lang-php", name: "PHP", description: "Server-side scripting for dynamic web apps.", category: "languages", iconKey: "php" },
  { id: "lang-python", name: "Python", description: "Scripting and backend logic, used on Elder-Care Link.", category: "languages", iconKey: "python" },
  { id: "lang-sql", name: "SQL", description: "Querying and structuring relational data.", category: "languages", iconKey: "sql" },

  // Frontend
  { id: "fe-react", name: "React.js", description: "Component-based UI for every project I ship.", category: "frontend", iconKey: "react" },
  { id: "fe-nextjs", name: "Next.js", description: "The framework powering this portfolio.", category: "frontend", iconKey: "nextjs" },
  { id: "fe-tailwind", name: "Tailwind CSS", description: "Utility-first styling for consistent, fast UI work.", category: "frontend", iconKey: "tailwind" },
  { id: "fe-router", name: "React Router DOM", description: "Client-side routing for single-page React apps.", category: "frontend", iconKey: "reactRouter" },
  { id: "fe-axios", name: "Axios", description: "Promise-based HTTP client for API requests.", category: "frontend", iconKey: "axios" },
  { id: "fe-responsive", name: "Responsive Web Design", description: "Interfaces that hold up on any screen size.", category: "frontend", iconKey: "responsive" },

  // Backend
  { id: "be-node", name: "Node.js", description: "JavaScript runtime for backend services.", category: "backend", iconKey: "nodejs" },
  { id: "be-express", name: "Express.js", description: "Minimal routing and middleware for Node APIs.", category: "backend", iconKey: "express" },
  { id: "be-php", name: "PHP", description: "Backend logic for database-driven web apps.", category: "backend", iconKey: "php" },
  { id: "be-python", name: "Python", description: "Backend scripting used on Elder-Care Link.", category: "backend", iconKey: "python" },
  { id: "be-restapi", name: "REST API Development", description: "Designing and consuming RESTful endpoints.", category: "backend", iconKey: "restApi" },
  { id: "be-jwt", name: "JWT Authentication", description: "Token-based authentication for secure sessions.", category: "backend", iconKey: "jwt" },
  { id: "be-crud", name: "CRUD Operations", description: "Create, read, update, delete: the backbone of any app.", category: "backend", iconKey: "crud" },

  // Database
  { id: "db-mysql", name: "MySQL", description: "Relational database behind Elder-Care Link's records.", category: "database", iconKey: "mysql" },
  { id: "db-phpmyadmin", name: "phpMyAdmin", description: "Visual administration for MySQL databases.", category: "database", iconKey: "phpmyadmin" },
  { id: "db-sql", name: "SQL", description: "Writing and optimizing relational queries.", category: "database", iconKey: "sql" },
  { id: "db-design", name: "Database Design", description: "Structuring schemas that scale cleanly.", category: "database", iconKey: "databaseDesign" },
  { id: "db-erd", name: "Entity Relationship Diagram (ERD)", description: "Mapping entities and relationships before building.", category: "database", iconKey: "erd" },
  { id: "db-relational", name: "Relational Database Modeling", description: "Normalizing data across related tables.", category: "database", iconKey: "databaseDesign" },

  // API Integration
  { id: "api-twilio", name: "Twilio SMS API", description: "Automated emergency SMS alerts on Elder-Care Link.", category: "api", iconKey: "twilio" },
  { id: "api-rest", name: "REST APIs", description: "Consuming and building RESTful services.", category: "api", iconKey: "restApi" },
  { id: "api-axios", name: "Axios", description: "HTTP client for calling APIs from the frontend.", category: "api", iconKey: "axios" },
  { id: "api-json", name: "JSON", description: "The data format behind every API response.", category: "api", iconKey: "json" },
  { id: "api-qr", name: "QR Code Integration", description: "QR-linked medical profiles on Elder-Care Link.", category: "api", iconKey: "qrCode" },

  // Mobile
  { id: "mobile-rn", name: "React Native", description: "Cross-platform mobile UI practice exercises.", category: "mobile", iconKey: "reactNative" },
  { id: "mobile-expo", name: "Expo", description: "Tooling for building and running React Native apps.", category: "mobile", iconKey: "expo" },

  // Cloud
  { id: "cloud-aws", name: "AWS Cloud", description: "Certified on core AWS services and architecture.", category: "cloud", iconKey: "aws" },
  { id: "cloud-ibm", name: "IBM Cloud", description: "Cloud computing fundamentals via IBM SkillsBuild.", category: "cloud", iconKey: "ibmCloud" },

  // UI / UX
  { id: "uiux-figma", name: "Figma", description: "Designing interfaces before writing a line of code.", category: "uiux", iconKey: "figma" },
  { id: "uiux-wireframing", name: "Wireframing", description: "Structuring layouts early in the design process.", category: "uiux", iconKey: "wireframing" },
  { id: "uiux-ui", name: "UI Design", description: "Visual hierarchy, spacing, and interface polish.", category: "uiux", iconKey: "uiDesign" },
  { id: "uiux-ux", name: "UX Design", description: "Designing flows that make sense to real users.", category: "uiux", iconKey: "uxDesign" },
  { id: "uiux-responsive", name: "Responsive Design", description: "One design, every screen size.", category: "uiux", iconKey: "responsive" },
  { id: "uiux-accessibility", name: "Accessibility", description: "Building interfaces usable by everyone.", category: "uiux", iconKey: "accessibility" },

  // Version Control
  { id: "vcs-git", name: "Git", description: "Version control for every project I build.", category: "vcs", iconKey: "git" },
  { id: "vcs-github", name: "GitHub", description: "Hosting, collaboration, and project history.", category: "vcs", iconKey: "github" },

  // Development Tools
  { id: "tools-vscode", name: "Visual Studio Code", description: "My primary editor for full-stack development.", category: "tools", iconKey: "vscode" },
  { id: "tools-eclipse", name: "Eclipse IDE", description: "Development environment used for UB Universal Knowledge.", category: "tools", iconKey: "eclipse" },
  { id: "tools-xampp", name: "XAMPP", description: "Local PHP/MySQL server stack for development.", category: "tools", iconKey: "xampp" },
  { id: "tools-postman", name: "Postman", description: "Testing and debugging API endpoints.", category: "tools", iconKey: "postman" },
  { id: "tools-npm", name: "npm", description: "Package management for every JS/TS project.", category: "tools", iconKey: "npm" },
  { id: "tools-phpmyadmin", name: "phpMyAdmin", description: "Managing MySQL databases visually.", category: "tools", iconKey: "phpmyadmin" },

  // Software Engineering
  { id: "eng-sdlc", name: "Software Development Life Cycle (SDLC)", description: "Structured planning from concept to deployment.", category: "engineering", iconKey: "sdlc" },
  { id: "eng-agile", name: "Agile Scrum", description: "Iterative development used across capstone work.", category: "engineering", iconKey: "agile" },
  { id: "eng-requirements", name: "Requirements Gathering", description: "Understanding real needs before writing code.", category: "engineering", iconKey: "requirements" },
  { id: "eng-analysis", name: "System Analysis", description: "Breaking down problems into buildable systems.", category: "engineering", iconKey: "systemAnalysis" },
  { id: "eng-dbdesign", name: "Database Design", description: "Planning data structures that support the product.", category: "engineering", iconKey: "databaseDesign" },
  { id: "eng-testing", name: "Software Testing", description: "Verifying systems actually work as intended.", category: "engineering", iconKey: "testing" },
  { id: "eng-docs", name: "Documentation", description: "Writing process flows, WBS, and technical docs.", category: "engineering", iconKey: "documentation" },

  // Cybersecurity
  { id: "sec-linux", name: "Linux Fundamentals", description: "Command line and open-source OS basics.", category: "security", iconKey: "linux" },
  { id: "sec-intro", name: "Introduction to Cybersecurity", description: "Cisco-certified foundations in threats and defense.", category: "security", iconKey: "cybersecurity" },
  { id: "sec-network", name: "Network Security", description: "Protecting data as it moves across networks.", category: "security", iconKey: "networkSecurity" },
  { id: "sec-cloud", name: "Cloud Security", description: "Securing cloud-hosted services and data.", category: "security", iconKey: "cloudSecurity" },
  { id: "sec-auth", name: "Authentication", description: "Verifying who a user is before granting access.", category: "security", iconKey: "authentication" },
  { id: "sec-authz", name: "Authorization", description: "Controlling what an authenticated user can do.", category: "security", iconKey: "authorization" },

  // 3D & Motion, from the Kepler and Eclaire builds
  { id: "motion-threejs", name: "Three.js", description: "WebGL scene graph behind the Kepler orbital hero.", category: "motion", iconKey: "threejs" },
  { id: "motion-r3f", name: "React Three Fiber", description: "Declarative React renderer for Three.js scenes.", category: "motion", iconKey: "r3f" },
  { id: "motion-gsap", name: "GSAP + ScrollTrigger", description: "Pinned sections and scrubbed scroll timelines.", category: "motion", iconKey: "gsap" },
  { id: "motion-lenis", name: "Lenis", description: "Inertial smooth scrolling synced to the GSAP ticker.", category: "motion", iconKey: "lenis" },
  { id: "motion-framer", name: "Framer Motion", description: "Component-level animation across React interfaces.", category: "motion", iconKey: "framer" },

  // Tooling picked up on those same builds
  { id: "lang-glsl", name: "GLSL", description: "Hand-written noise displacement and fresnel shaders.", category: "languages", iconKey: "glsl" },
  { id: "tools-vite", name: "Vite", description: "Dev server and production bundler for both practice builds.", category: "tools", iconKey: "vite" },
  { id: "tools-ffmpeg", name: "FFmpeg", description: "All-keyframe H.264 encoding for scroll-scrubbed video.", category: "tools", iconKey: "ffmpeg" },
  { id: "tools-pillow", name: "Pillow (PIL)", description: "Python imaging used to generate brand assets.", category: "tools", iconKey: "pillow" },
  { id: "tools-numpy", name: "NumPy", description: "Array maths behind the generated background film.", category: "tools", iconKey: "numpy" },
  { id: "cloud-vercel", name: "Vercel", description: "Git-connected hosting with preview deploys on every PR.", category: "cloud", iconKey: "vercel" },
];

const elderCareLinkTechIds = [
  "fe-react",
  "be-node",
  "be-express",
  "db-mysql",
  "lang-python",
  "api-twilio",
  "api-qr",
  "lang-html5",
  "lang-css3",
  "lang-js",
  "fe-axios",
  "vcs-git",
  "vcs-github",
  "tools-vscode",
];

const ubUniversalKnowledgeTechIds = [
  "lang-html5",
  "lang-css3",
  "lang-js",
  "be-php",
  "db-mysql",
  "tools-eclipse",
];

const keplerTechIds = [
  "fe-react",
  "tools-vite",
  "lang-js",
  "fe-tailwind",
  "motion-threejs",
  "motion-r3f",
  "lang-glsl",
  "motion-gsap",
  "motion-lenis",
  "motion-framer",
  "fe-responsive",
  "cloud-vercel",
  "vcs-git",
  "vcs-github",
];

const eclaireTechIds = [
  "lang-js",
  "tools-vite",
  "lang-html5",
  "lang-css3",
  "motion-gsap",
  "motion-lenis",
  "lang-python",
  "tools-pillow",
  "tools-numpy",
  "tools-ffmpeg",
  "fe-responsive",
  "cloud-vercel",
  "vcs-git",
  "vcs-github",
];

const techById = new Map(techCatalog.map((t) => [t.id, t]));

for (const entry of techCatalog) {
  const projects: string[] = [];
  if (elderCareLinkTechIds.includes(entry.id)) projects.push("Elder-Care Link");
  if (ubUniversalKnowledgeTechIds.includes(entry.id)) projects.push("UB Universal Knowledge");
  if (keplerTechIds.includes(entry.id)) projects.push("Kepler");
  if (eclaireTechIds.includes(entry.id)) projects.push("Eclaire Coffee Shop");
  if (projects.length > 0) entry.projects = projects;
}

export const elderCareLinkTech: TechEntry[] = elderCareLinkTechIds
  .map((id) => techById.get(id))
  .filter((t): t is TechEntry => Boolean(t));

export const ubUniversalKnowledgeTech: TechEntry[] = ubUniversalKnowledgeTechIds
  .map((id) => techById.get(id))
  .filter((t): t is TechEntry => Boolean(t));

export const keplerTech: TechEntry[] = keplerTechIds
  .map((id) => techById.get(id))
  .filter((t): t is TechEntry => Boolean(t));

export const eclaireTech: TechEntry[] = eclaireTechIds
  .map((id) => techById.get(id))
  .filter((t): t is TechEntry => Boolean(t));

export interface BuiltWithEntry {
  group: string;
  items: { name: string; iconKey: string }[];
}

export const builtWithStack: BuiltWithEntry[] = [
  { group: "Framework", items: [{ name: "Next.js 15", iconKey: "nextjs" }] },
  {
    group: "Frontend",
    items: [
      { name: "React", iconKey: "react" },
      { name: "TypeScript", iconKey: "typescript" },
      { name: "Tailwind CSS", iconKey: "tailwind" },
    ],
  },
  { group: "Animation", items: [{ name: "Framer Motion", iconKey: "framer" }] },
  {
    group: "Components",
    items: [
      { name: "shadcn/ui", iconKey: "shadcn" },
      { name: "Lucide React", iconKey: "lucide" },
    ],
  },
  { group: "Theme", items: [{ name: "next-themes", iconKey: "nextThemes" }] },
  { group: "Forms", items: [{ name: "EmailJS", iconKey: "emailjs" }] },
  { group: "Deployment", items: [{ name: "Vercel", iconKey: "vercel" }] },
  {
    group: "Development",
    items: [
      { name: "Visual Studio Code", iconKey: "vscode" },
      { name: "npm", iconKey: "npm" },
      { name: "ESLint", iconKey: "eslint" },
      { name: "Prettier", iconKey: "prettier" },
    ],
  },
];
