import { CHATBOT_KNOWLEDGE, CHATBOT_DEFAULT_REPLY } from "./constants";

export function getBotReply(query: string): string {
  const normalized = query.toLowerCase().trim();
  for (const item of CHATBOT_KNOWLEDGE) {
    if (item.keywords.some((keyword) => normalized.includes(keyword))) {
      return item.reply;
    }
  }
  return CHATBOT_DEFAULT_REPLY;
}
