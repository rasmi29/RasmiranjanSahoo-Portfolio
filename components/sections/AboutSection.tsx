"use client";

import React, { useRef, useEffect, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { PORTRAIT, RESUME_URL } from "@/lib/site";
import { fadeIn, fadeUp } from "@/lib/motion";

const experiences = [
  {
    id: "01",
    title: "Software Development Engineer",
    company: "Gravitones",
    date: "Oct 2025 — Present",
    description:
      "Architecting scalable web and mobile platforms. Delivered 5+ end-to-end solutions including e-commerce platforms and real-time chat apps, covering database design, API development and UI implementation.",
    tags: ["Architecture", "React Native", "MERN", "Leadership"],
  },
  {
    id: "02",
    title: "MERN Intern",
    company: "Gravity Engineering Services",
    date: "Sept 2025 — Oct 2025",
    description:
      "Contributed to a multi-tenant platform — shipping features, fixing bugs and hardening the data layer.",
    tags: ["Node.js", "DB Design", "React"],
  },
  {
    id: "03",
    title: "Continuous Learning",
    company: "Self-Development",
    date: "Ongoing",
    description:
      "Certified in Generative AI Fundamentals by Chai Code. Actively building with LLMs, LangChain and agentic SDKs to create autonomous AI systems.",
    tags: ["Generative AI", "LangChain", "Agent SDK", "OpenAI"],
  },
];

/*
 * Stats a client can verify against the case study, rather than round numbers
 * the timeline directly below contradicts. ("3+ Years Exp." sat above a
 * history starting Sept 2025; "20+ Projects" above a single project.)
 */
const stats = [
  { value: 6, suffix: "", label: "Codebases Shipped" },
  { value: 4, suffix: "mo", label: "Delivery Time" },
  { value: 2, suffix: "", label: "Apps in Production" },
];

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = Math.round(latest) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
};

const ExperienceCard = memo(({ data }: { data: (typeof experiences)[0] }) => (
  <motion.div
    {...fadeUp}
    className="group relative border-l border-white/10 pl-8 md:pl-12 py-8 transition-colors hover:border-emerald-500/50"
  >
    <span
      aria-hidden="true"
      className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-neutral-800 ring-4 ring-neutral-950 transition-colors group-hover:bg-emerald-500"
    />

    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
      <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
        {data.title}
      </h4>
      <span className="font-mono text-xs text-neutral-400 bg-white/5 px-2 py-1 rounded">
        {data.date}
      </span>
    </div>

    <p className="mb-2 text-sm font-mono text-neutral-400 uppercase tracking-wider">
      {data.company}
    </p>

    <p className="text-neutral-300 leading-relaxed max-w-xl mb-6">{data.description}</p>

    <div className="flex flex-wrap gap-2">
      {data.tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] uppercase tracking-wider text-neutral-400 border border-white/5 px-2 py-1 rounded hover:border-white/20 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
));
ExperienceCard.displayName = "ExperienceCard";

export default function AboutSection() {
  const containerRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="about"
      ref={containerRef}
      aria-labelledby="about-heading"
      className="relative bg-neutral-950 py-32 text-white overflow-hidden"
    >
      <GrainOverlay />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
            02 / ABOUT ME
          </motion.span>
          <motion.h2
            id="about-heading"
            {...fadeUp}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Engineer.
            <br />
            <span className="text-neutral-500">Problem Solver.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 relative">
            <motion.div
              style={reduce ? undefined : { y, willChange: "transform" }}
              className="lg:sticky lg:top-32"
            >
              {/* A real <figure>/<figcaption> pair. The caption is what tells
                  Google Images who the face belongs to — an alt attribute alone
                  is a weaker signal than alt plus adjacent visible text. */}
              <figure className="m-0">
                <div className="group relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm bg-neutral-900 border border-white/10">
                  <Image
                    src={PORTRAIT.portrait.src}
                    alt={PORTRAIT.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-neutral-950/20 z-10" />
                  <div aria-hidden="true" className="absolute top-2 left-2 h-4 w-4 border-l-2 border-t-2 border-white/80 z-20" />
                  <div aria-hidden="true" className="absolute bottom-2 right-2 h-4 w-4 border-r-2 border-b-2 border-white/80 z-20" />
                </div>
                <figcaption className="mt-3 max-w-md text-xs leading-relaxed text-neutral-400">
                  {PORTRAIT.caption}
                </figcaption>
              </figure>

              <dl className="mt-8 grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-white/5 bg-white/5 p-4 backdrop-blur-sm text-center"
                  >
                    <dd className="text-2xl font-bold text-white flex justify-center">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="mt-1 font-mono text-[10px] uppercase text-neutral-400">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>

              {/* No `download` attribute: it is silently ignored on
                  cross-origin URLs, so it only ever looked like it worked. */}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent py-4 text-sm font-medium uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>View Resume</span>
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              {...fadeUp}
              className="mb-20 space-y-8 text-lg md:text-xl font-light leading-relaxed text-neutral-300"
            >
              <p>
                I am a{" "}
                <span className="text-white font-normal underline decoration-emerald-500/30 underline-offset-8">
                  freelance full-stack developer
                </span>{" "}
                based in <span className="text-white">Odisha, India</span>, working with clients
                worldwide. I architect digital products that don&apos;t just work, but hold up
                under real traffic.
              </p>
              <p>
                Most recently I built the entire{" "}
                <Link
                  href="/works/vedrastores"
                  className="text-white underline decoration-emerald-500/30 underline-offset-8 hover:decoration-emerald-500"
                >
                  Vedrastores commerce ecosystem
                </Link>{" "}
                for the Kenyan market — four web platforms and two React Native apps with M-Pesa
                payments, shipped solo in four months.
              </p>
              <p>
                I work at the intersection of{" "}
                <span className="text-white font-normal">Gen AI integration</span> and high-scale
                applications. Whether it&apos;s <span className="text-white">Next.js</span> or{" "}
                <span className="text-white">React Native</span>, I handle the whole stack —
                architecture, backend, interface and release.
              </p>
              {/* Descriptive anchor text, pointing at the entity page. This is
                  the internal link that tells Google which URL is canonical for
                  the query "Rasmiranjan Sahoo". */}
              <p className="text-base text-neutral-400">
                <Link
                  href="/about"
                  className="text-white underline decoration-emerald-500/30 underline-offset-8 hover:decoration-emerald-500"
                >
                  More about Rasmiranjan Sahoo
                </Link>{" "}
                — background, stack, career and answers to the questions I get asked most.
              </p>
            </motion.div>

            <div>
              <h3 className="mb-8 font-mono text-sm text-emerald-400">/ CAREER_HISTORY</h3>
              <div className="space-y-0">
                {experiences.map((exp) => (
                  <ExperienceCard key={exp.id} data={exp} />
                ))}
              </div>
            </div>

            <div className="mt-20 border-t border-white/10 pt-10">
              <p className="mb-4 text-neutral-300">Interested in working together?</p>
              <Link
                href="#contact"
                className="inline-block text-3xl font-bold text-white hover:text-emerald-400 transition-colors"
              >
                Let&apos;s talk &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
