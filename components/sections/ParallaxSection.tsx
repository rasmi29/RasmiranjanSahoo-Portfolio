"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ParallaxSectionProps {
  heading: string;
  subheading?: string;
  quote?: string;
}

// --- COMPONENTS ---

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150" />
  </div>
);

const FogSlice = ({ 
  delay, 
  top, 
  left, 
  color = "bg-white", 
  scrollYProgress 
}: { 
  delay: number; 
  top: string; 
  left: string; 
  color?: string; 
  scrollYProgress: MotionValue<number>; 
}) => {
  // Parallax movement for the fog
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <motion.div
      style={{ top, left, x }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1], 
        scaleX: [1, 1.5, 1],
        x: ["-10%", "10%", "-10%"] // Natural drift
      }}
      transition={{ 
        duration: 10, 
        delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={`absolute h-1 w-[40vw] rounded-full blur-[40px] ${color}`}
    />
  );
};

export default function ParallaxSection({
  heading,
  subheading = "PHILOSOPHY",
  quote,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animations
  const yText = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scaleLine = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <GrainOverlay />

      {/* --- Ambient Background Elements --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        
        {/* Drifting Fog Slices */}
        <FogSlice delay={0} top="20%" left="-10%" color="bg-neutral-800" scrollYProgress={scrollYProgress} />
        <FogSlice delay={2} top="40%" left="60%" color="bg-emerald-900" scrollYProgress={scrollYProgress} />
        <FogSlice delay={4} top="70%" left="10%" color="bg-neutral-700" scrollYProgress={scrollYProgress} />
        
        {/* Vertical Grid Line (Subtle) */}
        <div className="absolute left-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
        <div className="absolute right-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.div 
            style={{ y: yText, opacity: opacityText }}
            className="max-w-4xl text-center"
        >
            {/* Subheading */}
            <span className="mb-6 block font-mono text-sm tracking-widest text-emerald-500 uppercase">
                // {subheading}
            </span>

            {/* Main Heading */}
            <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
                {heading}
            </h2>

            {/* Decorative Line */}
            <motion.div 
                style={{ scaleX: scaleLine }}
                className="mx-auto mb-10 h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" 
            />

            {/* Quote */}
            {quote && (
                <p className="mx-auto max-w-2xl font-serif text-xl italic text-neutral-400 leading-relaxed">
                    "{quote}"
                </p>
            )}
        </motion.div>
      </div>

      {/* --- Overlay Gradient Vingette --- */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,black_120%)]" />
    </section>
  );
}