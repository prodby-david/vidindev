import { RefObject } from "react";
import { ChatMessage } from "../chatbot.types";
import ChatbotMessageItem from "./ChatbotMessageItem";
import ChatbotTypingIndicator from "./ChatbotTypingIndicator";

interface ChatbotMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export default function ChatbotMessageList({
  messages,
  isTyping,
  messagesEndRef,
}: ChatbotMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <ChatbotMessageItem key={msg.id} message={msg} />
      ))}
      {isTyping && <ChatbotTypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
