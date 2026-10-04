"use client";

import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface ContactSuccessMessageProps {
  onReset: () => void;
}

export default function ContactSuccessMessage({
  onReset,
}: ContactSuccessMessageProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center justify-center gap-4 p-8 sm:p-12 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 text-center w-full"
      >
        <CheckCircle2 size={48} className="text-mint" />
        <h3 className="text-2xl font-bold font-display text-deep-ocean">
          Message Received!
        </h3>
        <p className="text-ocean text-sm max-w-md">
          Thank you for reaching out. I have received your message and will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-xs font-semibold text-deep-ocean underline hover:text-horizon cursor-pointer"
        >
          Send another message
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
