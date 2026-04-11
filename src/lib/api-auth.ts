// API key validation helper for ContractAI public API

// Constant-time string comparison to prevent timing attacks.
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function validateApiKey(
  request: Request
): { valid: true } | { valid: false; response: Response } {
  const apiKey = request.headers.get("X-API-Key");
  const validKey = process.env.CONTRACTAI_API_KEY;

  if (!validKey) {
    return {
      valid: false,
      response: Response.json(
        { error: "API not configured", code: "unauthorized" },
        { status: 401 }
      ),
    };
  }

  if (!apiKey || !constantTimeEqual(apiKey, validKey)) {
    return {
      valid: false,
      response: Response.json(
        { error: "Invalid or missing API key", code: "unauthorized" },
        { status: 401 }
      ),
    };
  }

  return { valid: true };
}
