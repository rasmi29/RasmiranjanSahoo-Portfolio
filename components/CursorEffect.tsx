"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CursorEffect() {
  const [cursorState, setCursorState] = useState<"default" | "pointer" | "text">("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics configuration
  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => document.body.classList.add("cursor-clicking");
    const handleMouseUp = () => document.body.classList.remove("cursor-clicking");

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const isLink = target.closest("a") || target.closest("button") || target.classList.contains("cursor-pointer");
      const isText = target.tagName === "P" || target.tagName === "SPAN" || target.tagName === "H1" || target.tagName === "H2";
      
      // Check for custom cursor labels (e.g. data-cursor-label="VIEW")
      const customLabel = target.getAttribute("data-cursor-label") || target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");

      if (customLabel) {
        setCursorLabel(customLabel);
        setCursorState("pointer");
      } else if (isLink) {
        setCursorLabel("");
        setCursorState("pointer");
      } else if (isText) {
        setCursorLabel("");
        setCursorState("text");
      } else {
        setCursorLabel("");
        setCursorState("default");
      }
    };

    const handleMouseOut = () => {
        setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Global CSS to hide default cursor */}
      <style jsx global>{`
        body, a, button, input, textarea, select {
          cursor: none !important;
        }
      `}</style>

      {/* Main Cursor Container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* State: Default (Small Crosshair) */}
        <motion.div
            animate={{
                scale: cursorState === "default" ? 1 : 0,
                opacity: cursorState === "default" ? 1 : 0,
            }}
            className="absolute"
        >
            <div className="relative h-4 w-4">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white" />
            </div>
        </motion.div>

        {/* State: Pointer/Link (Square Reticle) */}
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: cursorState === "pointer" ? 1 : 0,
                opacity: cursorState === "pointer" ? 1 : 0,
                rotate: cursorState === "pointer" ? 0 : 45
            }}
            transition={{ duration: 0.3 }}
            className="absolute w-12 h-12 border border-white"
        />

        {/* State: Text Selection (I-Beam approximation) */}
        <motion.div
            initial={{ height: 0 }}
            animate={{
                height: cursorState === "text" ? 24 : 0,
                opacity: cursorState === "text" ? 1 : 0,
            }}
            className="absolute w-[2px] bg-white"
        />

      </motion.div>

      {/* Floating Label (No mix-blend, sits on top) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
            x: smoothX,
            y: smoothY,
        }}
      >
        <AnimatePresence>
            {cursorLabel && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 30 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap"
                >
                    <span className="bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 tracking-widest uppercase rounded-sm">
                        {cursorLabel}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}