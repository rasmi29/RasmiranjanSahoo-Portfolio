"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { STATS, STUDIO } from "@/lib/site";
import { projects } from "@/lib/projects";
import ProjectReel from "@/components/ui/ProjectReel";

/** Proof on the first screen, from the same sources the rest of the site uses. */
const heroStats = [
  { value: STATS.websites, label: "Websites shipped" },
  { value: STATS.apps, label: "Mobile apps" },
  { value: projects.filter((p) => p.engagement === "Gravitones").length, label: "Platforms led at Gravitones" },
];

const FIRST_NAME = "RASMIRANJAN".split("");

/** Stagger for the CSS entrance: sets the `--d` delay that `.hero-in` reads. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Ambient aurora. Skipped entirely under prefers-reduced-motion. */
const AuroraBackground = () => {
  const reduce = useReducedMotion();
  const transition = { duration: 25, repeat: Infinity, ease: "linear" as const };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden bg-neutral-950 pointer-events-none"
    >
      <motion.div
        style={{ willChange: "transform" }}
        animate={reduce ? undefined : { rotate: [0, 360], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={transition}
        className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-purple-900/30 blur-[80px] translate-z-0"
      />
      <motion.div
        style={{ willChange: "transform" }}
        animate={reduce ? undefined : { rotate: [360, 0], scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ ...transition, duration: 30 }}
        className="absolute top-[10%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-blue-900/20 blur-[80px] translate-z-0"
      />
      <motion.div
        style={{ willChange: "transform" }}
        animate={reduce ? undefined : { x: ["-20%", "20%"], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] h-[50vh] w-[50vh] rounded-full bg-emerald-900/10 blur-[80px] translate-z-0"
      />
    </div>
  );
};

const Spotlight = ({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) => (
  <motion.div
    className="pointer-events-none absolute z-10 -inset-px overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    aria-hidden="true"
  >
    <motion.div
      className="absolute h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
    />
  </motion.div>
);

/** Genuinely magnetic — the button now follows the cursor within its bounds. */
const MagneticButton = ({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const external = href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="group relative inline-block"
    >
      <span
        className={`relative z-10 flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
          primary
            ? "text-neutral-950 bg-white hover:bg-emerald-400"
            : "text-white border border-white/25 hover:border-white/60 hover:bg-white/5"
        }`}
      >
        {children}
      </span>
      {primary && (
        <span className="absolute inset-0 -z-10 bg-white/50 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      )}
    </motion.a>
  );
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="group relative min-h-[100svh] pt-20 md:pt-24 pb-2 w-full flex flex-col overflow-hidden bg-neutral-950 text-white selection:bg-white/30"
    >
      <GrainOverlay />
      <AuroraBackground />
      <Spotlight mouseX={smoothX} mouseY={smoothY} />

      <div className="relative z-30 flex w-full flex-1 items-center justify-center">
      <motion.div
        style={{ y: reduce ? 0 : y1, opacity }}
        className="relative px-6 text-center max-w-7xl mx-auto flex flex-col items-center gap-5 md:gap-6"
      >
        {/* The entrance is CSS (`hero-in` & co. in globals.css), not JS: the
            hero is in the HTML and visible without waiting for React, and it
            plays as the intro curtain lifts instead of hidden beneath it. */}
        <div
          style={delay(0)}
          className="hero-in inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl shadow-2xl hover:border-emerald-500/30 transition-colors duration-500"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono text-neutral-300 tracking-[0.2em] uppercase">
            Available for new projects
          </span>
        </div>

        {/*
          The only <h1> on the page. It previously read just "RASMIRANJAN
          SAHOO", which nobody searches for. The display name is unchanged
          visually; the screen-reader/crawler text now carries the capability
          keywords too.
        */}
        <div className="relative">
          <h1 className="text-[13vw] sm:text-[11vw] lg:text-[7.2vw] leading-[0.85] font-black tracking-tighter">
            <span className="sr-only">
              Rasmiranjan Sahoo — Full-Stack and React Native Developer,
              Founder of Rathaworks
            </span>
            {/* Letter by letter. The gradient sits on each letter, not the
                word: background-clip:text does not reach transformed
                children. A top-to-bottom gradient looks identical either way. */}
            {/* nowrap: separate inline-block letters are each a line-break
                opportunity, and on a phone the name broke as "RASMIRANJA / N". */}
            <span aria-hidden="true" className="block whitespace-nowrap">
              {FIRST_NAME.map((ch, i) => (
                <span
                  key={i}
                  style={{ "--i": i } as React.CSSProperties}
                  className="hero-letter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-400"
                >
                  {ch}
                </span>
              ))}
            </span>
            <span
              aria-hidden="true"
              style={delay(520)}
              className="hero-track block mt-2 outline-text hover:text-white/5 transition-colors duration-700 cursor-default"
            >
              SAHOO
            </span>
          </h1>

          <div
            aria-hidden="true"
            className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
          </div>
          <div
            aria-hidden="true"
            className="absolute -right-12 bottom-0 hidden xl:block opacity-20 group-hover:opacity-40 transition-opacity duration-1000 delay-300"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="0.5" y="0.5" width="39" height="39" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>

        {/* Leads with a concrete, checkable claim — the kind of sentence an
            answer engine can cite — instead of "engineering digital excellence". */}
        <p
          style={delay(700)}
          className="hero-in text-base md:text-xl font-light text-neutral-300 max-w-3xl leading-relaxed mt-1"
        >
          {/* The counts live in the stats row below, so they are not said twice. */}
          Full-stack developer and founder of{" "}
          <a href={STUDIO.url} className="text-white underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500">
            Rathaworks
          </a>{" "}
          — marketplaces, bus booking, food delivery, EdTech and creator platforms, built with{" "}
          <span className="text-emerald-400 font-medium">Next.js</span>,{" "}
          <span className="text-emerald-400 font-medium">React Native</span> and{" "}
          <span className="text-emerald-400 font-medium">Node.js</span>. Available worldwide.
        </p>

        <div
          style={delay(820)}
          className="hero-in flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <MagneticButton href="#works" primary>
            View Case Studies
          </MagneticButton>
          {/* Previously labelled "Get In Touch" but linked to a Google Drive PDF. */}
          {/* Client projects go to the studio, which has the full brief form. */}
          <MagneticButton href={STUDIO.contact}>Start a Project</MagneticButton>
        </div>

        {/* The numbers that used to wait deep in About. */}
        <dl
          style={delay(940)}
          className="hero-in grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-3 py-3 sm:px-7">
              <dt className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-wider text-neutral-400 sm:tracking-widest">
                {s.label}
              </dt>
              <dd className="text-2xl font-bold tabular-nums text-white md:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
      </div>

      {/* The work itself, on the first screen. */}
      <div style={delay(1080)} className="hero-in relative z-30 mt-2 w-full md:mt-4">
        <ProjectReel />
      </div>

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
        .translate-z-0 {
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
}
