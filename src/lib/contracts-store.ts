// Temporary in-memory store for contracts (will be replaced with database later)

export type Contract = {
  id: string;
  title: string;
  type: string;
  content: string;
  createdAt: Date;
  status: "draft" | "completed" | "analyzed";
  riskScore?: number;
  analysis?: AnalysisResult[];
};

export type AnalysisResult = {
  id: number;
  title: string;
  description: string;
  clause: string;
  risk: "high" | "medium" | "low" | "info";
  suggestion: string;
};

// In-memory storage (this will be replaced with a database)
let contracts: Contract[] = [
  {
    id: "demo-1",
    title: "Contrato de Servicios - Demo",
    type: "services",
    content: "Este es un contrato de demostración...",
    createdAt: new Date(Date.now() - 86400000 * 2),
    status: "completed",
  },
  {
    id: "demo-2",
    title: "NDA - Proyecto Confidencial",
    type: "nda",
    content: "Acuerdo de confidencialidad...",
    createdAt: new Date(Date.now() - 86400000 * 5),
    status: "completed",
  },
];

export function getContracts(): Contract[] {
  return contracts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getContract(id: string): Contract | undefined {
  return contracts.find((c) => c.id === id);
}

export function addContract(contract: Omit<Contract, "id" | "createdAt">): Contract {
  const newContract: Contract = {
    ...contract,
    id: `contract-${Date.now()}`,
    createdAt: new Date(),
  };
  contracts.push(newContract);
  return newContract;
}

export function updateContract(id: string, updates: Partial<Contract>): Contract | undefined {
  const index = contracts.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  contracts[index] = { ...contracts[index], ...updates };
  return contracts[index];
}

export function deleteContract(id: string): boolean {
  const index = contracts.findIndex((c) => c.id === id);
  if (index === -1) return false;
  contracts.splice(index, 1);
  return true;
}
