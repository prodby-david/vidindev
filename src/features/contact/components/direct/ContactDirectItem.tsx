"use client";

import { motion } from "motion/react";
import { ContactInfoItem } from "../../contact.types";
import { CONTACT_DIRECT_ICON_MAP } from "../../constants/form/contact-icon.constant";

interface ContactDirectItemProps {
  item: ContactInfoItem;
}

export default function ContactDirectItem({ item }: ContactDirectItemProps) {
  const Icon = CONTACT_DIRECT_ICON_MAP[item.icon];

  const content = (
    <motion.div
      whileHover={{
        x: 4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="flex items-center gap-4 p-4 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 hover:border-horizon/40 hover:shadow-md transition-[box-shadow,border-color] duration-300 ease-out shadow-sm"
    >
      <div className="p-2.5 rounded-md bg-mint/30 dark:bg-mint/15 text-deep-ocean flex-shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-ocean">
          {item.label}
        </span>
        <span className="text-sm font-bold text-deep-ocean">
          {item.value}
        </span>
      </div>
    </motion.div>
  );

  if (item.href) {
    return (
      <a href={item.href} className="block group">
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
