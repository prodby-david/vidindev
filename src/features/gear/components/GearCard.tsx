"use client";

import { motion } from "motion/react";
import { GearCategory } from "../gear.types";

interface GearCardProps {
  category: GearCategory;
  index: number;
}

export default function GearCard({ category, index }: GearCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="flex flex-col gap-4 p-6 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
    >
      <h3 className="text-base font-bold font-display text-deep-ocean">
        {category.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.items.map((item) => (
          <motion.span
            key={item}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center text-xs font-medium px-2.5 py-1.5 rounded-md bg-sand/60 dark:bg-sand/30 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20 hover:border-horizon hover:shadow-sm transition-all cursor-default"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
