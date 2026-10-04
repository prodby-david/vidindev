"use client";

import { motion } from "motion/react";
import { BookCheck } from "lucide-react";
import { ABOUT_CERTIFICATIONS } from "../constants";
import AboutCertificationsCarousel from "./AboutCertificationsCarousel";

export default function AboutCertificationsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-8 sm:pt-12 pb-12 sm:pb-16 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-1 text-center items-center"
      >
        <span className="text-xs font-bold tracking-widest text-ocean uppercase">
          ACADEMIC & CREDENTIALS
        </span>
        <div className="flex items-center gap-2.5 justify-center">
          <BookCheck size={26} className="text-horizon flex-shrink-0" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-deep-ocean tracking-tight">
            Education & Certifications
          </h2>
        </div>
      </motion.div>

      <AboutCertificationsCarousel items={ABOUT_CERTIFICATIONS} />
    </section>
  );
}
