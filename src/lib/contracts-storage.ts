// Contract storage using LocalStorage (no API key needed)

export type Contract = {
  id: string;
  userId: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
  status: "draft" | "completed" | "analyzed";
  riskScore?: number;
};

const CONTRACTS_KEY = "contractai_contracts";

// Get all contracts from localStorage
function getAllContracts(): Contract[] {
  if (typeof window === "undefined") return [];
  const contracts = localStorage.getItem(CONTRACTS_KEY);
  return contracts ? JSON.parse(contracts) : [];
}

// Save contracts to localStorage
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

// Get a single contract
export function getContract(id: string): Contract | undefined {
  const contracts = getAllContracts();
  return contracts.find((c) => c.id === id);
}

// Add a new contract
export function addContract(
  userId: string,
  data: { title: string; type: string; content: string; status?: Contract["status"]; riskScore?: number }
): Contract {
  const contracts = getAllContracts();

  const newContract: Contract = {
    id: `contract_${Date.now()}`,
    userId,
    title: data.title,
    type: data.type,
    content: data.content,
    status: data.status || "completed",
    riskScore: data.riskScore,
    createdAt: new Date().toISOString(),
  };

  contracts.push(newContract);
  saveContracts(contracts);

  return newContract;
}

// Update a contract
export function updateContract(id: string, updates: Partial<Contract>): Contract | undefined {
  const contracts = getAllContracts();
  const index = contracts.findIndex((c) => c.id === id);

  if (index === -1) return undefined;

  contracts[index] = { ...contracts[index], ...updates };
  saveContracts(contracts);

  return contracts[index];
}

// Delete a contract
export function deleteContract(id: string): boolean {
  const contracts = getAllContracts();
  const index = contracts.findIndex((c) => c.id === id);

  if (index === -1) return false;

  contracts.splice(index, 1);
  saveContracts(contracts);

  return true;
}

// Get stats for a user
export function getUserStats(userId: string) {
  const contracts = getUserContracts(userId);

  return {
    totalContracts: contracts.length,
    completedContracts: contracts.filter((c) => c.status === "completed").length,
    analyzedContracts: contracts.filter((c) => c.status === "analyzed").length,
    draftContracts: contracts.filter((c) => c.status === "draft").length,
  };
}
