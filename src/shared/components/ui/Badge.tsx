import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-mint/30 dark:bg-mint/15 text-deep-ocean transition-colors ${className}`}
    >
      {children}
    </span>
  );
}
