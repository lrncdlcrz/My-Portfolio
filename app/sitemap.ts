import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/tech-stack",
    "/projects",
    "/certificates",
    "/resume",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const isLegal = (route: string) => route === "/privacy" || route === "/terms";

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: isLegal(route) ? "yearly" : "monthly",
    priority: route === "" ? 1 : isLegal(route) ? 0.3 : 0.7,
  }));
}
