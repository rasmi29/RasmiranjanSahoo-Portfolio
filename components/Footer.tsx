"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// --- DATA ---
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Works", href: "#works" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/rasmiranjansahoo702" },
  { name: "GitHub", href: "https://github.com/rasmi29" },
  { name: "Email", href: "mailto:rasmiranjansahoo702@gmail.com" },
  { name: "Resume", href: "https://drive.google.com/file/d/1ppX0jXZ7ipvF5q_grkefQOPvcpDLU2LY/view" },
];

// --- COMPONENTS ---

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150" />
  </div>
);

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
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

  // Parallax for the giant text
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  return (
    <footer className="relative bg-black text-white overflow-hidden border-t border-white/10">
      <GrainOverlay />
      
      <BackToTop />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-12">
        
        {/* Top Section: Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
          
          {/* Brand / Intro */}
          <div className="md:col-span-2">
             <div className="mb-8 h-10 w-10 flex items-center justify-center border border-white/20 bg-white/5 font-mono text-sm font-bold text-emerald-500">
                NP
             </div>
             <p className="max-w-sm text-lg font-light text-neutral-400 leading-relaxed">
                Fullstack developer crafting minimal, functional, and aesthetically refined digital experiences.
             </p>
             
             {/* System Status Pill */}
             <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    System Normal • v2.0
                </span>
             </div>
          </div>

          {/* Sitemaps */}
          <div>
            <h3 className="mb-6 font-mono text-xs text-neutral-500 uppercase tracking-widest">
                / NAVIGATION
            </h3>
            <ul className="space-y-4">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href} className="group flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                            <span className="h-px w-4 bg-neutral-700 group-hover:bg-emerald-500 group-hover:w-6 transition-all" />
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="mb-6 font-mono text-xs text-neutral-500 uppercase tracking-widest">
                / SOCIALS
            </h3>
            <ul className="space-y-4">
                {socialLinks.map((link) => (
                    <li key={link.name}>
                        <a 
                            href={link.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                        >
                            {link.name}
                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </li>
                ))}
            </ul>
          </div>

        </div>

        {/* Giant Text Watermark */}
        <div className="relative overflow-hidden py-12 border-b border-white/10">
            <motion.h1 
                style={{ y }}
                className="text-[12vw] md:text-[14vw] font-bold leading-none tracking-tighter text-transparent select-none whitespace-nowrap"
            >
                <span className="outline-text opacity-30">RASMIRANJAN SAHOO</span>
            </motion.h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            <p>© {year} Rasmiranjan Sahoo. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
                Designed & Built in <span className="text-white">India</span>
            </p>
        </div>

      </div>

      {/* Style for Outline Text */}
      <style jsx global>{`
        .outline-text {
            -webkit-text-stroke: 1px rgba(255,255,255,0.2);
            color: transparent;
        }
      `}</style>
    </footer>
  );
}