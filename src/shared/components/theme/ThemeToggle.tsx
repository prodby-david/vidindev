"use client";

import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useThemeToggle } from "@/shared/hooks/useThemeToggle";

export default function ThemeToggle() {
  const { isClient, isDark, toggleTheme } = useThemeToggle();

  if (!isClient) {
    return <div className="w-8 h-8 p-1.5 opacity-0" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-1.5 text-deep-ocean hover:text-ocean dark:text-deep-ocean dark:hover:text-ocean transition-colors duration-200 cursor-pointer focus:outline-none rounded-md flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -45, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: 45, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
