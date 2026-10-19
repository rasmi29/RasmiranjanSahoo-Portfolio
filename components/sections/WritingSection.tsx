"use client";

import React from "react";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { articles, INSIGHTS_URL } from "@/lib/writing";
import { fadeIn, fadeUp } from "@/lib/motion";

/**
 * Engineering write-ups drawn from the projects above. Each card links to the
 * one canonical article on the studio site — depth a visitor can check, and
 * text an answer engine can cite.
 */
export default function WritingSection() {
  return (
    <section id="writing" aria-labelledby="writing-heading" className="relative overflow-hidden bg-black py-32 text-white">
      <GrainOverlay opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
              04 / WRITING
            </motion.span>
            <motion.h2 id="writing-heading" {...fadeUp} className="text-5xl font-bold tracking-tighter md:text-7xl">
              How the hard
              <br />
              <span className="text-neutral-500">parts get built.</span>
            </motion.h2>
          </div>
          <motion.a
            {...fadeUp}
            href={INSIGHTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 text-lg font-light text-neutral-300 transition-colors hover:text-white"
          >
            All articles at Rathaworks ↗
            <span className="block h-px w-12 bg-neutral-600 transition-all duration-300 group-hover:w-20 group-hover:bg-white" />
          </motion.a>
        </div>

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <motion.li
              key={a.url}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              // Phones get the first three; the full list is one tap away.
              className={i >= 3 ? "hidden md:block" : undefined}
            >
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-emerald-500/30"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-emerald-400">{a.category}</span>
                  {a.project && (
                    <>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-neutral-400">From {a.project}</span>
                    </>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-white">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-neutral-400">{a.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-emerald-400">
                  Read article
                  <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
