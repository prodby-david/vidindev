"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl xl:max-w-4xl 2xl:max-w-5xl space-y-4 sm:space-y-5 text-center mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="text-[11px] sm:text-xs 2xl:text-sm font-bold tracking-widest text-ocean uppercase">
          FULL-STACK SOFTWARE ENGINEER
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[4.5rem] font-bold font-display text-deep-ocean leading-[1.06] tracking-tight"
      >
        I build software around problems worth solving.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-sm sm:text-base md:text-lg 2xl:text-xl text-ocean leading-relaxed max-w-xl sm:max-w-2xl 2xl:max-w-3xl"
      >
        I&apos;m a full-stack software engineer who turns everyday challenges into simple,
        dependable web apps. I focus on clean design, fast performance, and building tools
        that make life easier for real people—not just writing code for the sake of it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-3"
      >
        <Link
          href="/projects"
          scroll={true}
          className="group inline-flex items-center bg-horizon text-sm sm:text-base text-white dark:text-slate-950 font-semibold hover:bg-ocean dark:hover:bg-mint py-3 px-6 sm:px-8 rounded-md cursor-pointer transition-colors duration-200"
        >
          <span>View My Work</span>
          <MoveRight
            className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1.5"
            size={16}
          />
        </Link>

        <Link
          href="/contact"
          scroll={true}
          className="group inline-block text-sm sm:text-base text-ocean py-2.5 sm:py-3 px-4 sm:px-5 hover:text-deep-ocean font-semibold transition-none"
        >
          <span>Get In Touch</span>
          <div className="w-full h-px bg-horizon group-hover:bg-deep-ocean mt-0.5 transition-none" />
        </Link>
      </motion.div>
    </div>
  );
}
