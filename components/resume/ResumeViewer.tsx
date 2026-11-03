"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { RESUME } from "@/lib/site";
import { EASE } from "@/lib/motion";
import ResumeContent from "@/components/resume/ResumeContent";
import { DownloadButton, OpenPdfLink } from "@/components/resume/ResumeActions";
import { RESUME_OPEN_EVENT } from "@/components/resume/resumeEvents";

/**
 * The full-screen resume overlay. Mounted once in the root layout; any
 * <ResumeLink> opens it (see resumeEvents.ts).
 *
 * Behaves like the mobile menu: Escape closes, focus is trapped inside and
 * returned to the button that opened it, and the page behind keeps its scroll
 * position (position:fixed lock — overflow:hidden made iOS Safari jump).
 */
export default function ResumeViewer() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(RESUME_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(RESUME_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    scrollRef.current = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollRef.current}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, scrollRef.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const returnTo = returnFocusRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const visible = Array.from(focusables).filter((el) => el.offsetParent !== null);
      if (!visible.length) return;
      const first = visible[0];
      const last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
      returnTo?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="resume-viewer"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
          data-backdrop=""
          onClick={(e) => {
            // Clicking the empty dark area closes; the content itself does not.
            if ((e.target as HTMLElement).dataset.backdrop !== undefined) close();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-200 overflow-x-hidden overflow-y-auto overscroll-contain bg-black/85 text-white backdrop-blur-xl"
        >
          {/* Atmosphere: grain and two slow emerald glows, fixed behind the scroll. */}
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
            <GrainOverlay opacity="opacity-[0.15]" />
            <motion.div
              className="absolute -left-40 -top-40 h-136 w-136 rounded-full bg-emerald-500/20 blur-[120px]"
              animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-48 -right-40 h-152 w-152 rounded-full bg-teal-500/10 blur-[140px]"
              animate={reduce ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.8, 0.5, 0.8] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Top bar */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: "-100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "-100%", transition: { duration: 0.3, ease: EASE.inOut } }}
            transition={{ duration: 0.5, ease: EASE.out }}
            className="sticky top-0 z-30 border-b border-white/5 bg-black/60 backdrop-blur-md"
          >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
              <div className="flex min-w-0 items-center gap-3 font-mono text-xs text-neutral-400">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="truncate uppercase tracking-widest text-neutral-200">{RESUME.fileName}</span>
                <span className="hidden text-neutral-500 sm:inline">· 1 page · {RESUME.pdfKB} KB</span>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <div className="hidden items-center gap-3 md:flex">
                  <OpenPdfLink size="sm" />
                  <DownloadButton size="sm" />
                </div>
                <button
                  type="button"
                  data-autofocus=""
                  onClick={close}
                  aria-label="Close resume"
                  className="group flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 transition-colors hover:bg-white hover:text-black"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          <div data-backdrop="" className="relative pt-10 pb-32 sm:pt-14 md:pb-24">
            <ResumeContent mode="dialog" onNavigate={close} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
