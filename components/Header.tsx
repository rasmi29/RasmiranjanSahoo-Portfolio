"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { NAV_ITEMS, RESUME_URL } from "@/lib/site";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const scrollLockRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 50) {
      setIsHidden(diff > 0);
      lastYRef.current = y;
    }
  });

  /* Scroll-spy via IntersectionObserver — the old version ran
     getBoundingClientRect() for every section on every scroll event. */
  useEffect(() => {
    const sections = NAV_ITEMS.map((i) =>
      document.getElementById(i.href.slice(1)),
    ).filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Scroll lock that preserves position. Setting body{overflow:hidden}
     directly made iOS Safari jump to the top when the menu closed. */
  useEffect(() => {
    if (!isMenuOpen) return;
    scrollLockRef.current = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollLockRef.current}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, scrollLockRef.current);
    };
  }, [isMenuOpen]);

  /* Escape to close + focus trap, so the overlay is usable by keyboard. */
  useEffect(() => {
    if (!isMenuOpen) return;
    const opener = openerRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

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
      panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
      opener?.focus();
    };
  }, [isMenuOpen]);

  const scrollToSection = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      setIsMenuOpen(false);
      // Let the scroll lock unwind before scrolling.
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          el?.scrollIntoView({ behavior: "smooth", block: "start" }),
        ),
      );
    },
    [],
  );

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden && !isMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center border-b border-white/5 bg-black/60 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative flex h-10 w-10 overflow-hidden items-center justify-center border border-white/20 bg-white/5 transition-colors group-hover:border-emerald-500 group-hover:bg-emerald-500/10">
              <Image
                src="/logo-mark.webp"
                alt=""
                aria-hidden="true"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold text-white tracking-widest uppercase">
                Rasmiranjan Sahoo
              </span>
              <span className="text-[10px] text-neutral-400 tracking-wider">
                Full-Stack Developer
              </span>
            </div>
          </Link>

          <nav aria-label="Main" className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.name}
                  onClick={scrollToSection(item.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-xs font-medium tracking-widest uppercase transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-neutral-400"
                  }`}
                >
                  <span className="relative">
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="navDot"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                      />
                    )}
                  </span>
                </button>
              );
            })}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 text-xs font-bold text-black bg-white hover:bg-emerald-400 transition-colors uppercase tracking-wider"
            >
              Resume
            </a>
          </nav>

          <button
            ref={openerRef}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="group flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-px w-6 bg-white transition-all group-hover:w-8 group-hover:bg-emerald-400" />
            <span className="h-px w-6 bg-white transition-all group-hover:w-4 group-hover:bg-emerald-400" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 flex flex-col bg-neutral-950 text-white"
          >
            <GrainOverlay />

            <div className="relative z-30 flex h-20 items-center justify-between border-b border-white/10 px-6">
              <span className="font-mono text-sm text-neutral-400">MENU</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative z-30 flex flex-1 flex-col justify-center px-6">
              <nav aria-label="Mobile" className="flex flex-col space-y-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.name}
                    onClick={scrollToSection(item.href)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="group flex items-center gap-4 text-left"
                  >
                    <span className="font-mono text-xs text-neutral-500 group-hover:text-emerald-500 transition-colors">
                      {item.index}
                    </span>
                    <span className="text-5xl font-bold tracking-tighter text-neutral-300 transition-colors group-hover:translate-x-4 group-hover:text-white duration-300">
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="relative z-30 border-t border-white/10 p-6">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-white py-4 text-sm font-bold uppercase tracking-widest text-black hover:bg-emerald-400 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
