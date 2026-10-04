"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { AboutMarqueeItem } from "../about.types";

interface AboutPolaroidModalProps {
  item: AboutMarqueeItem | null;
  onClose: () => void;
}

export default function AboutPolaroidModal({
  item,
  onClose,
}: AboutPolaroidModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (item) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          >
            <X size={22} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotate: 2 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-polaroid p-3.5 sm:p-4 pb-5 sm:pb-6 rounded-md shadow-2xl border border-deep-ocean/15 dark:border-horizon/20 flex flex-col items-center"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-sm overflow-hidden bg-sand/30 dark:bg-sand/50 shadow-inner">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority
                sizes="(max-width: 640px) 90vw, 448px"
                className="object-cover select-none"
              />
            </div>

            <div className="pt-3.5 sm:pt-4 px-2 w-full text-center">
              <p className="text-xl sm:text-2xl font-bold font-handwritten text-deep-ocean select-none">
                {item.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
