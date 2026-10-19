import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects, projectHref } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies — E-Commerce, Mobile & AI Builds",
  description:
    "Selected work by Rasmiranjan Sahoo, founder of Rathaworks: multi-vendor e-commerce platforms, React Native apps and Gen-AI integrations, with the architecture decisions and outcomes behind each build.",
  alternates: { canonical: "/works" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/works`,
    title: "Case Studies — Rasmiranjan Sahoo",
    description:
      "Multi-vendor e-commerce platforms, React Native apps and Gen-AI integrations — with the architecture and outcomes behind each build.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/works#page`,
      name: "Case Studies",
      url: `${SITE_URL}/works`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      hasPart: projects.map((p) => ({
        "@type": "CreativeWork",
        name: p.title,
        url: `${SITE_URL}/works/${p.slug}`,
        description: p.description,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Works", item: `${SITE_URL}/works` },
      ],
    },
  ],
};

export default function WorksIndexPage() {
  return (
    <main id="main" className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-black/60 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back home
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Case Studies
          </span>
        </div>
      </nav>

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="mb-4 block font-mono text-sm text-emerald-400">
            / PORTFOLIO
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
            Case
            <br />
            <span className="text-neutral-500">Studies.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl font-light text-neutral-300 leading-relaxed border-l-2 border-emerald-500/30 pl-8">
            Production software I designed and built end to end — the problem,
            the architecture decisions, and what actually shipped.
          </p>
        </div>
      </section>

      <section className="pb-40 px-6">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2">
          {projects.map((project, i) => {
            const href = projectHref(project);
            const external = href.startsWith("http");
            return (
              <Link
                key={project.slug}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/40 transition-colors hover:border-emerald-500/30"
              >
                <div className="relative aspect-video overflow-hidden border-b border-white/10">
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-neutral-300 font-mono">
                      {project.year}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                      {project.type}
                    </span>
                  </div>
                  <h2 className="mb-3 text-3xl font-bold tracking-tighter">
                    {project.title}
                  </h2>
                  <p className="mb-6 flex-1 text-neutral-300 font-light leading-relaxed">
                    {project.description}
                  </p>
                  <dl className="mb-6 grid grid-cols-2 gap-4">
                    {project.outcomes.map((o) => (
                      <div key={o.label}>
                        <dt className="text-[9px] uppercase tracking-widest text-neutral-500">
                          {o.label}
                        </dt>
                        <dd className="text-sm font-medium text-white">{o.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-emerald-400 transition-colors">
                    {project.hasCaseStudy ? "Read case study" : "Visit site"}
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 transition-transform group-hover:translate-x-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mx-auto mt-32 max-w-3xl border-t border-white/10 pt-16 text-center">
          <h2 className="mb-6 text-3xl md:text-5xl font-bold tracking-tighter">
            Have something similar in mind?
          </h2>
          <p className="mb-10 text-neutral-300">
            Tell me what you&apos;re building and I&apos;ll come back with an
            approach, a timeline and a number.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-emerald-400"
          >
            Start a project
          </Link>
        </div>
      </section>
    </main>
  );
}
