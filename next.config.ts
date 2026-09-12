import type { NextConfig } from "next";

// The portfolio used to be seven routes and is now one page. These keep old
// links (resume, social profiles, search results) landing on the matching
// section instead of a 404.
//
// Sources must stay exact matches. public/projects/ and public/certificates/
// hold the site's screenshots and badges, and /resume.pdf shares the /resume
// prefix, so a wildcard such as "/projects/:path*" would redirect those
// assets away and break every project image.
const SECTION_ROUTES = [
  "about",
  "tech-stack",
  "projects",
  "certificates",
  "resume",
  "contact",
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return SECTION_ROUTES.map((route) => ({
      source: `/${route}`,
      destination: `/#${route}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
