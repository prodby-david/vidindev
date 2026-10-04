"use client";

import { motion } from "motion/react";
import { AboutData } from "../about.types";
import AboutInfoCard from "./AboutInfoCard";

interface AboutContentProps {
  data: AboutData;
}

export default function AboutContent({ data }: AboutContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col max-w-xl w-full"
    >
      <span className="text-xs font-bold tracking-widest text-ocean uppercase">
        {data.category}
      </span>

      <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight mt-2">
        {data.title}
      </h2>

      <p className="text-ocean text-base sm:text-lg leading-relaxed mt-3">
        {data.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-6 pt-5 border-t border-deep-ocean/10 dark:border-horizon/15 w-full">
        {data.infoItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
          >
            <AboutInfoCard item={item} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
