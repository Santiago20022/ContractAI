// In-memory store for password reset tokens.
// Tokens expire after 1 hour.
// In production with multiple servers, replace with Redis or a database.

type TokenEntry = {
  email: string;
  exp: number; // Unix timestamp ms
};

const tokens = new Map<string, TokenEntry>();

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export function createResetToken(email: string): string {
  // 32 bytes = 64 hex chars (cryptographically secure)
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  tokens.set(token, { email: email.toLowerCase(), exp: Date.now() + TOKEN_TTL_MS });
  return token;
}

export function consumeResetToken(token: string): string | null {
  const entry = tokens.get(token);
  if (!entry) return null;

  tokens.delete(token); // one-time use

  if (Date.now() > entry.exp) return null; // expired

  return entry.email;
}

// Expose only for validation (no deletion) — used by the validate endpoint
export function peekResetToken(token: string): string | null {
  const entry = tokens.get(token);
  if (!entry) return null;
  if (Date.now() > entry.exp) {
    tokens.delete(token);
    return null;
  }
  return entry.email;
}
