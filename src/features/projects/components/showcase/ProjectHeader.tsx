"use client";

import { motion } from "motion/react";
import { FolderGit2 } from "lucide-react";

export default function ProjectHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-1 w-full"
    >
      <span className="text-xs font-bold tracking-widest text-ocean uppercase">
        SELECTED WORK
      </span>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <FolderGit2 size={28} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            Solutions & Products Built with Purpose
          </h2>
        </div>
      </div>
      <p className="text-ocean text-sm sm:text-base leading-relaxed max-w-2xl mt-1">
        A collection of web applications, tools, and platforms I&apos;ve built to solve practical challenges with clean design and dependable performance.
      </p>
    </motion.div>
  );
}
