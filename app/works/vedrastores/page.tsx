import type { Metadata } from "next";
import VedrastoresCaseStudy from "./VedrastoresCaseStudy";
import { getProject } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

/*
 * This page used to be a client component, which meant it could not export
 * `metadata` — so it shipped the identical <title> as the homepage and was
 * invisible to search as a distinct page. The interactive parts now live in
 * VedrastoresCaseStudy.tsx and this stays a server component.
 */
const project = getProject("vedrastores")!;

export const metadata: Metadata = {
  title: project.tagline,
  description: project.metaDescription,
  keywords: project.keywords,
  alternates: { canonical: `/works/${project.slug}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/works/${project.slug}`,
    title: project.tagline,
    description: project.metaDescription,
    images: [{ url: project.cover.src, alt: project.cover.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: project.tagline,
    description: project.metaDescription,
    images: [project.cover.src],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/works/${project.slug}#work`,
      name: project.title,
      headline: project.tagline,
      description: project.metaDescription,
      url: `${SITE_URL}/works/${project.slug}`,
      image: `${SITE_URL}${project.cover.src}`,
      author: { "@id": `${SITE_URL}/#person` },
      creator: { "@id": `${SITE_URL}/#person` },
      dateCreated: project.year,
      keywords: project.keywords.join(", "),
      about: project.tech,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: "Vedrastores",
      applicationCategory: "ShoppingApplication",
      operatingSystem: "Android, iOS, Web",
      author: { "@id": `${SITE_URL}/#person` },
      url: project.links.playStore ?? project.links.live,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Works", item: `${SITE_URL}/works` },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: `${SITE_URL}/works/${project.slug}`,
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VedrastoresCaseStudy />
    </>
  );
}
