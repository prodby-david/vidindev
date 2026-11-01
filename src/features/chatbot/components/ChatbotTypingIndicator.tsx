import Image from "next/image";

export default function ChatbotTypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-md px-3.5 py-2.5 bg-polaroid/70 dark:bg-polaroid/60 border border-deep-ocean/10 dark:border-horizon/20 flex items-center gap-2.5 shadow-2xs">
        <div className="relative w-5 h-5 rounded-md overflow-hidden border border-deep-ocean/10 dark:border-horizon/30 flex-shrink-0">
          <Image
            src="/images/resume-img.jpg"
            alt="John David Gaspar"
            fill
            sizes="20px"
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-1.5 px-0.5">
          <span className="w-1.5 h-1.5 rounded-md bg-horizon animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-md bg-horizon animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-md bg-horizon animate-bounce" />
        </div>
        <span className="text-[11px] text-ocean/80 dark:text-slate-300 font-body">
          Thinking...
        </span>
      </div>
    </div>
  );
}
