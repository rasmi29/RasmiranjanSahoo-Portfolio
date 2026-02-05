"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";

// --- DATA ---
const contactLinks = [
  {
    id: "01",
    label: "Email",
    value: "rasmiranjansahoo702@gmail.com",
    href: "mailto:rasmiranjansahoo702@gmail.com",
  },
  {
    id: "02",
    label: "LinkedIn",
    value: "/in/rasmiranjansahoo702",
    href: "https://www.linkedin.com/in/rasmiranjansahoo702/",
  },
  {
    id: "03",
    label: "GitHub",
    value: "@rasmi29",
    href: "https://github.com/rasmi29",
  },
  {
    id: "04",
    label: "Resume",
    value: "View PDF",
    href: "https://drive.google.com/file/d/1ppX0jXZ7ipvF5q_grkefQOPvcpDLU2LY/view",
  }
];

// --- COMPONENTS ---

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150" />
  </div>
);

const IndiaClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Set to India Standard Time (Asia/Kolkata)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md w-fit">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </div>
      <span className="font-mono text-xs text-neutral-300">
        BHUBANESWAR, IN • {time}
      </span>
    </div>
  );
};

const ContactItem = ({ item }: { item: typeof contactLinks[0] }) => {
    return (
        <motion.a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex items-center justify-between border-t border-white/10 py-10 transition-colors hover:bg-white/5 px-4 md:px-8"
        >
            <div className="flex items-baseline gap-6 md:gap-12">
                <span className="font-mono text-sm text-neutral-500 group-hover:text-emerald-500 transition-colors">
                    {item.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-light text-white group-hover:translate-x-4 transition-transform duration-500">
                    {item.label}
                </h3>
            </div>

            <div className="flex items-center gap-4">
                <span className="hidden md:block font-mono text-xs text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
                    {item.value}
                </span>
                <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                    <svg 
                        className="w-4 h-4 text-white transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </motion.a>
    )
}

export default function ContactSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const footerOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-hidden pt-32 pb-12"
    >
      <GrainOverlay />
      
      {/* Background Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-between min-h-[80vh]">
        
        {/* Header */}
        <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                    <span className="mb-4 block font-mono text-sm text-emerald-500">
                        04 / CONTACT
                    </span>
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                        Let's work<br />
                        <span className="text-neutral-600">together.</span>
                    </h2>
                </div>
                
                {/* Local Time Widget */}
                <div className="mb-2">
                    <p className="text-neutral-400 text-sm mb-4 max-w-xs leading-relaxed">
                        Currently open for freelance projects and full-time opportunities.
                    </p>
                    <IndiaClock />
                </div>
            </div>

            {/* Links List */}
            <div className="flex flex-col border-b border-white/10">
                {contactLinks.map((link) => (
                    <ContactItem key={link.id} item={link} />
                ))}
            </div>
        </div>

        {/* Footer */}
        <motion.div 
            style={{ opacity: footerOpacity }}
            className="flex flex-col md:flex-row justify-between items-end md:items-center pt-24 text-xs font-mono text-neutral-500 uppercase tracking-widest"
        >
            <div className="flex gap-8">
                <span>© {new Date().getFullYear()} Rasmiranjan Sahoo</span>
                <span>All Rights Reserved</span>
            </div>
            
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-4 md:mt-0 hover:text-white transition-colors flex items-center gap-2 group"
            >
                Back to Top
                <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </motion.div>

      </div>
    </section>
  );
}