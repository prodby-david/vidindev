"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function HeroPolaroid() {
  return (
    <div className="relative hidden lg:block">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
        className="absolute left-40 -top-4 p-2 bg-mint/90 dark:bg-mint/70 w-24 h-8 z-20"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-polaroid dark:bg-sand/70 border border-transparent dark:border-horizon/20 p-2 rounded-md shadow-md"
      >
        <Image
          src="/images/hero-image.jpg"
          alt="Hero"
          width={300}
          height={300}
          className="rounded-md object-cover w-100 h-80"
          priority
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        className="absolute right-3 -rotate-3 text-center text-xl font-semibold font-handwritten text-deep-ocean select-none"
      >
        Build, Learn & Explore. ☺
      </motion.p>
    </div>
  );
}
