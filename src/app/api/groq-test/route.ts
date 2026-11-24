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

  // Test the first chat model
  let testResult = "not tested";
  const chatModel = availableModels.find((m) => !m.includes("ERROR"));
  if (chatModel) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: chatModel,
          messages: [{ role: "user", content: "Di OK" }],
          max_tokens: 5,
        }),
      });
      const data = await res.json() as { choices?: { message?: { content?: string } }[]; error?: { message: string } };
      if (data.error) testResult = `ERROR: ${data.error.message}`;
      else testResult = `OK con ${chatModel}: "${data.choices?.[0]?.message?.content ?? ""}"`;
    } catch (err) {
      testResult = `ERROR: ${String(err).slice(0, 100)}`;
    }
  }

  return Response.json({ keyPrefix: key.slice(0, 8) + "...", availableModels, testResult });
}
