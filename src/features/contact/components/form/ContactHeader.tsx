"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";

export default function ContactHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-2 w-full text-center items-center max-w-2xl mx-auto"
    >
      <span className="text-xs font-bold tracking-widest text-ocean uppercase">
        GET IN TOUCH
      </span>
      <div className="flex items-center gap-3 justify-center">
        <Mail size={32} className="text-horizon flex-shrink-0" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-deep-ocean tracking-tight">
          Let’s connect & build.
        </h1>
      </div>
      <p className="text-ocean text-base sm:text-lg leading-relaxed mt-1">
        Whether you have an upcoming project, a freelance opportunity, or just want to chat about engineering, I would love to hear from you.
      </p>
    </motion.div>
  );
}
