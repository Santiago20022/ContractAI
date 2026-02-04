// Simple auth system using LocalStorage (no API key needed)
// Can be migrated to Supabase later

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

type StoredUser = User & {
  password: string;
};

const USERS_KEY = "contractai_users";
const CURRENT_USER_KEY = "contractai_current_user";

// Helper to hash password (simple hash for demo - in production use bcrypt)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Get all users from localStorage
function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Register a new user
export function register(email: string, password: string, name: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();

  // Check if user already exists
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "Este email ya está registrado" };
  }

  // Validate
  if (!email || !password || !name) {
    return { success: false, error: "Todos los campos son requeridos" };
  }

  if (password.length < 6) {
    return { success: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }

  // Create new user
  const newUser: StoredUser = {
    id: `user_${Date.now()}`,
    email: email.toLowerCase(),
    name,
    password: simpleHash(password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Auto login after register
  const { password: _, ...userWithoutPassword } = newUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

  return { success: true, user: userWithoutPassword };
}

// Login user
export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === simpleHash(password)
  );

  if (!user) {
    return { success: false, error: "Email o contraseña incorrectos" };
  }

  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

  return { success: true, user: userWithoutPassword };
}

// Logout user
export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Get current logged in user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}
