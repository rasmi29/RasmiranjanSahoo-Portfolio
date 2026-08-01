"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";

type Skill = { name: string; icon: string };

type CategoryData = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  color: string;
};

/* Icons are self-hosted in /public/icons (see the audit: 37 requests to
   cdn.simpleicons.org, no width/height, and `openai` now 404s there). */
const skillData: CategoryData[] = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Crafting pixel-perfect, responsive user interfaces with a focus on performance and accessibility. I specialise in the React ecosystem.",
    color: "#61DAFB",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "React Native", icon: "react" },
      { name: "Shadcn UI", icon: "shadcnui" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description:
      "Architecting scalable server-side solutions. I build robust APIs and handle real-time communication.",
    color: "#68A063",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "Socket.io", icon: "socketdotio" },
    ],
  },
  {
    id: "database",
    title: "Database",
    description:
      "Designing efficient data schemas. I work with both relational and document-based databases to ensure data integrity.",
    color: "#336791",
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    // Previously a verbatim copy of the Database description.
    description:
      "The workflow around the code: version control, API testing and research tooling that keeps delivery predictable.",
    color: "#F1502F",
    skills: [
      { name: "Git & GitHub", icon: "git" },
      { name: "Postman", icon: "postman" },
      { name: "Perplexity", icon: "perplexity" },
    ],
  },
  {
    id: "ai",
    title: "Gen AI",
    description:
      "Leveraging large language models and agentic frameworks to build the next generation of intelligent applications.",
    color: "#10B981",
    skills: [
      { name: "Generative AI", icon: "ai-spark" },
      { name: "OpenAI API", icon: "ai-spark" },
      { name: "LangChain", icon: "langchain" },
      { name: "Agent SDK", icon: "agent" },
      { name: "Google Cloud", icon: "googlecloud" },
    ],
  },
];

const SkillCard = ({
  name,
  icon,
  color,
}: {
  name: string;
  icon: string;
  color: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    }}
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-neutral-900/40 backdrop-blur-sm transition-colors hover:bg-white/[0.03] group cursor-default"
  >
    <div className="relative w-10 h-10 flex items-center justify-center bg-neutral-800 rounded-lg group-hover:bg-neutral-700 transition-colors">
      {/* Explicit width/height — the old <img> had none, which caused CLS. */}
      <Image
        src={`/icons/${icon}.svg`}
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
      />
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

const CategorySection = ({ data, index }: { data: CategoryData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className="relative min-h-[70vh] flex items-center py-20 border-l border-white/10 ml-4 md:ml-12 pl-8 md:pl-16"
    >
      <span
        aria-hidden="true"
        className={`absolute -left-[5px] top-1/2 w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
          isInView ? "bg-white shadow-[0_0_10px_white]" : "bg-neutral-800"
        }`}
      />

      <div className="grid lg:grid-cols-2 gap-16 w-full max-w-6xl">
        <div className="relative">
          <motion.div
            style={reduce ? undefined : { y: yParallax, opacity: opacityParallax }}
            className="sticky top-1/2"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-mono block opacity-70" style={{ color: data.color }}>
                0{index + 1} / CATEGORY
              </span>
              {data.id === "ai" && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-mono">
                  CORE_EXPERTISE
                </span>
              )}
            </div>
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
              {data.title}
            </h3>
            <p className="text-lg text-neutral-400 font-light leading-relaxed max-w-md border-l-2 border-white/5 pl-6">
              {data.description}
            </p>
            {data.id === "ai" && (
              <div
                aria-hidden="true"
                className="absolute -inset-x-12 -inset-y-8 bg-emerald-500/5 blur-[80px] -z-10 rounded-full opacity-50"
              />
            )}
          </motion.div>
        </div>

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
    </div>
  );
};

export default function SkillsSection() {
  return (
    /* id="skills" — this was missing entirely, so the Skills link in both the
       header and the footer silently did nothing. */
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative bg-black text-white overflow-hidden selection:bg-white/20"
    >
      {/* Was `fixed inset-0`, which escaped this section and tinted every
          other section of the page for the entire scroll. */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>
      <GrainOverlay opacity="opacity-[0.15]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="mb-24 pl-4 md:pl-12">
          {/* Was an <h1> — the page already has one in the hero. */}
          <motion.h2
            id="skills-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700"
          >
            Tech
            <br /> Stack.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-8 text-neutral-400 max-w-xl text-lg"
          >
            The technologies I use to ship production software — from the
            interface layer down to payments, data and AI.
          </motion.p>
        </div>

        <div className="flex flex-col gap-0 pb-24">
          {skillData.map((category, index) => (
            <CategorySection key={category.id} data={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
