"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { ProjectPractice } from "../projects.types";
import { PRACTICES_ICON_MAP } from "../constants";

interface ProjectPracticeCardProps {
  item: ProjectPractice;
  index: number;
}

export default function ProjectPracticeCard({
  item,
  index,
}: ProjectPracticeCardProps) {
  const IconComponent = PRACTICES_ICON_MAP[item.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="flex flex-col justify-between p-6 sm:p-7 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
    >
      <div className="flex flex-col gap-4">
        <div className="p-3 w-fit rounded-md bg-horizon/10 text-horizon flex items-center justify-center">
          <IconComponent size={22} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-ocean leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-md bg-sand/50 dark:bg-sand/70 border border-deep-ocean/5 dark:border-horizon/10 mt-5">
        <Check size={14} className="text-horizon flex-shrink-0 mt-0.5" />
        <p className="text-xs text-ocean leading-relaxed">
          {item.guardrail}
        </p>
      </div>
    </motion.div>
  );
}
