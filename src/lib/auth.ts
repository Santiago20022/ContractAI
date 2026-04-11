// Simple auth system using LocalStorage (no API key needed)
// NOTE: For production, migrate to Supabase Auth with bcrypt hashing.

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

type StoredUser = User & {
  passwordHash: string;
  salt: string;
};

const USERS_KEY = "contractai_users";
const CURRENT_USER_KEY = "contractai_current_user";

// Generate a random hex salt using the Web Crypto API
function generateSalt(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Deterministic hash of (salt + password).
// Uses multiple rounds of djb2 to make brute-force slightly harder.
// Per-user salt prevents precomputed rainbow-table attacks.
// NOTE: for production, replace with bcrypt or PBKDF2 via crypto.subtle.
function hashPassword(password: string, salt: string): string {
  const input = salt + password;
  let hash = 5381;
  for (let round = 0; round < 10; round++) {
    for (let i = 0; i < input.length; i++) {
      hash = ((hash << 5) + hash) ^ input.charCodeAt(i);
      hash = hash & hash; // force 32-bit int
    }
  }
  return Math.abs(hash).toString(16) + salt.slice(0, 8);
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(
  email: string,
  password: string,
  name: string
): { success: boolean; error?: string; user?: User } {
  if (!email || !password || !name) {
    return { success: false, error: "Todos los campos son requeridos" };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "El formato del email no es válido" };
  }

  if (password.length < 6) {
    return { success: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }

  const users = getUsers();

  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "Este email ya está registrado" };
  }

  const salt = generateSalt();
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    name,
    salt,
    passwordHash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  const { passwordHash: _, salt: _s, ...userWithoutSecrets } = newUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutSecrets));

  return { success: true, user: userWithoutSecrets };
}

export function login(
  email: string,
  password: string
): { success: boolean; error?: string; user?: User } {
  const users = getUsers();

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  // Always compute hash even if user not found (prevents timing-based user enumeration)
  const salt = user?.salt ?? generateSalt();
  const computed = hashPassword(password, salt);

  if (!user || computed !== user.passwordHash) {
    return { success: false, error: "Email o contraseña incorrectos" };
  }

  const { passwordHash: _, salt: _s, ...userWithoutSecrets } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutSecrets));

  return { success: true, user: userWithoutSecrets };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Get current logged-in user — validates against stored users to prevent
// privilege escalation via direct localStorage manipulation.
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return null;

  let parsed: User;
  try {
    parsed = JSON.parse(stored);
  } catch {
    return null;
  }

  if (!parsed?.id || !parsed?.email) return null;

  // Verify the session user actually exists in contractai_users
  const users = getUsers();
  const real = users.find(
    (u) => u.id === parsed.id && u.email === parsed.email
  );

  if (!real) {
    // Session is forged — clear it
    localStorage.removeItem(CURRENT_USER_KEY);
    return null;
  }

  return parsed;
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

// Update password for a user — used by the reset-password flow
export function updatePassword(
  email: string,
  newPassword: string
): { success: boolean; error?: string } {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }

  const users = getUsers();
  const index = users.findIndex((u) => u.email === email.toLowerCase());

  if (index === -1) {
    return { success: false, error: "Usuario no encontrado" };
  }

  const salt = generateSalt();
  users[index] = {
    ...users[index],
    salt,
    passwordHash: hashPassword(newPassword, salt),
  };

  saveUsers(users);
  return { success: true };
}
