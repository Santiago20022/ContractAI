import { verifySigningToken } from "@/lib/signing-tokens";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function hashToken(token: string): Promise<string> {
  const bytes = new TextEncoder().encode(token);
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

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

  const sb = getSupabase();
  const tokenHash = await hashToken(token);

  // Check if token was already used
  const { data: usedToken } = await sb
    .from("signing_tokens_used")
    .select("token_hash")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (usedToken) {
    return Response.json({ error: "Token already used" }, { status: 409 });
  }

  const { data, error } = await sb
    .from("contracts")
    .select("id, title, type, content, party_a_name, party_b_name")
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
