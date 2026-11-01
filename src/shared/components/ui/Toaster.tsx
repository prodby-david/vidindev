"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

export default function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as "light" | "dark" | "system"}
      position="top-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-body bg-polaroid dark:bg-sand/90 text-deep-ocean border border-deep-ocean/15 dark:border-horizon/25 rounded-md shadow-lg p-4 flex items-center gap-3",
          title: "font-display font-bold text-sm text-deep-ocean",
          description: "text-xs text-ocean dark:text-ocean-blue font-body mt-0.5",
          actionButton:
            "bg-ocean text-white font-display text-xs px-3 py-1.5 rounded-md hover:bg-deep-ocean transition-colors",
          cancelButton:
            "bg-sand/60 text-ocean font-display text-xs px-3 py-1.5 rounded-md hover:bg-sand transition-colors",
          success:
            "!border-mint/50 dark:!border-mint/40 [&_[data-icon]]:text-mint",
          error:
            "!border-red-500/40 dark:!border-red-400/40 [&_[data-icon]]:text-red-500",
          info:
            "!border-horizon/50 dark:!border-horizon/40 [&_[data-icon]]:text-horizon",
          warning:
            "!border-amber-500/40 dark:!border-amber-400/40 [&_[data-icon]]:text-amber-500",
        },
      }}
    />
  );
}

export { toast } from "sonner";
