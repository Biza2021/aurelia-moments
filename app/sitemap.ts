import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://aureliamoments.com";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1
    },
    {
      url: `${siteUrl}/${locale}/privacy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3
    },
    {
      url: `${siteUrl}/${locale}/terms`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3
    }
  ]);
}
