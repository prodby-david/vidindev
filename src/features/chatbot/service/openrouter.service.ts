import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { getPortfolioContext } from "../context/chatbot.context";
import { buildChatbotSystemPrompt } from "../prompts/system.prompt";

export type ChatbotStreamMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function createChatbotStream(messages: ChatbotStreamMessage[]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured on the server.");
  }

  const openrouter = createOpenRouter({
    apiKey,
    headers: {
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "John David Gaspar Portfolio",
    },
  });

  const portfolioContext = await getPortfolioContext();
  const systemPrompt = buildChatbotSystemPrompt(portfolioContext);

  return streamText({
    model: openrouter(
      process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-lite-001"
    ),
    system: systemPrompt,
    messages,
  });
}
