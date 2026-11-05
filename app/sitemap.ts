import { MetadataRoute } from "next";
import { PORTRAIT, RESUME, SITE_URL } from "@/lib/site";
import { projectHref, projects } from "@/lib/projects";

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
  // encodeURI: some screenshots have spaces in their filenames, and a raw
  // space makes the <image:loc> entry an invalid URL.
  const abs = (p: string) => `${SITE_URL}${encodeURI(p)}`;

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
    {
      url: `${SITE_URL}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: new Date(RESUME.updated),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [abs(RESUME.preview.src)],
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    /* Every project has a page now — full case studies at 0.8, the summary
       pages (which defer to the studio's write-up) a step below. */
    ...projects.map((p) => ({
      url: `${SITE_URL}${projectHref(p)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.hasCaseStudy ? 0.8 : 0.7,
      images: [abs(p.cover.src)],
    })),
  ];
}
