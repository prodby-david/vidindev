"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { NAV_ITEMS } from "./constants/navigation.constant";
import NavLink from "./NavLink";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, onClose, isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-auto md:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 w-full z-50"
        >
          <div className="bg-sand/95 dark:bg-sand/95 backdrop-blur-md rounded-md shadow-xl border border-deep-ocean/10 dark:border-horizon/20 p-4 flex flex-col gap-y-2">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} onClick={onClose} isMobile />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
