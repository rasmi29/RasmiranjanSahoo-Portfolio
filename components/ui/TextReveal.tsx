"use client";

import React from "react";
import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = "span",
}: TextRevealProps) {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay * i },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em] overflow-hidden inline-block"
          variants={child}
        >
          <Tag className="inline-block">{word}</Tag>
        </motion.span>
      ))}
    </motion.span>
  );
}
