"use client";

import Image from "next/image";
import { AlertCircle, User } from "lucide-react";
import { ChatMessage } from "../chatbot.types";

interface ChatbotMessageItemProps {
  message: ChatMessage;
}

export default function ChatbotMessageItem({
  message,
}: ChatbotMessageItemProps) {
  const isUser = message.sender === "user";
  const isError = Boolean(message.isError);

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[88%] sm:max-w-[78%] rounded-md bg-horizon/10 dark:bg-horizon/20 border border-horizon/30 p-4 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between gap-3 text-[11px] text-ocean/80 dark:text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 font-display font-semibold text-deep-ocean dark:text-white">
              <User size={13} />
              <span>You</span>
            </span>
            {message.timestamp && (
              <span className="font-mono text-[10px] text-ocean/60 dark:text-slate-400">
                {message.timestamp}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-deep-ocean dark:text-white whitespace-pre-wrap font-body">
            {message.text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div
        className={`w-full max-w-[95%] sm:max-w-[88%] rounded-md p-4 sm:p-5 space-y-3 ${
          isError
            ? "bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/30 text-rose-800 dark:text-rose-200"
            : "bg-polaroid/80 dark:bg-polaroid/60 border border-deep-ocean/10 dark:border-horizon/20 shadow-xs text-deep-ocean dark:text-slate-100"
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-deep-ocean/5 dark:border-horizon/10 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 rounded-md overflow-hidden border border-deep-ocean/10 dark:border-horizon/30 flex-shrink-0 shadow-2xs">
              <Image
                src="/images/resume-img.jpg"
                alt="John David Gaspar"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-bold font-display text-deep-ocean dark:text-white">
                John David Gaspar
              </span>
              <span className="text-[10px] font-handwritten text-ocean dark:text-horizon hidden sm:inline">
                ~ Software Engineer
              </span>
            </div>
          </div>
          {message.timestamp && (
            <span className="text-[10px] text-ocean/60 dark:text-slate-400 font-mono">
              {message.timestamp}
            </span>
          )}
        </div>

        {isError && (
          <div className="flex items-center gap-1.5 font-semibold text-xs text-rose-700 dark:text-rose-400">
            <AlertCircle size={14} />
            <span>Connection Notice</span>
          </div>
        )}

        <div className="text-xs sm:text-sm leading-relaxed text-deep-ocean dark:text-slate-100 whitespace-pre-wrap font-body">
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
}
