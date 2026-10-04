"use client";

import { motion } from "motion/react";
import { ExperienceItem as ExperienceItemType } from "../experience.types";
import { EXPERIENCE_ICON_MAP } from "../constants";

interface ExperienceItemProps {
  item: ExperienceItemType;
  isLast: boolean;
}

export default function ExperienceItem({
  item,
  isLast,
}: ExperienceItemProps) {
  const IconComponent = EXPERIENCE_ICON_MAP[item.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex gap-4 sm:gap-6 w-full"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
          className="w-3 h-3 rounded-full bg-mint border-2 border-warm mt-1.5"
        />
        {!isLast && (
          <span className="w-0.5 bg-deep-ocean/15 dark:bg-horizon/20 flex-1 my-1" />
        )}
      </div>

      <div
        className={`flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6 flex-1 ${
          isLast ? "pb-0" : "pb-8"
        }`}
      >
        <div className="flex flex-col gap-1 sm:w-5/12 flex-shrink-0">
          <span className="text-xs font-semibold text-ocean">
            {item.period}
          </span>
          <div className="flex items-center gap-2">
            <IconComponent size={16} className="text-horizon flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-bold font-display text-deep-ocean">
              {item.role}
            </h3>
          </div>
          <span className="text-sm text-ocean">{item.company}</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-sand/70 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 sm:w-7/12 text-sm text-ocean leading-relaxed">
          <span className="text-horizon font-bold text-base leading-none select-none mt-0.5">
            +
          </span>
          <p>{item.details}</p>
        </div>
      </div>
    </motion.div>
  );
}
