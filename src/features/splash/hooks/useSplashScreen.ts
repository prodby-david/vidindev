"use client";

import { useState, useEffect } from "react";
import { SPLASH_CONFIG, SPLASH_STORAGE_KEY } from "../constants";

export function useSplashScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const isNavigationReload =
        window.performance?.getEntriesByType?.("navigation")?.[0] &&
        (
          window.performance.getEntriesByType(
            "navigation",
          )[0] as PerformanceNavigationTiming
        ).type === "reload";
      const alreadyShown = sessionStorage.getItem(SPLASH_STORAGE_KEY);
      if (alreadyShown && !isNavigationReload) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    if (!isVisible) return;

    sessionStorage.setItem(SPLASH_STORAGE_KEY, "true");
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, SPLASH_CONFIG.durationMs);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  return { isVisible };
}
