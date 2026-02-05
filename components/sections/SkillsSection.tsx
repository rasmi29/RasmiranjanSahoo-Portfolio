"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import type { JSX } from "react/jsx-runtime";

// --- DATA ---
type Skill = {
  name: string;
  icon: string;
};

type CategoryData = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  color: string; // Accent color for the group
};

const skillData: CategoryData[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Crafting pixel-perfect, responsive user interfaces with a focus on performance and accessibility. I specialize in the React ecosystem.",
    color: "#61DAFB", // React Blue
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "React Native", icon: "react" },
      { name: "Shadcn", icon: "shadcnui" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Architecting scalable server-side solutions. I build robust APIs and handle real-time communications.",
    color: "#68A063", // Node Green
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "Socket.io", icon: "socketdotio" },
    ],
  },
  {
    id: "database",
    title: "Database",
    description: "Designing efficient data schemas. I work with both relational and document-based databases to ensure data integrity.",
    color: "#336791", // SQL Blue
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Designing efficient data schemas. I work with both relational and document-based databases to ensure data integrity.",
    color: "#336791", // SQL Blue
    skills: [
      { name: "Git and Github", icon: "git" },
      { name: "Perplexity", icon: "perplexity" },
      { name: "Postman", icon: "postman" },
      
    ],
  },
];

// --- UTILS ---
function getIconUrl(slug: string): string {
  // requesting white icons for dark theme
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

// --- COMPONENTS ---

const SkillCard = ({ name, icon, color }: { name: string; icon: string; color: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-neutral-900/40 backdrop-blur-sm transition-colors group cursor-default"
    >
      <div className="relative w-10 h-10 flex items-center justify-center bg-neutral-800 rounded-lg group-hover:bg-neutral-700 transition-colors">
        <img src={getIconUrl(icon)} alt={name} className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
        {/* Glow behind icon */}
        <div 
            className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"
            style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-neutral-300 font-light tracking-wide group-hover:text-white transition-colors">
        {name}
      </span>
    </motion.div>
  );
};

const CategorySection = ({ data, index }: { data: CategoryData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  
  // Parallax effect for the Title
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={ref}
      className="relative min-h-[80vh] flex items-center py-24 border-l border-white/10 ml-4 md:ml-12 pl-8 md:pl-16"
    >
      {/* Connector Line Dot */}
      <span className={`absolute -left-[5px] top-1/2 w-2.5 h-2.5 rounded-full transition-colors duration-500 ${isInView ? "bg-white shadow-[0_0_10px_white]" : "bg-neutral-800"}`} />

      <div className="grid lg:grid-cols-2 gap-16 w-full max-w-6xl">
        
        {/* Left: Title & Description */}
        <div className="relative">
          <motion.div style={{ y: yParallax, opacity: opacityParallax }} className="sticky top-1/2">
            <span 
                className="text-sm font-mono mb-4 block opacity-50" 
                style={{ color: data.color }}
            >
                0{index + 1} / CATEGORY
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
              {data.title}
            </h2>
            <p className="text-lg text-neutral-400 font-light leading-relaxed max-w-md border-l-2 border-white/5 pl-6">
              {data.description}
            </p>
          </motion.div>
        </div>

        {/* Right: Skills Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-center"
        >
          {data.skills.map((skill) => (
            <SkillCard key={skill.name} name={skill.name} icon={skill.icon} color={data.color} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default function SkillsParallax(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-white/20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Progress Bar Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50 mix-blend-difference"
        style={{ scaleX }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="mb-32 pl-4 md:pl-12">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800"
            >
                Tech<br /> Stack.
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-8 text-neutral-500 max-w-xl text-lg"
            >
                A curated list of technologies I use to build digital products. 
                Scroll down to explore my expertise.
            </motion.p>
        </div>

        {/* Categories Loop */}
        <div className="flex flex-col gap-0 pb-32">
            {skillData.map((category, index) => (
            <CategorySection key={category.id} data={category} index={index} />
            ))}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center py-20 border-t border-white/10">
            <p className="text-neutral-500 font-mono text-sm">END OF LIST</p>
        </div>

      </div>
    </div>
  );
}