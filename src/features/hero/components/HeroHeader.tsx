"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="flex flex-col items-center lg:items-start justify-center max-w-lg space-y-3 text-center lg:text-left">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          FULL-STACK SOFTWARE ENGINEER
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-4xl font-bold text-deep-ocean sm:text-5xl md:text-6xl leading-[1.01]"
      >
        I build software around problems worth solving.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-ocean"
      >
        I design and build software whenever an idea sticks around long enough
        to become a real project — usually something that solves a problem I&apos;ve
        actually run into.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex gap-x-2 mt-5 items-center"
      >
        <Link
          href="/projects"
          scroll={true}
          className="group inline-flex items-center bg-horizon text-sm text-white dark:text-slate-950 font-semibold hover:bg-ocean dark:hover:bg-mint py-3 px-8 rounded-full cursor-pointer transition-colors duration-200"
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
          className="group inline-block text-sm text-ocean py-3 px-5 hover:text-deep-ocean font-semibold transition-none"
        >
          <span>Get In Touch</span>
          <div className="w-full h-px bg-horizon group-hover:bg-deep-ocean mt-0.5 transition-none" />
        </Link>
      </motion.div>
    </div>
  );
}
