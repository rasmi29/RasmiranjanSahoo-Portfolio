"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { projects, projectCategories, projectHref, type Project } from "@/lib/projects";
import { AUTHOR } from "@/lib/site";
import { fadeIn, fadeUp } from "@/lib/motion";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const href = projectHref(project);
  const external = href.startsWith("http");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="mb-20 last:mb-0"
    >
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group relative flex flex-col lg:flex-row h-auto lg:h-[420px] w-full overflow-hidden rounded-[2.5rem] bg-neutral-900/50 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/30 shadow-2xl"
      >
        <div className="relative lg:w-[70%] h-[280px] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            priority={index === 0}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
          />
        </div>

        <div className="lg:w-[30%] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden bg-black/40">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-neutral-300 font-mono">
                {project.year}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                {project.type}
              </span>
            </div>

            <h3 className="mb-4 text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-[0.9]">
              {project.title}
            </h3>

            <p className="mb-6 text-base leading-relaxed text-neutral-300 font-light line-clamp-3">
              {project.description}
            </p>

            {/* Verifiable outcomes — what clients actually scan for. */}
            <dl className="mb-6 grid grid-cols-2 gap-x-4 gap-y-2">
              {project.outcomes.slice(0, 2).map((o) => (
                <div key={o.label}>
                  <dt className="text-[9px] uppercase tracking-widest text-neutral-500">
                    {o.label}
                  </dt>
                  <dd className="text-sm font-medium text-white">{o.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="text-[9px] uppercase tracking-widest text-neutral-300 border border-white/10 px-3 py-1.5 rounded-full bg-white/5 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:text-emerald-400 transition-colors">
              {project.hasCaseStudy ? "View Case Study" : "Visit Site"}
              <svg
                aria-hidden="true"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/5 blur-[100px] -z-0"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default function WorksSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.type === activeFilter),
    [activeFilter],
  );

  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="relative bg-black py-32 text-white overflow-hidden"
    >
      <GrainOverlay />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
              01 / PORTFOLIO
            </motion.span>
            <motion.h2
              id="works-heading"
              {...fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
            >
              Selected
              <br />
              <span className="text-neutral-500">Works.</span>
            </motion.h2>
          </div>

          {/* Derived from the data, so a filter can never exist without
              results — previously 4 pills for 1 project. */}
          {projectCategories.length > 2 && (
            <div className="flex flex-wrap gap-4" role="group" aria-label="Filter projects">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                    activeFilter === cat
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      : "bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Safety net — a filter should never leave a silent void. */}
        {filteredProjects.length === 0 && (
          <p className="py-20 text-center text-neutral-400">
            No projects in this category yet.{" "}
            <button
              onClick={() => setActiveFilter("All")}
              className="text-emerald-400 underline underline-offset-4"
            >
              Show all
            </button>
          </p>
        )}

        <div className="mt-32 flex flex-col sm:flex-row items-center justify-center gap-8 border-t border-white/10 pt-16">
          <Link
            href="/works"
            className="group flex items-center gap-4 text-xl font-light text-neutral-300 hover:text-white transition-colors"
          >
            <span>All case studies</span>
            <span className="block h-px w-12 bg-neutral-600 group-hover:w-24 group-hover:bg-white transition-all duration-300" />
          </Link>
          <Link
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-xl font-light text-neutral-300 hover:text-white transition-colors"
          >
            <span>More on GitHub</span>
            <span className="block h-px w-12 bg-neutral-600 group-hover:w-24 group-hover:bg-white transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
