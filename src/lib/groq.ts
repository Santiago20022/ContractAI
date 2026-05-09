import OpenAI from "openai";

export const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
export const GROQ_MODEL = "llama-3.3-70b-versatile";

export function getGroqClient(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: GROQ_BASE_URL,
  });
}

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function streamGroqText(
  messages: ChatMessage[],
  options: { temperature?: number } = {},
): Promise<Response> {
  const groq = getGroqClient();
  if (!groq) {
    return Response.json({ fallback: true });
  }

  const stream = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages,
    stream: true,
    temperature: options.temperature ?? 0.7,
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function completeGroqJSON<T = unknown>(
  messages: ChatMessage[],
): Promise<T | null> {
  const groq = getGroqClient();
  if (!groq) return null;

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages,
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content?.trim() ?? "";
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
