"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

// --- CONSTANTS ---
const LOG_MESSAGES = [
  "Initializing core modules...",
  "Loading shader kernels...",
  "Hydrating React components...",
  "Optimizing vector assets...",
  "Establishing secure connection...",
  "Rendering virtual DOM...",
  "System checks passed...",
  "Welcome, User."
];

// --- COMPONENTS ---

// Static grain overlay (memoized or static)
const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150" />
  </div>
);

// Optimized Counter Component (Updates DOM directly, no re-renders)
const Counter = ({ value }: { value: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subscribe to motion value changes
    const unsubscribe = value.on("change", (latest: number) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
    return () => unsubscribe();
  }, [value]);

  return (
    <div 
      ref={ref} 
      className="text-[15vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter text-white tabular-nums"
    >
      0
    </div>
  );
};

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  
  // Motion values for animations (bypasses React state)
  const progress = useMotionValue(0);
  const scaleX = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    // 1. Lock Body Scroll
    document.body.style.overflow = "hidden";

    // 2. Animate Progress (0 -> 100)
    // using framer's 'animate' helper is much more performant than setInterval
    const controls = animate(progress, 100, {
      duration: 2.5,
      ease: "easeInOut",
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = "unset";
      }
    });

    // 3. Log Message Timer (Separate low-frequency timer)
    // We only update this a few times, so React state is fine here
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % LOG_MESSAGES.length);
    }, 2500 / LOG_MESSAGES.length);

    return () => {
      controls.stop();
      clearInterval(logInterval);
      document.body.style.overflow = "unset";
    };
  }, [progress]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-neutral-950 text-white px-6 py-8 md:px-12 md:py-12"
        >
          <GrainOverlay />
          
          {/* Top Bar */}
          <div className="relative z-10 flex justify-between items-start font-mono text-xs text-neutral-500 uppercase tracking-widest">
            <div className="flex flex-col gap-1">
                <span>System Status:</span>
                <span className="text-emerald-500 animate-pulse">Booting Sequence</span>
            </div>
            <span>v2.0.0</span>
          </div>

          {/* Center Content: Log Messages */}
          <div className="relative z-10 w-full max-w-md">
            <div className="h-px w-full bg-white/10 mb-4" />
            <div className="font-mono text-xs md:text-sm h-6 overflow-hidden text-neutral-400 flex items-center">
               <AnimatePresence mode="wait">
                 <motion.span
                   key={currentLogIndex}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.2 }}
                 >
                   {`> ${LOG_MESSAGES[currentLogIndex]}`}
                 </motion.span>
               </AnimatePresence>
            </div>
          </div>

          {/* Bottom Bar: Big Counter */}
          <div className="relative z-10 flex justify-between items-end">
             {/* Name Reveal */}
             <div className="hidden md:block">
                <h1 className="text-xl font-bold tracking-tighter text-white">
                    RASMIRANJAN SAHOO
                </h1>
                <p className="text-xs text-neutral-500 font-mono mt-1">
                    FULLSTACK DEVELOPER
                </p>
             </div>

             {/* Percentage */}
             <div className="flex flex-col items-end w-full md:w-auto">
                <Counter value={progress} />
                
                {/* Progress Bar - GPU Accelerated */}
                <div className="mt-2 h-1 w-full bg-white/10 overflow-hidden">
                    <motion.div 
                        className="h-full bg-emerald-500 origin-left"
                        style={{ scaleX }}
                    />
                </div>
             </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}