import Image from "next/image";
import { X } from "lucide-react";

interface ChatbotHeaderProps {
  onClose: () => void;
}

export default function ChatbotHeader({ onClose }: ChatbotHeaderProps) {
  return (
    <div className="px-4 py-3 bg-warm/80 dark:bg-sand/80 border-b border-deep-ocean/10 dark:border-horizon/15 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-deep-ocean/10 dark:border-horizon/30 flex-shrink-0">
          <Image
            src="/images/resume-img.jpg"
            alt="David"
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold font-display text-deep-ocean leading-tight">
            Chat with David
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium text-ocean">Online</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close chat"
        className="p-1.5 rounded-md text-ocean hover:text-deep-ocean hover:bg-sand/60 dark:hover:bg-sand/20 transition-colors cursor-pointer outline-none focus:outline-none"
      >
        <X size={16} />
      </button>
    </div>
  );
}
