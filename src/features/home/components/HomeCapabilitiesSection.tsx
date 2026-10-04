"use client";

import { motion } from "motion/react";
import { Cpu } from "lucide-react";
import { HOME_CAPABILITIES, CAPABILITIES_ICON_MAP } from "../constants";

export default function HomeCapabilitiesSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-1 text-center items-center"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          CORE CAPABILITIES
        </span>
        <div className="flex items-center gap-2.5 justify-center">
          <Cpu size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            What I bring to the table?
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {HOME_CAPABILITIES.map((cap, idx) => {
          const Icon = CAPABILITIES_ICON_MAP[cap.icon];
          return (
            <motion.div
              key={cap.id}
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
              className="flex flex-col justify-between p-6 sm:p-8 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
            >
              <div className="flex flex-col gap-3">
                <div className="p-3 w-max rounded-md bg-mint/30 dark:bg-mint/15 text-deep-ocean">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold font-display text-deep-ocean mt-1">
                  {cap.title}
                </h3>
                <p className="text-sm text-ocean leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-deep-ocean/10 dark:border-horizon/15">
                {cap.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-sand/60 dark:bg-sand/30 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
