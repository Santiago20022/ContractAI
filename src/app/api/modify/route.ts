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
    const systemPrompt = `Eres un editor experto de contratos legales latinoamericanos. Tu única tarea es aplicar la instrucción del usuario sobre el contrato dado y devolver el contrato COMPLETO actualizado.

REGLAS ESTRICTAS:
1. Devuelves SIEMPRE el contrato completo, no fragmentos.
2. Mantienes el formato, estilo, numeración y redacción de las cláusulas que NO se mencionan en la instrucción.
3. Si la instrucción es vaga o usa palabras sueltas (ej: "hola", "ok"), NO inventes cláusulas: devuelves el contrato sin cambios.
4. Si añades una cláusula nueva, redáctala con el mismo nivel de formalidad jurídica del resto del contrato (mínimo 2-3 oraciones, no menos).
5. Numeras correctamente las cláusulas en orden (PRIMERA, SEGUNDA, TERCERA, etc.).
6. NO incluyes explicaciones, comentarios, ni texto fuera del contrato. NO uses markdown. NO uses bloques de código.
7. Empiezas directamente con el encabezado del contrato.`;

    const userPrompt = `INSTRUCCIÓN DEL USUARIO: ${instruction}

CONTRATO ACTUAL:
${contractText}`;

    return await streamGroqText(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.2 },
    );
  } catch (err) {
    console.error("[/api/modify] Groq error:", err);
    return Response.json({ fallback: true });
  }
}
