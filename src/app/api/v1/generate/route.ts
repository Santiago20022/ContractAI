import { generateContract, ContractData } from "@/lib/contract-templates";
import { validateApiKey } from "@/lib/api-auth";

const VALID_TYPES = [
  "services", "nda", "employment", "partnership",
  "rental", "sale", "terms", "privacy",
] as const;

export async function POST(request: Request) {
  const auth = validateApiKey(request);
  if (!auth.valid) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body", code: "invalid_request" },
      { status: 400 }
    );
  }

  const { type, data } = body as { type?: string; data?: Partial<ContractData> };

  if (typeof type !== "string") {
    return Response.json(
      { error: "Field 'type' must be a string", code: "invalid_request" },
      { status: 400 }
    );
  }

  if (!type) {
    return Response.json(
      { error: "Field 'type' is required", code: "invalid_request" },
      { status: 400 }
    );
  }

  if (!VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
    return Response.json(
      {
        error: `Invalid type '${type}'. Valid types: ${VALID_TYPES.join(", ")}`,
        code: "invalid_type",
      },
      { status: 400 }
    );
  }

  const required: (keyof ContractData)[] = ["partyA", "partyB", "description", "amount", "duration"];
  for (const field of required) {
    if (!data?.[field]?.trim()) {
      return Response.json(
        { error: `Field 'data.${field}' is required and cannot be empty`, code: "invalid_request" },
        { status: 400 }
      );
    }
  }

  try {
    const contractData: ContractData = {
      partyA: data!.partyA!,
      partyB: data!.partyB!,
      description: data!.description!,
      amount: data!.amount!,
      duration: data!.duration!,
      additionalClauses: data!.additionalClauses || "",
      city: data!.city || "",
      date: data!.date || "",
    };

    const content = generateContract(type, contractData);

    return Response.json({
      content,
      type,
      generatedAt: new Date().toISOString(),
      wordCount: content.split(/\s+/).filter(Boolean).length,
    });
  } catch {
    return Response.json(
      { error: "Failed to generate contract", code: "internal_error" },
      { status: 500 }
    );
  }
}
