import { MetadataRoute } from "next";
import { PORTRAIT, SITE_URL } from "@/lib/site";
import { caseStudyProjects, projects } from "@/lib/projects";

export const dynamic = "force-static";

/**
 * Fragment URLs (/#about) are ignored by Google — they collapse to the
 * homepage. Only real, separately-indexable routes belong here.
 *
 * The `images` arrays emit <image:image> entries. That is the supported way to
 * tell Google Images which pictures live on a page, and it is how the headshot
 * gets crawled as a distinct asset rather than only as page decoration.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const abs = (p: string) => `${SITE_URL}${p}`;

  const portraits = [
    abs(PORTRAIT.square.src),
    abs(PORTRAIT.wide.src),
    abs(PORTRAIT.portrait.src),
  ];

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [abs("/og.jpg"), ...portraits],
    },
    {
      /* The entity page. Second priority on purpose: for a contested personal
         name it is the page most likely to satisfy "who is this person". */
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: portraits,
    },
    {
      url: `${SITE_URL}/works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: projects.map((p) => abs(p.cover.src)),
    },
    ...caseStudyProjects.map((p) => ({
      url: `${SITE_URL}/works/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [abs(p.cover.src)],
    })),
  ];
}
