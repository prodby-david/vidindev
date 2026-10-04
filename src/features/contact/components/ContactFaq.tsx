"use client";

import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import { CONTACT_FAQS } from "../constants";

export default function ContactFaq() {
  return (
    <div className="flex flex-col gap-6 w-full pt-8 border-t border-deep-ocean/10 dark:border-horizon/15">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-1 items-center text-center"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          FAQ
        </span>
        <div className="flex items-center gap-2 justify-center">
          <HelpCircle size={22} className="text-horizon flex-shrink-0" />
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-deep-ocean">
            Frequently Asked Questions
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
        {CONTACT_FAQS.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: idx * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="flex flex-col gap-2 p-5 sm:p-6 rounded-md bg-polaroid dark:bg-sand/30 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
          >
            <h3 className="text-base font-bold font-display text-deep-ocean">
              {faq.question}
            </h3>
            <p className="text-sm text-ocean leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
