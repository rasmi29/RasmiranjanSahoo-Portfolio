/**
 * Single source of truth for site-wide identity.
 * Never hardcode the domain anywhere else — import SITE_URL.
 */

import resumeMeta from "@/resume/meta.json";
import { inventoryTotals } from "@/lib/workInventory";

export const SITE_URL = "https://rasmiranjan.in";

export const SITE_NAME = "Rasmiranjan Sahoo";

export const SITE_TAGLINE = "Full-Stack Developer · Rathaworks";

export const SITE_DESCRIPTION =
  "Full-stack & React Native developer in Bhubaneswar, India, founder of Rathaworks. 24 websites and portals, 8 mobile apps — marketplaces, booking, delivery, EdTech.";

/**
 * Counted from the itemised list behind /projects, so every number on the site
 * can be checked against it. "websites" counts each portal separately, and
 * "apps" includes the ones still in development: say so wherever it's shown.
 */
export const STATS = {
  websites: inventoryTotals.web,
  apps: inventoryTotals.mobile,
  appsInDevelopment: inventoryTotals.mobileInDevelopment,
} as const;

export const AUTHOR = {
  name: "Rasmiranjan Sahoo",
  email: "rasmiranjansahoo702@gmail.com",
  jobTitle: "Full-Stack Developer",
  locality: "Bhubaneswar",
  region: "Odisha",
  country: "IN",
  github: "https://github.com/rasmi29",
  linkedin: "https://www.linkedin.com/in/rasmiranjansahoo702/",
  // The active account (324 posts). @RasmiRanjan29 is an empty duplicate —
  // pointing sameAs at it told Google the wrong profile was this person.
  twitter: "@Rasmiranjan09",
} as const;

/**
 * Name variants a real person actually types or writes.
 *
 * This is disambiguation, not keyword stuffing — there are 90+ "Rasmiranjan
 * Sahoo" profiles on LinkedIn alone, and Odia names routinely appear with the
 * `h` ("Rashmi") and with the first name split in two. Every variant here is a
 * spelling of the same human, which is exactly what `alternateName` is for.
 */
/**
 * What people actually call him. It leads `alternateName` and appears in
 * visible copy on / and /about — schema alone never ranks a name, so the
 * nickname has to be readable on the page too.
 */
export const NICKNAME = "Rasmi";

export const ALTERNATE_NAMES = [
  NICKNAME,
  "Rasmi Ranjan Sahoo",
  "Rashmiranjan Sahoo",
  "Rashmi Ranjan Sahoo",
  "Rasmiranjan",
  "Rasmi Sahoo",
] as const;

/**
 * `sameAs` — the single strongest signal Google has for deciding that the
 * developer, the GitHub account and the LinkedIn profile are ONE entity, and
 * for eventually attaching a photo to that entity.
 *
 * Two rules, both load-bearing:
 *   1. Only list profiles that resolve. A 404 in `sameAs` is a negative signal.
 *   2. Each profile must link BACK to https://rasmiranjan.in. Reciprocity is
 *      what turns a claim into a verified one. See SEO-PLAYBOOK.md.
 */
export const PROFILES: { name: string; url: string }[] = [
  { name: "GitHub", url: AUTHOR.github },
  { name: "LinkedIn", url: AUTHOR.linkedin },
  { name: "X", url: "https://x.com/Rasmiranjan09" },
  // The handle carries no part of the name, so this link (plus the profile's
  // Name field) is what ties @mr_rasmi_ to Rasmiranjan Sahoo for Google.
  { name: "Instagram", url: "https://www.instagram.com/mr_rasmi_/" },
  // Add as you create them — each verified profile that links back is another
  // corroborating edge in the entity graph:
  // { name: "Peerlist", url: "https://peerlist.io/…" },
  // { name: "Dev.to", url: "https://dev.to/…" },
  // { name: "Stack Overflow", url: "https://stackoverflow.com/users/…" },
  // { name: "Medium", url: "https://medium.com/@…" },
];

export const SAME_AS = PROFILES.map((p) => p.url);

/** Employment and credentials — all corroborated by the site's own content. */
export const WORKS_FOR = {
  name: "Gravitones",
  url: "https://gravitones.com",
  role: "Software Development Engineer",
  since: "2025-10",
} as const;

/**
 * The studio that takes client projects. Its site is the place to send anyone
 * who wants something built; this site stays the personal/identity page.
 * `id` must match the studio site's own JSON-LD @id, so both sites describe
 * one business. When rathaworks.com is live, change url, contact and id.
 */
export const STUDIO = {
  name: "Rathaworks",
  url: "https://work.rasmiranjan.in",
  contact: "https://work.rasmiranjan.in/contact",
  id: "https://work.rasmiranjan.in/#business",
  since: "2026",
} as const;

export const CREDENTIALS = [
  { name: "Generative AI Fundamentals", issuer: "Chai Code", date: "2026-05" },
  { name: "Web Development Certificate", issuer: "Chai Code", date: "2025-07" },
  { name: "Frontend Development", issuer: "Meta (Coursera)", date: "2024-10" },
] as const;

/**
 * The headshot, in the three shapes Google asks for when it considers an image
 * for a person entity. Filenames carry the name on purpose — the filename is a
 * genuine (if minor) Google Images ranking input, and `rasmi.webp` told a
 * crawler nothing.
 */
export const PORTRAIT = {
  /** 4:3 — canonical original. */
  wide: { src: "/rasmiranjan-sahoo.webp", width: 1400, height: 1050 },
  /** 1:1 — what a knowledge panel / avatar slot wants. */
  square: { src: "/rasmiranjan-sahoo-square.jpg", width: 1200, height: 1200 },
  /** 3:4 — the aspect the About section actually renders. */
  portrait: { src: "/rasmiranjan-sahoo-portrait.webp", width: 900, height: 1200 },
  alt: "Rasmiranjan Sahoo, full-stack and React Native developer and founder of Rathaworks, based in Bhubaneswar, Odisha, India",
  caption:
    "Rasmiranjan Sahoo — full-stack and React Native developer, founder of Rathaworks.",
} as const;

/**
 * Search Console / Bing verification. Set these in the GitHub Actions env so
 * the token never sits in the repo. Empty string = tag omitted entirely.
 */
export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
} as const;

/**
 * The resume — self-hosted, so it can't rot when Drive sharing settings
 * change, and so the Download button's `download` attribute actually works
 * (browsers ignore it on cross-origin URLs like Google Drive).
 *
 * Every artefact is generated from resume/resume.html by `npm run resume`:
 * the PDF, the preview image the viewer animates, and meta.json (updated date
 * and size). Edit the HTML, never the outputs.
 *
 * `page` is what every "Resume" button links to. With JavaScript it opens the
 * animated viewer in place; without it (or on a middle-click) it is a real
 * page at /resume.
 */
export const RESUME = {
  page: "/resume",
  pdf: "/rasmiranjan-sahoo-resume.pdf",
  /** What the file is saved as. Carries the name, like the headshots. */
  fileName: "Rasmiranjan-Sahoo-Resume.pdf",
  preview: {
    src: "/rasmiranjan-sahoo-resume.webp",
    width: resumeMeta.preview.width,
    height: resumeMeta.preview.height,
  },
  /** ISO date of the last `npm run resume`. */
  updated: resumeMeta.updated,
  pdfKB: resumeMeta.pdfKB,
} as const;

/**
 * Web3Forms access key. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local
 * (and as a repo secret / workflow env for the GitHub Pages build).
 * Get a free key at https://web3forms.com — no account required.
 */
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

/**
 * `href` is a real, crawlable URL; `section` is the homepage block the header
 * smooth-scrolls to instead. Google builds sitelinks from links to separate
 * pages — the menu used to be <button>s that pointed nowhere a crawler could
 * follow, so it contributed nothing.
 */
export const NAV_ITEMS = [
  { name: "Home", href: "/", section: "home", index: "01" },
  { name: "Works", href: "/works", section: "works", index: "02" },
  { name: "About", href: "/about", section: "about", index: "03" },
  { name: "Skills", href: "/#skills", section: "skills", index: "04" },
  { name: "Writing", href: "/writing", section: "writing", index: "05" },
  { name: "Contact", href: "/contact", section: "contact", index: "06" },
] as const;

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
