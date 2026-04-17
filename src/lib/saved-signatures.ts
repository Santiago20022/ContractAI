export type SavedSignature = {
  id: string;
  label: string;
  imageData: string;
  createdAt: string;
};

const KEY = "contractai_saved_signatures";

export function getSavedSignatures(): SavedSignature[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveSignature(label: string, imageData: string): SavedSignature {
  const sigs = getSavedSignatures();
  const newSig: SavedSignature = {
    id: crypto.randomUUID(),
    label,
    imageData,
    createdAt: new Date().toISOString(),
  };
  sigs.push(newSig);
  localStorage.setItem(KEY, JSON.stringify(sigs));
  return newSig;
}

export function deleteSignature(id: string): void {
  const sigs = getSavedSignatures().filter((s) => s.id !== id);
  localStorage.setItem(KEY, JSON.stringify(sigs));
}
