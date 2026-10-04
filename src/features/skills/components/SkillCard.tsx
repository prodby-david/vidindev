"use client";

import { motion } from "motion/react";
import { SkillCategory } from "../skills.types";

interface SkillCardProps {
  category: SkillCategory;
}

export default function SkillCard({ category }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-4 w-full pb-6 border-b border-deep-ocean/10 dark:border-horizon/15 last:border-b-0 last:pb-0 sm:pb-0 sm:border-b-0 xl:border-l xl:border-deep-ocean/10 dark:xl:border-horizon/15 xl:pl-6 first:border-l-0 first:pl-0 xl:first:border-l-0 xl:first:pl-0"
    >
      <div className="flex items-center">
        <h3 className="font-bold font-display text-deep-ocean text-base sm:text-lg">
          {category.title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center text-xs font-medium px-2.5 py-1.5 rounded-md bg-sand/60 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20 hover:border-horizon hover:shadow-sm transition-all cursor-default"
          >
            <span>{skill}</span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
