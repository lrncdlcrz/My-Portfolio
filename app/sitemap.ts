import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // The old section routes now redirect into the one-page layout
  // (next.config.ts), so only real, indexable pages are listed.
  const routes = ["", "/privacy", "/terms"];

  const isLegal = (route: string) => route === "/privacy" || route === "/terms";

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: isLegal(route) ? "yearly" : "monthly",
    priority: route === "" ? 1 : isLegal(route) ? 0.3 : 0.7,
  }));
}
