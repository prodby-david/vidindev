"use client";

import { useState } from "react";
import { useScroll } from "@/shared/hooks/useScroll";
import { NAV_ITEMS } from "./constants/navigation.constant";
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
    <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-4 pointer-events-none transition-all duration-200">
      <div className="relative w-full max-w-2xl lg:max-w-3xl mx-auto">
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto flex items-center justify-between w-full rounded-md py-2 px-4 sm:px-5 lg:px-6 transition-[background-color,border-color,box-shadow] duration-200 ${
            isScrolled
              ? "bg-warm/95 dark:bg-sand/95 backdrop-blur-md border border-deep-ocean/15 dark:border-horizon/25 shadow-md"
              : "bg-warm/85 dark:bg-sand/85 backdrop-blur-md border border-deep-ocean/10 dark:border-horizon/15 shadow-sm"
          }`}
        >
          {/* Left Zone: Brand */}
          <div className="flex items-center shrink-0">
            <NavBrand onClick={closeMenu} />
          </div>

          {/* Center Zone: Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-x-5 lg:gap-x-6 text-sm font-semibold">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* Right Zone: Controls (Desktop: ThemeToggle / Mobile: ThemeToggle + Hamburger) */}
          <div className="hidden md:flex items-center shrink-0">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-x-2 md:hidden">
            <ThemeToggle />
            <NavToggle isOpen={isOpen} onToggle={toggleMenu} />
          </div>
        </nav>

        <MobileNav isOpen={isOpen} onClose={closeMenu} />
      </div>
    </header>
  );
}
