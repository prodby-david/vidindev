"use client";

import { motion } from "motion/react";
import { Briefcase, Check } from "lucide-react";
import { HOME_SERVICES } from "../../constants/services/services.constant";
import { SERVICES_ICON_MAP } from "../../constants/services/services-icon.constant";

export default function HomeServicesSection() {
  return (
    <section className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-2 text-center items-center max-w-2xl mx-auto"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          SERVICES & SOLUTIONS
        </span>
        <div className="flex items-center gap-2.5 justify-center">
          <Briefcase size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            What I can build for you
          </h2>
        </div>
        <p className="text-sm sm:text-base text-ocean leading-relaxed">
          High-impact software engineering services to turn your vision into resilient, production-ready digital products.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
        {HOME_SERVICES.map((service, idx) => {
          const Icon = SERVICES_ICON_MAP[service.icon];
          return (
            <motion.div
              key={service.id}
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
              className="flex flex-col justify-between p-4 sm:p-5 md:p-6 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-lg hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 sm:p-2.5 w-max rounded-md bg-mint/30 dark:bg-mint/15 text-deep-ocean group-hover:scale-105 transition-transform duration-200">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-ocean/60 uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold font-display text-deep-ocean">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ocean leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 mt-1">
                  <span className="text-[10px] sm:text-[11px] font-bold text-ocean/80 uppercase tracking-wider">
                    Key Deliverables
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs text-deep-ocean/90 dark:text-deep-ocean/80"
                      >
                        <Check
                          size={13}
                          className="text-horizon mt-0.5 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-deep-ocean/10 dark:border-horizon/15">
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-sand/60 dark:bg-sand/30 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
