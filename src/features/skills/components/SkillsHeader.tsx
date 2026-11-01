"use client";

import { motion } from "motion/react";
import { Layers } from "lucide-react";

export default function SkillsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-1 text-center items-center w-full"
    >
      <span className="text-xs font-bold tracking-widest text-ocean uppercase">
        WHAT I WORK WITH
      </span>
      <div className="flex items-center gap-2.5 justify-center">
        <Layers size={26} className="text-horizon flex-shrink-0" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-deep-ocean tracking-tight">
          Skills & Technologies
        </h2>
      </div>
    </motion.div>
  );
}
