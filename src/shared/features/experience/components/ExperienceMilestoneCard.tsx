"use client";

import { motion } from "motion/react";
import { ExperienceMilestone } from "../experience.types";
import { MILESTONES_ICON_MAP } from "../constants";

interface ExperienceMilestoneCardProps {
  item: ExperienceMilestone;
  index: number;
}

export default function ExperienceMilestoneCard({
  item,
  index,
}: ExperienceMilestoneCardProps) {
  const IconComponent = MILESTONES_ICON_MAP[item.icon];

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
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-md bg-horizon/10 text-horizon flex items-center justify-center">
            <IconComponent size={22} />
          </div>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-sand/60 dark:bg-sand/80 text-ocean">
            {item.year}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-bold font-display text-deep-ocean">
            {item.title}
          </h3>
          <span className="text-xs sm:text-sm font-semibold text-horizon">
            {item.organization}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-ocean leading-relaxed">
          {item.summary}
        </p>
      </div>
    </motion.div>
  );
}
