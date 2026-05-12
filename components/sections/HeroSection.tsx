"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue 
} from "framer-motion";
import type { JSX } from "react/jsx-runtime";

// --- COMPONENTS ---

// 1. Optimized Grain (Static is much faster than animated)
const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
    <div 
      className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"
      style={{ backgroundRepeat: 'repeat' }} 
    />
  </div>
);

// 2. Optimized Aurora (GPU Forced)
const AuroraBackground = () => {
  const transition = { duration: 25, repeat: Infinity, ease: "linear" as const };
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950 pointer-events-none">
        {/* Primary Glow */}
        <motion.div 
          style={{ willChange: "transform" }} // Inform browser to optimize
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1], // Reduced scale range to save rasterization costs
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={transition}
          className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-purple-900/30 blur-[80px] translate-z-0" 
        />
        {/* Secondary Glow */}
        <motion.div 
          style={{ willChange: "transform" }}
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ ...transition, duration: 30 }}
          className="absolute top-[10%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-blue-900/20 blur-[80px] translate-z-0" 
        />
        {/* Bottom Glow */}
        <motion.div 
           style={{ willChange: "transform" }}
           animate={{ 
            x: ["-20%", "20%"],
            opacity: [0.1, 0.3, 0.1]
           }}
           transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
           className="absolute -bottom-[20%] left-[20%] h-[50vh] w-[50vh] rounded-full bg-emerald-900/10 blur-[80px] translate-z-0" 
        />
    </div>
  );
};

// 3. New Spotlight Component (Uses Transform instead of Background Paint)
const Spotlight = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  return (
    <motion.div
      className="pointer-events-none absolute z-10 -inset-px overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      aria-hidden="true"
    >
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl"
        style={{
          x: mouseX,
          y: mouseY,
          // Centering the circle on the mouse
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
    </motion.div>
  );
};

// 4. Magnetic Button (Unchanged, functionally fine)
const MagneticButton = ({ children, href, primary = false }: { children: React.ReactNode, href: string, primary?: boolean }) => {
    return (
        <Link href={href} className="group relative">
            <div className={`
                relative z-10 flex items-center justify-center px-8 py-4 
                text-sm font-medium tracking-widest uppercase transition-all duration-300
                ${primary 
                    ? "text-neutral-950 bg-white hover:bg-neutral-200" 
                    : "text-white border border-white/20 hover:border-white/50 hover:bg-white/5"}
            `}>
                {children}
            </div>
            {primary && (
                <div className="absolute inset-0 -z-10 bg-white/50 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            )}
        </Link>
    );
}

export default function HeroSection({
  siteUrl = "https://nirupampal.vercel.app",
  ogImage = "/og-hero.png",
}: {
  siteUrl?: string;
  ogImage?: string;
}): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax Scroll Effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]); 
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); 
  
  // Mouse Spotlight Effect - Optimized with Spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement to hide jitter/lag
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // SEO Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Rasmiranjan Sahoo",
        url: siteUrl,
        sameAs: ["https://github.com/rasmi29", "https://www.linkedin.com/in/rasmiranjansahoo702/"],
        jobTitle: "Fullstack Developer",
        description: "Fullstack Developer specializing in modern UI and scalable Node/Next backends.",
      },
      {
        "@type": "WebSite",
        name: "Rasmiranjan Sahoo — Portfolio",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <section
        ref={containerRef}
        id="home"
        onMouseMove={handleMouseMove}
        className="group relative min-h-screen pt-20 w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white selection:bg-white/30"
      >
        <GrainOverlay />
        <AuroraBackground />
        
        {/* Optimized Spotlight */}
        <Spotlight mouseX={smoothX} mouseY={smoothY} />

        {/* Content Container */}
        <motion.div 
            style={{ y: y1, opacity }}
            className="relative z-30 px-6 text-center max-w-7xl mx-auto flex flex-col items-center gap-8"
        >
            {/* Status Pill */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl shadow-2xl hover:border-emerald-500/30 transition-colors duration-500"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-200 tracking-[0.2em] uppercase transition-colors">
                    Available for new projects
                </span>
            </motion.div>

            {/* Main Title Area */}
            <div className="relative">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[12vw] lg:text-[10vw] leading-[0.85] font-black tracking-tighter"
                >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-400">
                        RASMIRANJAN
                    </span>
                    <span className="block mt-2 text-neutral-900 outline-text hover:text-white/5 transition-colors duration-700 cursor-default">
                        SAHOO
                    </span>
                </motion.h1>

                {/* Decorative Geometric Shapes */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                    </svg>
                </div>
                <div className="absolute -right-12 bottom-0 hidden xl:block opacity-20 group-hover:opacity-40 transition-opacity duration-1000 delay-300">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect x="0.5" y="0.5" width="39" height="39" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                    </svg>
                </div>
            </div>

            {/* Subheading - Refined Typography */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl font-light text-neutral-400 max-w-4xl leading-relaxed mt-4"
            >
                Engineering <span className="text-white border-b border-white/10">digital excellence</span>. 
                I deliver premium <span className="text-emerald-400/90 font-medium">Freelance Development</span> & <span className="text-emerald-400/90 font-medium">Gen AI solutions</span> for high-impact businesses globally.
            </motion.p>

            {/* CTA Actions */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-8 mt-4"
            >
                <MagneticButton href="#works" primary>
                    Explore Portfolio
                </MagneticButton>
                <MagneticButton href="https://drive.google.com/file/d/1ppX0jXZ7ipvF5q_grkefQOPvcpDLU2LY/view">
                    Get In Touch
                </MagneticButton>
            </motion.div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
        >
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-mono">Explore</span>
            <div className="h-16 w-[1px] bg-gradient-to-b from-neutral-800 via-neutral-500 to-transparent overflow-hidden">
                <motion.div 
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1/2 w-full bg-emerald-500"
                />
            </div>
        </motion.div>

        <style jsx global>{`
            .outline-text {
                -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15);
                color: transparent;
                letter-spacing: 0.05em;
            }
            @media (min-width: 768px) {
                .outline-text {
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
                }
            }
            .outline-text:hover {
                -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
            }
            /* Hardware acceleration helper */
            .translate-z-0 {
                transform: translateZ(0);
            }
        `}</style>
      </section>
    </>
  );
}