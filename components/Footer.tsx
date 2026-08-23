"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { AUTHOR, NAV_ITEMS, PROFILES, RESUME_URL } from "@/lib/site";

/*
 * `me` in the rel attribute is the identity claim: "this profile is the same
 * person as this site". It is only half a proof — the profile has to link back
 * — but it is the half that lives in the codebase.
 */
const socialLinks = [
  ...PROFILES.map((p) => ({ name: p.name, href: p.url, external: true, me: true })),
  { name: "Email", href: `mailto:${AUTHOR.email}`, external: false, me: false },
  { name: "Resume", href: RESUME_URL, external: true, me: false },
];

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center border border-white/20 bg-neutral-900/80 backdrop-blur-md text-white shadow-2xl transition-colors hover:border-emerald-500 hover:text-emerald-500"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Footer() {
  const year = new Date().getFullYear();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  return (
    <footer className="relative bg-black text-white overflow-hidden border-t border-white/10">
      <GrainOverlay />
      <BackToTop />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <div
              aria-hidden="true"
              className="mb-8 h-10 w-10 flex items-center justify-center border border-white/20 bg-white/5 font-mono text-sm font-bold text-emerald-500"
            >
              RS
            </div>
            <p className="max-w-sm text-lg font-light text-neutral-300 leading-relaxed">
              Freelance full-stack developer building production e-commerce
              platforms, React Native apps and Gen-AI integrations. Based in
              Bhubaneswar, working worldwide.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                Available for projects
              </span>
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-mono text-xs text-neutral-400 uppercase tracking-widest">
              / NAVIGATION
            </h2>
            <ul className="space-y-4">
              {NAV_ITEMS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={`/${link.href}`}
                    className="group flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    <span className="h-px w-4 bg-neutral-700 group-hover:bg-emerald-500 group-hover:w-6 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/works"
                  className="group flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="h-px w-4 bg-neutral-700 group-hover:bg-emerald-500 group-hover:w-6 transition-all" />
                  All Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="group flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="h-px w-4 bg-neutral-700 group-hover:bg-emerald-500 group-hover:w-6 transition-all" />
                  About Rasmiranjan Sahoo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-mono text-xs text-neutral-400 uppercase tracking-widest">
              / SOCIALS
            </h2>
            <ul className="space-y-4">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? {
                          target: "_blank",
                          rel: link.me
                            ? "me noopener noreferrer"
                            : "noopener noreferrer",
                        }
                      : {})}
                    className="text-sm text-neutral-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative watermark. Was an <h1>, which made it compete with the
            hero heading for the page's primary topic. */}
        <div
          aria-hidden="true"
          className="relative overflow-hidden py-12 border-b border-white/10"
        >
          <motion.div
            style={{ y }}
            className="text-[12vw] md:text-[14vw] font-bold leading-none tracking-tighter text-transparent select-none whitespace-nowrap"
          >
            <span className="footer-outline opacity-30">RASMIRANJAN SAHOO</span>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          <p>© {year} Rasmiranjan Sahoo. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed &amp; built in <span className="text-white">India</span>
          </p>
        </div>
      </div>

      <style jsx global>{`
        .footer-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
    </footer>
  );
}
