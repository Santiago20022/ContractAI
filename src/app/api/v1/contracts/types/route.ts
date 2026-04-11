import { validateApiKey } from "@/lib/api-auth";

const CONTRACT_TYPES = [
  {
    id: "services",
    label: "Prestación de Servicios",
    description: "Contrato entre prestador y cliente para servicios profesionales",
  },
  {
    id: "nda",
    label: "Acuerdo de Confidencialidad",
    description: "NDA unilateral o bilateral para proteger información sensible",
  },
  {
    id: "employment",
    label: "Contrato de Trabajo",
    description: "Relación laboral entre empresa y trabajador",
  },
  {
    id: "partnership",
    label: "Contrato de Socios",
    description: "Acuerdo entre socios para un proyecto o empresa común",
  },
  {
    id: "rental",
    label: "Contrato de Arrendamiento",
    description: "Alquiler de inmueble entre arrendador y arrendatario",
  },
  {
    id: "sale",
    label: "Contrato de Compraventa",
    description: "Transferencia de bien entre vendedor y comprador",
  },
  {
    id: "terms",
    label: "Términos y Condiciones",
    description: "Términos legales de uso de un sitio web o aplicación",
  },
  {
    id: "privacy",
    label: "Política de Privacidad",
    description: "Documento RGPD sobre tratamiento de datos personales",
  },
] as const;

export async function GET(request: Request) {
  const auth = validateApiKey(request);
  if (!auth.valid) return auth.response;

  return Response.json({
    types: CONTRACT_TYPES,
    total: CONTRACT_TYPES.length,
  });
}
