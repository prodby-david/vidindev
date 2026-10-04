import Image from "next/image";
import { ChatMessage } from "../chatbot.types";

interface ChatbotMessageItemProps {
  message: ChatMessage;
}

export default function ChatbotMessageItem({
  message,
}: ChatbotMessageItemProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-deep-ocean/10 dark:border-horizon/30 flex-shrink-0 mb-0.5">
          <Image
            src="/images/resume-img.jpg"
            alt="David"
            fill
            sizes="24px"
            className="object-cover"
          />
        </div>
      )}
      <div
        className={`px-3.5 py-2.5 rounded-md text-xs sm:text-sm leading-relaxed ${
          isUser
            ? "bg-horizon text-white max-w-[82%]"
            : "bg-sand/70 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/15 max-w-[85%]"
        }`}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
}
