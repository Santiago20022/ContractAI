export async function GET() {
  const key = process.env.GROQ_API_KEY;

  if (!key) {
    return Response.json({ ok: false, error: "GROQ_API_KEY not set in env" });
  }

  // List all models available for this key
  let availableModels: string[] = [];
  try {
    const res = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = await res.json() as { data?: { id: string }[] };
    availableModels = (data.data ?? []).map((m) => m.id).filter((id) =>
      !id.includes("whisper") && !id.includes("guard") && !id.includes("tts")
    );
  } catch (err) {
    availableModels = [`ERROR listing models: ${String(err).slice(0, 100)}`];
  }

  // Test each text model with a real prompt
  const textModels = availableModels.filter(
    (m) => !m.includes("orpheus") && !m.includes("whisper") && !m.includes("ERROR")
  );
  const testResults: Record<string, string> = {};
  for (const model of textModels) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: "Responde solo con la palabra OK" }],
          max_tokens: 20,
          temperature: 0,
        }),
      });
      const data = await res.json() as { choices?: { message?: { content?: string } }[]; error?: { message: string } };
      if (data.error) testResults[model] = `ERROR: ${data.error.message.slice(0, 100)}`;
      else testResults[model] = `OK: "${(data.choices?.[0]?.message?.content ?? "").trim()}"`;
    } catch (err) {
      testResults[model] = `EXCEPTION: ${String(err).slice(0, 80)}`;
    }
  }

  return Response.json({ keyPrefix: key.slice(0, 8) + "...", availableModels, testResults });
}
