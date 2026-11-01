import Image from "next/image";
import Link from "next/link";
import GrainOverlay from "@/components/ui/GrainOverlay";
import type { Project } from "@/lib/projects";
import type { BuildStory as Story, StoryImage } from "@/lib/buildStories";
import { STUDIO } from "@/lib/site";

/**
 * A "how I built it" page for a design-led project: the idea, the signature
 * moments with screenshots, the performance work with measured figures, and
 * a plain credit line. A server component — it is a document to read, so it
 * ships no animation JavaScript.
 */

function Shot({ image, priority = false }: { image: StoryImage; priority?: boolean }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="h-auto w-full"
        />
      </div>
      {image.caption && <figcaption className="mt-3 text-sm text-neutral-500">{image.caption}</figcaption>}
    </figure>
  );
}

/** "Personal project — brand, UI design…" → "Brand, UI design…" (the badge already says personal). */
const roleLabel = (role: string) => {
  const r = role.replace(/^Personal project — /, "");
  return r.charAt(0).toUpperCase() + r.slice(1);
};

export default function BuildStory({ project, story }: { project: Project; story: Story }) {
  return (
    <main id="main" className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-white selection:bg-emerald-500/30">
      <GrainOverlay />

      <nav className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/5 bg-black/80 md:h-20">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <Link
            href="/works"
            className="group flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Works
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Build story / {project.year}
          </span>
        </div>
      </nav>

      {/* Title */}
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
              Personal project
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tighter md:text-8xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{story.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-emerald-400"
              >
                Visit live site
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Role</dt>
              <dd className="mt-2 text-sm text-neutral-200">{roleLabel(project.role)}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">When</dt>
              <dd className="mt-2 text-sm text-neutral-200">{project.duration}</dd>
            </div>
            {project.outcomes.slice(0, 2).map((o) => (
              <div key={o.label}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{o.label}</dt>
                <dd className="mt-2 text-sm text-neutral-200">{o.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <Shot image={{ src: project.cover.src, alt: project.cover.alt, width: 1600, height: 1000 }} priority />
      </div>

      {/* Chapters */}
      {story.chapters.map((c) => (
        <section key={c.title} className="mx-auto max-w-6xl px-6 pt-20 md:pt-32">
          <div className="grid gap-6 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="font-mono text-sm uppercase text-emerald-400">{c.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">{c.title}</h2>
            </div>
            <div className="space-y-5 text-base font-light leading-relaxed text-neutral-300 md:col-span-8 md:text-lg">
              {c.body.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>

          {c.figures && (
            <dl className="mt-10 grid gap-4 md:grid-cols-3">
              {c.figures.map((f) => (
                <div key={f.label} className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{f.label}</dt>
                  <dd className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {c.note && <p className="mt-4 text-sm text-neutral-500">{c.note}</p>}

          {c.image && (
            <div className="mt-10">
              <Shot image={c.image} />
            </div>
          )}

          {c.points && (
            <div className="mt-12 space-y-16 md:space-y-24">
              {c.points.map((pt, i) => (
                <div key={pt.title} className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
                  <div className={`md:col-span-4 ${i % 2 ? "md:order-2" : ""}`}>
                    <h3 className="text-xl font-bold tracking-tight md:text-2xl">{pt.title}</h3>
                    <p className="mt-3 text-base font-light leading-relaxed text-neutral-400">{pt.body}</p>
                  </div>
                  {pt.image && (
                    <div className={`md:col-span-8 ${i % 2 ? "md:order-1" : ""}`}>
                      <Shot image={pt.image} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Stack */}
      <section className="mx-auto max-w-6xl px-6 pt-20 md:pt-32">
        <p className="font-mono text-sm uppercase text-emerald-400">Built with</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200">
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Close */}
      <section className="mt-20 border-t border-white/5 px-6 py-20 md:mt-32 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-700 md:text-6xl">
            Want a site <span className="text-white">that moves like this?</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={STUDIO.contact}
              className="inline-flex items-center justify-center bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-emerald-400"
            >
              Start a project
            </a>
            <Link
              href="/works"
              className="inline-flex items-center justify-center border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-white/60"
            >
              More work
            </Link>
          </div>
          <p className="mx-auto mt-14 max-w-2xl text-sm leading-relaxed text-neutral-500">{story.credit}</p>
        </div>
      </section>
    </main>
  );
}
