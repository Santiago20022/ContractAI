import { createSigningToken } from "@/lib/signing-tokens";
import { getServerSupabase } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const body = await request.json() as { contractId?: string; role?: string; userId?: string };
  const { contractId, role, userId } = body;

  if (!contractId || !role || !userId || (role !== "B" && role !== "C")) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Verify contract belongs to user
  const sb = getServerSupabase();
  const { data, error } = await sb
    .from("contracts")
    .select("id, title, party_a_name, party_b_name, content, type")
    .eq("id", contractId)
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return Response.json({ error: "Contract not found" }, { status: 404 });
  }

  const token = await createSigningToken(contractId, role as "B" | "C", userId);
  return Response.json({ token });
}
