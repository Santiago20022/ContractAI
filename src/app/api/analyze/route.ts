import { GoogleGenerativeAI } from "@google/generative-ai";
import { analyzeContract } from "@/lib/contract-templates";

export async function POST(request: Request) {
  let content = "";

  try {
    const body = await request.json();
    content = (body as { content?: string }).content ?? "";
  } catch {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!content.trim()) {
    return Response.json(
      { error: "Field 'content' is required and cannot be empty" },
      { status: 400 }
    );
  }

  if (content.length > 50000) {
    return Response.json(
      { error: "Contract text exceeds maximum length of 50,000 characters" },
      { status: 400 }
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    const { results, score } = analyzeContract(content);
    return Response.json({ results, score });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analiza el siguiente contrato legal y devuelve ÚNICAMENTE un objeto JSON válido (sin markdown, sin explicaciones, solo el JSON) con esta estructura exacta:
{
  "riskScore": número entre 0 y 100 (100 = totalmente seguro, 0 = muy peligroso),
  "summary": "resumen ejecutivo en 1-2 oraciones sobre los principales riesgos",
  "risks": [
    {
      "id": número,
      "level": "high" | "medium" | "low" | "info",
      "title": "título corto del problema (máx 60 chars)",
      "description": "explicación clara del por qué esto es problemático (2-3 oraciones)",
      "clause": "cita textual de la parte problemática del contrato (máx 200 chars)",
      "suggestion": "qué negociar o cómo mejorar esta cláusula (2-3 oraciones)"
    }
  ]
}

Detecta TODAS las cláusulas problemáticas incluyendo:
- Penalizaciones excesivas o desproporcionadas
- Cláusulas que favorecen unilateralmente a una parte
- Términos ambiguos que pueden malinterpretarse
- Plazos de pago muy largos (>30 días)
- Cláusulas de no competencia abusivas
- Cesión de derechos excesiva o mal compensada
- Ausencia de límites de responsabilidad
- Renovación automática con poca ventana de cancelación
- Jurisdicción desfavorable
- Cualquier cláusula que perjudique significativamente al firmante

Si no hay problemas, devuelve risks: [] y riskScore: 90-100.

CONTRATO A ANALIZAR:
${content}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Strip possible markdown code fences before parsing
    const cleaned = responseText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      return Response.json(parsed);
    } catch {
      // JSON parse failed — fall back to local analysis
      const { results, score } = analyzeContract(content);
      return Response.json({ results, score });
    }
  } catch {
    // Gemini call failed — fall back to local analysis
    const { results, score } = analyzeContract(content);
    return Response.json({ results, score });
  }
}
