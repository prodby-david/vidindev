"use client";

import { motion } from "motion/react";
import { Compass } from "lucide-react";
import { ABOUT_VALUES, ABOUT_VALUES_ICON_MAP } from "../constants";

export default function AboutValues() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-8 sm:pt-12 pb-12 sm:pb-16 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-1 text-center items-center"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          CORE VALUES
        </span>
        <div className="flex items-center gap-2.5 justify-center">
          <Compass size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            What Guides My Work
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {ABOUT_VALUES.map((val, idx) => {
          const Icon = ABOUT_VALUES_ICON_MAP[val.icon];
          return (
            <motion.div
              key={val.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="flex flex-col gap-3 p-6 sm:p-8 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
            >
              <div className="p-3 w-max rounded-md bg-mint/30 dark:bg-mint/15 text-deep-ocean">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold font-display text-deep-ocean mt-1">
                {val.title}
              </h3>
              <p className="text-sm text-ocean leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
