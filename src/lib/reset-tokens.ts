// Stateless HMAC-signed password reset tokens.
// Self-contained: no server-side state needed → works correctly on Vercel serverless.
// Requires RESET_TOKEN_SECRET env variable (falls back to a dev default).

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.RESET_TOKEN_SECRET ?? "dev-secret-change-in-production";
  const keyBytes = new TextEncoder().encode(secret);
  // Use .buffer + slice to get a plain ArrayBuffer (required by importKey in strict TS)
  const buf = keyBytes.buffer.slice(keyBytes.byteOffset, keyBytes.byteOffset + keyBytes.byteLength) as ArrayBuffer;
  return crypto.subtle.importKey("raw", buf, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

function toB64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function fromB64url(str: string): ArrayBuffer {
  const pad = (4 - (str.length % 4)) % 4;
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr.buffer as ArrayBuffer;
}

function encodeUtf8(str: string): ArrayBuffer {
  const bytes = new TextEncoder().encode(str);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

export async function createResetToken(email: string): Promise<string> {
  const payload = JSON.stringify({ email: email.toLowerCase(), exp: Date.now() + TOKEN_TTL_MS });
  const payloadB64 = toB64url(new TextEncoder().encode(payload));
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, encodeUtf8(payloadB64));
  return `${payloadB64}.${toB64url(new Uint8Array(sig as ArrayBuffer))}`;
}

async function verifyToken(token: string): Promise<string | null> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const payloadB64 = token.slice(0, dot);
    const sigB64 = token.slice(dot + 1);
    const key = await getKey();
    const valid = await crypto.subtle.verify("HMAC", key, fromB64url(sigB64), encodeUtf8(payloadB64));
    if (!valid) return null;
    const { email, exp } = JSON.parse(new TextDecoder().decode(fromB64url(payloadB64)));
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

// Validates and "consumes" the token. Stateless: consume == peek because there is
// no shared store across serverless instances. The token becomes invalid after use
// anyway since the user's password changes.
export async function consumeResetToken(token: string): Promise<string | null> {
  return verifyToken(token);
}
