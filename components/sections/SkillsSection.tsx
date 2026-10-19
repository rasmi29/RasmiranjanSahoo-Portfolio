"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { fadeIn, fadeUp, stagger, staggerChild } from "@/lib/motion";

/**
 * One bento screen instead of five full-height category slides. Every tool
 * listed here appears in at least one shipped project on this site — the
 * "used in" line under each category says where, so a claim is checkable.
 */

type Skill = { name: string; icon?: string };

type Category = {
  id: string;
  title: string;
  usedIn: string;
  color: string;
  span: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    usedIn: "Every web platform — marketplaces, portals, admin panels",
    color: "#61DAFB",
    span: "lg:col-span-2",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Shadcn UI", icon: "shadcnui" },
      { name: "Vite", icon: "vite" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    usedIn: "6 iOS & Android apps across 4 products on this page",
    color: "#A78BFA",
    span: "",
    skills: [
      { name: "React Native", icon: "react" },
      { name: "Expo", icon: "expo" },
      { name: "Expo Router", icon: "expo" },
    ],
  },
  {
    id: "backend",
    title: "Backend & real time",
    usedIn: "One API behind each multi-app product — 150 to 400+ endpoints",
    color: "#68A063",
    span: "",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "Socket.IO", icon: "socketdotio" },
    ],
  },
  {
    id: "data",
    title: "Data",
    usedIn: "Seat locks, ledgers, real-time order state",
    color: "#336791",
    span: "",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    id: "payments",
    title: "Payments & cloud",
    usedIn: "M-Pesa live in Kenya, Razorpay in India",
    color: "#10B981",
    span: "",
    skills: [
      { name: "M-Pesa (Daraja)" },
      { name: "Razorpay", icon: "razorpay" },
      { name: "AWS S3 & CloudFront" },
      { name: "Google Cloud", icon: "googlecloud" },
    ],
  },
  {
    id: "ai",
    title: "AI & tooling",
    usedIn: "LLM features where they earn their place; Git and Postman daily",
    color: "#F1502F",
    span: "lg:col-span-2",
    skills: [
      { name: "OpenAI API", icon: "ai-spark" },
      { name: "LangChain", icon: "langchain" },
      { name: "Agent SDK", icon: "agent" },
      { name: "Git & GitHub", icon: "git" },
      { name: "Postman", icon: "postman" },
    ],
  },
];

function SkillChip({ skill, color }: { skill: Skill; color: string }) {
  return (
    <motion.li
      variants={staggerChild}
      className="group/chip flex items-center gap-3 rounded-xl border border-white/5 bg-neutral-900/50 px-3 py-2.5 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
    >
      <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-neutral-800">
        {skill.icon ? (
          <Image
            src={`/icons/${skill.icon}.svg`}
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className="h-4 w-4 opacity-70 transition-opacity group-hover/chip:opacity-100"
          />
        ) : (
          <span aria-hidden="true" className="font-mono text-[11px] font-bold text-neutral-300">
            {skill.name.charAt(0)}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-lg opacity-0 blur-md transition-opacity duration-300 group-hover/chip:opacity-40"
          style={{ backgroundColor: color }}
        />
      </span>
      <span className="text-sm font-light text-neutral-300 transition-colors group-hover/chip:text-white">{skill.name}</span>
    </motion.li>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative overflow-hidden bg-black py-32 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>
      <GrainOverlay opacity="opacity-[0.15]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
              03 / STACK
            </motion.span>
            <motion.h2
              id="skills-heading"
              {...fadeUp}
              className="bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-7xl"
            >
              Tech Stack.
            </motion.h2>
          </div>
          <motion.p {...fadeUp} className="max-w-md text-lg font-light leading-relaxed text-neutral-400">
            Mainstream, well-supported tools, so any competent developer can pick a project up after me.
            Each one is in production somewhere on this page.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-7 transition-colors duration-500 hover:border-white/20 ${c.span}`}
            >
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-10 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
                style={{ backgroundColor: c.color }}
              />
              <div className="relative">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-bold tracking-tight text-white">{c.title}</h3>
                  <span className="font-mono text-xs" style={{ color: c.color }}>
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm text-neutral-400">{c.usedIn}</p>
                <motion.ul
                  {...stagger(0.05)}
                  className={`mt-6 grid gap-2.5 ${c.span ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"}`}
                >
                  {c.skills.map((s) => (
                    <SkillChip key={s.name} skill={s} color={c.color} />
                  ))}
                </motion.ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
