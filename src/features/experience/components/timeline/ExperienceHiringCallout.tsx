"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight, CheckCircle2, Calendar } from "lucide-react";
import CalendlyBookingModal from "@/features/contact/components/calendly/CalendlyBookingModal";

export default function ExperienceHiringCallout() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative overflow-hidden rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 p-6 sm:p-10 shadow-sm"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mint via-horizon to-mint opacity-80" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-warm dark:bg-sand/80 border border-deep-ocean/10 dark:border-horizon/20 w-fit">
              <span className="text-xs font-semibold text-deep-ocean tracking-wide">
                Available for Full-Time Roles & Select Contracts
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-deep-ocean tracking-tight">
              Looking to scale your engineering team or ship your next product?
            </h2>

            <p className="text-sm sm:text-base text-ocean leading-relaxed">
              I specialize in shipping production-ready web applications with clean architecture, strict type safety, and responsive user interfaces. Whether you need a dedicated software engineer or an MVP built from the ground up, let’s talk.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-ocean">
                <CheckCircle2 size={16} className="text-horizon shrink-0" />
                <span>End-to-End Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-ocean">
                <CheckCircle2 size={16} className="text-horizon shrink-0" />
                <span>Next.js & TypeScript</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-ocean">
                <CheckCircle2 size={16} className="text-horizon shrink-0" />
                <span>Remote & Flexible</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-horizon text-white dark:text-slate-950 font-semibold hover:bg-ocean dark:hover:bg-mint py-3 px-6 rounded-md transition-colors duration-200 shadow-sm text-sm cursor-pointer"
            >
              <Calendar size={16} />
              <span>Schedule Intro Call</span>
            </button>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-warm dark:bg-sand/60 text-deep-ocean font-semibold hover:bg-sand dark:hover:bg-sand/90 border border-deep-ocean/10 dark:border-horizon/15 py-3 px-6 rounded-md transition-colors duration-200 shadow-sm text-sm"
            >
              <span>Send Message</span>
              <MoveRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </motion.div>

      <CalendlyBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
}
