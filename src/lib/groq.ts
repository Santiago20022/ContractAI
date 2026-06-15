import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const MODEL = "llama-3.3-70b-versatile";

type Message = { role: "system" | "user" | "assistant"; content: string };

export async function streamGroqText(
  messages: Message[],
  opts?: { temperature?: number }
): Promise<Response> {
  const stream = await groq.chat.completions.create({
    model: MODEL,
    messages,
    stream: true,
    temperature: opts?.temperature ?? 0.7,
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
