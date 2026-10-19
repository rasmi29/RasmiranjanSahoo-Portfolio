import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ALTERNATE_NAMES,
  AUTHOR,
  CREDENTIALS,
  PORTRAIT,
  PROFILES,
  SITE_URL,
  STUDIO,
  WORKS_FOR,
} from "@/lib/site";
import {
  IDENTITY_FAQ,
  breadcrumbSchema,
  faqSchema,
  jsonLdScript,
  profilePageSchema,
} from "@/lib/seo";

/*
 * The entity hub.
 *
 * The homepage is a portfolio — it sells. This page exists to answer one
 * question unambiguously for a machine: *which* Rasmiranjan Sahoo is this?
 * That matters because the name is shared with a senior manager at HPCL,
 * engineers at Prodapt and Andolasoft, and 90+ other LinkedIn profiles.
 *
 * So the copy here is deliberately plain, factual and specific. Every claim is
 * checkable against another page on this site. Nothing is padded for keywords —
 * a page that reads as written-for-crawlers is the one Google discounts.
 */

const TITLE = "About Rasmiranjan Sahoo — Developer & Founder of Rathaworks";
const DESCRIPTION =
  "Rasmiranjan Sahoo is a full-stack and React Native developer in Bhubaneswar, India — founder of the Rathaworks studio and an engineer at Gravitones.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    /* og:type=profile emits profile:first_name / profile:last_name with the
       correct `property=` attribute — which `metadata.other` cannot do, since
       it always writes `name=`. Scrapers building a person card read these. */
    type: "profile",
    firstName: "Rasmiranjan",
    lastName: "Sahoo",
    username: "rasmi29",
    gender: "male",
    url: `${SITE_URL}/about`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: PORTRAIT.square.src,
        width: PORTRAIT.square.width,
        height: PORTRAIT.square.height,
        alt: PORTRAIT.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [PORTRAIT.square.src],
  },
};

/*
 * Page-level nodes only. Person, ImageObject, Organization, WebSite and
 * Service are emitted once by the root layout; repeating them here would just
 * duplicate bytes on every page. These reference those nodes by @id instead.
 *
 * The FAQPage lives here and nowhere else, because this is the only page that
 * actually renders the answers — which is Google's condition for the markup
 * being eligible at all.
 */
const jsonLd = jsonLdScript([
  profilePageSchema(`${SITE_URL}/about`, TITLE),
  faqSchema(`${SITE_URL}/about#faq`, IDENTITY_FAQ),
  breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "About", url: `${SITE_URL}/about` },
  ]),
]);

/** Facts a person or a model can lift verbatim. Keep every row checkable. */
const FACTS: { term: string; detail: React.ReactNode }[] = [
  { term: "Full name", detail: AUTHOR.name },
  { term: "Also written as", detail: ALTERNATE_NAMES.join(" · ") },
  { term: "Role", detail: "Full-stack & React Native developer" },
  {
    term: "Studio",
    detail: (
      <a
        href={STUDIO.url}
        className="underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500"
      >
        Founder, Rathaworks — work.rasmiranjan.in
      </a>
    ),
  },
  {
    term: "Current position",
    detail: `${WORKS_FOR.role}, ${WORKS_FOR.name} (since October 2025)`,
  },
  {
    term: "Based in",
    detail: `${AUTHOR.locality}, ${AUTHOR.region}, India (IST, UTC+5:30)`,
  },
  { term: "Works with", detail: "Clients worldwide, remotely" },
  {
    term: "Core stack",
    detail: "Next.js · React · TypeScript · React Native · Node.js · MongoDB",
  },
  { term: "Also", detail: "Gen-AI integration, M-Pesa payments, AWS" },
  { term: "Languages", detail: "English · Hindi · Odia" },
  {
    term: "Contact",
    detail: (
      <a
        href={`mailto:${AUTHOR.email}`}
        className="underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500"
      >
        {AUTHOR.email}
      </a>
    ),
  },
];

const CAREER = [
  {
    role: "Founder",
    org: "Rathaworks",
    period: "2026 — Present",
    detail:
      "A one-developer studio for websites, apps and business software, with fixed-price proposals, weekly demos and code the client owns. Client projects start at work.rasmiranjan.in.",
  },
  {
    role: "Software Development Engineer",
    org: "Gravitones",
    period: "Oct 2025 — Present",
    detail:
      "Lead developer on client platforms — the Vedrastores marketplace (sole developer), the Bookiee bus-booking platform, a five-app restaurant delivery system and the QuickBite creator app — and lead on the Bidyasagar Classes coaching platform since May 2026.",
  },
  {
    role: "MERN Intern",
    org: "Gravity Engineering Services",
    period: "Sept 2025 — Oct 2025",
    detail:
      "Shipped features and hardened the data layer on a multi-tenant platform.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <nav
        aria-label="Breadcrumb"
        className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-black/60 backdrop-blur-md"
      >
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back home
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            About
          </span>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 pt-40 pb-32">
        {/* ---------- Identity ---------- */}
        <header className="mb-20 grid gap-12 md:grid-cols-[280px_1fr] md:items-start">
          {/*
            A <figure> with a real <figcaption>, not a bare <img>. Google reads
            the text immediately surrounding an image to decide what that image
            depicts — this is the cheapest, most-ignored image-SEO win there is.
          */}
          <figure className="m-0">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-white/10 bg-neutral-900">
              <Image
                src={PORTRAIT.square.src}
                alt={PORTRAIT.alt}
                width={PORTRAIT.square.width}
                height={PORTRAIT.square.height}
                priority
                sizes="(max-width: 768px) 100vw, 280px"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-neutral-400">
              {PORTRAIT.caption}
            </figcaption>
          </figure>

          <div>
            <span className="mb-4 block font-mono text-sm text-emerald-400">
              / WHO I AM
            </span>
            <h1 className="mb-6 text-5xl font-bold leading-[0.95] tracking-tighter md:text-6xl">
              Rasmiranjan
              <br />
              <span className="text-neutral-400">Sahoo</span>
            </h1>
            <p className="border-l-2 border-emerald-500/30 pl-6 text-lg font-light leading-relaxed text-neutral-200">
              I am a <strong className="font-normal text-white">full-stack
              and React Native developer</strong> based in Bhubaneswar, Odisha,
              India, and the founder of{" "}
              <a href={STUDIO.url} className="text-white underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500">
                Rathaworks
              </a>
              , a one-developer studio for clients worldwide. I build production e-commerce platforms, cross-platform mobile apps
              and Gen-AI integrations — and I handle the whole stack:
              architecture, backend, interface and release.
            </p>
          </div>
        </header>

        {/* ---------- Disambiguation ---------- */}
        <section aria-labelledby="facts" className="mb-24">
          <h2
            id="facts"
            className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400"
          >
            / AT A GLANCE
          </h2>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {FACTS.map((f) => (
              <div
                key={f.term}
                className="grid gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-6"
              >
                <dt className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  {f.term}
                </dt>
                <dd className="text-neutral-200">{f.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-neutral-400">
            Several people share this name. This page is about the software
            developer behind{" "}
            <a
              href={SITE_URL}
              className="text-neutral-200 underline decoration-emerald-500/40 underline-offset-4"
            >
              rasmiranjan.in
            </a>{" "}
            — the same person as{" "}
            {PROFILES.map((p, i) => (
              <span key={p.url}>
                {i > 0 && (i === PROFILES.length - 1 ? " and " : ", ")}
                <a
                  href={p.url}
                  rel="me noopener noreferrer"
                  target="_blank"
                  className="text-neutral-200 underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500"
                >
                  {p.name}
                </a>
              </span>
            ))}
            .
          </p>
        </section>

        {/* ---------- Work ---------- */}
        <section aria-labelledby="work" className="mb-24">
          <h2
            id="work"
            className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400"
          >
            / WHAT I BUILD
          </h2>
          <div className="space-y-6 text-lg font-light leading-relaxed text-neutral-200">
            <p>
              My flagship project is the{" "}
              <Link
                href="/works/vedrastores"
                className="text-white underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500"
              >
                Vedrastores commerce ecosystem
              </Link>{" "}
              for the Kenyan market: four interconnected web platforms — a
              marketing site, a buyer portal, a vendor dashboard and an admin
              panel — plus two React Native apps for buyers and riders, with
              live M-Pesa payments through the Safaricom Daraja API. Six
              codebases, designed and built as the sole developer at
              Gravitones in four months.
            </p>
            <p>
              Day to day that means Next.js, React and TypeScript on the front
              end; React Native and Expo for Android and iOS; Node.js, Express,
              MongoDB, Redis and Firebase behind them; and AWS S3 with
              CloudFront for delivery. I also integrate LLMs — OpenAI, LangChain
              and agentic SDKs — into products that need them rather than as
              decoration.
            </p>
          </div>
          <Link
            href="/works"
            className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-emerald-400"
          >
            See the case studies
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </section>

        {/* ---------- Career ---------- */}
        <section aria-labelledby="career" className="mb-24">
          <h2
            id="career"
            className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400"
          >
            / CAREER
          </h2>
          <ol className="space-y-8">
            {CAREER.map((c) => (
              <li key={c.role} className="border-l border-white/10 pl-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-bold text-white">{c.role}</h3>
                  <span className="font-mono text-xs text-neutral-400">
                    {c.period}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  {c.org}
                </p>
                <p className="mt-3 max-w-2xl leading-relaxed text-neutral-300">
                  {c.detail}
                </p>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
            Certifications
          </h3>
          <ul className="space-y-2 text-neutral-300">
            {CREDENTIALS.map((c) => (
              <li key={c.name} className="flex flex-wrap gap-x-2">
                <span className="text-white">{c.name}</span>
                <span className="text-neutral-400">— {c.issuer}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- FAQ ----------
            Rendered as visible text, not schema-only. Google requires the
            answer to be on the page for FAQ markup to be eligible at all, and
            an AI Overview can only quote what it can read. */}
        <section aria-labelledby="faq" className="mb-24">
          <h2
            id="faq"
            className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400"
          >
            / FREQUENTLY ASKED
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {IDENTITY_FAQ.map((qa) => (
              <details key={qa.question} className="group py-5" open>
                <summary className="cursor-pointer list-none text-lg font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="mr-3 text-emerald-400">→</span>
                  {qa.question}
                </summary>
                <p className="mt-3 max-w-3xl pl-7 leading-relaxed text-neutral-300">
                  {qa.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="border-t border-white/10 pt-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tighter md:text-4xl">
            Want to work together?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-neutral-300">
            Tell me what you&apos;re building and I&apos;ll come back with an
            approach, a timeline and a number — usually within 24 hours.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-emerald-400"
          >
            Start a project
          </Link>
        </section>
      </div>
    </main>
  );
}
