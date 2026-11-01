import { ChatMessage, QuickPrompt } from "../chatbot.types";

export const CHATBOT_INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hi there! I'm John David Gaspar. Ask me anything about my projects, technical skills, or availability! ☺",
    timestamp: "Just now",
  },
];

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: "about",
    label: "About Me",
    query: "Tell me about yourself",
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
