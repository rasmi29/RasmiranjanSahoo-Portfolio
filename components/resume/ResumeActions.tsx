"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RESUME } from "@/lib/site";
import { EASE } from "@/lib/motion";

type State = "idle" | "saving" | "done";

/**
 * A real <a download> — the browser does the saving; the animation only
 * acknowledges it. The arrow drops into the fill, the fill sweeps across,
 * and a check draws itself in before the button settles back.
 */
export function DownloadButton({
  size = "lg",
  className = "",
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<State>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const onClick = () => {
    timers.current.forEach(window.clearTimeout);
    setState("saving");
    timers.current = [
      window.setTimeout(() => setState("done"), reduce ? 0 : 750),
      window.setTimeout(() => setState("idle"), 2800),
    ];
  };

  const pad = size === "sm" ? "px-4 py-2.5 text-[11px]" : "px-7 py-4 text-xs";

  return (
    <a
      href={RESUME.pdf}
      download={RESUME.fileName}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap bg-white font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-emerald-300 ${pad} ${className}`}
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: state === "idle" ? 0 : 1 }}
        transition={{ duration: state === "saving" ? 0.75 : 0.35, ease: EASE.out }}
        style={{ transformOrigin: state === "idle" ? "100% 50%" : "0% 50%" }}
        className="absolute inset-0 bg-emerald-400"
      />

      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          {state === "done" ? (
            <motion.svg
              key="check"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              className="h-4 w-4"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: EASE.out }}
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="h-4 w-4"
              initial={{ y: -16, opacity: 0 }}
              animate={state === "saving" ? { y: 18, opacity: 0 } : { y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: state === "saving" ? 0.45 : 0.3, ease: EASE.out }}
            >
              <g className="resume-nudge">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-5-5m5 5l5-5" />
                <path strokeLinecap="round" d="M5 20h14" />
              </g>
            </motion.svg>
          )}
        </AnimatePresence>
      </span>

      <span className="relative" aria-live="polite">
        {state === "done" ? "Saved" : state === "saving" ? "Saving…" : "Download PDF"}
      </span>
      {size === "lg" && (
        <span className="relative font-mono text-[10px] font-medium tracking-normal text-black/50">
          {RESUME.pdfKB} KB
        </span>
      )}
    </a>
  );
}

/** Opens the PDF itself in the browser's own viewer, in a new tab. */
export function OpenPdfLink({
  size = "lg",
  className = "",
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const pad = size === "sm" ? "px-4 py-2.5 text-[11px]" : "px-7 py-4 text-xs";
  return (
    <a
      href={RESUME.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap border border-white/20 font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-black ${pad} ${className}`}
    >
      Open PDF
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H8m9 0v9" />
      </svg>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
