import { supabase } from "./supabase-client";

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

const CURRENT_USER_KEY = "contractai_current_user";

function generateSalt(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hashPassword(password: string, salt: string): string {
  const input = salt + password;
  let hash = 5381;
  for (let round = 0; round < 10; round++) {
    for (let i = 0; i < input.length; i++) {
      hash = ((hash << 5) + hash) ^ input.charCodeAt(i);
      hash = hash & hash;
    }
  }
  return Math.abs(hash).toString(16) + salt.slice(0, 8);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function register(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  if (!email || !password || !name) {
    return { success: false, error: "Todos los campos son requeridos" };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: "El formato del email no es válido" };
  }
  if (password.length < 6) {
    return { success: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }

  const salt = generateSalt();
  const passwordHash = hashPassword(password, salt);
  const id = crypto.randomUUID();

  const { error } = await supabase.from("users").insert({
    id,
    email: email.toLowerCase(),
    name,
    password_hash: passwordHash,
    salt,
  });

  if (error) {
    if (error.code === "23505") return { success: false, error: "Este email ya está registrado" };
    return { success: false, error: "Error al crear la cuenta" };
  }

  const user: User = { id, email: email.toLowerCase(), name, createdAt: new Date().toISOString() };
  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
  return { success: true, user };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, name, password_hash, salt, created_at")
    .eq("email", email.toLowerCase())
    .single();

  // Always hash to prevent timing-based user enumeration
  const salt = data?.salt ?? generateSalt();
  const computed = hashPassword(password, salt);

  if (error || !data || computed !== data.password_hash) {
    return { success: false, error: "Email o contraseña incorrectos" };
  }

  const user: User = {
    id: data.id,
    email: data.email,
    name: data.name,
    createdAt: data.created_at,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
  return { success: true, user };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as User;
    if (!parsed?.id || !parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

export async function updatePassword(
  email: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }
  const salt = generateSalt();
  const passwordHash = hashPassword(newPassword, salt);
  const { error } = await supabase
    .from("users")
    .update({ password_hash: passwordHash, salt })
    .eq("email", email.toLowerCase());

  if (error) return { success: false, error: "Error al actualizar la contraseña" };
  return { success: true };
}

export async function updateUserName(userId: string, newName: string): Promise<boolean> {
  const { error } = await supabase
    .from("users")
    .update({ name: newName.trim() })
    .eq("id", userId);

  if (error) return false;

  if (typeof window !== "undefined") {
    const current = getCurrentUser();
    if (current?.id === userId) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ ...current, name: newName.trim() }));
    }
  }
  return true;
}
