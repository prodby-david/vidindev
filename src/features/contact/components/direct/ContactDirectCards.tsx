"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CONTACT_INFO_ITEMS } from "../../constants/direct/info.constant";
import { SOCIAL_LINKS } from "../../constants/direct/social.constant";
import ContactDirectItem from "./ContactDirectItem";
import ContactSocialBadge from "./ContactSocialBadge";
import CalendlyDirectCard from "./CalendlyDirectCard";
import CalendlyBookingModal from "../calendly/CalendlyBookingModal";

export default function ContactDirectCards() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-6 w-full"
    >
      <CalendlyDirectCard onOpenBooking={() => setIsBookingOpen(true)} />

      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-bold font-display text-deep-ocean">
          Direct Channels
        </h3>
        <p className="text-sm text-ocean leading-relaxed">
          Prefer communicating through direct channels or async platforms? Feel free to reach out directly.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {CONTACT_INFO_ITEMS.map((item) => (
          <ContactDirectItem key={item.id} item={item} />
        ))}
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <span className="text-xs font-bold tracking-wider text-ocean uppercase">
          Social Networks
        </span>
        <div className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((social) => (
            <ContactSocialBadge key={social.name} social={social} />
          ))}
        </div>
      </div>

      <CalendlyBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </motion.div>
  );
}
