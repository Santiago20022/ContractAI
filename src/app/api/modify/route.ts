import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  let contractText = "";
  let instruction = "";

  try {
    const body = await request.json();
    contractText = (body as { contractText?: string }).contractText ?? "";
    instruction = (body as { instruction?: string }).instruction ?? "";
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!contractText.trim() || !instruction.trim()) {
    return Response.json({ error: "contractText and instruction are required" }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ fallback: true });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `Eres un experto en derecho contractual latinoamericano. Se te proporciona un contrato existente y una instrucción de modificación.

INSTRUCCIÓN DEL USUARIO: ${instruction}

CONTRATO ACTUAL:
${contractText}

Devuelve el contrato COMPLETO con la modificación aplicada. Mantén el mismo formato, estructura y estilo del contrato original. Solo aplica el cambio solicitado sin alterar el resto. Empieza directamente con el texto del contrato, sin explicaciones previas.`;

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
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[/api/modify] Gemini error:", err);
    return Response.json({ fallback: true });
  }
}
