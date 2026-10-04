import { ChatMessage, QuickPrompt } from "../chatbot.types";

export const CHATBOT_INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hi there! I'm David's AI assistant. Ask me anything about his projects, technical skills, or availability! ☺",
    timestamp: "Just now",
  },
];

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: "about",
    label: "About David",
    query: "Tell me about John David",
  },
  {
    id: "stack",
    label: "Tech Stack",
    query: "What tech stack do you use?",
  },
  {
    id: "projects",
    label: "Featured Projects",
    query: "What projects have you built?",
  },
  {
    id: "hire",
    label: "Open to work?",
    query: "Are you open to new opportunities?",
  },
  {
    id: "contact",
    label: "Get in touch",
    query: "How can I contact you?",
  },
];
