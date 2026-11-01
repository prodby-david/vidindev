import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createChatbotStream } from "@/features/chatbot/service/openrouter.service";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().trim().min(1).max(2000),
      })
    )
    .min(1)
    .max(30),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const { messages } = chatRequestSchema.parse(body);

    const streamResult = await createChatbotStream(messages);
    return streamResult.toTextStreamResponse();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    console.error("[Chatbot API Route Error]:", error);
    return NextResponse.json(
      { error: "Unable to start response stream. Please try again later." },
      { status: 500 }
    );
  }
}
