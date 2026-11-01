"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = 220;
    let currentX = targetX;
    let currentY = targetY;

    if (containerRef.current) {
      containerRef.current.style.setProperty("--mouse-x", `${currentX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${currentY}px`);
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--mouse-x",
          `${currentX.toFixed(1)}px`
        );
        containerRef.current.style.setProperty(
          "--mouse-y",
          `${currentY.toFixed(1)}px`
        );
      }

      if (Math.hypot(targetX - currentX, targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    const startAnimation = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsHovered(true);
      startAnimation();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      targetX = window.innerWidth / 2;
      targetY = 220;
      startAnimation();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      style={
        {
          "--mouse-x": "50vw",
          "--mouse-y": "220px",
        } as React.CSSProperties
      }
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[450px] sm:h-[550px] -translate-y-1/3 rounded-full blur-3xl opacity-20 dark:opacity-15 bg-gradient-to-b from-mint/20 via-horizon/10 to-transparent" />

      <div
        className="absolute w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-500 ease-out will-change-transform dark:hidden"
        style={{
          left: "var(--mouse-x)",
          top: "var(--mouse-y)",
          opacity: isHovered ? 0.45 : 0.15,
          background:
            "radial-gradient(circle, rgba(155, 207, 197, 0.16) 0%, rgba(103, 162, 196, 0.08) 50%, transparent 75%)",
        }}
      />

      <div
        className="hidden dark:block absolute w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-500 ease-out will-change-transform"
        style={{
          left: "var(--mouse-x)",
          top: "var(--mouse-y)",
          opacity: isHovered ? 0.5 : 0.2,
          background:
            "radial-gradient(circle, rgba(120, 186, 169, 0.2) 0%, rgba(123, 178, 212, 0.12) 45%, transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0 text-deep-ocean/[0.045] dark:text-horizon/[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 25%, black 25%, rgba(0, 0, 0, 0.4) 65%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 25%, black 25%, rgba(0, 0, 0, 0.4) 65%, transparent 100%)",
        }}
      />
    </div>
  );
}
