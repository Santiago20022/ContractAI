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

export async function POST(request: Request) {
  const body = await request.json() as {
    token?: string;
    name?: string;
    idNumber?: string;
    signatureImage?: string;
  };

  const { token, name, idNumber, signatureImage } = body;

  if (!token || !name?.trim()) {
    return Response.json({ error: "Token and name are required" }, { status: 400 });
  }

  if (!signatureImage) {
    return Response.json({ error: "Signature image is required" }, { status: 400 });
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

  // Fetch the contract
  const { data: contract, error: fetchError } = await sb
    .from("contracts")
    .select("id, signatures, status")
    .eq("id", payload.contractId)
    .eq("user_id", payload.ownerUserId)
    .single();

  if (fetchError || !contract) {
    return Response.json({ error: "Contract not found" }, { status: 404 });
  }

  const existing: Array<{ role: string; name: string; signedAt: string; signatureImage?: string }> =
    contract.signatures ?? [];

  // Check if this role already signed
  const alreadySigned = existing.some((s) => s.role === payload.role);
  if (alreadySigned) {
    return Response.json({ error: "Role already signed" }, { status: 409 });
  }

  const newSig = {
    role: payload.role,
    name: name.trim(),
    ...(idNumber?.trim() ? { idNumber: idNumber.trim() } : {}),
    signedAt: new Date().toISOString(),
    signatureImage,
  };
  const updated = [...existing, newSig];

  const hasBoth = updated.some((s) => s.role === "A") && updated.some((s) => s.role === "B");

  const { error: updateError } = await sb
    .from("contracts")
    .update({
      signatures: updated,
      status: hasBoth ? "signed" : contract.status,
    })
    .eq("id", payload.contractId)
    .eq("user_id", payload.ownerUserId);

  if (updateError) {
    return Response.json({ error: "Failed to save signature" }, { status: 500 });
  }

  // Mark token as used
  await sb.from("signing_tokens_used").insert({ token_hash: tokenHash });

  return Response.json({ success: true });
}
