"use client";

import React, { useRef, useEffect, memo } from "react";
import Head from "next/head";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView,
  useMotionValue,
  animate
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- DATA ---
// (Kept outside component to prevent recreation)
const experiences = [
  {
    id: "01",
    title: "Junior Software Development Engineer",
    company: "Gravitones",
    date: "Oct 2025 — Present",
    description: "Architecting scalable web platforms and app platforms. Delivered 5+ end-to-end solutions including E-commerce platforms and real-time chat apps. Handled database design, API development, and UI implementation",
    tags: ["Leadership", "Architecture", "React Native", "MERN"],
  },
  {
    id: "02",
    title: "Mern Intern",
    company: "Gravity Engineering Services",
    date: "Sept 2025 — Oct 2025",
    description: "Part in a multi tenant project and fix bugs , deliver solutions.",
    tags: ["Node js", "DB Design", "React"],
  },
  {
    id: "03",
    title: "Continuous Learning",
    company: "Self-Development",
    date: "Ongoing",
    description: "Deepening expertise in Generative Ai. Currently learning Agent sdk and gen ai.",
    tags: ["OpenAi", "Langchain", "Agent SDK"],
  },
];

const stats = [
  { value: 3, suffix: "+", label: "Years Exp." },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 100, suffix: "%", label: "Commitment" },
];

// --- OPTIMIZED SUB-COMPONENTS ---

// 1. Zero-Render Counter (Updates DOM directly via ref)
const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
};

// 2. Memoized Experience Card (Prevents re-renders if parent updates)
const ExperienceCard = memo(({ data }: { data: typeof experiences[0] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative border-l border-white/10 pl-8 md:pl-12 py-8 transition-colors hover:border-emerald-500/50"
    >
        <span className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-neutral-800 ring-4 ring-neutral-950 transition-colors group-hover:bg-emerald-500" />
        
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
            <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {data.title}
            </h4>
            <span className="font-mono text-xs text-neutral-500 bg-white/5 px-2 py-1 rounded">
                {data.date}
            </span>
        </div>
        
        <p className="mb-2 text-sm font-mono text-neutral-400 uppercase tracking-wider">
            {data.company}
        </p>
        
        <p className="text-neutral-400 leading-relaxed max-w-xl mb-6">
            {data.description}
        </p>

        <div className="flex flex-wrap gap-2">
            {data.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-wider text-neutral-500 border border-white/5 px-2 py-1 rounded hover:border-white/20 transition-colors">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
  );
});
ExperienceCard.displayName = "ExperienceCard";

export default function AboutSection({
  resumeUrl = "https://drive.google.com/file/d/1ppX0jXZ7ipvF5q_grkefQOPvcpDLU2LY/view",
}: {
  resumeUrl?: string;
}) {
  const containerRef = useRef(null);
  
  // Parallax Logic
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]); // Reduced distance for smoother feel
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rasmiranjan Sahoo",
    jobTitle: "Junior Software Engineer",
    url: "https://nirupampal.vercel.app",
    sameAs: ["https://github.com/rasmi29", "https://www.linkedin.com/in/rasmiranjansahoo702/"],
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen bg-neutral-950 py-32 text-white overflow-hidden"
    >
      <Head>
        <title>About — Rasmiranjan Sahoo</title>
        <meta name="description" content="About Rasmiranjan Sahoo — Fullstack Developer." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* Static Background Noise (Optimized: No Animation) */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-24">
            <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 block font-mono text-sm text-emerald-500"
            >
                01 / ABOUT ME
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold tracking-tighter"
            >
                Engineer.<br />
                <span className="text-neutral-600">Problem Solver.</span>
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Image (Sticky & Parallax) */}
            <div className="lg:col-span-5 relative">
                <motion.div 
                    style={{ y, willChange: "transform" }} // GPU Hint
                    className="lg:sticky lg:top-32"
                >
                    <div className="group relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm bg-neutral-900 border border-white/10">
                        <Image
                            src="/rasmi.jpg"
                            alt="Rasmiranjan Sahoo"
                            fill
                            priority // Critical for LCP
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        />
                        
                        {/* Static Overlay (Cheaper than gradients) */}
                        <div className="pointer-events-none absolute inset-0 bg-neutral-950/20 z-10" />
                        
                        {/* Decorative Corners */}
                        <div className="absolute top-2 left-2 h-4 w-4 border-l-2 border-t-2 border-white/80 z-20" />
                        <div className="absolute bottom-2 right-2 h-4 w-4 border-r-2 border-b-2 border-white/80 z-20" />
                    </div>

                    {/* Quick Stats Grid - Zero Render Counters */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="border border-white/5 bg-white/5 p-4 backdrop-blur-sm text-center">
                                <div className="text-2xl font-bold text-white flex justify-center">
                                   <Counter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="mt-1 font-mono text-[10px] uppercase text-neutral-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <a 
                        href={resumeUrl}
                        download
                        className="mt-8 flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent py-4 text-sm font-medium uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <span>Download Resume</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </motion.div>
            </div>

            {/* Right Column: Bio & Timeline */}
            <div className="lg:col-span-7">
                
                {/* Bio Text */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 space-y-6 text-lg md:text-xl font-light leading-relaxed text-neutral-300"
                >
                    <p>
                        I build <span className="text-white font-normal">production-ready</span> web applications with a relentless focus on performance and scalability.
                    </p>
                    <p className="text-neutral-400">
                        Currently leading engineering efforts at <span className="text-white">Gravitones</span>, I bridge the gap between complex backend logic and fluid user interfaces. My philosophy is simple: code should be as clean as the design it powers.
                    </p>
                    <p className="text-neutral-400">
                        When I'm not pushing code, I'm likely exploring UI UX frameworks, optimizing CI/CD pipelines, or contributing to the developer community in India.
                    </p>
                </motion.div>

                {/* Experience List */}
                <div>
                    <h3 className="mb-8 font-mono text-sm text-emerald-500">
                        / CAREER_HISTORY
                    </h3>
                    <div className="space-y-0">
                        {experiences.map((exp) => (
                            <ExperienceCard key={exp.id} data={exp} />
                        ))}
                    </div>
                </div>

                {/* Connect CTA */}
                <div className="mt-20 border-t border-white/10 pt-10">
                    <p className="mb-4 text-neutral-400">Interested in working together?</p>
                    <Link href="#contact" className="inline-block text-3xl font-bold text-white hover:text-emerald-400 transition-colors">
                        Let's Talk  &rarr;
                    </Link>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
}