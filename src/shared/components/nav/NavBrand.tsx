"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBrandProps {
  onClick?: () => void;
}

export default function NavBrand({ onClick }: NavBrandProps) {
  const pathname = usePathname();

  const handleClick = () => {
    if (onClick) onClick();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="text-xl font-bold font-handwritten text-deep-ocean hover:text-ocean transition-colors duration-200"
    >
      {"< Vid in Dev />"}
    </Link>
  );
}
