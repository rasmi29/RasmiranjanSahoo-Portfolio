"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
  href,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? "a" : "button";
  const props = href ? { href, target, rel: target === "_blank" ? "noopener noreferrer" : undefined } : { onClick };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Component
        {...props}
        className={`relative overflow-hidden group ${className}`}
      >
        <motion.span
          className="relative z-10 inline-flex items-center gap-2"
          animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          {children}
        </motion.span>
      </Component>
    </motion.div>
  );
}
