import { GoogleGenerativeAI } from "@google/generative-ai";

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

  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ answer: "Para usar el chat necesitas configurar una API key de Gemini." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `Eres un asesor legal experto en derecho contractual latinoamericano. El usuario tiene preguntas sobre el siguiente contrato.

CONTRATO:
${contractText.slice(0, 20000)}

PREGUNTA DEL USUARIO: ${question}

Responde de forma clara y concisa en 2-4 oraciones. Usa lenguaje accesible (no excesivamente técnico). Si la respuesta no puede deducirse del contrato, indícalo. No incluyas saludos ni despedidas, ve directo al punto.`;

    const result = await model.generateContentStream(prompt);

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Accel-Buffering": "no" },
    });
  } catch (err) {
    console.error("[/api/chat-contract] Gemini error:", err);
    return Response.json({ answer: "No se pudo procesar la consulta. Intenta de nuevo." });
  }
}
