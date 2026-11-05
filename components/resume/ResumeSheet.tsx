"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { RESUME } from "@/lib/site";
import { EASE } from "@/lib/motion";

/**
 * The resume as a physical sheet of paper.
 *
 *   1. It rises out of the dark on a 3D tilt while two blank sheets fan out
 *      behind it, like a stack being set down.
 *   2. Once it lands (and the image has loaded), it "prints": the real page
 *      is revealed top to bottom behind a glowing scan line, over a skeleton
 *      of the same layout.
 *   3. A sheen sweeps across once, and from then on the sheet leans toward
 *      the cursor with a soft glare (fine pointers only).
 *
 * With reduced motion it appears in place at once — no rise, scan, sheen or tilt.
 */
export default function ResumeSheet({ delay = 0.2 }: { delay?: number }) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [landed, setLanded] = useState(false);
  const [printed, setPrinted] = useState(false);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    setCanTilt(!reduce && window.matchMedia("(pointer: fine)").matches);
  }, [reduce]);

  const printing = loaded && landed;

  /* ---------- Cursor tilt + glare ---------- */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [0, 1], [-4, 4]);
  const rotateX = useTransform(sy, [0, 1], [3, -3]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(700px circle at ${gx} ${gy}, rgba(255,255,255,0.22), transparent 45%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt || !printed) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="relative isolate mx-auto w-full perspective-[2200px]">
      {/* Glow pooled under the page. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: printing ? 1 : 0.4 }}
        transition={{ duration: 1.4, ease: EASE.out }}
        className="pointer-events-none absolute -inset-x-10 top-1/4 bottom-0 -z-10 rounded-full bg-emerald-500/15 blur-[90px]"
      />

      {/*
        `initial` never depends on `reduce`: it is rendered into the static
        HTML, where reduced motion is unknown, and a client render that
        disagreed would fail hydration and could leave the sheet stuck at its
        start position. Reduced motion changes only the timing (to instant)
        and switches the decorative extras off.
      */}
      <motion.div
        initial={{ opacity: 0, y: 160, rotateX: 26, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: reduce ? 0 : 90,
          rotateX: reduce ? 0 : 14,
          scale: reduce ? 1 : 0.95,
          transition: { duration: reduce ? 0.15 : 0.4, ease: EASE.inOut },
        }}
        transition={reduce ? { duration: 0 } : { duration: 0.95, delay, ease: EASE.out }}
        onAnimationComplete={() => setLanded(true)}
        style={{ transformOrigin: "50% 0%" }}
        className="relative"
      >
        {/* The stack behind: two blank sheets that fan out as it lands. */}
        {[
          { rotate: -3.2, x: -10, y: 14, tone: "bg-neutral-800/90" },
          { rotate: 2.4, x: 12, y: 8, tone: "bg-neutral-700/80" },
        ].map((s, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            initial={{ rotate: 0, x: 0, y: 0, opacity: 0 }}
            animate={reduce ? { opacity: 0 } : { rotate: s.rotate, x: s.x, y: s.y, opacity: 1 }}
            transition={{ duration: 0.9, delay: delay + 0.55 + i * 0.08, ease: EASE.out }}
            className={`absolute inset-0 rounded-[6px] border border-white/10 ${s.tone} shadow-2xl`}
          />
        ))}

        <motion.div
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={canTilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
          className="relative overflow-hidden rounded-[6px] bg-white shadow-[0_50px_120px_-30px_rgba(16,185,129,0.35),0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
        >
          <div className="relative" style={{ aspectRatio: `${RESUME.preview.width} / ${RESUME.preview.height}` }}>
            <SheetSkeleton />

            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: printing ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
              transition={reduce ? { duration: 0 } : { duration: 1.25, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => printing && setPrinted(true)}
            >
              <Image
                src={RESUME.preview.src}
                width={RESUME.preview.width}
                height={RESUME.preview.height}
                // Eager: a lazy image inside a fully clipped wrapper counts as
                // "not visible", so it would never load and never print.
                loading="eager"
                fetchPriority="high"
                alt="Rasmiranjan Sahoo's one-page resume: experience at Gravitones, freelance and personal projects, skills, education and certifications"
                sizes="(max-width: 900px) 100vw, 860px"
                draggable={false}
                onLoad={() => setLoaded(true)}
                className="block h-full w-full select-none"
              />
            </motion.div>

            {/* Scan line riding the edge of the reveal. */}
            <motion.div
              aria-hidden="true"
              initial={{ top: "0%", opacity: 0 }}
              animate={printing && !reduce ? { top: "100%", opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }}
              transition={{ duration: 1.25, ease: [0.65, 0, 0.35, 1], times: [0, 0.08, 0.9, 1] }}
              className="pointer-events-none absolute inset-x-0 z-10 -translate-y-1/2"
            >
              <div className="h-px w-full bg-emerald-400 shadow-[0_0_18px_4px_rgba(52,211,153,0.75)]" />
              <div className="h-16 w-full -translate-y-full bg-linear-to-t from-emerald-400/25 to-transparent" />
            </motion.div>

            {/* One sheen pass once printed. */}
            {!reduce && printed && (
              <motion.div
                aria-hidden="true"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 1.3, ease: EASE.out }}
                className="pointer-events-none absolute inset-y-0 z-10 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent mix-blend-overlay"
              />
            )}

            {canTilt && printed && (
              <motion.div
                aria-hidden="true"
                style={{ background: glare }}
                className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** The resume's own layout in grey bars — what the page "prints" over. */
function SheetSkeleton() {
  const bar = "rounded-full bg-neutral-200";
  return (
    <div aria-hidden="true" className="absolute inset-0 flex animate-pulse flex-col bg-white px-[6%] py-[3%]">
      <div className="flex flex-col items-center gap-[0.5em] pb-[2.5%] text-[10px]">
        <div className="h-[1.8em] w-2/5 rounded-full bg-neutral-300" />
        <div className="h-[0.8em] w-1/3 rounded-full bg-neutral-200" />
        <div className="h-[0.7em] w-3/5 rounded-full bg-neutral-200" />
      </div>
      <div className="flex flex-1 flex-col gap-[1.25%]">
        {Array.from({ length: 34 }, (_, i) => (
          <div
            key={i}
            className={`${bar} h-[0.8%] min-h-1`}
            style={{ width: i % 7 === 0 ? "28%" : `${70 + ((i * 37) % 28)}%` }}
          />
        ))}
      </div>
    </div>
  );
}
