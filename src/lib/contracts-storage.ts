// Contract storage using LocalStorage (no API key needed)

export type Signature = {
  role: "A" | "B";
  name: string;
  signedAt: string;
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
  expiresAt?: string;        // ISO date string for contract expiry
  signatures?: Signature[];  // who has signed
  partyAName?: string;       // stored separately for PDF generation
  partyBName?: string;
};

const CONTRACTS_KEY = "contractai_contracts";

function getAllContracts(): Contract[] {
  if (typeof window === "undefined") return [];
  const contracts = localStorage.getItem(CONTRACTS_KEY);
  return contracts ? JSON.parse(contracts) : [];
}

function saveContracts(contracts: Contract[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
}

// Get contracts for a specific user
export function getUserContracts(userId: string): Contract[] {
  const contracts = getAllContracts();
  return contracts
    .filter((c) => c.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Get a single contract — ALWAYS verifies ownership to prevent IDOR
export function getContract(id: string, userId: string): Contract | undefined {
  const contracts = getAllContracts();
  return contracts.find((c) => c.id === id && c.userId === userId);
}

// Add a new contract
export function addContract(
  userId: string,
  data: {
    title: string;
    type: string;
    content: string;
    status?: Contract["status"];
    riskScore?: number;
    partyAName?: string;
    partyBName?: string;
    expiresAt?: string;
  }
): Contract {
  const contracts = getAllContracts();

  const newContract: Contract = {
    id: crypto.randomUUID(),
    userId,
    title: data.title,
    type: data.type,
    content: data.content,
    status: data.status || "completed",
    riskScore: data.riskScore,
    createdAt: new Date().toISOString(),
    partyAName: data.partyAName,
    partyBName: data.partyBName,
    expiresAt: data.expiresAt,
  };

  contracts.push(newContract);
  saveContracts(contracts);

  return newContract;
}

// Update a contract — verifies ownership
export function updateContract(id: string, userId: string, updates: Partial<Contract>): Contract | undefined {
  const contracts = getAllContracts();
  const index = contracts.findIndex((c) => c.id === id && c.userId === userId);

  if (index === -1) return undefined;

  contracts[index] = { ...contracts[index], ...updates };
  saveContracts(contracts);

  return contracts[index];
}

// Delete a contract — verifies ownership
export function deleteContract(id: string, userId: string): boolean {
  const contracts = getAllContracts();
  const index = contracts.findIndex((c) => c.id === id && c.userId === userId);

  if (index === -1) return false;

  contracts.splice(index, 1);
  saveContracts(contracts);

  return true;
}

// Sign a contract — finds by id+userId, appends signature, marks "signed" when both parties have signed
export function signContract(id: string, userId: string, sig: Signature): Contract | undefined {
  const contracts = getAllContracts();
  const index = contracts.findIndex((c) => c.id === id && c.userId === userId);

  if (index === -1) return undefined;

  const contract = contracts[index];
  const existing = contract.signatures ?? [];
  existing.push(sig);
  const hasBoth = existing.some((s) => s.role === "A") && existing.some((s) => s.role === "B");

  contracts[index] = {
    ...contract,
    signatures: existing,
    status: hasBoth ? "signed" : contract.status,
  };

  saveContracts(contracts);
  return contracts[index];
}

// Get stats for a user
export function getUserStats(userId: string) {
  const contracts = getUserContracts(userId);

  return {
    totalContracts: contracts.length,
    completedContracts: contracts.filter((c) => c.status === "completed").length,
    analyzedContracts: contracts.filter((c) => c.status === "analyzed").length,
    draftContracts: contracts.filter((c) => c.status === "draft").length,
    signedContracts: contracts.filter((c) => c.status === "signed").length,
  };
}
