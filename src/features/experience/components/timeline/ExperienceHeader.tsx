"use client";

import { motion } from "motion/react";

export default function ExperienceHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center text-center max-w-3xl xl:max-w-4xl mx-auto gap-4"
    >
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-deep-ocean tracking-tight">
          Hands-on Experience & Technical Growth
        </h2>
      </div>

      <p className="text-ocean text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        A look at my journey building software—from academic capstone leadership and hands-on system design to building and deploying complete web applications from the ground up.
      </p>
    </motion.div>
  );
}
