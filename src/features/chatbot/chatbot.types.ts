export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export interface QuickPrompt {
  id: string;
  label: string;
  query: string;
}

export interface KnowledgeItem {
  keywords: string[];
  reply: string;
}
