"use client";

import { Sparkles, Code2, Briefcase, Mail, UserCheck } from "lucide-react";
import { QUICK_PROMPTS } from "../constants/chatbot.constant";

interface ChatbotHeroGreetingProps {
  onPromptClick: (query: string) => void;
}

const PROMPT_ICONS: Record<string, React.ReactNode> = {
  about: <Sparkles size={15} className="text-horizon" />,
  stack: <Code2 size={15} className="text-mint" />,
  projects: <Briefcase size={15} className="text-horizon" />,
  hire: <UserCheck size={15} className="text-emerald-500" />,
  contact: <Mail size={15} className="text-amber-500" />,
};

export default function ChatbotHeroGreeting({
  onPromptClick,
}: ChatbotHeroGreetingProps) {
  return (
    <div className="py-4 sm:py-6 px-2 flex flex-col items-center text-center max-w-2xl mx-auto space-y-5 my-auto">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean dark:text-white tracking-tight">
          How can I help you today?
        </h2>
        <p className="text-xs sm:text-sm text-ocean/80 dark:text-slate-300 max-w-md mx-auto leading-relaxed font-body">
          Ask me anything about my full-stack projects, architecture decisions,
          tech stack, or open engineering opportunities.
        </p>
      </div>

      <div className="w-full pt-1">
        <p className="text-[11px] font-semibold text-ocean/60 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          Suggested questions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
          {QUICK_PROMPTS.map((prompt, index) => {
            const isLastOdd =
              index === QUICK_PROMPTS.length - 1 &&
              QUICK_PROMPTS.length % 2 !== 0;

            return (
              <button
                key={prompt.id}
                type="button"
                onClick={() => onPromptClick(prompt.query)}
                className={`p-3.5 rounded-md border border-deep-ocean/10 dark:border-horizon/20 bg-polaroid/70 dark:bg-sand/40 hover:bg-white dark:hover:bg-sand/60 hover:border-horizon/40 transition-all cursor-pointer flex items-center gap-3 group text-left shadow-2xs ${
                  isLastOdd ? "sm:col-span-2" : ""
                }`}
              >
                <div className="p-2 rounded-md bg-warm dark:bg-sand/70 group-hover:scale-105 transition-transform flex-shrink-0">
                  {PROMPT_ICONS[prompt.id] || <Sparkles size={15} />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-deep-ocean dark:text-white block font-display">
                    {prompt.label}
                  </span>
                  <span className="text-[11px] text-ocean/70 dark:text-slate-300 truncate block font-body">
                    {prompt.query}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
