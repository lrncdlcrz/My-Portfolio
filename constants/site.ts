export const siteConfig = {
  name: "Laurence Andrei C. Dela Cruz",
  shortName: "Laurence Dela Cruz",
  title: "Aspiring Full Stack Developer",
  description:
    "Aspiring Full Stack Developer and BS Information Technology student building modern, scalable web applications, from design to deployment. Based in Batangas City, Philippines, open for freelance, remote, and internship opportunities.",
  url: "https://laurencedev.vercel.app",
  email: "laurencedlcrz11@gmail.com",
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

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/lrncdlcrz",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/laurence-delacruz-74a55341a/",
    icon: "linkedin",
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01d8dd7ee536437bf8?viewMode=1",
    icon: "upwork",
  },
  {
    label: "OnlineJobs.ph",
    href: "https://v2.onlinejobs.ph/jobseekers/info/5277566",
    icon: "onlinejobs",
  },
  {
    label: "Fiverr",
    href: "https://www.fiverr.com/laurencedev11?public_mode=true",
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
