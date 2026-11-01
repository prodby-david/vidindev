"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { NavItem } from "./navigation.types";
import SquigglyLine from "../ui/SquigglyLine";

interface NavLinkProps {
  item: NavItem;
  onClick?: () => void;
  isMobile?: boolean;
}

export default function NavLink({
  item,
  onClick,
  isMobile = false,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname?.startsWith(`${item.href}/`);

  const handleClick = () => {
    if (onClick) onClick();
    if (isActive) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isMobile) {
    return (
      <Link
        href={item.href}
        onClick={handleClick}
        className={`inline-flex flex-col items-start py-2 text-base font-semibold transition-colors duration-200 ${
          isActive ? "text-deep-ocean" : "text-ocean hover:text-deep-ocean"
        }`}
      >
        <span>{item.label}</span>
        {isActive ? (
          <motion.div
            layoutId="mobile-nav-indicator"
            className="w-8 h-0.5 rounded-md mt-1 bg-horizon"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        ) : (
          <div className="w-8 h-0.5 rounded-md mt-1 opacity-0" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      className={` relative inline-flex items-center justify-center py-1 transition-colors duration-200 ${
        isActive ? "text-deep-ocean" : "text-ocean hover:text-deep-ocean"
      }`}
    >
      <span>{item.label}</span>
      {isActive && (
        <motion.div
          layoutId="desktop-nav-indicator"
          className="absolute -bottom-2 left-0 right-0 w-full"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <SquigglyLine className="w-full" />
        </motion.div>
      )}
    </Link>
  );
}
