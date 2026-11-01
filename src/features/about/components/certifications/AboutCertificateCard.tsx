"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Eye } from "lucide-react";
import { AboutCertItem } from "../../about.types";
import { ABOUT_CERT_ICON_MAP } from "../../constants/certifications/certifications-icon.constant";

interface AboutCertificateCardProps {
  item: AboutCertItem;
  index: number;
}

export default function AboutCertificateCard({
  item,
  index,
}: AboutCertificateCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const IconComponent = ABOUT_CERT_ICON_MAP[item.type];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="perspective-1000 w-full h-[300px] sm:h-[315px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        onClick={() => setIsFlipped((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={
          isFlipped ? "Flip back to certificate details" : "Click to flip"
        }
        className="relative w-full h-full preserve-3d cursor-pointer select-none group"
      >
        <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-start gap-3 p-5 sm:p-6 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-md bg-horizon/10 text-horizon flex items-center justify-center">
              <IconComponent size={20} />
            </div>
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-md bg-sand/60 dark:bg-sand/80 text-ocean">
              {item.period}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <h3 className="text-base sm:text-lg font-bold font-display text-deep-ocean leading-snug">
              {item.title}
            </h3>
            <span className="text-xs sm:text-sm font-semibold text-horizon">
              {item.institution}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-ocean leading-relaxed">
            {item.details}
          </p>

          <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4 bg-warm/60 dark:bg-sand/70 backdrop-blur-[2px] shadow-[inset_0_0_36px_rgba(22,76,99,0.25)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.65)] pointer-events-none z-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/95 dark:bg-polaroid/95 text-deep-ocean border border-deep-ocean/15 dark:border-horizon/30 shadow-md">
              <Eye size={15} className="text-horizon" />
              <span className="text-xs sm:text-sm font-bold font-display tracking-wide">
                Click to view certificate
              </span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] p-3 sm:p-3.5 rounded-md bg-polaroid dark:bg-sand/70 border border-deep-ocean/10 dark:border-horizon/15 shadow-md hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out flex flex-col justify-between">
          <div className="relative w-full flex-1 rounded-md overflow-hidden bg-sand/30 dark:bg-sand/60">
            <Image
              src={item.credentialImage}
              alt={item.title}
              fill
              quality={80}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
              className="object-contain p-1"
            />
          </div>

          <div className="pt-2 sm:pt-2.5 pb-0.5 px-1 text-center">
            <p className="text-base sm:text-lg font-bold font-handwritten text-deep-ocean dark:text-deep-ocean leading-tight select-none truncate">
              {item.title}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
