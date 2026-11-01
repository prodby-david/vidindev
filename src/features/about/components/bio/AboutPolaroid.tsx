"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface AboutPolaroidProps {
  imageSrc: string;
}

export default function AboutPolaroid({ imageSrc }: AboutPolaroidProps) {
  return (
    <figure className="flex flex-col items-center justify-center gap-4 sm:gap-6 shrink-0 m-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        whileHover={{
          rotate: 0,
          scale: 1.02,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative cursor-pointer"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-mint/90 dark:bg-mint/70 z-20" />

        <div className="bg-polaroid dark:bg-sand/70 p-2 rounded-md shadow-md hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out border border-deep-ocean/10 dark:border-horizon/15">
          <Image
            src={imageSrc}
            alt="Portrait of John David"
            width={320}
            height={280}
            priority
            quality={85}
            sizes="(max-width: 640px) 256px, 304px"
            className="rounded-md object-cover w-64 sm:w-76 h-56 sm:h-75"
          />
          <figcaption className="text-center text-horizon font-semibold font-handwritten mt-2 text-xl">
            Building my career, one line at a time. ツ
          </figcaption>
        </div>
      </motion.div>
    </figure>
  );
}
