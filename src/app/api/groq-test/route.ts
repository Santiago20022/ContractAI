import { getGroqClient, GROQ_MODEL } from "@/lib/groq";

export async function GET() {
  const groq = getGroqClient();

  if (!groq) {
    return Response.json({ ok: false, error: "GROQ_API_KEY not set" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: "Di 'OK' en una palabra." }],
      max_tokens: 16,
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    return Response.json({
      ok: true,
      model: GROQ_MODEL,
      keyPrefix: process.env.GROQ_API_KEY!.slice(0, 8) + "...",
      response: text.slice(0, 100),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ ok: false, model: GROQ_MODEL, error: msg.slice(0, 240) });
  }
}
