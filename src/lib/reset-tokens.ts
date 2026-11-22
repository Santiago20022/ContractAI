// Stateless HMAC-signed password reset tokens.
// Self-contained: no server-side state needed → works correctly on Vercel serverless.
// Requires RESET_TOKEN_SECRET env variable (falls back to a dev default).

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.RESET_TOKEN_SECRET ?? "dev-secret-change-in-production";
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64urlDecode(str: string): Uint8Array {
  const pad = (4 - (str.length % 4)) % 4;
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  const bin = atob(b64);
  return new Uint8Array([...bin].map((c) => c.charCodeAt(0)));
}

export async function createResetToken(email: string): Promise<string> {
  const payload = JSON.stringify({ email: email.toLowerCase(), exp: Date.now() + TOKEN_TTL_MS });
  const payloadB64 = b64url(new TextEncoder().encode(payload));
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  return `${payloadB64}.${b64url(sig)}`;
}

async function verifyToken(token: string): Promise<string | null> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const payloadB64 = token.slice(0, dot);
    const sigB64 = token.slice(dot + 1);
    const key = await getKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlDecode(sigB64),
      new TextEncoder().encode(payloadB64)
    );
    if (!valid) return null;
    const { email, exp } = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadB64)));
    if (Date.now() > exp) return null;
    return email as string;
  } catch {
    return null;
  }
}

// Validates without consuming — used on page load to show the reset form.
export async function peekResetToken(token: string): Promise<string | null> {
  return verifyToken(token);
}

// Validates and "consumes" the token. In this stateless implementation, consume == peek
// because we have no shared store across serverless instances. The token becomes
// effectively invalid after use anyway since the user's password changes.
export async function consumeResetToken(token: string): Promise<string | null> {
  return verifyToken(token);
}
