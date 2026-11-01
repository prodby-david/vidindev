"use client";

import { motion, AnimatePresence } from "motion/react";
import { SPLASH_CONFIG } from "../constants/splash.constant";
import { useSplashScreen } from "../hooks/useSplashScreen";

export default function SplashScreen() {
  const { isVisible } = useSplashScreen();

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-warm select-none overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -24,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="font-handwritten text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-deep-ocean mb-2">
              {SPLASH_CONFIG.brandName}
            </div>
            <div className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-horizon uppercase mb-3">
              {SPLASH_CONFIG.tagline}
            </div>
            <div className="w-12 h-0.5 bg-mint/70 rounded-md mb-3" />
            <div className="font-handwritten text-xl sm:text-2xl text-deep-ocean/70 dark:text-mint">
              {SPLASH_CONFIG.signature}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
