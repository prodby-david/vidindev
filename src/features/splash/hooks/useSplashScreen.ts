"use client";

import { useState, useEffect } from "react";
import {
  SPLASH_CONFIG,
  SPLASH_STORAGE_KEY,
} from "../constants/splash.constant";

export function useSplashScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const navEntry = window.performance?.getEntriesByType?.(
      "navigation"
    )?.[0] as PerformanceNavigationTiming | undefined;
    const isReload = navEntry?.type === "reload";
    const alreadyShown = sessionStorage.getItem(SPLASH_STORAGE_KEY);

    if (alreadyShown && !isReload) {
      return;
    }

    sessionStorage.setItem(SPLASH_STORAGE_KEY, "true");
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => setIsVisible(true));
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = originalOverflow;
    }, SPLASH_CONFIG.durationMs);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return { isVisible };
}
