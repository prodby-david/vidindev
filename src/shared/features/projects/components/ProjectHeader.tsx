"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight, FolderGit2 } from "lucide-react";

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
            Some things I’ve built
          </h2>
        </div>

        <Link
          href="/projects"
          scroll={true}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-deep-ocean hover:text-horizon transition-colors"
        >
          <span>View all projects</span>
          <MoveRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}
