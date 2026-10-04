import { Send } from "lucide-react";

interface ChatbotInputProps {
  inputValue: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ChatbotInput({
  inputValue,
  onChange,
  onSubmit,
}: ChatbotInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-3 bg-warm/80 dark:bg-sand/80 border-t border-deep-ocean/10 dark:border-horizon/15 flex items-center gap-2 flex-shrink-0"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask David anything..."
        className="flex-1 bg-white dark:bg-warm text-deep-ocean text-xs sm:text-sm px-3.5 py-2 rounded-md border border-deep-ocean/15 dark:border-horizon/25 focus:outline-none focus:border-horizon placeholder:text-ocean/60"
      />
      <button
        type="submit"
        disabled={!inputValue.trim()}
        aria-label="Send message"
        className="w-8 h-8 rounded-md bg-horizon text-white flex items-center justify-center hover:bg-horizon/90 active:scale-95 disabled:opacity-40 transition-all cursor-pointer flex-shrink-0 outline-none focus:outline-none"
      >
        <Send size={14} />
      </button>
    </form>
  );
}
