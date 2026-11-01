"use client";

import { RefObject } from "react";
import { ChatMessage } from "../chatbot.types";
import ChatbotMessageItem from "./ChatbotMessageItem";
import ChatbotTypingIndicator from "./ChatbotTypingIndicator";
import ChatbotHeroGreeting from "./ChatbotHeroGreeting";

interface ChatbotMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onQuickPrompt?: (query: string) => void;
}

export default function ChatbotMessageList({
  messages,
  isTyping,
  messagesEndRef,
  onQuickPrompt,
}: ChatbotMessageListProps) {
  const isInitialState = messages.length <= 1;

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scroll-smooth">
      <div className="max-w-3xl w-full mx-auto space-y-6">
        {isInitialState && onQuickPrompt ? (
          <ChatbotHeroGreeting onPromptClick={onQuickPrompt} />
        ) : (
          messages.map((msg) => (
            <ChatbotMessageItem key={msg.id} message={msg} />
          ))
        )}

        {isTyping && <ChatbotTypingIndicator />}
        <div ref={messagesEndRef} className="h-2" />
      </div>
    </div>
  );
}
