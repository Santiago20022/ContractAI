import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateContract, ContractData } from "@/lib/contract-templates";

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

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ fallback: true });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `${SYSTEM_PROMPT}\n\nGenera un ${CONTRACT_TYPES_ES[type] || type} con estos datos:\nPARTE A: ${data.partyA}\nPARTE B: ${data.partyB}\nObjeto: ${data.description}\nValor: ${data.amount}\nDuración: ${data.duration}\nCiudad: ${data.city || "Bogotá, Colombia"}\nFecha: ${data.date || new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}\n${data.additionalClauses ? "Cláusulas adicionales: " + data.additionalClauses : ""}`;

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
  } catch {
    return Response.json({ fallback: true });
  }
}

