/**
 * Structured-data builders.
 *
 * Everything on this site describes ONE entity. The `@id` values below are the
 * mechanism that says so: `${SITE_URL}/#person` is referenced from the
 * homepage, /about, /works and every case study, so a crawler resolves them to
 * a single node instead of four unrelated documents that happen to share a name.
 *
 * Do not change an existing `@id` casually — other pages point at these.
 */

import {
  ALTERNATE_NAMES,
  AUTHOR,
  CREDENTIALS,
  PORTRAIT,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  STUDIO,
  WORKS_FOR,
} from "./site";

export const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  service: `${SITE_URL}/#service`,
  photo: `${SITE_URL}/#photo`,
  organization: `${SITE_URL}/#gravitones`,
  /** The studio's own @id on its site — both sites describe one business. */
  studio: STUDIO.id,
} as const;

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

/**
 * The headshot as a first-class node rather than a bare URL string.
 *
 * A plain `image: "…jpg"` gives Google a file. An ImageObject with dimensions,
 * a caption and an explicit licence gives it something it can actually surface
 * in image search and attach to a person entity — which is the whole point of
 * wanting your face to show up for your own name.
 */
export const photoSchema = () => ({
  "@type": "ImageObject",
  "@id": ID.photo,
  contentUrl: abs(PORTRAIT.square.src),
  url: abs(PORTRAIT.square.src),
  width: PORTRAIT.square.width,
  height: PORTRAIT.square.height,
  caption: PORTRAIT.caption,
  description: PORTRAIT.alt,
  representativeOfPage: true,
  creditText: AUTHOR.name,
  creator: { "@id": ID.person },
  copyrightNotice: `© ${AUTHOR.name}`,
  license: `${SITE_URL}/about`,
  acquireLicensePage: `${SITE_URL}/#contact`,
  /** The same face at the other two aspect ratios Google asks for. */
  thumbnail: {
    "@type": "ImageObject",
    contentUrl: abs(PORTRAIT.wide.src),
    width: PORTRAIT.wide.width,
    height: PORTRAIT.wide.height,
  },
});

/**
 * The Person node. This is the most important object on the site.
 *
 * `disambiguatingDescription` is deliberate: the name is shared with a senior
 * manager at HPCL, several engineers at other firms, and 90+ LinkedIn profiles.
 * Telling Google plainly which one this is beats hoping it guesses.
 */
export const personSchema = () => ({
  "@type": "Person",
  "@id": ID.person,
  name: AUTHOR.name,
  alternateName: [...ALTERNATE_NAMES],
  givenName: "Rasmiranjan",
  familyName: "Sahoo",
  url: SITE_URL,
  mainEntityOfPage: `${SITE_URL}/about`,
  image: { "@id": ID.photo },
  jobTitle: AUTHOR.jobTitle,
  description: SITE_DESCRIPTION,
  disambiguatingDescription:
    "Full-stack, React Native and Gen-AI developer based in Bhubaneswar, Odisha, India — not to be confused with others sharing the name. Founder of the Rathaworks studio (work.rasmiranjan.in) and lead developer of the Vedrastores multi-vendor commerce ecosystem for Kenya, built at Gravitones.",
  email: `mailto:${AUTHOR.email}`,
  knowsLanguage: [
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Hindi", alternateName: "hi" },
    { "@type": "Language", name: "Odia", alternateName: "or" },
  ],
  nationality: { "@type": "Country", name: "India" },
  worksFor: { "@id": ID.organization },
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Developer",
    occupationalCategory: "15-1252.00", // O*NET: Software Developers
    skills: "React, Next.js, React Native, Node.js, TypeScript, Generative AI",
  },
  hasCredential: CREDENTIALS.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    credentialCategory: "certificate",
    dateCreated: c.date,
    recognizedBy: { "@type": "Organization", name: c.issuer },
  })),
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "Expo",
    "Node.js",
    "TypeScript",
    "M-Pesa Integration",
    "E-commerce Architecture",
    "Multi-vendor Marketplaces",
    "Generative AI",
    "LangChain",
    "Firebase",
    "AWS",
  ],
  // The studio's About page describes the same person and links back here.
  sameAs: [...SAME_AS, `${STUDIO.url}/about`],
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: AUTHOR.locality,
      addressRegion: AUTHOR.region,
      addressCountry: AUTHOR.country,
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: AUTHOR.locality,
    addressRegion: AUTHOR.region,
    addressCountry: AUTHOR.country,
  },
});

export const organizationSchema = () => ({
  "@type": "Organization",
  "@id": ID.organization,
  name: WORKS_FOR.name,
  url: WORKS_FOR.url,
  employee: { "@id": ID.person },
});

/** The studio, referenced by the same @id its own site uses. */
export const studioSchema = () => ({
  "@type": "ProfessionalService",
  "@id": ID.studio,
  name: STUDIO.name,
  url: STUDIO.url,
  logo: `${STUDIO.url}/icon.svg`,
  founder: { "@id": ID.person },
  foundingDate: STUDIO.since,
  areaServed: { "@type": "Place", name: "Worldwide" },
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE_URL,
  name: `${SITE_NAME} — Portfolio`,
  alternateName: [...ALTERNATE_NAMES].slice(0, 2),
  description: SITE_DESCRIPTION,
  publisher: { "@id": ID.person },
  copyrightHolder: { "@id": ID.person },
  inLanguage: "en",
});

/**
 * Service, not ProfessionalService — the generic type is discouraged, and a
 * storefront address would cap reach to Odisha when the work is remote.
 */
export const serviceSchema = () => ({
  "@type": "Service",
  "@id": ID.service,
  name: "Web, Mobile and AI Development by Rathaworks",
  provider: { "@id": ID.studio },
  serviceType: "Web and Mobile Application Development",
  areaServed: { "@type": "Place", name: "Worldwide" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: STUDIO.contact,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Development Services",
    itemListElement: [
      "Web Application Development",
      "Mobile App Development (React Native)",
      "E-commerce & Marketplace Development",
      "Generative AI Integration",
    ].map((n) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: n },
    })),
  },
});

/**
 * ProfilePage is Google's dedicated type for "this page is about this person".
 * It is what makes the homepage legible as an identity page rather than a
 * generic website, and it is a documented input to person-entity handling.
 */
export const profilePageSchema = (url: string, name: string) => ({
  "@type": "ProfilePage",
  "@id": `${url}#profilepage`,
  url,
  name,
  isPartOf: { "@id": ID.website },
  about: { "@id": ID.person },
  mainEntity: { "@id": ID.person },
  primaryImageOfPage: { "@id": ID.photo },
  inLanguage: "en",
});

export const breadcrumbSchema = (trail: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: t.url,
  })),
});

export const faqSchema = (
  id: string,
  qa: { question: string; answer: string }[],
) => ({
  "@type": "FAQPage",
  "@id": id,
  mainEntity: qa.map((x) => ({
    "@type": "Question",
    name: x.question,
    acceptedAnswer: { "@type": "Answer", text: x.answer },
  })),
});

/**
 * The questions a person actually asks about a name they have just encountered.
 *
 * These exist to be quoted — by a People-Also-Ask box, by an AI Overview, by
 * ChatGPT. Each answer is self-contained and leads with the name, because a
 * quoted fragment loses its context.
 */
export const IDENTITY_FAQ = [
  {
    question: "Who is Rasmiranjan Sahoo?",
    answer:
      "Rasmiranjan Sahoo is a full-stack and React Native developer based in Bhubaneswar, Odisha, India, and the founder of Rathaworks, a one-developer web, app and software studio at work.rasmiranjan.in. Rasmiranjan builds production e-commerce platforms, cross-platform mobile apps and Gen-AI integrations with Next.js, React Native and Node.js, and is a Software Development Engineer at Gravitones. The personal portfolio is at rasmiranjan.in.",
  },
  {
    question: "What has Rasmiranjan Sahoo built?",
    answer:
      "The flagship project is the Vedrastores commerce ecosystem for the Kenyan market: four interconnected web platforms (marketing site, buyer portal, vendor dashboard and admin panel) plus two React Native apps for buyers and riders, with live M-Pesa payments — all six codebases built in four months as the sole developer at Gravitones. Rasmiranjan has also led the Bookiee bus-booking platform, a five-app restaurant delivery system, the QuickBite creator app and the Bidyasagar Classes coaching platform at Gravitones.",
  },
  {
    question: "Is Rasmiranjan Sahoo available for hire?",
    answer:
      "Yes. Client projects — websites, apps and business software — run through Rasmiranjan Sahoo's studio, Rathaworks, at work.rasmiranjan.in, with fixed-price proposals and weekly demos. Other enquiries go through the contact form at rasmiranjan.in or rasmiranjansahoo702@gmail.com, and every enquiry gets a reply within 24 hours.",
  },
  {
    question: "What technologies does Rasmiranjan Sahoo work with?",
    answer:
      "React, Next.js, TypeScript and Tailwind CSS on the front end; React Native and Expo for Android and iOS; Node.js, Express, MongoDB, Redis and Firebase on the back end; AWS S3 and CloudFront for infrastructure; and OpenAI, LangChain and agentic SDKs for Gen-AI integration. He has shipped M-Pesa payments via the Safaricom Daraja API.",
  },
  {
    question: "Where is Rasmiranjan Sahoo based?",
    answer:
      "Rasmiranjan Sahoo is based in Bhubaneswar, Odisha, India (IST, UTC+5:30) and works remotely with clients internationally, including delivered projects for the Kenyan market.",
  },
  {
    question: "How can I contact Rasmiranjan Sahoo?",
    answer:
      "For a project, through the Rathaworks studio at work.rasmiranjan.in/contact. Otherwise through the contact form at rasmiranjan.in, by email at rasmiranjansahoo702@gmail.com, on LinkedIn at linkedin.com/in/rasmiranjansahoo702, or on GitHub at github.com/rasmi29.",
  },
];

/** Serialises a @graph, escaping the one sequence that can break out of a <script>. */
export const jsonLdScript = (nodes: object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
    /</g,
    "\\u003c",
  );
