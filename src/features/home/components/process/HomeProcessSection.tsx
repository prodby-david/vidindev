"use client";

import { motion } from "motion/react";
import { Rocket } from "lucide-react";
import { PROCESS_STEPS } from "../../constants/process/process.constant";
import { PROCESS_ICON_MAP } from "../../constants/process/process-icon.constant";

export default function HomeProcessSection() {
  return (
    <section className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-1 text-center items-center"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          HOW I BUILD
        </span>
        <div className="flex items-center gap-2.5 justify-center">
          <Rocket size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            How I Build Projects
          </h2>
        </div>
      </motion.div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full list-none p-0 m-0" aria-label="Development process steps">
        {PROCESS_STEPS.map((step, idx) => {
          const Icon = PROCESS_ICON_MAP[step.icon];
          return (
            <motion.li
              key={step.step}
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
              className="flex flex-col gap-4 p-6 sm:p-7 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
            >
              <div className="flex items-center justify-start">
                <div className="p-2.5 rounded-md bg-mint/30 dark:bg-mint/15 text-deep-ocean">
                  <Icon size={20} />
                </div>
              </div>

              <h3 className="text-lg font-bold font-display text-deep-ocean">
                {step.title}
              </h3>

              <p className="text-sm text-ocean leading-relaxed">
                {step.description}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
