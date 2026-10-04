import { KnowledgeItem } from "../chatbot.types";

export const CHATBOT_KNOWLEDGE: KnowledgeItem[] = [
  {
    keywords: ["about", "who", "background", "bio", "david", "john"],
    reply:
      "John David Gaspar is a passionate Full-Stack Developer & Software Engineer based in the Philippines. He crafts performant web applications with clean architecture and delightful UI interactions.",
  },
  {
    keywords: ["stack", "tech", "technology", "technologies", "framework", "languages", "skills", "tools"],
    reply:
      "David's core stack includes React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, MongoDB, Prisma, Redis, AWS, and Git. He also accelerates workflows using AI tools like GitHub Copilot and Cursor.",
  },
  {
    keywords: ["project", "projects", "portfolio", "built", "work", "app"],
    reply:
      "David has built scalable full-stack web applications, responsive platforms, and API microservices. Check out the Projects page on this portfolio for detailed case studies and live demos!",
  },
  {
    keywords: ["capability", "capabilities", "services", "offer", "specialty"],
    reply:
      "David's core capabilities focus on Web Development (React & Next.js), Mobile Development (React Native & cross-platform apps), and Backend & API Systems (Node.js & PostgreSQL).",
  },
  {
    keywords: ["hire", "job", "open", "available", "opportunity", "freelance", "role", "work together"],
    reply:
      "Yes! David is actively open to new full-time software engineering roles, contract projects, and remote opportunities. He loves collaborating with teams that value high product craftsmanship.",
  },
  {
    keywords: ["contact", "email", "reach", "message", "touch", "call", "connect"],
    reply:
      "You can reach David directly at gasparjohndavid@gmail.com, connect with him on LinkedIn & GitHub, or send a note via the Contact page form.",
  },
  {
    keywords: ["education", "degree", "certification", "certificate", "study", "university", "college"],
    reply:
      "David holds a Bachelor of Science in Information Technology and has earned verified credentials in full-stack development. You can flip his credential cards on the About page to view them!",
  },
  {
    keywords: ["exploring", "learning", "llm", "system design"],
    reply:
      "David is currently exploring LLMs (Large Language Models) and Large-Scale System Design to expand his engineering breadth alongside his full-stack core.",
  },
];

export const CHATBOT_DEFAULT_REPLY =
  "I don't have that specific information on hand, but David would be happy to tell you more! Send him an email at gasparjohndavid@gmail.com or leave a note via the Contact page.";
