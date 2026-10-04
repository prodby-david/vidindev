"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import { CONTACT_DATA } from "@/features/contact/constants";
import { FOOTER_DATA } from "./constants";
import SocialIcons from "@/shared/components/ui/SocialIcons";
import SquigglyLine from "@/shared/components/ui/SquigglyLine";

export default function Footer() {
  return (
    <footer className="w-full bg-horizon dark:bg-sand text-white dark:text-deep-ocean mt-16 sm:mt-24 pt-14 sm:pt-16 pb-8 px-6 sm:px-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 w-full"
      >
        <div className="flex flex-col gap-4 text-center md:text-left flex-shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-widest text-white/80 dark:text-mint uppercase">
              {CONTACT_DATA.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white dark:text-deep-ocean tracking-tight whitespace-nowrap">
              {CONTACT_DATA.title}
            </h2>
          </div>
          <div className="flex justify-center md:justify-start">
            <SocialIcons />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left max-w-sm">
          <p className="text-sm text-white/95 dark:text-ocean leading-relaxed">
            {CONTACT_DATA.description}
          </p>
          <Link
            href={CONTACT_DATA.cta.href}
            className="group inline-flex items-center gap-2 bg-warm dark:bg-deep-ocean text-deep-ocean dark:text-warm text-sm font-semibold py-2.5 px-6 rounded-full shadow-sm hover:bg-white dark:hover:bg-deep-ocean/90 transition-colors duration-200 cursor-pointer mt-1"
          >
            <span>{CONTACT_DATA.cta.label}</span>
            <MoveRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1.5"
            />
          </Link>
        </div>

        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left flex-shrink-0">
          <div className="w-11">
            <SquigglyLine className="text-white/80 dark:text-mint" />
          </div>
          <p className="text-base sm:text-lg font-semibold font-handwritten text-white/95 dark:text-ocean leading-snug select-none">
            {CONTACT_DATA.statusText} ☺
          </p>
        </div>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/20 dark:border-deep-ocean/20 flex items-center justify-center text-center text-white/80 dark:text-ocean">
        <p className="font-handwritten text-base sm:text-lg select-none">{FOOTER_DATA.copyright}</p>
      </div>
    </footer>
  );
}
