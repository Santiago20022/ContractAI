import type { ContractData } from "@/lib/contract-templates";
import { streamGroqText } from "@/lib/groq";

const CONTRACT_TYPES_ES: Record<string, string> = {
  services: "Contrato de Prestación de Servicios",
  nda: "Acuerdo de Confidencialidad (NDA)",
  employment: "Contrato de Trabajo",
  partnership: "Contrato de Sociedad o Asociación",
  rental: "Contrato de Arrendamiento",
  sale: "Contrato de Compraventa",
  terms: "Términos y Condiciones de Servicio",
  privacy: "Política de Privacidad",
};

const SYSTEM_PROMPT = `Eres un experto en derecho contractual latinoamericano con más de 20 años de experiencia redactando contratos para empresas, freelancers y emprendedores de Colombia, México, Argentina, Chile, Perú y el resto de LATAM.

Tu tarea es generar contratos legales completos, equilibrados y profesionales en español jurídico claro. Los contratos que generas:
- Están escritos en español formal y preciso, sin ambigüedades
- Incluyen TODAS las cláusulas necesarias para el tipo de contrato (mínimo 10 cláusulas)
- Protegen los intereses de AMBAS partes de forma equilibrada
- Usan numeración clara: CLÁUSULA PRIMERA, CLÁUSULA SEGUNDA, etc.
- Incluyen sección de firmas al final con espacios para nombre, firma, cédula/DNI y fecha
- Se adaptan al contexto específico del usuario (NO son plantillas genéricas con huecos)
- Tienen mínimo 900 palabras de contenido sustancial

IMPORTANTE: Genera ÚNICAMENTE el texto del contrato. Empieza directamente con el encabezado del contrato. No incluyas explicaciones ni texto fuera del contrato.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body as { type: string; data: ContractData };

    const userPrompt = `Genera un ${CONTRACT_TYPES_ES[type] || type} con estos datos:
PARTE A: ${data.partyA}
PARTE B: ${data.partyB}
Objeto: ${data.description}
Valor: ${data.amount}
Duración: ${data.duration}
Ciudad: ${data.city || "Bogotá, Colombia"}
Fecha: ${data.date || new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
${data.additionalClauses ? "Cláusulas adicionales: " + data.additionalClauses : ""}`;

    return await streamGroqText([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ]);
  } catch (err) {
    console.error("[/api/generate] Groq error:", err);
    return Response.json({ fallback: true });
  }
}
