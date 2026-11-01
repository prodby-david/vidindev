"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

interface ChatbotLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatbotLauncher({
  isOpen,
  onToggle,
}: ChatbotLauncherProps) {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <motion.button
        type="button"
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={onToggle}
        aria-label="Chat with John David"
        className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-ocean text-white dark:bg-horizon dark:text-deep-ocean shadow-lg hover:shadow-xl cursor-pointer border border-white/20 dark:border-white/10 transition-all select-none text-xs sm:text-sm font-semibold font-display tracking-tight"
      >
        <MessageCircle size={16} />
        <span>Chat with John David</span>
      </motion.button>
    </div>
  );
}
