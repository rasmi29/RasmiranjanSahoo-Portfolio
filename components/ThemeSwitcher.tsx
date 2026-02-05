"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="group relative w-10 h-10 flex items-center justify-center border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors duration-300"
    >
      {/* Sun icon */}
      <motion.svg
        className="absolute w-4 h-4 text-neutral-900 dark:text-neutral-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.5,
          rotate: isDark ? 0 : -90,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        />
      </motion.svg>

      {/* Moon icon */}
      <motion.svg
        className="absolute w-4 h-4 text-neutral-900 dark:text-neutral-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.5 : 1,
          rotate: isDark ? 90 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </motion.svg>
    </button>
  );
}
