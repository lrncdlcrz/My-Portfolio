export const siteConfig = {
  name: "Laurence Andrei C. Dela Cruz",
  shortName: "Laurence Dela Cruz",
  title: "Aspiring Full Stack Developer",
  description:
    "Aspiring Full Stack Developer and BS Information Technology student building modern, scalable web applications, from design to deployment. Based in Batangas City, Philippines, open for freelance, remote, and internship opportunities.",
  url: "https://laurencedelacruz.dev",
  email: "laurenceandrei24@gmail.com",
  phone: "+63 939-197-8056",
  location: "Batangas City, Philippines",
  university: "University of Batangas",
  course: "Bachelor of Science in Information Technology",
  status: "Incoming 4th Year Student",
  keywords: [
    "Laurence Dela Cruz",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Design",
    "REST API Integration",
    "Database Design",
    "University of Batangas",
    "BSIT",
    "Freelance Developer Philippines",
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Tech Stack", href: "/tech-stack" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  {
    label: "GitHub (Main)",
    href: "https://github.com/Laurence-Dev11",
    icon: "github",
  },
  {
    label: "GitHub (Alt)",
    href: "https://github.com/Laurence-rgb",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/laurence-delacruz-74a55341a/",
    icon: "linkedin",
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01908eaa4b245174f3",
    icon: "upwork",
  },
  {
    label: "OnlineJobs.ph",
    href: "https://v2.onlinejobs.ph/jobseekers/info/4729421",
    icon: "onlinejobs",
  },
  {
    label: "Fiverr",
    href: "https://www.fiverr.com/laurencetoshiro",
    icon: "fiverr",
  },
] as const;

export const heroRoles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "API Integration Specialist",
  "Database Designer",
  "Freelancer",
] as const;
