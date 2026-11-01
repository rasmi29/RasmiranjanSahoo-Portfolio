"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import RevealHeading from "@/components/ui/RevealHeading";
import SwipeDots, { useSnapIndex } from "@/components/ui/SwipeDots";
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
  const rowRef = useRef<HTMLDivElement>(null);
  const activeCard = useSnapIndex(rowRef, rest.length);

  return (
    <section id="works" aria-labelledby="works-heading" className="relative overflow-hidden bg-black py-20 text-white md:py-32">
      <GrainOverlay />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
              01 / PORTFOLIO
            </motion.span>
            <RevealHeading
              id="works-heading"
              className="text-5xl font-bold tracking-tighter text-white md:text-7xl"
              lines={[{ text: "Selected" }, { text: "Works.", className: "text-neutral-500" }]}
            />
            <motion.p {...fadeUp} className="mt-6 max-w-xl text-lg font-light leading-relaxed text-neutral-300">
              {projects.length} products from the last year — {atGravitones} as lead developer at Gravitones,{" "}
              {freelance} for my own {freelance === 1 ? "client" : "clients"} and {personal} personal{" "}
              {personal === 1 ? "build" : "builds"}. Every card says which.
            </motion.p>
          </div>

          {/* Derived from the data, so a filter can never exist without results.
              Phones: one row to swipe (it was three wrapped rows of chips).
              The white pill slides between chips instead of blinking. */}
          <div
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-3 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter projects"
          >
            {projectCategories.map((cat) => {
              const active = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    rowRef.current?.scrollTo({ left: 0 });
                  }}
                  aria-pressed={active}
                  className={`relative isolate shrink-0 rounded-full border px-5 py-2.5 text-xs uppercase tracking-widest transition-colors duration-300 ${
                    active
                      ? "border-white text-black"
                      : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="works-filter-pill"
                      aria-hidden="true"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {lead && (
          <div className="mb-8">
            <FeaturedProjectCard project={lead} />
          </div>
        )}

        {/* Phones: the rest of the work as a row to swipe through (cards peek
            in from the right); from md up, the grid. */}
        <motion.div
          ref={rowRef}
          layout
          className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          <AnimatePresence mode="popLayout">
            {rest.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
        <SwipeDots count={rest.length} active={activeCard} />

        <div className="mt-16 flex flex-col items-center justify-center gap-8 border-t border-white/10 pt-12 sm:flex-row md:mt-24 md:pt-16">
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
