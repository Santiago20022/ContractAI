import { verifySigningToken } from "@/lib/signing-tokens";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: Request) {
  const body = await request.json() as {
    token?: string;
    name?: string;
    signatureImage?: string;
  };

  const { token, name, signatureImage } = body;

  if (!token || !name?.trim()) {
    return Response.json({ error: "Token and name are required" }, { status: 400 });
  }

  const payload = await verifySigningToken(token);
  if (!payload) {
    return Response.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const sb = getSupabase();

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

  const withoutThisRole = existing.filter((s) => s.role !== payload.role);
  const newSig = {
    role: payload.role,
    name: name.trim(),
    signedAt: new Date().toISOString(),
    ...(signatureImage ? { signatureImage } : {}),
  };
  const updated = [...withoutThisRole, newSig];

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

  return Response.json({ success: true });
}
