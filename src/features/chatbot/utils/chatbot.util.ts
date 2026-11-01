import { ChatMessage } from "../chatbot.types";

export function formatMessageTime(date: Date = new Date()): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateMessageId(prefix: "user" | "bot" = "bot"): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function buildUserMessage(text: string): ChatMessage {
  return {
    id: generateMessageId("user"),
    sender: "user",
    text: text.trim(),
    timestamp: formatMessageTime(),
  };
}

export function buildBotMessage(text: string, isError = false): ChatMessage {
  return {
    id: generateMessageId("bot"),
    sender: "bot",
    text: text.trim(),
    timestamp: formatMessageTime(),
    isError,
  };
}

export function sanitizeInput(input: string): string {
  return (input || "").trim().slice(0, 1000);
}
