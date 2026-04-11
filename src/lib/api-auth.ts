// API key validation helper for ContractAI public API

export function validateApiKey(
  request: Request
): { valid: true } | { valid: false; response: Response } {
  const apiKey = request.headers.get("X-API-Key");
  const validKey = process.env.CONTRACTAI_API_KEY;

  if (!validKey) {
    // If no key is configured, deny all requests
    return {
      valid: false,
      response: Response.json(
        { error: "API not configured", code: "unauthorized" },
        { status: 401 }
      ),
    };
  }

  if (!apiKey || apiKey.length !== validKey.length || apiKey !== validKey) {
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
