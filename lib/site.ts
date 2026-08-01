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
