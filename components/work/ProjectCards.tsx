"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projectHref, type Project } from "@/lib/projects";
import { DUR, EASE } from "@/lib/motion";

const ENGAGEMENT: Record<Project["engagement"], string> = {
  Gravitones: "Built at Gravitones",
  Freelance: "Freelance client",
  Personal: "Personal project",
};

/**
 * The whole card is one link — to this site's case study, or in a new tab to
 * the studio's full write-up or, failing that, the live site. A soft emerald spotlight follows the cursor;
 * it's driven by CSS variables, so moving the mouse never re-renders React.
 */
function CardLink({
  project,
  className = "",
  children,
}: {
  project: Project;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const href = projectHref(project);
  const external = href.startsWith("http");

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/50 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-emerald-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(16,185,129,0.13),transparent_45%)]"
      />
      {children}
    </Link>
  );
}

export function ProjectMeta({ project }: { project: Project }) {
  return (
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
  );
}

function Cta({ project }: { project: Project }) {
  const external = !project.hasCaseStudy;
  const writeUp = project.hasCaseStudy || Boolean(project.links.caseStudy);
  return (
    <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-emerald-400">
      {writeUp ? "Read case study" : "Visit live site"}
      {external ? (
        <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      )}
      {external && (
        <span className="sr-only">
          {writeUp ? "(opens the full write-up on work.rasmiranjan.in)" : "(opens in a new tab)"}
        </span>
      )}
    </span>
  );
}

function Outcomes({ project, count }: { project: Project; count: number }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
      {project.outcomes.slice(0, count).map((o) => (
        <div key={o.label}>
          <dt className="text-[9px] uppercase tracking-widest text-neutral-400">{o.label}</dt>
          <dd className="text-lg font-semibold tracking-tight text-white">{o.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The lead project: wide, image-first. */
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: DUR.hero, ease: EASE.out }}
    >
      <CardLink project={project} className="flex-col lg:min-h-[480px] lg:flex-row">
        <div className="relative h-[260px] overflow-hidden border-b border-white/10 sm:h-[340px] lg:h-auto lg:w-[60%] lg:border-r lg:border-b-0">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="relative flex flex-col justify-center gap-6 bg-black/40 p-8 lg:w-[40%] lg:p-12">
          <ProjectMeta project={project} />
          <h3 className="text-4xl font-bold leading-[0.95] tracking-tighter text-white lg:text-5xl">{project.title}</h3>
          <p className="text-base font-light leading-relaxed text-neutral-300">{project.description}</p>
          <Outcomes project={project} count={4} />
          <Cta project={project} />
        </div>
      </CardLink>
    </motion.div>
  );
}

/** Every other project: compact, stacked. */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: DUR.slow, ease: EASE.out, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <CardLink project={project} className="h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-neutral-950">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
        </div>
        <div className="relative flex flex-1 flex-col gap-5 p-7">
          <ProjectMeta project={project} />
          <div>
            <h3 className="text-2xl font-bold tracking-tighter text-white lg:text-3xl">{project.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-neutral-300">{project.description}</p>
          </div>
          <div className="mt-auto flex flex-col gap-5">
            <Outcomes project={project} count={2} />
            <Cta project={project} />
          </div>
        </div>
      </CardLink>
    </motion.div>
  );
}
