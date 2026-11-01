export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isError?: boolean;
}

export interface QuickPrompt {
  id: string;
  label: string;
  query: string;
}
