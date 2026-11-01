"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface ChatbotHeaderProps {
  onClose: () => void;
}

export default function ChatbotHeader({ onClose }: ChatbotHeaderProps) {
  return (
    <header className="w-full border-b border-deep-ocean/10 dark:border-horizon/15 bg-warm/80 dark:bg-warm/80 backdrop-blur-md sticky top-0 z-10 flex-shrink-0">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-md overflow-hidden border border-deep-ocean/15 dark:border-horizon/30 flex-shrink-0 shadow-xs">
            <Image
              src="/images/resume-img.jpg"
              alt="John David Gaspar"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-bold font-display text-deep-ocean dark:text-white leading-tight">
              John David Gaspar
            </h3>
            <p className="font-handwritten text-xs sm:text-sm text-ocean dark:text-horizon leading-tight mt-0.5">
              Full Stack Software Engineer
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-ocean dark:text-slate-200 hover:text-deep-ocean dark:hover:text-white hover:bg-sand/60 dark:hover:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/30 transition-colors cursor-pointer text-xs font-medium"
        >
          <X size={15} />
          <span className="hidden sm:inline">Close</span>
          <kbd className="hidden sm:inline text-[10px] px-1 py-0.5 rounded-md bg-sand/80 dark:bg-sand/60 border border-deep-ocean/10 dark:border-horizon/30 font-mono text-ocean/90 dark:text-slate-300">
            Esc
          </kbd>
        </button>
      </div>
    </header>
  );
}
