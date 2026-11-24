import OpenAI from "openai";

export async function GET() {
  const key = process.env.GROQ_API_KEY;

  if (!key) {
    return Response.json({ ok: false, error: "GROQ_API_KEY not set in env" });
  }

  const client = new OpenAI({
    apiKey: key,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const models = [
    "llama-3.3-70b-versatile",
    "llama3-70b-8192",
    "llama-3.1-8b-instant",
    "gemma2-9b-it",
  ];

  const results: Record<string, string> = {};

  for (const model of models) {
    try {
      const res = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: "Di OK" }],
        max_tokens: 5,
      });
      const text = res.choices[0]?.message?.content ?? "(vacío)";
      results[model] = `OK — "${text.trim()}"`;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      results[model] = `ERROR: ${msg.slice(0, 150)}`;
    }
  }

  return Response.json({ keyPrefix: key.slice(0, 8) + "...", results });
}
