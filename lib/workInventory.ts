/**
 * Everything built, one row per app or portal. Drives the /projects page,
 * whose totals are counted from this list so they can never drift from it.
 *
 * Rules for editing, because recruiters will click and check:
 *   - Only link what a visitor can open. Staff and admin panels get a note
 *     instead of a URL: a login wall proves nothing and advertises the address.
 *   - List only what Rasmiranjan worked on. Hike Cinema's mobile apps are not
 *     here, for example, because he works on its website and admin portal.
 *   - This repo is public. A client who asked not to be named must not appear
 *     anywhere in this file, including in comments or URLs.
 */

export type SurfaceStatus = "Live" | "Delivered" | "In development" | "In use";

export interface Surface {
  name: string;
  kind: "Web" | "Mobile";
  /** Only where it has been confirmed. */
  platforms?: string;
  status: SurfaceStatus;
  links?: { label: string; href: string }[];
  /** Shown when there is nothing public to link to. */
  note?: string;
}

export interface WorkEntry {
  id: string;
  name: string;
  summary: string;
  role: string;
  period: string;
  engagement: "Gravitones" | "Freelance" | "Personal";
  stack: string;
  /** Slug in lib/projects.ts, when the project has a page on this site. */
  projectSlug?: string;
  surfaces: Surface[];
}

const LOGIN_ONLY = "Staff login only. Walkthrough on request";

export const workInventory: WorkEntry[] = [
  {
    id: "hike-cinema",
    name: "Hike Cinema",
    summary: "Micro-drama streaming service. I work on the website and the portal staff use to run the content.",
    role: "Frontend developer (external, via Gravitones)",
    period: "May 2026 – present",
    engagement: "Gravitones",
    stack: "Next.js, TypeScript, Tailwind CSS, React, Redux",
    surfaces: [
      {
        name: "Website and landing page",
        kind: "Web",
        status: "Live",
        links: [{ label: "hikecinema.com", href: "https://hikecinema.com" }],
      },
      { name: "Admin portal", kind: "Web", status: "In use", note: LOGIN_ONLY },
    ],
  },
  {
    id: "zyrilo",
    name: "Zyrilo",
    summary: "Creator-led food discovery: food reels, restaurant offers and in-store QR redemption.",
    role: "Lead developer",
    period: "Sep 2026 – present",
    engagement: "Gravitones",
    stack: "React Native, Expo, Node.js, PostgreSQL, MongoDB, Redis",
    projectSlug: "zyrilo",
    surfaces: [
      {
        name: "Website",
        kind: "Web",
        status: "Live",
        links: [{ label: "zyrilo.app", href: "https://zyrilo.app" }],
      },
      { name: "Mobile app", kind: "Mobile", status: "In development", note: "Not in the stores yet" },
      { name: "Admin panel", kind: "Web", status: "In development", note: LOGIN_ONLY },
    ],
  },
  {
    id: "bookiee",
    name: "Bookiee",
    summary: "Bus booking marketplace with seat holds that rule out double-booking.",
    role: "Lead developer",
    period: "Delivered in 3 months",
    engagement: "Gravitones",
    stack: "React Native, Expo, React, Node.js, PostgreSQL, Redis",
    projectSlug: "bookiee",
    surfaces: [
      { name: "Passenger mobile app", kind: "Mobile", status: "Delivered", note: "No public listing yet" },
      {
        name: "Website",
        kind: "Web",
        status: "Live",
        links: [{ label: "bookiee.co", href: "https://bookiee.co" }],
      },
      { name: "Operator portal", kind: "Web", status: "Delivered", note: LOGIN_ONLY },
      { name: "Admin portal", kind: "Web", status: "Delivered", note: LOGIN_ONLY },
    ],
  },
  {
    id: "restaurant-delivery",
    name: "Restaurant Delivery Platform",
    summary: "Lets one restaurant, Devee Kitchen, run its own delivery instead of paying an aggregator.",
    role: "Lead developer",
    period: "Delivered in 2 months",
    engagement: "Gravitones",
    stack: "React Native, Expo, React, Node.js, PostgreSQL, Socket.IO",
    projectSlug: "restaurant-delivery",
    surfaces: [
      {
        name: "Customer mobile app",
        kind: "Mobile",
        status: "Live",
        links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.deveekitchen.app" }],
      },
      { name: "Rider mobile app", kind: "Mobile", status: "Delivered", note: "No public listing" },
      {
        name: "Customer website",
        kind: "Web",
        status: "Live",
        links: [{ label: "deveekitchen.com", href: "https://deveekitchen.com" }],
      },
      { name: "Restaurant (kitchen) portal", kind: "Web", status: "Delivered", note: LOGIN_ONLY },
      { name: "Owner admin panel", kind: "Web", status: "Delivered", note: LOGIN_ONLY },
    ],
  },
  {
    id: "bidyasagar",
    name: "Bidyasagar Classes",
    summary: "Online coaching and exam platform. I took over the live web platform and am building its new student app.",
    role: "Lead developer since May 2026",
    period: "May 2026 – present",
    engagement: "Gravitones",
    stack: "React, Vite, Node.js, PostgreSQL, React Native, Expo",
    projectSlug: "bidyasagar",
    surfaces: [
      {
        name: "Student portal",
        kind: "Web",
        status: "Live",
        links: [{ label: "bidyasagar.ai", href: "https://bidyasagar.ai" }],
      },
      { name: "Teacher portal", kind: "Web", status: "Live", note: LOGIN_ONLY },
      { name: "Admin portal", kind: "Web", status: "Live", note: LOGIN_ONLY },
      { name: "Student mobile app", kind: "Mobile", status: "In development", note: "Not in the stores yet" },
    ],
  },
  {
    id: "vedrastores",
    name: "Vedrastores",
    summary: "Multi-vendor e-commerce for Kenya, with live M-Pesa payments.",
    role: "Sole developer",
    period: "Delivered in 4 months",
    engagement: "Gravitones",
    stack: "Next.js, React Native, Expo, Node.js, Firebase, AWS, M-Pesa",
    projectSlug: "vedrastores",
    surfaces: [
      {
        name: "Marketing website",
        kind: "Web",
        status: "Live",
        links: [{ label: "shop.vedrastores.co.ke", href: "https://shop.vedrastores.co.ke" }],
      },
      {
        name: "Buyer web portal",
        kind: "Web",
        status: "Live",
        links: [{ label: "vedrastores.co.ke", href: "https://vedrastores.co.ke" }],
      },
      {
        name: "Vendor portal",
        kind: "Web",
        status: "Live",
        links: [{ label: "vendor.vedrastores.co.ke", href: "https://vendor.vedrastores.co.ke" }],
        note: "Seller login",
      },
      { name: "Admin panel", kind: "Web", status: "Live", note: LOGIN_ONLY },
      {
        name: "Buyer mobile app",
        kind: "Mobile",
        platforms: "Android and iOS",
        status: "Live",
        links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.nexus.buyer" }],
      },
      {
        name: "Rider mobile app",
        kind: "Mobile",
        platforms: "Android only",
        status: "Live",
        note: "Given directly to riders, not on Google Play",
      },
    ],
  },
  {
    id: "crickse",
    name: "CrickSe",
    summary: "Live cricket predictions, win probability and match intelligence.",
    role: "Mobile and admin panel developer, as part of a team",
    period: "Oct 2025 – May 2026",
    engagement: "Gravitones",
    stack: "React Native, Expo, React, TypeScript, Vite",
    surfaces: [
      {
        name: "Mobile app",
        kind: "Mobile",
        platforms: "Android and iOS",
        status: "Live",
        links: [
          { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.crickse.app" },
          { label: "App Store", href: "https://apps.apple.com/us/app/crickse/id6761364221" },
        ],
      },
      { name: "Admin panel", kind: "Web", status: "Delivered", note: LOGIN_ONLY },
    ],
  },
  {
    id: "qcs",
    name: "QCS",
    summary: "Corporate website, careers portal and blog, all editable from a custom CMS.",
    role: "Full-stack developer",
    period: "Delivered 2026",
    engagement: "Freelance",
    stack: "React, Vite, Node.js, Express, MongoDB",
    projectSlug: "qcs",
    surfaces: [
      {
        name: "Corporate website",
        kind: "Web",
        status: "Live",
        links: [{ label: "qcsgroups.com", href: "https://qcsgroups.com" }],
      },
      { name: "Admin CMS", kind: "Web", status: "Delivered", note: LOGIN_ONLY },
    ],
  },
  {
    id: "wayline",
    name: "Wayline",
    summary: "Bus-booking brand site with a live seat-lock demo. A personal UI build, not a client product.",
    role: "Brand, UI design and front-end",
    period: "Oct – Nov 2026",
    engagement: "Personal",
    stack: "React 19, TypeScript, GSAP, Lottie",
    projectSlug: "wayline-landing",
    surfaces: [
      {
        name: "Landing page",
        kind: "Web",
        status: "Live",
        links: [{ label: "bus-booking-murex.vercel.app", href: "https://bus-booking-murex.vercel.app" }],
      },
    ],
  },
  {
    id: "quickbite",
    name: "QuickBite",
    summary: "Food-reels landing page with 16 animated sections. A personal UI build, not a client product.",
    role: "UI design and front-end",
    period: "Oct 2026",
    engagement: "Personal",
    stack: "Next.js, TypeScript, GSAP, Motion",
    projectSlug: "quickbite-landing",
    surfaces: [
      {
        name: "Landing page",
        kind: "Web",
        status: "Live",
        links: [{ label: "quickbyte-xi.vercel.app", href: "https://quickbyte-xi.vercel.app" }],
      },
    ],
  },
  {
    id: "rathaworks",
    name: "Rathaworks",
    summary: "My web studio's site, with a 3D hero and case studies.",
    role: "Founder, design and development",
    period: "2026",
    engagement: "Personal",
    stack: "Next.js, React Three Fiber, GSAP",
    surfaces: [
      {
        name: "Studio website",
        kind: "Web",
        status: "Live",
        links: [{ label: "work.rasmiranjan.in", href: "https://work.rasmiranjan.in" }],
      },
    ],
  },
  {
    id: "portfolio",
    name: "This portfolio",
    summary: "The site you are on.",
    role: "Design and development",
    period: "2026",
    engagement: "Personal",
    stack: "Next.js, TypeScript, Tailwind CSS, Framer Motion",
    surfaces: [
      {
        name: "Portfolio website",
        kind: "Web",
        status: "Live",
        links: [{ label: "rasmiranjan.in", href: "https://rasmiranjan.in" }],
      },
    ],
  },
];

const allSurfaces = workInventory.flatMap((entry) => entry.surfaces);

/** Counted, never typed, so the page cannot disagree with its own list. */
export const inventoryTotals = {
  projects: workInventory.length,
  web: allSurfaces.filter((s) => s.kind === "Web").length,
  mobile: allSurfaces.filter((s) => s.kind === "Mobile").length,
  mobileInDevelopment: allSurfaces.filter((s) => s.kind === "Mobile" && s.status === "In development").length,
  publicLinks: allSurfaces.filter((s) => s.links?.length).length,
};
