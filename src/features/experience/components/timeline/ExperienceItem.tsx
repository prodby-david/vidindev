"use client";

import { motion } from "motion/react";
import { Calendar, Building2 } from "lucide-react";
import { ExperienceItem as ExperienceItemType } from "../../experience.types";
import { EXPERIENCE_ICON_MAP } from "../../constants/timeline/experience-icon.constant";

interface ExperienceItemProps {
  item: ExperienceItemType;
  index: number;
  isLast?: boolean;
}

interface ExperienceCardProps {
  item: ExperienceItemType;
  isEven: boolean;
}

function ExperienceCard({ item, isEven }: ExperienceCardProps) {
  return (
    <div className="relative">
      {/* Desktop Directional Notch */}
      <div
        className={`hidden md:block absolute top-6.5 w-3 h-3 rotate-45 bg-polaroid dark:bg-sand/40 z-10 ${
          isEven
            ? "-right-1.5 border-r border-t border-deep-ocean/10 dark:border-horizon/15"
            : "-left-1.5 border-l border-b border-deep-ocean/10 dark:border-horizon/15"
        }`}
        aria-hidden="true"
      />

      {/* Mobile Directional Notch pointing Left towards mobile spine */}
      <div
        className="block md:hidden absolute -left-1.5 top-6 w-3 h-3 rotate-45 bg-polaroid dark:bg-sand/40 border-l border-b border-deep-ocean/10 dark:border-horizon/15 z-10"
        aria-hidden="true"
      />

      {/* Card Body */}
      <motion.div
        whileHover={{
          y: -4,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        className="flex flex-col p-5 sm:p-6 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-bold font-display text-deep-ocean leading-snug">
              {item.role}
            </h3>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-horizon">
              <Building2 size={14} className="text-horizon/80 shrink-0" />
              <span>{item.company}</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-sand/60 dark:bg-sand/80 text-ocean border border-deep-ocean/10 dark:border-horizon/15 shrink-0 self-start">
            <Calendar size={13} className="text-horizon shrink-0" />
            <span>{item.period}</span>
          </span>
        </div>

        <p className="text-xs sm:text-sm text-ocean leading-relaxed mt-3.5">
          {item.details}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4 pt-3.5 border-t border-deep-ocean/10 dark:border-horizon/15">
          {item.skills.map((skill) => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-sand/70 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperienceItem({
  item,
  index,
}: ExperienceItemProps) {
  const IconComponent = EXPERIENCE_ICON_MAP[item.icon];
  const isEven = index % 2 === 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative flex items-center md:justify-between w-full group"
    >
      {/* Center Icon Badge on the Timeline Spine */}
      <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-4 md:top-5 z-20 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-md bg-warm dark:bg-sand border-2 border-deep-ocean/15 dark:border-horizon/30 text-horizon shadow-md group-hover:border-horizon group-hover:shadow-lg transition-all duration-300">
        {IconComponent && <IconComponent size={20} className="text-horizon" />}
      </div>

      {/* Left Column (Card on Even, Empty Spacer on Odd on Desktop) */}
      <div
        className={`w-full md:w-[calc(50%-2.25rem)] ${
          isEven
            ? "block pl-14 sm:pl-16 md:pl-0"
            : "hidden md:block invisible pointer-events-none"
        }`}
      >
        {isEven && <ExperienceCard item={item} isEven={true} />}
      </div>

      {/* Right Column (Empty Spacer on Even on Desktop, Card on Odd) */}
      <div
        className={`w-full md:w-[calc(50%-2.25rem)] ${
          !isEven
            ? "block pl-14 sm:pl-16 md:pl-0"
            : "hidden md:block invisible pointer-events-none"
        }`}
      >
        {!isEven && <ExperienceCard item={item} isEven={false} />}
      </div>
    </motion.li>
  );
}
