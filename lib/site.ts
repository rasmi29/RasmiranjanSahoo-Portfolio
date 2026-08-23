/**
 * Single source of truth for site-wide identity.
 * Never hardcode the domain anywhere else — import SITE_URL.
 */

export const SITE_URL = "https://rasmiranjan.in";

export const SITE_NAME = "Rasmiranjan Sahoo";

export const SITE_TAGLINE =
  "Freelance Full-Stack & React Native Developer";

export const SITE_DESCRIPTION =
  "Freelance full-stack developer building production e-commerce platforms, React Native apps and Gen-AI integrations. Shipped a 4-platform, 2-app commerce ecosystem for the Kenyan market in 4 months. Available worldwide.";

export const AUTHOR = {
  name: "Rasmiranjan Sahoo",
  email: "rasmiranjansahoo702@gmail.com",
  jobTitle: "Freelance Full-Stack Developer",
  locality: "Bhubaneswar",
  region: "Odisha",
  country: "IN",
  github: "https://github.com/rasmi29",
  linkedin: "https://www.linkedin.com/in/rasmiranjansahoo702/",
  twitter: "@rasmiranjan29",
} as const;

/**
 * Name variants a real person actually types or writes.
 *
 * This is disambiguation, not keyword stuffing — there are 90+ "Rasmiranjan
 * Sahoo" profiles on LinkedIn alone, and Odia names routinely appear with the
 * `h` ("Rashmi") and with the first name split in two. Every variant here is a
 * spelling of the same human, which is exactly what `alternateName` is for.
 */
export const ALTERNATE_NAMES = [
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
  { name: "X", url: "https://x.com/RasmiRanjan29" },
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
  role: "Software Development Engineer",
  since: "2025-10",
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
  alt: "Rasmiranjan Sahoo, freelance full-stack and React Native developer based in Bhubaneswar, Odisha, India",
  caption:
    "Rasmiranjan Sahoo — freelance full-stack, React Native and Gen-AI developer.",
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
 * Single canonical resume link.
 *
 * The site previously shipped TWO different Google Drive file IDs — the header
 * pointed at one resume, every other link pointed at another.
 *
 * TODO: drop your PDF at `public/resume.pdf` and change this to "/resume.pdf".
 * Self-hosting makes the `download` attribute actually work (it is silently
 * ignored on cross-origin URLs) and stops the link rotting if Drive sharing
 * settings change.
 */
export const RESUME_URL =
  "https://drive.google.com/file/d/1ppX0jXZ7ipvF5q_grkefQOPvcpDLU2LY/view";

/**
 * Web3Forms access key. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local
 * (and as a repo secret / workflow env for the GitHub Pages build).
 * Get a free key at https://web3forms.com — no account required.
 */
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export const NAV_ITEMS = [
  { name: "Home", href: "#home", index: "01" },
  { name: "Works", href: "#works", index: "02" },
  { name: "About", href: "#about", index: "03" },
  { name: "Skills", href: "#skills", index: "04" },
  { name: "Contact", href: "#contact", index: "05" },
] as const;

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
