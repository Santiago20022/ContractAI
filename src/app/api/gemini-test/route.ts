import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return Response.json({ ok: false, error: "GEMINI_API_KEY not set" });
  }

  const modelsToTry = [
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
  ];

  const results: Record<string, string> = {};

  for (const modelId of modelsToTry) {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: modelId });
      const result = await model.generateContent("Di 'OK' en una palabra.");
      const text = result.response.text();
      results[modelId] = `✓ OK — "${text.trim().slice(0, 50)}"`;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      results[modelId] = `✗ ${msg.slice(0, 120)}`;
    }
  }

  return Response.json({ keyPrefix: key.slice(0, 8) + "...", results });
}
