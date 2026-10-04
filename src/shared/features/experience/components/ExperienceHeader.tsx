"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight, Briefcase } from "lucide-react";

interface ExperienceHeaderProps {
  category: string;
  title: string;
  description: string;
  resumeUrl: string;
}

export default function ExperienceHeader({
  category,
  title,
  description,
  resumeUrl,
}: ExperienceHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-4 w-full lg:w-5/12 max-w-md"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          {category}
        </span>
        <div className="flex items-center gap-3">
          <Briefcase size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            {title}
          </h2>
        </div>
      </div>

      <p className="text-ocean text-base leading-relaxed">{description}</p>

      <div className="pt-2">
        <Link
          href={resumeUrl}
          className="group inline-flex items-center gap-2 bg-horizon text-sm text-white dark:text-slate-950 font-semibold hover:bg-ocean dark:hover:bg-mint py-3 px-6 rounded-full cursor-pointer transition-colors duration-200"
        >
          <span>View Full Resume</span>
          <MoveRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}
