/**
 * Single source of truth for portfolio projects.
 *
 * Drives: the Works section, the /works index, the sitemap, and per-project
 * metadata + JSON-LD. Adding a project here makes it appear everywhere and
 * become indexable — no other file needs editing.
 *
 * Facts are kept in step with the studio site (work.rasmiranjan.in, studio
 * repo lib/work.ts). Projects without a case study here link to the studio's
 * full write-up instead of duplicating it — one canonical page per project.
 */

export type ProjectType = "E-Commerce" | "AI" | "SaaS" | "Mobile" | "Realtime" | "Web";

/** Who the work was delivered through — shown on every card. */
export type Engagement = "Gravitones" | "Freelance";

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
  engagement: Engagement;
  status: "Live" | "Delivered" | "In development";
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
    /** Full case study on the studio site, for projects without a page here. */
    caseStudy?: string;
  };
  cover: { src: string; alt: string; illustration?: boolean };
  /** True only for projects with their own /works/[slug] page on this site. */
  hasCaseStudy: boolean;
}

const STUDIO_WORK = "https://work.rasmiranjan.in/work";

export const projects: Project[] = [
  {
    slug: "vedrastores",
    title: "Vedrastores Ecosystem",
    tagline: "Vedrastores — 4-Platform E-Commerce Ecosystem with M-Pesa for Kenya",
    metaDescription:
      "Case study: building a complete multi-vendor e-commerce infrastructure for Kenya — 4 web platforms and 2 React Native apps with M-Pesa payments, built at Gravitones as sole developer in 4 months.",
    description:
      "A complete multi-vendor e-commerce infrastructure for the Kenyan market: 4 interconnected web platforms and 2 React Native apps, with M-Pesa payments, built at Gravitones by a single developer in 4 months.",
    year: "2026",
    type: "E-Commerce",
    engagement: "Gravitones",
    status: "Live",
    featured: true,
    role: "Sole developer at Gravitones — architecture, backend, web and mobile",
    duration: "4 months",
    client: "Vedrastores (Kenya)",
    outcomes: [
      { label: "Platforms shipped", value: "4 web + 2 apps" },
      { label: "Delivered in", value: "4 months" },
      { label: "Payments", value: "M-Pesa live" },
      { label: "Market", value: "Kenya" },
    ],
    tech: ["Next.js", "React Native", "Expo", "Shadcn UI", "Node.js", "Firebase", "AWS S3", "CloudFront", "M-Pesa"],
    keywords: [
      "M-Pesa integration developer",
      "multi-vendor marketplace developer",
      "Kenya e-commerce development",
      "React Native e-commerce app",
      "Next.js marketplace",
    ],
    links: {
      live: "https://vedrastores.co.ke",
      playStore: "https://play.google.com/store/apps/details?id=co.ke.vedrastores.app",
      caseStudy: `${STUDIO_WORK}/vedrastores-multi-vendor-marketplace`,
    },
    // The real product, not the client's ad banner.
    cover: {
      src: "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124601.webp",
      alt: "Vedrastores marketing website for its multi-vendor e-commerce marketplace in Kenya",
    },
    hasCaseStudy: true,
  },
  {
    slug: "bookiee",
    title: "Bookiee Bus Booking",
    tagline: "Bookiee — Bus Booking App, Operator & Admin Portals",
    metaDescription:
      "A bus ticketing marketplace: React Native passenger app, operator and admin portals, Redis seat locks, Razorpay payments and SMS tickets — built at Gravitones as lead developer.",
    description:
      "Passenger app, operator portal, admin portal and website on one API — with seat holds that rule out double-booking, a visual bus-layout designer and a tracked refund queue.",
    year: "2026",
    type: "Mobile",
    engagement: "Gravitones",
    status: "Delivered",
    featured: true,
    role: "Lead developer at Gravitones — architecture, API, apps and portals",
    duration: "3 months",
    client: "Bookiee (India)",
    outcomes: [
      { label: "Apps on one API", value: "4" },
      { label: "Screens", value: "110+" },
      { label: "API endpoints", value: "160+" },
      { label: "Built in", value: "3 months" },
    ],
    tech: ["React Native", "Expo", "React", "Node.js", "PostgreSQL", "Redis", "Razorpay", "OpenAPI"],
    keywords: ["bus booking app developer", "seat locking Redis", "React Native booking app"],
    links: { caseStudy: `${STUDIO_WORK}/bookiee-bus-booking-platform` },
    cover: {
      src: "/Projects/bookiee/cover.webp",
      alt: "Illustration of the Bookiee bus booking platform: passenger seat map and operator bus-layout designer",
      illustration: true,
    },
    hasCaseStudy: false,
  },
  {
    slug: "restaurant-delivery",
    title: "Restaurant Delivery Platform",
    tagline: "Five Apps That Let One Restaurant Run Its Own Delivery",
    metaDescription:
      "Customer app and website, rider app, kitchen portal and owner panel for one restaurant: real-road delivery fees, live tracking, bag codes and cash settlement.",
    description:
      "Customer app and website, rider app, kitchen portal and owner panel on one live backend — so a single restaurant can run delivery without paying an aggregator.",
    year: "2026",
    type: "Realtime",
    engagement: "Gravitones",
    status: "Delivered",
    featured: true,
    role: "Lead developer at Gravitones — API, customer, rider, kitchen and owner apps",
    duration: "2 months",
    client: "Name withheld at the client's request",
    outcomes: [
      { label: "Connected apps", value: "5" },
      { label: "Screens", value: "130+" },
      { label: "API endpoints", value: "150+" },
      { label: "User roles", value: "7" },
    ],
    tech: ["React Native", "Expo", "React", "Node.js", "PostgreSQL", "Socket.IO", "Razorpay", "Google Maps"],
    keywords: ["restaurant delivery app developer", "food delivery app", "Socket.IO live tracking"],
    links: { caseStudy: `${STUDIO_WORK}/restaurant-delivery-platform` },
    cover: {
      src: "/Projects/restaurant-delivery/cover.webp",
      alt: "Illustration of a restaurant delivery platform: customer live tracking, rider pickup code and kitchen order board",
      illustration: true,
    },
    hasCaseStudy: false,
  },
  {
    slug: "quickbite",
    title: "QuickBite Creator App",
    tagline: "QuickBite — Creator-Led Food Discovery App",
    metaDescription:
      "Food reels, restaurant offers redeemed by QR and a creator campaign marketplace — a React Native app on a Postgres ledger with MongoDB read models.",
    description:
      "Creators film real food videos, people claim offers, restaurants pay for the visits a reel drives — a social app on top of a backend built like a payments system.",
    year: "2026",
    type: "Mobile",
    engagement: "Gravitones",
    status: "In development",
    featured: true,
    role: "Lead developer at Gravitones — architecture, backend, app, admin and site",
    duration: "Sep 2026 – present",
    client: "QuickBite (India)",
    outcomes: [
      { label: "App screens", value: "80+" },
      { label: "Admin screens", value: "50+" },
      { label: "Backend modules", value: "5" },
      { label: "Indic scripts in search", value: "9" },
    ],
    tech: ["React Native", "Expo Router", "TypeScript", "Node.js", "PostgreSQL", "PostGIS", "MongoDB", "Redis"],
    keywords: ["creator app developer", "React Native social app", "PostgreSQL ledger"],
    links: { caseStudy: `${STUDIO_WORK}/quickbite-creator-food-discovery-app` },
    cover: {
      src: "/Projects/quickbite/cover.webp",
      alt: "Illustration of the QuickBite app: a food reel, a restaurant offer and an in-store QR redemption",
      illustration: true,
    },
    hasCaseStudy: false,
  },
  {
    slug: "bidyasagar",
    title: "Bidyasagar Classes",
    tagline: "Bidyasagar — Online Coaching & Exam Platform",
    metaDescription:
      "Live classes on an auto-allocated Zoom licence pool, a negative-marking exam engine, a referral wallet and three portals — lead developer since May 2026.",
    description:
      "Admin, teacher and student portals for a competitive-exam institute — courses, batches, automated live classes, mock tests, a referral wallet and a book store.",
    year: "2026",
    type: "SaaS",
    engagement: "Gravitones",
    status: "Live",
    featured: false,
    role: "Lead developer at Gravitones since May 2026, on an existing platform",
    duration: "Since May 2026",
    client: "Bidyasagar Classes (India)",
    outcomes: [
      { label: "Portals", value: "3" },
      { label: "Screens", value: "100+" },
      { label: "API routes", value: "400+" },
      { label: "Question types", value: "6" },
    ],
    tech: ["React", "Vite", "TanStack Query", "Node.js", "PostgreSQL", "Razorpay", "Zoom API"],
    keywords: ["edtech platform developer", "online coaching platform", "exam engine"],
    links: { caseStudy: `${STUDIO_WORK}/bidyasagar-online-coaching-platform` },
    cover: {
      src: "/Projects/bidyasagar/cover.webp",
      alt: "Illustration of an online coaching platform: course structure, a live class and a timed mock test",
      illustration: true,
    },
    hasCaseStudy: false,
  },
  {
    slug: "qcs",
    title: "QCS Website & CMS",
    tagline: "QCS — Corporate Website with a 12-Module Admin CMS",
    metaDescription:
      "A 32-page corporate website with a 12-module admin CMS, so the client's team updates every page, job post and blog article themselves — built on the MERN stack.",
    description:
      "Corporate website, careers portal and blog, all driven by a custom admin panel — every heading, image and card is editable by the client's team.",
    year: "2026",
    type: "Web",
    engagement: "Freelance",
    status: "Delivered",
    featured: false,
    role: "Full-stack developer — API, website, admin CMS and design system",
    duration: "Fixed-scope build",
    client: "QCS Software Company",
    outcomes: [
      { label: "Public pages", value: "32" },
      { label: "CMS modules", value: "12" },
      { label: "Content editable", value: "100%" },
      { label: "Themes", value: "Light + dark" },
    ],
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "GSAP"],
    keywords: ["MERN corporate website", "custom CMS developer"],
    links: { caseStudy: `${STUDIO_WORK}/qcs-corporate-website-and-cms` },
    cover: {
      src: "/Projects/qcs/cover.svg",
      alt: "Illustration of the QCS corporate website and admin content management system",
      illustration: true,
    },
    hasCaseStudy: false,
  },
];

/** Categories are derived, so a filter can never exist without results. */
export const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];

export const featuredProjects = projects.filter((p) => p.featured);

export const caseStudyProjects = projects.filter((p) => p.hasCaseStudy);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectHref = (p: Project) =>
  p.hasCaseStudy ? `/works/${p.slug}` : (p.links.caseStudy ?? p.links.live ?? "#works");
