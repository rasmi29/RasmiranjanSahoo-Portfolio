"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Custom cursor.
 *
 * Two accessibility rules this component previously broke:
 *  1. It applied `cursor: none !important` to body, a, button, input,
 *     textarea and select — hiding the OS cursor for everyone, permanently.
 *     If the JS chunk failed, the user had no cursor at all. Inputs also lost
 *     their I-beam. The native cursor is now only hidden on the body/anchors,
 *     never on text-entry controls, and only once this component has actually
 *     mounted and decided to render.
 *  2. The touch-device check ran during render (`typeof window !== undefined`),
 *     so the server rendered the cursor and a touch client rendered null —
 *     a hydration mismatch. It's now an effect.
 */
export default function CursorEffect() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "pointer" | "text">("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Only for precise pointers, and only when motion is welcome.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const noReduce = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(fine.matches && noReduce.matches);

    update();
    fine.addEventListener("change", update);
    noReduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      noReduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button']");
      const isField = target.closest("input, textarea, select");
      const customLabel = target
        .closest("[data-cursor-label]")
        ?.getAttribute("data-cursor-label");

      if (isField) {
        // Let the native I-beam do its job.
        setCursorLabel("");
        setCursorState("text");
      } else if (customLabel) {
        setCursorLabel(customLabel);
        setCursorState("pointer");
      } else if (isLink) {
        setCursorLabel("");
        setCursorState("pointer");
      } else {
        setCursorLabel("");
        setCursorState("default");
      }
    };

    const handleMouseOut = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseOut);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      {/* Note: no `input, textarea, select` here, and no !important. */}
      <style jsx global>{`
        body,
        a,
        button {
          cursor: none;
        }
        input,
        textarea,
        select,
        [contenteditable] {
          cursor: auto;
        }
      `}</style>

      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-9999 flex items-center justify-center mix-blend-difference"
        style={{ x: smoothX, y: smoothY, opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          animate={{
            scale: cursorState === "default" ? 1 : 0,
            opacity: cursorState === "default" ? 1 : 0,
          }}
          className="absolute"
        >
          <div className="relative h-4 w-4">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: cursorState === "pointer" ? 1 : 0,
            opacity: cursorState === "pointer" ? 1 : 0,
            rotate: cursorState === "pointer" ? 0 : 45,
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-12 h-12 border border-white"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{ x: smoothX, y: smoothY }}
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
