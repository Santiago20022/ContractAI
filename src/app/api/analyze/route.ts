import OpenAI from "openai";
import { analyzeContract } from "@/lib/contract-templates";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  let content = "";

  try {
    const body = await request.json();
    content = (body as { content?: string }).content ?? "";
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!content.trim()) {
    return Response.json({ error: "Field 'content' is required and cannot be empty" }, { status: 400 });
  }

  if (content.length > 50000) {
    return Response.json({ error: "Contract text exceeds maximum length of 50,000 characters" }, { status: 400 });
  }

  const prompt = `Analiza el siguiente contrato legal y devuelve ÚNICAMENTE un objeto JSON válido (sin markdown, sin explicaciones, solo el JSON) con esta estructura exacta:
{
  "riskScore": número entre 0 y 100 (100 = totalmente seguro, 0 = muy peligroso),
  "summary": "resumen ejecutivo de riesgos en 1-2 oraciones",
  "contractSummary": {
    "contractType": "tipo de contrato",
    "object": "descripción del objeto principal en 1-2 oraciones",
    "partyA": {
      "name": "nombre completo de la parte A",
      "role": "rol de la parte A",
      "mainDuties": ["obligación 1", "obligación 2", "obligación 3"]
    },
    "partyB": {
      "name": "nombre completo de la parte B",
      "role": "rol de la parte B",
      "mainDuties": ["obligación 1", "obligación 2", "obligación 3"]
    },
    "duration": "duración del contrato o null",
    "amount": "valor económico o null",
    "keyTerms": ["término clave 1", "término clave 2", "término clave 3"]
  },
  "risks": [
    {
      "id": número,
      "level": "high" | "medium" | "low" | "info",
      "title": "título corto (máx 60 chars)",
      "description": "explicación del problema (2-3 oraciones)",
      "clause": "cita textual problemática (máx 200 chars)",
      "suggestion": "cómo mejorar esta cláusula (2-3 oraciones)"
    }
  ]
}

Detecta cláusulas problemáticas: penalizaciones excesivas, términos ambiguos, plazos largos, no competencia abusiva, cesión excesiva de derechos, falta de límites de responsabilidad, renovación automática sin ventana de cancelación, jurisdicción desfavorable. Si no hay problemas, devuelve risks: [] y riskScore: 90-100.

CONTRATO:
${content}`;

  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const responseText = result.choices[0]?.message?.content ?? "";
    const cleaned = responseText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    try {
      return Response.json(JSON.parse(cleaned));
    } catch {
      const { results, score } = analyzeContract(content);
      return Response.json({ results, score });
    }
  } catch (err) {
    console.error("[/api/analyze] Groq error:", err);
    const { results, score } = analyzeContract(content);
    return Response.json({ results, score });
  }
}
