"use client";
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const certificates = [
  {
    id: 'gen-ai-chai-code',
    title: 'Generative AI Fundamentals',
    issuer: 'Chai Code',
    issuedOn: '11 May 2026',
    image: '/genai-certificate.png',
    verifyUrl: 'https://courses.chaicode.com/learn/certificate/10993325-239664', 
    featured: true,
    type: 'ai'
  },
  {
    id: '109933252142981710249854',
    title: 'Web Development Certificate',
    issuer: 'Chai Code',
    issuedOn: '31 July 2025',
    image: '/mern-certificate.png',
    verifyUrl: 'https://courses.chaicode.com/learn/certificate/10993325-214298',
  },
  {
    id: 'LO6148UTS7YI',
    title: 'Frontend Development by Meta',
    issuer: 'Coursera',
    issuedOn: '7 Oct 2024',
    image: '/frontend-certificate.png',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/LO6148UTS7YI',
  },
];

const TiltCard = ({ certificate, index }: { certificate: typeof certificates[0], index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-white/5 dark:bg-neutral-900/40 backdrop-blur-xl border rounded-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] ${
        certificate.featured 
        ? 'border-emerald-500/30' 
        : 'border-white/10'
      }`}
    >
      {/* Dynamic Glow Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(16,185,129,0.15)_0%,transparent_70%)]`} 
               style={{ "--x": "50%", "--y": "50%" } as any} />
      </div>

      {/* Featured Background Animation */}
      {certificate.featured && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
          <div className="absolute -inset-[100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,rgba(16,185,129,0.1)_80%,transparent_100%)]" />
        </div>
      )}

      <div className="relative z-10 p-2" style={{ transform: "translateZ(50px)" }}>
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-inner bg-neutral-800">
          <Image 
            src={certificate.image} 
            alt={`${certificate.issuer} - ${certificate.title}`} 
            fill 
            className="object-cover transition-all duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {certificate.title}
            </h3>
            <p className="text-sm font-mono text-emerald-500 uppercase tracking-widest">{certificate.issuer}</p>
          </div>

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
            <div className="space-y-1">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium">Issue Reference</p>
              <p className="text-xs text-neutral-400 font-mono tracking-tighter uppercase"> {certificate.id.slice(0, 12)}...</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium">Timestamp</p>
              <p className="text-sm text-neutral-300 font-medium">{certificate.issuedOn}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href={certificate.verifyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 rounded-xl ${
                certificate.featured
                ? 'bg-emerald-500 text-black hover:bg-white hover:scale-[1.02] shadow-[0_10px_20px_rgba(16,185,129,0.2)]'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}
            >
              Verify Identity
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default function CertificatesParallax() {
  return (
    <section className="relative min-h-screen py-32 bg-neutral-950 overflow-hidden selection:bg-emerald-500/30">
      {/* Deep Space Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 mix-blend-overlay" />
        
        {/* Animated Circuit Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase mb-4 block"
            >
              Validated Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9]"
            >
              Global<br />
              <span className="text-neutral-700">Standards.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg md:text-xl font-light max-w-sm lg:mb-4 border-l border-white/10 pl-8"
          >
            A collection of professional benchmarks earned through rigorous testing and real-world application.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {certificates.map((c, index) => (
            <TiltCard key={c.id} certificate={c} index={index} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}