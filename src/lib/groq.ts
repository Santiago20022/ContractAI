import OpenAI from "openai";

const MODELS = [
  "llama-3.3-70b-versatile",
  "llama3-70b-8192",
  "llama-3.1-8b-instant",
  "gemma2-9b-it",
];

type Message = { role: "system" | "user" | "assistant"; content: string };

function getClient() {
  return new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });
}

export async function streamGroqText(
  messages: Message[],
  opts?: { temperature?: number }
): Promise<Response> {
  const client = getClient();
  let lastError: unknown;

  for (const model of MODELS) {
    try {
      const stream = await client.chat.completions.create({
        model,
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
    } catch (err) {
      console.error(`[groq] model ${model} failed:`, err);
      lastError = err;
    }
  }

  throw lastError;
}

export async function callGroqJSON(
  messages: Message[],
  opts?: { temperature?: number }
): Promise<string> {
  const client = getClient();
  let lastError: unknown;

  for (const model of MODELS) {
    try {
      const result = await client.chat.completions.create({
        model,
        messages,
        temperature: opts?.temperature ?? 0.2,
      });
      return result.choices[0]?.message?.content ?? "";
    } catch (err) {
      console.error(`[groq] model ${model} failed:`, err);
      lastError = err;
    }
  }

  throw lastError;
}
