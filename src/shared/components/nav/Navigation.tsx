"use client";

import { useState } from "react";
import { useScroll } from "@/shared/hooks/useScroll";
import { NAV_ITEMS } from "./constants";
import NavBrand from "./NavBrand";
import NavLink from "./NavLink";
import NavToggle from "./NavToggle";
import MobileNav from "./MobileNav";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScroll(20);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-6 sm:px-10 text-ocean py-4 transition-[background-color,border-color,box-shadow] duration-200 ${
        isScrolled
          ? "bg-warm/85 backdrop-blur-md border-b border-deep-ocean/10 dark:border-horizon/15 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div>
          <NavBrand onClick={closeMenu} />
        </div>

        <div className="hidden md:flex items-center gap-x-6 lg:gap-x-8 text-sm font-semibold">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-x-2 md:hidden">
          <ThemeToggle />
          <NavToggle isOpen={isOpen} onToggle={toggleMenu} />
        </div>
      </div>

      <MobileNav isOpen={isOpen} onClose={closeMenu} />
    </nav>
  );
}
