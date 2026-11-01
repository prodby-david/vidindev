"use client";

import { motion } from "motion/react";
import { Calendar, QrCode } from "lucide-react";

interface CalendlyDirectCardProps {
  onOpenBooking: () => void;
}

export default function CalendlyDirectCard({
  onOpenBooking,
}: CalendlyDirectCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 hover:border-horizon/40 hover:shadow-md transition-[box-shadow,border-color] duration-300 ease-out shadow-sm"
    >
      <div className="flex items-center gap-3.5">
        <div className="p-2.5 rounded-md bg-mint/30 dark:bg-mint/15 text-deep-ocean flex-shrink-0">
          <Calendar size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-wider text-ocean uppercase">
            INTRO CALL
          </span>
          <span className="text-sm sm:text-base font-bold font-display text-deep-ocean">
            Schedule a 15-Min Call
          </span>
          <span className="text-xs text-ocean">
            Pick a time directly on my calendar
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenBooking}
        className="inline-flex items-center justify-center gap-2 bg-horizon hover:bg-ocean text-white dark:text-slate-950 dark:hover:bg-mint text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-md transition-colors cursor-pointer w-full sm:w-auto shrink-0 shadow-xs"
      >
        <QrCode size={15} />
        <span>Book a Call</span>
      </button>
    </motion.div>
  );
}
