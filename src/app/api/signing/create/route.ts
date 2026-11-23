import { createSigningToken } from "@/lib/signing-tokens";

export async function POST(request: Request) {
  const body = await request.json() as { contractId?: string; role?: string; userId?: string };
  const { contractId, role, userId } = body;

  if (!contractId || !role || !userId || (role !== "B" && role !== "C")) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const token = await createSigningToken(contractId, role as "B" | "C", userId);
  return Response.json({ token });
}
