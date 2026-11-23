import { verifySigningToken } from "@/lib/signing-tokens";
import { getServerSupabase } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("t");

  if (!token) {
    return Response.json({ error: "Missing token" }, { status: 400 });
  }

  const payload = await verifySigningToken(token);
  if (!payload) {
    return Response.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const sb = getServerSupabase();
  const { data, error } = await sb
    .from("contracts")
    .select("id, title, type, content, party_a_name, party_b_name, signatures")
    .eq("id", payload.contractId)
    .eq("user_id", payload.ownerUserId)
    .single();

  if (error || !data) {
    return Response.json({ error: "Contract not found" }, { status: 404 });
  }

  return Response.json({
    contract: {
      id: data.id,
      title: data.title,
      type: data.type,
      content: data.content,
      partyAName: data.party_a_name,
      partyBName: data.party_b_name,
    },
    role: payload.role,
  });
}
