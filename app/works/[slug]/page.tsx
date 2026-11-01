import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GrainOverlay from "@/components/ui/GrainOverlay";
import {
  getProject,
  projectHref,
  projects,
  summaryProjects,
  type Project,
} from "@/lib/projects";
import { articles } from "@/lib/writing";
import { AUTHOR, SITE_URL, STUDIO } from "@/lib/site";
import { ID, breadcrumbSchema, jsonLdScript } from "@/lib/seo";

/*
 * One page per project that has no hand-built case study here.
 *
 * Before this route existed, those cards linked straight off-site, so the
 * domain had five indexable URLs — too little structure for Google to build
 * sitelinks from, and nothing to rank for a project's own name.
 *
 * This is deliberately a *summary* — role, outcomes, stack — with every fact
 * drawn from lib/projects.ts. The long-form write-up stays on the studio site
 * and is linked prominently, so the same article never exists twice.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return summaryProjects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const ENGAGEMENT: Record<Project["engagement"], string> = {
  Gravitones: "Built at Gravitones",
  Freelance: "Freelance client",
  Personal: "Personal project",
};

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${encodeURI(p)}`);

/** Social cards can't render SVG; fall back to the site card for those covers. */
const shareImage = (p: Project) => (p.cover.src.endsWith(".svg") ? "/og.jpg" : p.cover.src);

/** The engineering article drawn from this project, if one exists. */
const relatedArticle = (p: Project) =>
  articles.find(
    (a) => a.project && p.title.toLowerCase().startsWith(a.project.toLowerCase()),
  );

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `${SITE_URL}/works/${project.slug}`;
  return {
    title: project.tagline,
    description: project.metaDescription,
    keywords: project.keywords,
    alternates: { canonical: `/works/${project.slug}` },
    openGraph: {
      type: "article",
      url,
      title: project.tagline,
      description: project.metaDescription,
      images: [{ url: shareImage(project), alt: project.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.tagline,
      description: project.metaDescription,
      images: [shareImage(project)],
    },
  };
}

const linkClass =
  "text-white underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.hasCaseStudy) notFound();

  const url = `${SITE_URL}/works/${project.slug}`;
  const article = relatedArticle(project);
  const others = projects.filter((p) => p.slug !== project.slug);

  const jsonLd = jsonLdScript([
    {
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      name: project.title,
      headline: project.tagline,
      description: project.metaDescription,
      url,
      mainEntityOfPage: url,
      image: abs(project.cover.src),
      isPartOf: { "@id": ID.website },
      author: { "@id": ID.person },
      contributor: { "@id": ID.person },
      ...(project.engagement === "Gravitones" ? { producer: { "@id": ID.organization } } : {}),
      dateCreated: project.year,
      keywords: project.keywords.join(", "),
      about: project.tech,
      inLanguage: "en",
      ...(project.links.live ? { sameAs: project.links.live } : {}),
      ...(project.links.caseStudy
        ? { subjectOf: { "@type": "Article", url: project.links.caseStudy } }
        : {}),
    },
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Works", url: `${SITE_URL}/works` },
      { name: project.title, url },
    ]),
  ]);

  /** `wide` facts take a full row on phones, where the grid is two columns. */
  const facts: { term: string; detail: React.ReactNode; wide?: boolean }[] = [
    {
      term: "Developer",
      detail: (
        <Link href="/about" className={linkClass}>
          {AUTHOR.name}
        </Link>
      ),
    },
    { term: "Role", detail: project.role, wide: true },
    { term: "Timeline", detail: project.duration },
    ...(project.client ? [{ term: "Client", detail: project.client }] : []),
    { term: "Status", detail: project.status },
  ];

  return (
    <main id="main" className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-white selection:bg-emerald-500/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <GrainOverlay />

      <nav
        aria-label="Breadcrumb"
        className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/5 bg-black/80 backdrop-blur-md md:h-20"
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <Link
            href="/works"
            className="group flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All works
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Project / {project.year}
          </span>
        </div>
      </nav>

      {/* ---------- Title ---------- */}
      <header className="relative px-6 pb-12 pt-28 md:pb-16 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)]"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-300">
              {project.year}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">{project.type}</span>
            <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              {ENGAGEMENT[project.engagement]}
            </span>
            {project.status === "In development" && (
              <span className="rounded-full border border-amber-400/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-300">
                In development
              </span>
            )}
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tighter md:text-8xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {project.links.caseStudy && (
              <a
                href={project.links.caseStudy}
                className="inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-emerald-400"
              >
                Read the full case study
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  project.links.caseStudy
                    ? "inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-white/60"
                    : "inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-emerald-400"
                }
              >
                Visit live site
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8 lg:grid-cols-3 lg:gap-x-8">
            {facts.map((f) => (
              <div key={f.term} className={f.wide ? "col-span-2 lg:col-span-1" : undefined}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{f.term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-200">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="mx-auto max-w-6xl px-6">
        <figure className="m-0">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1104px"
              className="object-cover object-top"
            />
          </div>
          {project.cover.illustration && (
            <figcaption className="mt-3 text-sm text-neutral-500">
              Illustration of {project.title}, not a screenshot.
            </figcaption>
          )}
        </figure>
      </div>

      {/* ---------- Overview ---------- */}
      <section aria-labelledby="overview" className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <div className="grid gap-6 md:grid-cols-12 md:gap-12">
          <h2 id="overview" className="text-3xl font-bold leading-tight tracking-tight md:col-span-4 md:text-4xl">
            Overview
          </h2>
          <div className="space-y-5 text-base font-light leading-relaxed text-neutral-300 md:col-span-8 md:text-lg">
            <p>{project.metaDescription}</p>
            <p>
              {AUTHOR.name}&apos;s role: {project.role.charAt(0).toLowerCase() + project.role.slice(1)}.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Outcomes ---------- */}
      <section aria-labelledby="numbers" className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <h2 id="numbers" className="font-mono text-sm uppercase text-emerald-400">
          By the numbers
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {project.outcomes.map((o) => (
            <div key={o.label} className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{o.label}</dt>
              <dd className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">{o.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Stack ---------- */}
      <section aria-labelledby="stack" className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <h2 id="stack" className="font-mono text-sm uppercase text-emerald-400">
          Built with
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200">
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Writing + full write-up ---------- */}
      {(article || project.links.caseStudy) && (
        <section className="mx-auto grid max-w-6xl gap-5 px-6 pt-16 md:grid-cols-2 md:pt-24">
          {project.links.caseStudy && (
            <a
              href={project.links.caseStudy}
              className="group flex flex-col rounded-[1.75rem] border border-white/10 bg-neutral-900/60 p-7 transition-colors hover:border-emerald-500/30"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Full case study</span>
              <span className="mt-4 text-xl font-bold leading-snug tracking-tight text-white">
                The problem, the architecture decisions and what shipped
              </span>
              <span className="mt-3 flex-1 text-sm font-light leading-relaxed text-neutral-400">
                The long-form write-up of {project.title} lives on {STUDIO.name}, my studio site.
              </span>
              <span className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-emerald-400">
                Read on {STUDIO.name} ↗
              </span>
            </a>
          )}
          {article && (
            <a
              href={article.url}
              className="group flex flex-col rounded-[1.75rem] border border-white/10 bg-neutral-900/60 p-7 transition-colors hover:border-emerald-500/30"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                Written about this build
              </span>
              <span className="mt-4 text-xl font-bold leading-snug tracking-tight text-white">{article.title}</span>
              <span className="mt-3 flex-1 text-sm font-light leading-relaxed text-neutral-400">{article.excerpt}</span>
              <span className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-emerald-400">
                Read article ↗
              </span>
            </a>
          )}
        </section>
      )}

      {/* ---------- More work ---------- */}
      <section aria-labelledby="more" className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <h2 id="more" className="font-mono text-sm uppercase text-emerald-400">
          More work by {AUTHOR.name}
        </h2>
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                href={projectHref(p)}
                className="group flex items-baseline justify-between gap-6 py-5 transition-colors hover:bg-white/[0.03]"
              >
                <span className="text-lg font-medium text-white group-hover:text-emerald-400 md:text-xl">{p.title}</span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-neutral-500">{p.type}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Close ---------- */}
      <section className="mt-20 border-t border-white/5 px-6 py-20 md:mt-28 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-600 md:text-6xl">
            Building something <span className="text-white">like this?</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={STUDIO.contact}
              className="inline-flex items-center justify-center bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-emerald-400"
            >
              Start a project
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-white/60"
            >
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
