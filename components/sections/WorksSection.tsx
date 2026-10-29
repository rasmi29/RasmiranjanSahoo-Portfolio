"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { FeaturedProjectCard, ProjectCard } from "@/components/work/ProjectCards";
import { projects, projectCategories } from "@/lib/projects";
import { AUTHOR, STUDIO } from "@/lib/site";
import { fadeIn, fadeUp } from "@/lib/motion";

const atGravitones = projects.filter((p) => p.engagement === "Gravitones").length;
const freelance = projects.filter((p) => p.engagement === "Freelance").length;
const personal = projects.filter((p) => p.engagement === "Personal").length;

export default function WorksSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () => (activeFilter === "All" ? projects : projects.filter((p) => p.type === activeFilter)),
    [activeFilter],
  );
  // "All" leads with the flagship; a filtered view is a plain grid.
  const [lead, rest] = activeFilter === "All" ? [filtered[0], filtered.slice(1)] : [undefined, filtered];

  return (
    <section id="works" aria-labelledby="works-heading" className="relative overflow-hidden bg-black py-32 text-white">
      <GrainOverlay />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
              01 / PORTFOLIO
            </motion.span>
            <motion.h2 id="works-heading" {...fadeUp} className="text-5xl font-bold tracking-tighter text-white md:text-7xl">
              Selected
              <br />
              <span className="text-neutral-500">Works.</span>
            </motion.h2>
            <motion.p {...fadeUp} className="mt-6 max-w-xl text-lg font-light leading-relaxed text-neutral-300">
              {projects.length} products from the last year — {atGravitones} as lead developer at Gravitones,{" "}
              {freelance} for my own {freelance === 1 ? "client" : "clients"} and {personal} personal{" "}
              {personal === 1 ? "build" : "builds"}. Every card says which.
            </motion.p>
          </div>

          {/* Derived from the data, so a filter can never exist without results. */}
          <div className="flex flex-wrap gap-3" role="group" aria-label="Filter projects">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat
                    ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "border-neutral-700 bg-transparent text-neutral-400 hover:border-neutral-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {lead && (
          <div className="mb-8">
            <FeaturedProjectCard project={lead} />
          </div>
        )}

        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-24 flex flex-col items-center justify-center gap-8 border-t border-white/10 pt-16 sm:flex-row">
          <Link
            href="/works"
            className="group flex items-center gap-4 text-xl font-light text-neutral-300 transition-colors hover:text-white"
          >
            <span>All case studies</span>
            <span className="block h-px w-12 bg-neutral-600 transition-all duration-300 group-hover:w-24 group-hover:bg-white" />
          </Link>
          <a
            href={`${STUDIO.url}/work`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-xl font-light text-neutral-300 transition-colors hover:text-white"
          >
            <span>Full write-ups at Rathaworks ↗</span>
            <span className="block h-px w-12 bg-neutral-600 transition-all duration-300 group-hover:w-24 group-hover:bg-white" />
          </a>
          <a
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-xl font-light text-neutral-300 transition-colors hover:text-white"
          >
            <span>More on GitHub</span>
            <span className="block h-px w-12 bg-neutral-600 transition-all duration-300 group-hover:w-24 group-hover:bg-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
