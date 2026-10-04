"use client";

import { motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";

interface ChatbotLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatbotLauncher({
  isOpen,
  onToggle,
}: ChatbotLauncherProps) {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <motion.button
        type="button"
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={onToggle}
        aria-label={isOpen ? "Close chat" : "Chat with David"}
        className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-horizon text-white dark:bg-horizon shadow-lg hover:shadow-xl cursor-pointer border border-white/20 dark:border-white/10 transition-all select-none text-xs sm:text-sm font-semibold font-display tracking-tight outline-none focus:outline-none"
      >
        {!isOpen && <MessageCircle size={16} />}
        <span>{isOpen ? "Close" : "Chat with John David"}</span>
        {isOpen && <X size={14} className="ml-0.5 opacity-80" />}
      </motion.button>
    </div>
  );
}
