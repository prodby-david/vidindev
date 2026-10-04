"use client";

import { motion } from "motion/react";
import { Laptop } from "lucide-react";
import { ABOUT_GEAR } from "../constants";

export default function AboutGear() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-8 sm:pt-12 pb-16 sm:pb-20 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-1 text-center items-center"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          TOOLBOX & GEAR
        </span>
        <div className="flex items-center gap-2.5 justify-center">
          <Laptop size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            Everyday Setup & Tools
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {ABOUT_GEAR.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
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
                  className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-sand/60 dark:bg-sand/30 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20 cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
