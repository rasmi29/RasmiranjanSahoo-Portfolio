/**
 * Single source of truth for portfolio projects.
 *
 * Drives: the Works section, the /works index, the sitemap, and per-project
 * metadata + JSON-LD. Adding a project here makes it appear everywhere and
 * become indexable — no other file needs editing.
 */

export type ProjectType =
  | "E-Commerce"
  | "AI"
  | "SaaS"
  | "Mobile"
  | "Realtime";

export interface Project {
  slug: string;
  title: string;
  /** Becomes the page <title>. Lead with capability, not adjectives. */
  tagline: string;
  /** 150–160 chars, carries the keywords you want this page to win. */
  metaDescription: string;
  /** Short blurb for cards. */
  description: string;
  year: string;
  type: ProjectType;
  featured: boolean;
  role: string;
  duration: string;
  client?: string;
  /** Verifiable outcomes. Cards render these; vague claims are worse than none. */
  outcomes: { label: string; value: string }[];
  tech: string[];
  /** Feeds keyword targeting for this project's page. */
  keywords: string[];
  links: {
    live?: string;
    github?: string;
    playStore?: string;
    appStore?: string;
  };
  cover: { src: string; alt: string };
  /** Set false for projects that only appear as a card (no case study route). */
  hasCaseStudy: boolean;
}

export const projects: Project[] = [
  {
    slug: "vedrastores",
    title: "Vedrastores Ecosystem",
    tagline:
      "Vedrastores — 4-Platform E-Commerce Ecosystem with M-Pesa for Kenya",
    metaDescription:
      "Case study: building a complete multi-vendor e-commerce infrastructure for Kenya — 4 web platforms and 2 React Native apps with M-Pesa payments, shipped solo in 4 months.",
    description:
      "A complete multi-vendor e-commerce infrastructure for the Kenyan market: 4 interconnected web platforms and 2 React Native apps, with M-Pesa payments, built solo in 4 months.",
    year: "2026",
    type: "E-Commerce",
    featured: true,
    role: "Sole Developer — architecture, backend, web and mobile",
    duration: "4 months",
    client: "Vedrastores (Kenya)",
    outcomes: [
      { label: "Platforms shipped", value: "4 web + 2 apps" },
      { label: "Delivered in", value: "4 months" },
      { label: "Payments", value: "M-Pesa live" },
      { label: "Market", value: "Kenya" },
    ],
    tech: [
      "Next.js",
      "React Native",
      "Expo",
      "Shadcn UI",
      "Node.js",
      "Firebase",
      "AWS S3",
      "CloudFront",
      "M-Pesa",
    ],
    keywords: [
      "M-Pesa integration developer",
      "multi-vendor marketplace developer",
      "Kenya e-commerce development",
      "React Native e-commerce app",
      "Next.js marketplace",
    ],
    links: {
      live: "https://vedrastores.co.ke",
      playStore:
        "https://play.google.com/store/apps/details?id=co.ke.vedrastores.app",
    },
    cover: {
      src: "/Projects/Vedrastore/vedrastore-banner.webp",
      alt: "Vedrastores multi-vendor e-commerce ecosystem — buyer portal, vendor dashboard and admin panel",
    },
    hasCaseStudy: true,
  },
];

/** Categories are derived, so a filter can never exist without results. */
export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.type))),
];

export const featuredProjects = projects.filter((p) => p.featured);

export const caseStudyProjects = projects.filter((p) => p.hasCaseStudy);

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectHref = (p: Project) =>
  p.hasCaseStudy ? `/works/${p.slug}` : (p.links.live ?? "#works");
