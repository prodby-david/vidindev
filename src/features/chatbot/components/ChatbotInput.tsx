"use client";

import { Send } from "lucide-react";

interface ChatbotInputProps {
  inputValue: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled?: boolean;
}

export default function ChatbotInput({
  inputValue,
  onChange,
  onSubmit,
  isDisabled = false,
}: ChatbotInputProps) {
  return (
    <footer className="w-full border-t border-deep-ocean/10 dark:border-horizon/15 bg-warm/80 dark:bg-warm/80 backdrop-blur-md flex-shrink-0">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-3 pb-5 sm:pb-6">
        <form
          onSubmit={onSubmit}
          className="relative flex items-center bg-white dark:bg-sand/80 rounded-md border border-deep-ocean/15 dark:border-horizon/25 shadow-sm p-2 sm:p-2.5"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            disabled={isDisabled}
            autoFocus
            placeholder={
              isDisabled
                ? "John David is writing..."
                : "Ask me anything about my projects, stack, or availability..."
            }
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-deep-ocean dark:text-white border-none outline-none ring-0 shadow-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none placeholder:text-ocean/50 dark:placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed font-body"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isDisabled}
            aria-label="Send message"
            className="p-2 sm:px-3.5 sm:py-2 rounded-md bg-ocean text-white flex items-center gap-1.5 hover:bg-deep-ocean active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex-shrink-0"
          >
            <Send size={14} />
            <span className="hidden sm:inline text-xs font-semibold font-display">
              Send
            </span>
          </button>
        </form>

        <p className="mt-2.5 text-center text-[10px] sm:text-[11px] text-ocean/60 dark:text-slate-400 font-body select-none">
          Press <kbd className="font-mono bg-sand/60 dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/20 px-1 py-0.5 rounded-md text-[10px] text-ocean/80 dark:text-slate-300">↵ Enter</kbd> to send • <kbd className="font-mono bg-sand/60 dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/20 px-1 py-0.5 rounded-md text-[10px] text-ocean/80 dark:text-slate-300">Esc</kbd> to close
        </p>
      </div>
    </footer>
  );
}
