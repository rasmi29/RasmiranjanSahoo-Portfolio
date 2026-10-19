import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedProjectCard, ProjectCard } from "@/components/work/ProjectCards";
import { projects, projectHref } from "@/lib/projects";
import { SITE_URL, STUDIO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies — Marketplaces, Mobile Apps & Platforms",
  description:
    "Selected work by Rasmiranjan Sahoo, founder of Rathaworks: marketplaces, booking and delivery platforms, React Native apps and business software, with the decisions and outcomes behind each build.",
  alternates: { canonical: "/works" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/works`,
    title: "Case Studies — Rasmiranjan Sahoo",
    description:
      "Marketplaces, booking and delivery platforms, React Native apps and business software — with the decisions and outcomes behind each build.",
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
      hasPart: projects.map((p) => {
        const href = projectHref(p);
        return {
          "@type": "CreativeWork",
          name: p.title,
          url: href.startsWith("http") ? href : `${SITE_URL}${href}`,
          description: p.description,
        };
      }),
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
            Production software from the last year — the problem, the
            architecture decisions, and what actually shipped. Each card says
            whether it was built at Gravitones or for my own client.
          </p>
        </div>
      </section>

      <section className="pb-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <FeaturedProjectCard project={projects[0]} />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(1).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
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
            href={STUDIO.contact}
            className="inline-flex items-center justify-center bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-emerald-400"
          >
            Start a project
          </Link>
        </div>
      </section>
    </main>
  );
}
