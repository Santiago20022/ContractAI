import { supabase } from "./supabase-client";

export type Signature = {
  role: "A" | "B" | "C";
  name: string;
  idNumber?: string;
  signedAt: string;
  signatureImage?: string;
};

export type Contract = {
  id: string;
  userId: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
  status: "draft" | "completed" | "analyzed" | "signed";
  riskScore?: number;
  expiresAt?: string;
  signatures?: Signature[];
  partyAName?: string;
  partyAId?: string;
  partyBName?: string;
  partyBId?: string;
};

function fromRow(row: Record<string, unknown>): Contract {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    title: row.title as string,
    type: row.type as string,
    content: row.content as string,
    createdAt: row.created_at as string,
    status: row.status as Contract["status"],
    riskScore: row.risk_score as number | undefined,
    expiresAt: (row.expires_at as string | null) ?? undefined,
    signatures: (row.signatures as Signature[]) ?? [],
    partyAName: (row.party_a_name as string | null) ?? undefined,
    partyAId: (row.party_a_id as string | null) ?? undefined,
    partyBName: (row.party_b_name as string | null) ?? undefined,
    partyBId: (row.party_b_id as string | null) ?? undefined,
  };
}

export async function getUserContracts(userId: string): Promise<Contract[]> {
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(fromRow);
}

export async function getContract(id: string, userId: string): Promise<Contract | undefined> {
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !data) return undefined;
  return fromRow(data);
}

export async function addContract(
  userId: string,
  data: {
    title: string;
    type: string;
    content: string;
    status?: Contract["status"];
    riskScore?: number;
    partyAName?: string;
    partyAId?: string;
    partyBName?: string;
    partyBId?: string;
    expiresAt?: string;
  }
): Promise<Contract> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const { error } = await supabase.from("contracts").insert({
    id,
    user_id: userId,
    title: data.title,
    type: data.type,
    content: data.content,
    status: data.status ?? "completed",
    risk_score: data.riskScore ?? null,
    party_a_name: data.partyAName ?? null,
    party_a_id: data.partyAId ?? null,
    party_b_name: data.partyBName ?? null,
    party_b_id: data.partyBId ?? null,
    expires_at: data.expiresAt ?? null,
    signatures: [],
  });

  if (error) throw new Error("Error al guardar el contrato");

  return {
    id,
    userId,
    title: data.title,
    type: data.type,
    content: data.content,
    createdAt: now,
    status: data.status ?? "completed",
    riskScore: data.riskScore,
    partyAName: data.partyAName,
    partyAId: data.partyAId,
    partyBName: data.partyBName,
    partyBId: data.partyBId,
    expiresAt: data.expiresAt,
    signatures: [],
  };
}

export async function updateContract(
  id: string,
  userId: string,
  updates: Partial<Contract>
): Promise<Contract | undefined> {
  const dbUpdates: Record<string, unknown> = {};
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.type !== undefined) dbUpdates.type = updates.type;
  if (updates.content !== undefined) dbUpdates.content = updates.content;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.riskScore !== undefined) dbUpdates.risk_score = updates.riskScore;
  if (Object.prototype.hasOwnProperty.call(updates, "expiresAt")) {
    dbUpdates.expires_at = updates.expiresAt ?? null;
  }
  if (updates.partyAName !== undefined) dbUpdates.party_a_name = updates.partyAName;
  if (updates.partyAId !== undefined) dbUpdates.party_a_id = updates.partyAId;
  if (updates.partyBName !== undefined) dbUpdates.party_b_name = updates.partyBName;
  if (updates.partyBId !== undefined) dbUpdates.party_b_id = updates.partyBId;
  if (updates.signatures !== undefined) dbUpdates.signatures = updates.signatures;

  const { data, error } = await supabase
    .from("contracts")
    .update(dbUpdates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error || !data) return undefined;
  return fromRow(data);
}

export async function deleteContract(id: string, userId: string): Promise<boolean> {
  const { error } = await supabase
    .from("contracts")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  return !error;
}

export async function signContract(
  id: string,
  userId: string,
  sig: Signature
): Promise<Contract | undefined> {
  const contract = await getContract(id, userId);
  if (!contract) return undefined;

  const existing = contract.signatures ?? [];
  existing.push(sig);
  const hasBoth =
    existing.some((s) => s.role === "A") && existing.some((s) => s.role === "B");

  return updateContract(id, userId, {
    signatures: existing,
    status: hasBoth ? "signed" : contract.status,
  });
}

export async function getUserStats(userId: string) {
  const contracts = await getUserContracts(userId);
  return {
    totalContracts: contracts.length,
    completedContracts: contracts.filter((c) => c.status === "completed").length,
    analyzedContracts: contracts.filter((c) => c.status === "analyzed").length,
    draftContracts: contracts.filter((c) => c.status === "draft").length,
    signedContracts: contracts.filter((c) => c.status === "signed").length,
  };
}
