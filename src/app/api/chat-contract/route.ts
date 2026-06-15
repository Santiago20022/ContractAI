import { streamGroqText } from "@/lib/groq";

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

  try {
    return await streamGroqText([
      {
        role: "system",
        content: `Eres un asesor legal experto en derecho contractual latinoamericano. El usuario tiene preguntas sobre el siguiente contrato.

CONTRATO:
${contractText.slice(0, 20000)}

Responde de forma clara y concisa en 2-4 oraciones. Usa lenguaje accesible. Si la respuesta no puede deducirse del contrato, indícalo. No incluyas saludos ni despedidas, ve directo al punto.`,
      },
      { role: "user", content: question },
    ]);
  } catch (err) {
    console.error("[/api/chat-contract] Groq error:", err);
    return Response.json({ answer: "No se pudo procesar la consulta. Intenta de nuevo." });
  }
}
