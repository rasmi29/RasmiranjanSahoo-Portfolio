"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import RevealHeading from "@/components/ui/RevealHeading";
import SwipeDots, { useSnapIndex } from "@/components/ui/SwipeDots";
import Marquee from "@/components/ui/Marquee";
import { fadeIn, fadeUp, stagger } from "@/lib/motion";

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
    title: "Tooling & learning",
    usedIn: "Git and Postman daily; LLM APIs in side projects, not yet in a shipped one",
    color: "#F1502F",
    span: "lg:col-span-2",
    skills: [
      { name: "OpenAI API", icon: "ai-spark" },
      { name: "LangChain", icon: "langchain" },
      { name: "Git & GitHub", icon: "git" },
      { name: "Postman", icon: "postman" },
    ],
  },
];

/** Chips spring in one after another when their card scrolls into view. */
const chipPop = {
  hidden: { opacity: 0, scale: 0.6, y: 14 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 420, damping: 22 } },
} as const;

/** Every tool, for the two logo bands that drift across the top. */
const allSkills = categories.flatMap((c) => c.skills.map((s) => ({ ...s, color: c.color })));
const bandA = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const bandB = allSkills.slice(Math.ceil(allSkills.length / 2));

function TechPill({ skill }: { skill: Skill & { color: string } }) {
  return (
    <span className="group/pill flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-colors duration-300 hover:border-white/25 md:px-5 md:py-3">
      <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-neutral-900">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl opacity-30 blur-md transition-opacity duration-300 group-hover/pill:opacity-70"
          style={{ backgroundColor: skill.color }}
        />
        {skill.icon ? (
          <Image src={`/icons/${skill.icon}.svg`} alt="" width={18} height={18} className="relative h-[18px] w-[18px]" />
        ) : (
          <span className="relative font-mono text-xs font-bold text-white">{skill.name.charAt(0)}</span>
        )}
      </span>
      <span className="whitespace-nowrap text-base font-medium text-neutral-200 md:text-lg">{skill.name}</span>
    </span>
  );
}

function SkillChip({ skill, color }: { skill: Skill; color: string }) {
  return (
    <motion.li
      variants={chipPop}
      className="group/chip flex items-center gap-2 rounded-xl border border-white/5 bg-neutral-900/50 py-1.5 pl-1.5 pr-3 transition-colors hover:border-white/15 hover:bg-white/[0.04] sm:gap-3 sm:px-3 sm:py-2.5"
    >
      <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-neutral-800 sm:h-8 sm:w-8">
        {skill.icon ? (
          <Image
            src={`/icons/${skill.icon}.svg`}
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className="h-4 w-4 opacity-70 transition-[opacity,transform] duration-300 group-hover/chip:-translate-y-0.5 group-hover/chip:-rotate-12 group-hover/chip:scale-125 group-hover/chip:opacity-100"
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

/** Feeds the card spotlight through CSS variables — no React re-render per move. */
const spotlight = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function SkillsSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  const active = useSnapIndex(rowRef, categories.length);
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative overflow-hidden bg-black py-20 text-white md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>
      <GrainOverlay opacity="opacity-[0.15]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
              03 / STACK
            </motion.span>
            <RevealHeading
              id="skills-heading"
              className="text-5xl font-bold tracking-tighter md:text-7xl"
              lines={[
                {
                  text: "Tech Stack.",
                  className: "bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-transparent",
                },
              ]}
            />
          </div>
          <motion.p {...fadeUp} className="max-w-md text-lg font-light leading-relaxed text-neutral-400">
            Mainstream, well-supported tools, so any competent developer can pick a project up after me.
            Each one is in production somewhere on this page — except the LLM APIs, which I&apos;m still learning.
          </motion.p>
        </div>
      </div>

      {/* Two bands of logos drifting in opposite directions, full-bleed.
          Decorative: the cards below carry the same tools as real content. */}
      <div aria-hidden="true" className="relative z-10 mb-10 space-y-3 md:mb-16 md:space-y-4">
        <Marquee seconds={42} itemClassName="gap-3 pr-3 md:gap-4 md:pr-4">
          {bandA.map((s) => (
            <TechPill key={s.name} skill={s} />
          ))}
        </Marquee>
        <Marquee seconds={48} reverse itemClassName="gap-3 pr-3 md:gap-4 md:pr-4">
          {bandB.map((s) => (
            <TechPill key={s.name} skill={s} />
          ))}
        </Marquee>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Phones: a row to swipe through — six stacked cards were about
            three screens of scrolling. From md up, the bento grid. The card
            in focus is full size; the rest step back. */}
        <div
          ref={rowRef}
          className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              onMouseMove={spotlight}
              className={`group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-5 transition-[border-color,scale,filter] duration-500 ease-out hover:border-white/20 sm:p-7 md:w-auto ${
                i === active ? "" : "max-md:scale-[0.93] max-md:brightness-[0.55]"
              } ${c.span}`}
            >
              {/* Cursor spotlight in the category's colour (desktop). */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), ${c.color}26, transparent 45%)`,
                }}
              />
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
                  className={`mt-5 flex flex-wrap gap-2 sm:mt-6 sm:grid sm:gap-2.5 ${c.span ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"}`}
                >
                  {c.skills.map((s) => (
                    <SkillChip key={s.name} skill={s} color={c.color} />
                  ))}
                </motion.ul>
              </div>
            </motion.article>
          ))}
        </div>
        <SwipeDots count={categories.length} active={active} />
      </div>
    </section>
  );
}
