import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getProject, projectHref } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import { inventoryTotals, workInventory, type SurfaceStatus } from "@/lib/workInventory";

const title = "All Projects — Every App and Portal, With Links";
const description =
  "The full list of apps, websites and portals built by Rasmiranjan Sahoo, with live links, platforms, role and current status for each one.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: { type: "website", url: `${SITE_URL}/projects`, title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/projects#page`,
  name: "All Projects",
  url: `${SITE_URL}/projects`,
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
};

const STATUS_STYLE: Record<SurfaceStatus, string> = {
  Live: "text-emerald-400",
  "In use": "text-emerald-400",
  Delivered: "text-neutral-300",
  "In development": "text-amber-300",
};

const TOTALS = [
  { value: inventoryTotals.projects, label: "Projects" },
  { value: inventoryTotals.web, label: "Websites and portals" },
  {
    value: inventoryTotals.mobile,
    label: `Mobile apps, ${inventoryTotals.mobileInDevelopment} in development`,
  },
  { value: inventoryTotals.publicLinks, label: "You can open now" },
];

export default function ProjectsPage() {
  return (
    <>
      <main id="main" className="min-h-screen bg-black text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <nav
          aria-label="Breadcrumb"
          className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-black/60 backdrop-blur-md"
        >
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
            <Link
              href="/works"
              className="group flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Case studies
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">All Projects</span>
          </div>
        </nav>

        <section className="px-6 pt-40 pb-16">
          <div className="mx-auto max-w-5xl">
            <span className="mb-4 block font-mono text-sm text-emerald-400">/ FULL LIST</span>
            <h1 className="mb-8 text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl">
              Everything <span className="text-neutral-500">I&apos;ve built.</span>
            </h1>
            <p className="max-w-2xl border-l-2 border-emerald-500/30 pl-6 text-lg font-light leading-relaxed text-neutral-300">
              One row per app or portal, so one client can add several. Each row shows what state it&apos;s in and,
              where it&apos;s public, a link you can open. Staff panels sit behind a login, and I can walk you through
              them on a call.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4">
              {TOTALS.map((total) => (
                <div key={total.label} className="bg-black p-5">
                  <dd className="text-4xl font-bold tracking-tighter">{total.value}</dd>
                  <dt className="mt-1 text-sm leading-snug text-neutral-400">{total.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-label="Project list" className="px-6 pb-32">
          <div className="mx-auto max-w-5xl space-y-14">
            {workInventory.map((entry) => {
              const project = entry.projectSlug ? getProject(entry.projectSlug) : undefined;
              return (
                <article key={entry.id} id={entry.id} className="scroll-mt-28 border-t border-white/15 pt-6">
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h2 className="text-3xl font-bold tracking-tighter">{entry.name}</h2>
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      {entry.engagement} · {entry.period}
                    </span>
                  </div>
                  <p className="max-w-3xl leading-relaxed text-neutral-300">{entry.summary}</p>
                  <p className="mt-2 text-sm text-neutral-400">
                    <span className="text-neutral-200">{entry.role}.</span> {entry.stack}.
                    {project && (
                      <>
                        {" "}
                        <Link
                          href={projectHref(project)}
                          className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
                        >
                          Read the case study
                        </Link>
                      </>
                    )}
                  </p>

                  <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                    {entry.surfaces.map((surface) => (
                      <li
                        key={surface.name}
                        className="grid gap-x-6 gap-y-1 py-3 md:grid-cols-[minmax(0,1.1fr)_8rem_minmax(0,1.3fr)]"
                      >
                        <div>
                          <span className="font-medium">{surface.name}</span>
                          <span className="block text-sm text-neutral-400">
                            {surface.kind === "Mobile" ? "Mobile" : "Web"}
                            {surface.platforms ? ` · ${surface.platforms}` : ""}
                          </span>
                        </div>
                        <div className={`text-sm ${STATUS_STYLE[surface.status]}`}>{surface.status}</div>
                        <div className="min-w-0 text-sm">
                          {surface.links?.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener"
                              className="mr-4 inline-block break-all text-white underline underline-offset-4 hover:text-emerald-400"
                            >
                              {link.label}
                              <span aria-hidden="true"> ↗</span>
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          ))}
                          {surface.note && <span className="text-neutral-400">{surface.note}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
