"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  type: string;
  year: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "Vedrastores Ecosystem",
    description: "A complete e-commerce infrastructure for Kenya, featuring 4 web platforms and 2 mobile apps. Built from scratch in 4 months using cutting-edge tools.",
    image: "/Projects/Vedrastore/vedrastore-banner.png",
    link: "/works/vedrastores",
    type: "E-Commerce",
    year: "2026",
    tech: ["Next.js", "React Native", "Shadcn", "Node.js", "M-Pesa"],
  }
];

const categories = ["All", "E-Commerce", "Fullstack", "Mobile"];

// --- COMPONENTS ---

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="mb-20 last:mb-0"
    >
      <Link 
        href={project.link} 
        target={project.link.startsWith("http") ? "_blank" : "_self"} 
        className="group relative flex flex-col lg:flex-row h-auto lg:h-[420px] w-full overflow-hidden rounded-[2.5rem] bg-neutral-900/50 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/30 shadow-2xl"
      >
        
        {/* 70% Image Section - Full Color */}
        <div className="relative lg:w-[70%] h-[280px] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover object-center opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>

        {/* 30% Content Section */}
        <div className="lg:w-[30%] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden bg-black/40">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
                    {project.year}
                </span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
                    {project.type}
                </span>
            </div>
            
            <h3 className="mb-4 text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-[0.9]">
              {project.title}
            </h3>
            
            <p className="mb-6 text-base leading-relaxed text-neutral-400 font-light line-clamp-3">
              {project.description}
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
               {project.tech.map((t) => (
                  <span key={t} className="text-[9px] uppercase tracking-widest text-neutral-300 border border-white/10 px-3 py-1.5 rounded-full bg-white/5 font-mono">
                    {t}
                  </span>
               ))}
            </div>

            <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:text-emerald-500 transition-colors">
                View Case Study
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
          </div>

          {/* Decorative Backglow */}
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/5 blur-[100px] -z-0" />
        </div>
      </Link>
    </motion.div>
  );
};

export default function WorksSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.type === activeFilter);

  return (
    <section id="works" className="relative min-h-screen bg-black py-32 text-white overflow-hidden">
      
      {/* Background Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 block font-mono text-sm text-emerald-500"
            >
                02 / PORTFOLIO
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
            >
              Selected<br /><span className="text-neutral-600">Works.</span>
            </motion.h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                  activeFilter === cat
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
            layout 
            className="grid grid-cols-1 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-32 flex justify-center border-t border-white/10 pt-16">
           <Link 
              href="https://github.com/rasmi29" 
              target="_blank"
              className="group flex items-center gap-4 text-xl font-light text-neutral-400 hover:text-white transition-colors"
           >
              <span>More on GitHub</span>
              <span className="block h-[1px] w-12 bg-neutral-600 group-hover:w-24 group-hover:bg-white transition-all duration-300" />
           </Link>
        </div>

      </div>
    </section>
  );
}