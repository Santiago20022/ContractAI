import { streamGroqText, getGroqClient } from "@/lib/groq";

export async function POST(request: Request) {
  let contractText = "", question = "";
  try {
    const body = await request.json();
    contractText = (body as { contractText?: string }).contractText ?? "";
    question = (body as { question?: string }).question ?? "";
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!contractText.trim() || !question.trim()) {
    return Response.json({ error: "contractText and question are required" }, { status: 400 });
  }

  if (!getGroqClient()) {
    return Response.json({ answer: "Para usar el chat necesitas configurar GROQ_API_KEY en .env.local." });
  }

  try {
    const systemPrompt = `Eres un asesor legal experto en derecho contractual latinoamericano. Respondes preguntas sobre contratos de forma clara y concisa en 2-4 oraciones. Usas lenguaje accesible (no excesivamente técnico). Si la respuesta no puede deducirse del contrato, lo indicas. No incluyes saludos ni despedidas, vas directo al punto.`;

    const userPrompt = `CONTRATO:
${contractText.slice(0, 20000)}

PREGUNTA DEL USUARIO: ${question}`;

    return await streamGroqText([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);
  } catch (err) {
    console.error("[/api/chat-contract] Groq error:", err);
    return Response.json({ answer: "No se pudo procesar la consulta. Intenta de nuevo." });
  }
}
