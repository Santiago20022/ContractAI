import { consumeResetToken, peekResetToken } from "@/lib/reset-tokens";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { token, consume } = body as { token?: string; consume?: boolean };

  if (!token || typeof token !== "string") {
    return Response.json({ valid: false, error: "Token is required" }, { status: 400 });
  }

  // consume=true: use the token (called when actually resetting the password)
  // consume=false/undefined: just check validity without burning it (used on page load)
  const email = consume ? consumeResetToken(token) : peekResetToken(token);

  if (!email) {
    return Response.json({ valid: false, error: "Token inválido o expirado" }, { status: 400 });
  }

  return Response.json({ valid: true, email });
}
