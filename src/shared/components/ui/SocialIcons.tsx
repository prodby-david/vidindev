"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SOCIAL_LINKS } from "@/features/contact/constants/direct/social.constant";
import GithubIcon from "./icons/GithubIcon";
import { SOCIAL_ICON_MAP } from "./constants/social-icons.constant";

export default function SocialIcons() {
  return (
    <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
      {SOCIAL_LINKS.map((social) => {
        const SvgComponent = SOCIAL_ICON_MAP[social.name] || GithubIcon;
        return (
          <motion.div
            key={social.name}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-10 h-10 rounded-md bg-white/10 dark:bg-deep-ocean/10 hover:bg-white/20 dark:hover:bg-deep-ocean/20 text-white/90 dark:text-deep-ocean flex items-center justify-center transition-colors duration-200 border border-white/20 dark:border-deep-ocean/15"
            >
              <SvgComponent />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
