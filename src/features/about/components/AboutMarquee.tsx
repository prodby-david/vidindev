"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { ABOUT_MARQUEE_ITEMS } from "../constants";
import { AboutMarqueeItem } from "../about.types";
import AboutPolaroidModal from "./AboutPolaroidModal";
import AboutMarqueeCard from "./AboutMarqueeCard";

export default function AboutMarquee() {
  const [selectedItem, setSelectedItem] = useState<AboutMarqueeItem | null>(
    null,
  );
  const marqueeItems = [...ABOUT_MARQUEE_ITEMS, ...ABOUT_MARQUEE_ITEMS];

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10 pt-2 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-1 text-center items-center px-6"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          SNAPSHOTS & MOMENTS
        </span>
        <div className="flex items-center gap-2.5 justify-center">
          <Camera size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-deep-ocean tracking-tight">
            Moments, Work & Exploration
          </h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <div className="animate-marquee flex items-center gap-5 sm:gap-7 py-8 sm:py-10 px-4">
          {marqueeItems.map((item, idx) => (
            <AboutMarqueeCard
              key={`${item.id}-${idx}`}
              item={item}
              onSelect={setSelectedItem}
            />
          ))}
        </div>
      </motion.div>

      <AboutPolaroidModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
