"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { fadeIn, fadeUp, stagger, staggerChild } from "@/lib/motion";

const certificates = [
  {
    id: "gen-ai-chai-code",
    title: "Generative AI Fundamentals",
    issuer: "Chai Code",
    issuedOn: "11 May 2026",
    image: "/genai-certificate.webp",
    verifyUrl: "https://courses.chaicode.com/learn/certificate/10993325-239664",
  },
  {
    id: "109933252142981710249854",
    title: "Web Development Certificate",
    issuer: "Chai Code",
    issuedOn: "31 July 2025",
    image: "/mern-certificate.webp",
    verifyUrl: "https://courses.chaicode.com/learn/certificate/10993325-214298",
  },
  {
    id: "LO6148UTS7YI",
    title: "Frontend Development by Meta",
    issuer: "Coursera",
    issuedOn: "7 Oct 2024",
    image: "/frontend-certificate.webp",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/LO6148UTS7YI",
  },
];

/**
 * Courses, kept in proportion: a compact row of credentials — thumbnail,
 * title, issuer and date, and a link to verify each one with its issuer. It
 * used to be three large 3D tilt cards, more screen than courses deserve on
 * a page whose job is to show shipped work.
 */
export default function CertificatesParallax() {
  return (
    <section
      aria-labelledby="certificates-heading"
      className="relative overflow-hidden bg-neutral-950 py-20 text-white md:py-28"
    >
      <GrainOverlay opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
              05 / LEARNING
            </motion.span>
            <motion.h2
              id="certificates-heading"
              {...fadeUp}
              className="text-4xl font-bold tracking-tighter md:text-6xl"
            >
              Certifications<span className="text-neutral-600">.</span>
            </motion.h2>
          </div>
          <motion.p {...fadeUp} className="max-w-sm text-base font-light text-neutral-400 md:text-lg">
            Courses completed alongside client work. Each one can be checked with its issuer.
          </motion.p>
        </div>

        <motion.ul {...stagger(0.08)} className="grid gap-4 md:grid-cols-3">
          {certificates.map((c) => (
            <motion.li key={c.id} variants={staggerChild}>
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-neutral-900/50 p-3 transition-colors duration-300 hover:border-emerald-500/30 hover:bg-neutral-900"
              >
                <span className="relative h-[72px] w-[100px] shrink-0 overflow-hidden rounded-xl border border-white/5 bg-neutral-800">
                  <Image
                    src={c.image}
                    alt={`${c.issuer} — ${c.title} certificate`}
                    fill
                    sizes="100px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug text-white transition-colors group-hover:text-emerald-400">
                    {c.title}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    {c.issuer} · {c.issuedOn}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-300 transition-colors group-hover:text-emerald-400">
                    Verify
                    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
                    </svg>
                    <span className="sr-only">(opens the issuer&apos;s page in a new tab)</span>
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
