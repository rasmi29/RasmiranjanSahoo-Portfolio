import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { caseStudyProjects } from "@/lib/projects";

export const dynamic = "force-static";

/**
 * Fragment URLs (/#about) are ignored by Google — they collapse to the
 * homepage. Only real, separately-indexable routes belong here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...caseStudyProjects.map((p) => ({
      url: `${SITE_URL}/works/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
