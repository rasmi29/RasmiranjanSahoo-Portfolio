import type { Metadata } from "next";
import BuildStory from "@/components/work/BuildStory";
import { getProject } from "@/lib/projects";
import { getBuildStory } from "@/lib/buildStories";
import { SITE_URL } from "@/lib/site";

const project = getProject("wayline-landing")!;
const story = getBuildStory("wayline-landing")!;

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
      ...(project.links.live ? { sameAs: project.links.live } : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Works", item: `${SITE_URL}/works` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/works/${project.slug}` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BuildStory project={project} story={story} />
    </>
  );
}
