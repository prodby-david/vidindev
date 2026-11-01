"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { UserCheck, MoveRight } from "lucide-react";
import { HOME_BIO_PREVIEW } from "../../constants/about-preview/about-preview.constant";

export default function HomeAboutPreviewSection() {
  return (
    <section className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 pb-16 sm:pb-24 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-1 text-center items-center"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          {HOME_BIO_PREVIEW.badge}
        </span>
        <div className="flex items-center gap-2.5 justify-center">
          <UserCheck size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            {HOME_BIO_PREVIEW.title}
          </h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12 w-full p-6 sm:p-10 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm"
      >
        <div className="flex flex-col justify-between gap-6 flex-1 max-w-2xl">
          <div className="flex flex-col gap-4 text-ocean text-sm sm:text-base leading-relaxed">
            {HOME_BIO_PREVIEW.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div>
            <Link
              href={HOME_BIO_PREVIEW.cta.href}
              className="group inline-flex items-center gap-2 bg-horizon text-sm text-white dark:text-warm font-semibold hover:bg-ocean dark:hover:bg-mint py-3 px-6 rounded-md cursor-pointer transition-colors duration-200 shadow-sm"
            >
              <span>{HOME_BIO_PREVIEW.cta.label}</span>
              <MoveRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3.5 w-full lg:w-80 shrink-0">
          {HOME_BIO_PREVIEW.highlights.map((h) => (
            <div
              key={h.label}
              className="flex flex-col gap-1 p-4 rounded-md bg-warm dark:bg-sand/60 border border-deep-ocean/10 dark:border-horizon/15"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-ocean">
                {h.label}
              </span>
              <span className="text-sm sm:text-base font-bold text-deep-ocean">
                {h.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
