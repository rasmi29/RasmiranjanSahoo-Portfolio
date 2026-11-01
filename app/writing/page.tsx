import type { Metadata } from "next";
import Link from "next/link";
import { articles, INSIGHTS_URL } from "@/lib/writing";
import { projectHref, projects } from "@/lib/projects";
import { AUTHOR, SITE_URL, STUDIO } from "@/lib/site";
import { ID, breadcrumbSchema, jsonLdScript } from "@/lib/seo";

/*
 * An index of the engineering articles, each linking to its one canonical
 * copy on the studio site. It gives this domain a "Writing" page Google can
 * offer as a sitelink, and ties every article back to the project page it
 * draws on — internal links with descriptive anchors.
 */

const TITLE = "Writing — Engineering Articles by Rasmiranjan Sahoo";
const DESCRIPTION =
  "Articles by Rasmiranjan Sahoo on how real products get built: seat locks for bus booking, M-Pesa STK Push, payments ledgers, live-class scheduling and restaurant delivery.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/writing`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

/** "Bookiee" → the Bookiee project, so each article links to its project page. */
const projectFor = (name?: string) =>
  name ? projects.find((p) => p.title.toLowerCase().startsWith(name.toLowerCase())) : undefined;

const jsonLd = jsonLdScript([
  {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/writing#page`,
    url: `${SITE_URL}/writing`,
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.person },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          url: a.url,
          datePublished: a.date,
          author: { "@id": ID.person },
        },
      })),
    },
  },
  breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Writing", url: `${SITE_URL}/writing` },
  ]),
]);

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

export default function WritingPage() {
  return (
    <main id="main" className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <nav
        aria-label="Breadcrumb"
        className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-black/60 backdrop-blur-md"
      >
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back home
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">Writing</span>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 pt-40 pb-32">
        <header className="mb-16">
          <span className="mb-4 block font-mono text-sm text-emerald-400">/ WRITING</span>
          <h1 className="mb-8 text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl">
            How the hard
            <br />
            <span className="text-neutral-500">parts get built.</span>
          </h1>
          <p className="max-w-2xl border-l-2 border-emerald-500/30 pl-6 text-lg font-light leading-relaxed text-neutral-300">
            Engineering notes by {AUTHOR.name}, each drawn from a product that
            actually shipped. The articles are published on{" "}
            <a href={INSIGHTS_URL} className="text-white underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500">
              {STUDIO.name}
            </a>
            , my studio site.
          </p>
        </header>

        <ol className="divide-y divide-white/10 border-y border-white/10">
          {articles.map((a) => {
            const project = projectFor(a.project);
            return (
              <li key={a.url} className="py-8">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-emerald-400">{a.category}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <time dateTime={a.date} className="text-neutral-400">{dateLabel(a.date)}</time>
                </div>
                <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight md:text-3xl">
                  <a href={a.url} className="text-white transition-colors hover:text-emerald-400">
                    {a.title}
                  </a>
                </h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-neutral-400">{a.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.2em]">
                  <a href={a.url} className="text-white hover:text-emerald-400">
                    Read article ↗
                  </a>
                  {project && (
                    <Link href={projectHref(project)} className="text-neutral-400 hover:text-white">
                      The {project.title} project →
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
