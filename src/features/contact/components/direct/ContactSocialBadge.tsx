"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SocialLink } from "../../contact.types";

interface ContactSocialBadgeProps {
  social: SocialLink;
}

export default function ContactSocialBadge({
  social,
}: ContactSocialBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <Link
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold bg-sand/60 dark:bg-sand/30 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20 hover:border-horizon transition-colors"
      >
        <span>{social.name}</span>
        <span className="text-ocean text-[11px] font-normal">
          {social.handle}
        </span>
        <ArrowUpRight size={14} className="text-ocean" />
      </Link>
    </motion.div>
  );
}
