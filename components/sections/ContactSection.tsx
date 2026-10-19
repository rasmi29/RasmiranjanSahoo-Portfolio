"use client";

import React, { useState, useEffect } from "react";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ContactForm from "@/components/sections/ContactForm";
import { AUTHOR, RESUME_URL, STUDIO } from "@/lib/site";
import { fadeIn, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

const contactLinks = [
  {
    id: "01",
    label: "Email",
    value: AUTHOR.email,
    href: `mailto:${AUTHOR.email}`,
    external: false,
  },
  {
    id: "02",
    label: "LinkedIn",
    value: "/in/rasmiranjansahoo702",
    href: AUTHOR.linkedin,
    external: true,
  },
  {
    id: "03",
    label: "GitHub",
    value: "@rasmi29",
    href: AUTHOR.github,
    external: true,
  },
  {
    id: "04",
    label: "Resume",
    value: "View PDF",
    href: RESUME_URL,
    external: true,
  },
];

const IndiaClock = () => {
  // Rendered empty on the server so SSR and hydration agree.
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );

    updateTime();
    const interval = setInterval(updateTime, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md w-fit">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="font-mono text-xs text-neutral-300">
        BHUBANESWAR, IN{time && ` • ${time}`}
      </span>
    </div>
  );
};

/*
 * Narrow-column list row.
 *
 * These were originally full-width bars (huge label on the left, value pushed
 * right by justify-between). Dropped into the 5-column sidebar the two
 * collided — "Email" ran straight into the address, and the label's
 * hover translate pushed it further into the value.
 *
 * Label and value are now stacked in a single min-w-0 column so long values
 * truncate instead of overlapping, with the arrow pinned as a shrink-0 sibling.
 */
const ContactItem = ({ item }: { item: (typeof contactLinks)[0] }) => (
  <motion.a
    href={item.href}
    // mailto: no longer opens a blank orphan tab.
    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    {...fadeUp}
    className="group flex items-center gap-4 border-t border-white/10 px-2 py-5 transition-colors hover:bg-white/5 sm:gap-6 sm:px-4"
  >
    <span className="shrink-0 font-mono text-xs text-neutral-500 transition-colors group-hover:text-emerald-400">
      {item.id}
    </span>

    <span className="min-w-0 flex-1 transition-transform duration-500 group-hover:translate-x-1">
      <span className="block text-lg font-light leading-tight text-white sm:text-xl">
        {item.label}
      </span>
      <span className="mt-1 block truncate font-mono text-[11px] leading-relaxed text-neutral-400 transition-colors group-hover:text-neutral-200">
        {item.value}
      </span>
    </span>

    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-500">
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </span>
  </motion.a>
);

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-black text-white overflow-hidden pt-32 pb-24"
    >
      <GrainOverlay />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span {...fadeIn} className="mb-4 block font-mono text-sm text-emerald-400">
              05 / CONTACT
            </motion.span>
            <motion.h2
              id="contact-heading"
              {...fadeUp}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
            >
              Let&apos;s work
              <br />
              <span className="text-neutral-500">together.</span>
            </motion.h2>
          </div>

          <div className="mb-2">
            <p className="text-neutral-300 text-sm mb-4 max-w-xs leading-relaxed">
              Client projects run through my studio,{" "}
              <a href={STUDIO.contact} className="text-white underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500">
                Rathaworks
              </a>
              . For roles, collaborations or anything else, write here — I reply
              within 24 hours.
            </p>
            <IndiaClock />
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* The form is the point of the whole page — it used to not exist,
              and every "contact" route ejected the visitor to another site. */}
          <div className="lg:col-span-7">
            <h3 className="mb-8 font-mono text-sm text-emerald-400">/ START_A_PROJECT</h3>
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <h3 className="mb-8 font-mono text-sm text-emerald-400">/ ELSEWHERE</h3>
            <div className="flex flex-col border-b border-white/10">
              {contactLinks.map((link) => (
                <ContactItem key={link.id} item={link} />
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-neutral-400">
              Prefer async? Send a brief and I&apos;ll reply with an approach, a
              timeline and a number — usually within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
