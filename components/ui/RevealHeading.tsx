"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Line = { text: React.ReactNode; className?: string };

/**
 * A heading whose lines rise out of a mask, one after another, when it
 * scrolls into view — the section-title counterpart of the hero entrance.
 *
 * Each line sits in an overflow-hidden wrapper. The wrapper's bottom
 * padding (cancelled by a negative margin, so layout is unchanged) keeps
 * descenders like the "g" in "together" from being clipped.
 *
 * Styling that has to apply to the glyphs — colour, or a background-clip
 * gradient — goes on the line (`className`), not the heading, because the
 * moving span is what gets painted.
 */
export default function RevealHeading({
  id,
  lines,
  className = "",
  as = "h2",
}: {
  id?: string;
  lines: Line[];
  className?: string;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "h1" ? motion.h1 : motion.h2;

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className={`block origin-bottom-left ${line.className ?? ""}`}
            variants={
              reduce
                ? undefined
                : {
                    hidden: { y: "115%", rotate: 3 },
                    visible: { y: "0%", rotate: 0, transition: { duration: 0.95, ease: EASE.out } },
                  }
            }
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
