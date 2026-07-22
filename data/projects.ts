import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "elder-care-link",
    slug: "elder-care-link",
    title: "Elder-Care Link",
    tagline: "QR-Integrated Emergency SMS & Medical History System",
    featured: true,
    category: "Web App",
    status: "In Progress",
    team: ["John Christopher Gabi", "Mark Fred Reyes", "Laurence Andrei Dela Cruz"],
    teamName: "Team Woodbury",
    role: "Co-developed the QR-integrated system, designed process flows and a Work Breakdown Structure across six modules, integrated the Twilio SMS API, and implemented the MySQL cloud database.",
    problem:
      "For years, senior citizen data and emergency medical response in Batangas City have relied on manual paper logbooks and physical files. Even with the Senior Citizens Information Management System (SCIMS) centralizing basic registration, a real operational gap remains during field emergencies and medical consultations. Seniors often struggle to communicate a coherent medical history due to cognitive stress, speech difficulties, or language barriers — leaving health workers to piece together fragmented information, which risks the accuracy of the assessment. Paper-based records also put data privacy at risk: easily misplaced, destroyed, or accessed by unauthorized personnel.",
    solution:
      "Elder-Care Link integrates a specialized QR code directly into the physical OSCA (Office for Senior Citizens Affairs) Senior IDs that seniors already carry — a \"passive technology\" approach that requires no app, login, or digital literacy from the senior. Scanning the ID grants health workers instant access to a centralized, encrypted digital medical profile (blood type, maintenance medications, and more) stored securely in MySQL, letting the ID act as the senior's \"voice\" during an emergency.",
    objectives: [
      "Develop an interactive digital profile platform for every senior citizen.",
      "Integrate a specialized QR code system on Senior IDs for instant access to medical history (blood type, maintenance medications).",
      "Modernize daily check-in and appointment tracking at local health centers, replacing manual logbooks with QR scanning to reduce wait times.",
      "Streamline the scheduling and tracking of appointments through digital scanning.",
      "Deliver automated emergency SMS alerts via the Twilio SMS Gateway with real-time GPS location the moment a QR code is scanned in a crisis.",
    ],
    features: [
      {
        title: "QR-Integrated Senior IDs",
        description:
          "Every OSCA Senior ID carries a unique QR code linking directly to that senior's digital medical profile.",
      },
      {
        title: "Automated Emergency SMS",
        description:
          "Twilio SMS API automatically alerts family members and first responders with real-time GPS location the instant a QR code is scanned in an emergency — improving response times by roughly 30%.",
      },
      {
        title: "Secure Cloud Medical Records",
        description:
          "A MySQL cloud database securely digitizes and syncs senior citizens' medical records, replacing manual tracking with encrypted, centralized access.",
      },
      {
        title: "Six-Module System Architecture",
        description:
          "Process flows and a Work Breakdown Structure spanning six major modules keep the system organized and the team's collaboration on track.",
      },
    ],
    techStack: ["React.js", "Node.js", "Python", "MySQL", "Twilio SMS API", "QR Code Integration"],
    beneficiaries: ["Senior Citizens", "Family Members", "Health Workers", "LGU (Local Government Unit)"],
    timeline: [
      {
        label: "Project Initiation",
        period: "March – May",
        details: ["Requirements gathering", "Concept understanding", "Project planning"],
      },
      {
        label: "Research & Development",
        period: "June – July",
        details: [
          "Capstone Chapters 1–3",
          "Frontend & backend development",
          "Data Flow Diagram",
        ],
      },
      {
        label: "Final Development & Implementation",
        period: "August – Early November",
        details: ["Fully functional system", "System testing & evaluation", "Project planning"],
      },
      {
        label: "Documentation of Result",
        period: "Mid – End of November",
        details: ["Capstone Chapters 4–5", "System implementation"],
      },
    ],
    timelineImage: "/projects/elder-care-link/timeline.png",
    logoImage: "/projects/elder-care-link/logo.png",
    images: ["/projects/elder-care-link/logo.png", "/projects/elder-care-link/timeline.png"],
    testimonial: {
      quote:
        "Ang problema lang namin tuwing may appointment o emergency, kailangan pang manu-manong hanapin ang mga files sa dami ng mga papel. Nagreresulta ito sa mahabang paghihintay na nakakapagod para sa mga matatanda.",
      quoteTranslation:
        "It bridges the gap between the patient and the doctor — in emergencies where the senior cannot speak, the QR code acts as their voice.",
      author: "Mr. Raymond Sandiwa",
      role: "Representative, Information Technology II — OSCA",
    },
    links: {},
  },
  {
    id: "ub-universal-knowledge",
    slug: "ub-universal-knowledge",
    title: "UB Universal Knowledge",
    tagline: "A space-themed adventure that turns university values into a game",
    featured: false,
    category: "Game",
    status: "Completed",
    role: "Designed and developed the educational game experience.",
    problem:
      "University orientation modules on vision, mission, philosophy, objectives, and core values are often delivered as dense reading material students skim and forget.",
    solution:
      "UB Universal Knowledge is an immersive educational game that transforms learning into an exciting cosmic adventure. Players test their knowledge by answering questions based on the University of Batangas' core values, with each correct answer earning \"fuel points\" that propel their spaceship to new planetary destinations. Each planet represents a different chapter of the UB curriculum — Vision, Mission, Philosophy, Objectives, and Core Values — offering a structured yet engaging way to explore the university's fundamental principles.",
    objectives: [
      "Enhance critical thinking by presenting real-world applications of UB's values.",
      "Reward correct answers with a fuel-point system that creates a satisfying sense of achievement.",
      "Increase difficulty progressively across planets for continuous intellectual growth.",
      "Use a space-exploration metaphor to make abstract institutional concepts tangible.",
      "Gamify UB's core values so wisdom, service, and faith are internalized memorably.",
    ],
    features: [
      {
        title: "Planet-by-Planet Progression",
        description:
          "Each planet maps to a chapter of the UB curriculum — Vision, Mission, Philosophy, Objectives, and Core Values.",
      },
      {
        title: "Fuel Point Reward Loop",
        description: "Correct answers earn fuel points that visibly propel the player's spaceship forward.",
      },
      {
        title: "Progressive Difficulty",
        description: "Questions grow more challenging as players advance, reinforcing retention over time.",
      },
      {
        title: "Built for the UBCV Curriculum",
        description:
          "Designed for students enrolled in the University of Batangas taking the UBCV course, from elementary through 2nd year college.",
      },
    ],
    techStack: ["JavaScript", "HTML5 Canvas", "React"],
    beneficiaries: ["University of Batangas Students", "UBCV Instructors"],
    images: [],
    links: {},
  },
  {
    id: "react-practice-projects",
    slug: "react-practice-projects",
    title: "React Fundamentals & Component UI",
    tagline: "A series of practice builds covering component-based UI",
    featured: false,
    category: "Practice",
    status: "Completed",
    role: "Built independently to strengthen front-end fundamentals.",
    features: [
      {
        title: "Component-Based UI",
        description: "Practiced composing reusable React components and managing state and props.",
      },
    ],
    techStack: ["React", "JavaScript", "HTML5", "CSS3"],
    images: [],
    links: {},
  },
  {
    id: "react-native-mobile-ui",
    slug: "react-native-mobile-ui",
    title: "React Native Mobile UI Exercises",
    tagline: "Mobile UI exercises using React Native components and APIs",
    featured: false,
    category: "Practice",
    status: "Completed",
    role: "Built independently to explore mobile application development.",
    features: [
      {
        title: "Mobile Component Patterns",
        description: "Explored React Native components and device APIs to understand mobile app development.",
      },
    ],
    techStack: ["React Native", "JavaScript"],
    images: [],
    links: {},
  },
  {
    id: "calculator-app",
    slug: "calculator-app",
    title: "Calculator App",
    tagline: "A foundational calculator built with HTML, CSS, and JavaScript",
    featured: false,
    category: "Practice",
    status: "Completed",
    role: "Built independently to refine programming logic.",
    features: [
      {
        title: "Core Logic From Scratch",
        description: "Strengthened coding logic and DOM manipulation fundamentals without any framework.",
      },
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    images: [],
    links: {},
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
export const secondaryProjects = projects.filter((p) => !p.featured);
