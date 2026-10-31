import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/packages", "/contact", "/card", "/qr"];
  const baseUrl = siteConfig.url;

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}

