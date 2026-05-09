import { streamGroqText } from "@/lib/groq";

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

  try {
    const systemPrompt = `Eres un experto en derecho contractual latinoamericano. Recibes un contrato existente y una instrucción de modificación. Devuelves el contrato COMPLETO con la modificación aplicada. Mantienes el mismo formato, estructura y estilo del contrato original. Solo aplicas el cambio solicitado sin alterar el resto. Empiezas directamente con el texto del contrato, sin explicaciones previas.`;

    const userPrompt = `INSTRUCCIÓN DEL USUARIO: ${instruction}

CONTRATO ACTUAL:
${contractText}`;

    return await streamGroqText([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);
  } catch (err) {
    console.error("[/api/modify] Groq error:", err);
    return Response.json({ fallback: true });
  }
}
