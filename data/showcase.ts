import { ProjectShowcase } from "@/types";

/**
 * The three projects that carry a full case study. Ordered capstone-first:
 * the homepage showcase and the /projects page both read from this array, so
 * copy never drifts between the two surfaces.
 */
export const showcaseProjects: ProjectShowcase[] = [
  {
    slug: "elder-care-link",
    name: "Elder-Care Link",
    tagline: "QR-Integrated Emergency SMS & Medical History System",
    description:
      "A capstone system for the Batangas City Office for Senior Citizens Affairs. A QR code printed on the physical Senior ID a senior already carries opens their encrypted medical profile, so a health worker gets blood type and maintenance medications instantly, even when the senior cannot speak for themselves.",
    bullets: [
      "QR-integrated OSCA Senior IDs that need no app, login, or digital literacy from the senior",
      "Twilio SMS alerts to family and responders with real-time GPS the moment an ID is scanned in a crisis",
      "Encrypted MySQL cloud records replacing the paper logbooks the office ran on for years",
    ],
    stack: [
      "React.js",
      "Node.js",
      "Python",
      "MySQL",
      "Twilio SMS API",
      "QR Integration",
    ],
    media: [
      {
        src: "/projects/elder-care-link/dashboard-overview.png",
        alt: "Elder-Care Link admin dashboard showing registered senior totals, monthly registration chart, and a seniors-by-barangay breakdown",
      },
      {
        src: "/projects/elder-care-link/sign-in.png",
        alt: "Elder-Care Link sign-in screen with role-based access badges for admin, healthcare, and staff users",
      },
    ],
    status: "In Progress",
    role: "Co-developed the QR-integrated system, designed the process flows and Work Breakdown Structure across six modules, integrated the Twilio SMS API, and implemented the MySQL cloud database.",
    testimonial: {
      quote:
        "Ang problema lang namin tuwing may appointment o emergency, kailangan pang manu-manong hanapin ang mga files sa dami ng mga papel. Nagreresulta ito sa mahabang paghihintay na nakakapagod para sa mga matatanda.",
      quoteTranslation:
        "It bridges the gap between the patient and the doctor: in emergencies where the senior cannot speak, the QR code acts as their voice.",
      author: "Mr. Raymond Sandiwa",
      role: "Representative, Information Technology II, OSCA",
    },
  },
  {
    slug: "kepler",
    name: "Kepler",
    tagline: "Mission control for your operations",
    description:
      "A landing page for a fictional AI operations platform, built to practice motion-heavy marketing sites. Marketing pages for AI tooling usually bury the pitch under jargon, so this one leads with the outcome and only then explains the mechanism.",
    bullets: [
      "Animated orbital hero rendered in WebGL with hand-written GLSL noise-displacement and fresnel shaders",
      "Scroll narrative pinned and scrubbed with GSAP ScrollTrigger, synced to Lenis inertial scrolling",
      "Dark, high-contrast visual system framed around a private-beta launch",
    ],
    stack: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Three.js",
      "React Three Fiber",
      "GLSL",
      "GSAP",
      "Lenis",
      "Framer Motion",
    ],
    media: [
      {
        src: "/projects/kepler/hero.png",
        alt: "Kepler landing page hero with the headline Mission control for your operations beside a WebGL-rendered orbiting planet",
      },
      {
        src: "/projects/kepler/detail.png",
        alt: "Kepler pricing section titled Choose your orbit, with four tiers and an expanded Growth plan panel",
      },
    ],
    liveUrl: "https://kepler-marketing-site.vercel.app",
    status: "Practice Build",
    role: "Original design and build. A self-directed practice project to work through WebGL scene composition, custom shader authoring, and scroll-driven narrative pacing on a marketing page.",
  },
  {
    slug: "eclaire",
    name: "Eclaire Coffee Shop",
    tagline: "Bold by origin",
    description:
      "A single-origin coffee brand site built as a scroll-driven story rather than a flat product page. Direct-trade food and beverage brands sell an origin story before they sell a bag of beans, so the whole page is structured farm-to-cup.",
    bullets: [
      "Full-bleed hero video scrubbed against scroll position, with a side-rail section-dot navigator",
      "Story blocks covering sourcing, roasting craft, packaging rationale, and audience segments",
      "Interactive spec sheet (origin, altitude, processing, cupping score, tasting notes) feeding a tiered pre-order flow",
    ],
    stack: [
      "Vanilla JavaScript",
      "Vite",
      "GSAP ScrollTrigger",
      "Lenis",
      "Modern CSS",
    ],
    media: [
      {
        src: "/projects/eclaire/hero.png",
        alt: "Eclaire Coffee Shop hero with the headline Bold by origin over a dark full-bleed video background",
      },
      {
        src: "/projects/eclaire/detail.png",
        alt: "Eclaire specification table listing farm, region, varietal, altitude, processing, roast level, cupping score, and tasting notes",
      },
    ],
    liveUrl: "https://eclaire-coffee-shop-sample-website.vercel.app",
    status: "Practice Build",
    role: "Rebuilt from a reference concept to practice scroll-driven storytelling and video scrubbing without a framework. Deliberately lean: gsap and lenis are the only runtime dependencies.",
  },
];

export const showcaseBySlug = Object.fromEntries(
  showcaseProjects.map((p) => [p.slug, p]),
) as Record<string, ProjectShowcase>;

/**
 * Maps a human-readable stack label to an `iconRegistry` key. Labels without a
 * match render as a text-only pill, which is the intended fallback.
 */
export const stackIconKeys: Record<string, string> = {
  "React.js": "react",
  "React 19": "react",
  React: "react",
  "React Three Fiber": "r3f",
  "React Native": "reactNative",
  "Node.js": "nodejs",
  Python: "python",
  "Python (Pillow, NumPy)": "numpy",
  FFmpeg: "ffmpeg",
  MySQL: "mysql",
  "Twilio SMS API": "twilio",
  "QR Integration": "qrCode",
  "QR Code Integration": "qrCode",
  Vite: "vite",
  "Tailwind CSS": "tailwind",
  "Tailwind CSS v4": "tailwind",
  "Three.js": "threejs",
  GLSL: "glsl",
  GSAP: "gsap",
  "GSAP ScrollTrigger": "gsap",
  "GSAP + ScrollTrigger": "gsap",
  Lenis: "lenis",
  "Framer Motion": "framer",
  "Vanilla JavaScript": "javascript",
  JavaScript: "javascript",
  "Modern CSS": "cssModern",
  HTML5: "html5",
  CSS3: "css3",
  "HTML5 Canvas": "html5",
};
