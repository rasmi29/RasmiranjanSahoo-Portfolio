"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// --- DATA ---
const navItems = [
  { name: "Home", href: "#home", index: "01" },
  { name: "Works", href: "#works", index: "02" },
  { name: "About", href: "#about", index: "03" },
  { name: "Skills", href: "#skills", index: "04" },
  { name: "Contact", href: "#contact", index: "05" },
];

// --- COMPONENTS ---

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150" />
  </div>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  // Handle Scroll (Hide/Show & Active Section)
  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 50) {
      setIsHidden(diff > 0); // Hide on scroll down
      lastYRef.current = y;
    }
  });

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Lock body scroll on menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const scrollToSection = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center border-b border-white/5 bg-black/50 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 transition-colors group-hover:border-emerald-500 group-hover:bg-emerald-500/10">
               <span className="font-mono text-sm font-bold text-white">RS</span>
            </div>
            <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-white tracking-widest uppercase">Rasmiranjan Sahoo</span>
                <span className="text-[10px] text-neutral-500 tracking-wider">Fullstack Dev</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                    <button
                        key={item.name}
                        onClick={scrollToSection(item.href)}
                        className={`text-xs font-medium tracking-widest uppercase transition-colors hover:text-white ${
                            isActive ? "text-white" : "text-neutral-500"
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
                )
            })}
             <a
                href="https://drive.google.com/file/d/1WdiR6QzRi3tsuMX-d5JHZ3_t3tnH_F-z/view"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-5 py-2 text-xs font-bold text-black bg-white hover:bg-emerald-400 transition-colors uppercase tracking-wider"
             >
                Resume
             </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-px w-6 bg-white transition-all group-hover:w-8 group-hover:bg-emerald-400" />
            <span className="h-px w-6 bg-white transition-all group-hover:w-4 group-hover:bg-emerald-400" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-neutral-950 text-white"
          >
            <GrainOverlay />
            
            {/* Mobile Header */}
            <div className="relative z-30 flex h-20 items-center justify-between border-b border-white/10 px-6">
                <span className="font-mono text-sm text-neutral-500">MENU</span>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-colors"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Links */}
            <div className="relative z-30 flex flex-1 flex-col justify-center px-6">
               <nav className="flex flex-col space-y-6">
                  {navItems.map((item, i) => (
                    <motion.button
                        key={item.name}
                        onClick={scrollToSection(item.href)}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="group flex items-center gap-4 text-left"
                    >
                        <span className="font-mono text-xs text-neutral-600 group-hover:text-emerald-500 transition-colors">
                            {item.index}
                        </span>
                        <span className="text-5xl font-bold tracking-tighter text-neutral-300 transition-colors group-hover:translate-x-4 group-hover:text-white duration-300">
                            {item.name}
                        </span>
                    </motion.button>
                  ))}
               </nav>
            </div>

            {/* Mobile Footer */}
            <div className="relative z-30 border-t border-white/10 p-6">
                <a 
                    href="https://drive.google.com/file/d/1WdiR6QzRi3tsuMX-d5JHZ3_t3tnH_F-z/view"
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