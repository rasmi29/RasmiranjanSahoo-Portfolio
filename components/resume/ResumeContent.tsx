"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { RESUME, STATS } from "@/lib/site";
import { EASE } from "@/lib/motion";
import ResumeSheet from "@/components/resume/ResumeSheet";
import { DownloadButton, OpenPdfLink } from "@/components/resume/ResumeActions";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
/** Formatted by hand, not Intl, so server and client always agree. */
const [y, m] = RESUME.updated.split("-").map(Number);
export const RESUME_UPDATED = `${MONTHS[m - 1]} ${y}`;

/** Every chip is a claim the resume itself backs up. */
const HIGHLIGHTS = [
  `${STATS.websites} websites · ${STATS.apps} apps shipped`,
  "Lead on 5 client platforms",
  "E-commerce · booking · delivery · EdTech",
  "Next.js · React Native · Node.js",
];

/**
 * Everything between the chrome: title, highlights, the animated sheet and a
 * closing call to action. Shared by the overlay (mode "dialog") and the
 * /resume page (mode "page"), so the two can never disagree.
 */
export default function ResumeContent({
  mode,
  onNavigate,
}: {
  mode: "dialog" | "page";
  /** Called before an in-site link navigates away — the overlay closes itself. */
  onNavigate?: () => void;
}) {
  const reduce = useReducedMotion();
  const Heading = mode === "page" ? motion.h1 : motion.h2;
  const base = mode === "dialog" ? 0.1 : 0.2;

  /* Initial states never depend on `reduce` (it is unknown in the static
     HTML, and a disagreeing client render fails hydration) — reduced motion
     only makes every transition instant. */
  const instant = { duration: 0 };
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? instant : { duration: 0.7, delay: base + delay, ease: EASE.out },
  });

  return (
    <div className="relative mx-auto w-full max-w-[880px] px-4 sm:px-6">
      <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.span
            {...rise(0)}
            className="mb-3 block font-mono text-xs uppercase text-emerald-400 sm:text-sm"
          >
            / Resume · Updated {RESUME_UPDATED}
          </motion.span>
          <Heading
            id={mode === "page" ? "resume-title" : "resume-dialog-title"}
            className="text-5xl font-bold leading-[0.95] tracking-tighter sm:text-6xl"
          >
            {[
              { text: "Rasmiranjan", className: "" },
              { text: "Sahoo", className: "text-neutral-500" },
            ].map((line, i) => (
              <span key={line.text} className="-mb-2 block overflow-hidden pb-2">
                <motion.span
                  className={`block ${line.className}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={reduce ? instant : { duration: 0.9, delay: base + 0.08 + i * 0.09, ease: EASE.out }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </Heading>
          <motion.p {...rise(0.3)} className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
            Full-stack &amp; React Native developer with {STATS.websites} websites and{" "}
            {STATS.apps} apps shipped. One page, fully current.
          </motion.p>
        </div>

        <motion.div {...rise(0.4)} className="hidden shrink-0 items-center gap-3 md:flex">
          <OpenPdfLink />
          <DownloadButton />
        </motion.div>
      </div>

      <motion.ul
        aria-label="Highlights"
        className="mb-10 flex flex-wrap gap-2 sm:mb-14"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: reduce ? instant : { staggerChildren: 0.07, delayChildren: base + 0.45 } },
        }}
      >
        {HIGHLIGHTS.map((h) => (
          <motion.li
            key={h}
            variants={{
              hidden: { opacity: 0, scale: 0.7, y: 10 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: reduce ? instant : { type: "spring", stiffness: 420, damping: 24 },
              },
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 font-mono text-[11px] text-neutral-300 backdrop-blur-sm"
          >
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {h}
          </motion.li>
        ))}
      </motion.ul>

      <ResumeSheet delay={base + 0.25} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={reduce ? instant : { duration: 0.7, ease: EASE.out }}
        className="mt-16 flex flex-col items-center gap-5 border-t border-white/10 pt-12 text-center"
      >
        <p className="text-3xl font-bold tracking-tighter sm:text-4xl">Like what you see?</p>
        <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
          Save a copy for later, or tell me about the role. I reply within 24 hours.
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <DownloadButton />
          <Link
            href="/contact"
            onClick={onNavigate}
            className="group inline-flex items-center justify-center gap-3 border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-emerald-400 hover:text-emerald-400"
          >
            Get in touch
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </motion.div>

      {/* Phones: the actions stay in reach while the sheet scrolls past. */}
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        exit={{ y: "110%", transition: reduce ? instant : { duration: 0.3, ease: EASE.inOut } }}
        transition={reduce ? instant : { duration: 0.6, delay: base + 0.6, ease: EASE.out }}
        className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-white/10 bg-black/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg md:hidden"
      >
        <DownloadButton className="flex-1" />
        <OpenPdfLink className="shrink-0 px-4!" />
      </motion.div>
    </div>
  );
}
