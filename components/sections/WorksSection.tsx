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
    title: "E-Commerce Platform",
    description: "Fullstack Next.js store with Stripe payments, inventory management, and optimized performance for scale.",
    image: "/e-commerce.png",
    link: "https://delacruash.vercel.app/",
    type: "Fullstack",
    year: "2024",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "EdTech Website",
    description: "Interactive online learning platform with teacher dashboards, student progress tracking, and live classes.",
    image: "/edtech.webp",
    link: "#",
    type: "EdTech",
    year: "2024",
    tech: ["React", "Node.js", "WebRTC"],
  },
  {
    title: "Weather App",
    description: "A responsive weather dashboard built with React, consuming external weather APIs and providing forecasts.",
    image: "/weather.png",
    link: "https://weather-app-by-nirupampal.vercel.app/",
    type: "Frontend",
    year: "2023",
    tech: ["React", "API", "Tailwind"],
  },
  {
    title: "Calculator App",
    description: "A simple and intuitive calculator app built with React, featuring basic arithmetic operations and a clean UI.",
    image: "/calculator.png",
    link: "https://calculator-app-alpha-olive.vercel.app//",
    type: "Frontend",
    year: "2023",
    tech: ["React", "CSS"],
  }
];

const categories = ["All", "Fullstack", "Frontend", "EdTech"];

// --- COMPONENTS ---

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={project.link} target="_blank" className="group relative block h-[450px] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/5">
        
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 z-0 h-full w-full transition-transform duration-700 ease-in-out group-hover:scale-110">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-60 transition-all duration-500 group-hover:opacity-40 group-hover:blur-sm grayscale group-hover:grayscale-0"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
        </div>

        {/* Content Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
          
          {/* Top: Year & Type */}
          <div className="flex justify-between items-start translate-y-[-20px] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
             <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-400 backdrop-blur-md">
                {project.year}
             </span>
             <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
             </div>
          </div>

          {/* Bottom: Info */}
          <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
            <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-emerald-500">
              {project.type}
            </span>
            <h3 className="mb-3 text-3xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="max-w-[90%] text-sm leading-relaxed text-neutral-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
              {project.description}
            </p>
            
            {/* Tech Stack Pills */}
            <div className="mt-6 flex flex-wrap gap-2 opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100">
               {project.tech.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wide text-neutral-300 border border-white/10 px-2 py-1 rounded-md bg-white/5">
                    {t}
                  </span>
               ))}
            </div>
          </div>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
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