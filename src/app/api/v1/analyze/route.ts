import { analyzeContract } from "@/lib/contract-templates";
import { validateApiKey } from "@/lib/api-auth";

function getRiskLevel(score: number): "high" | "medium" | "low" | "safe" {
  if (score < 40) return "high";
  if (score < 70) return "medium";
  if (score < 90) return "low";
  return "safe";
}

export async function POST(request: Request) {
  const auth = validateApiKey(request);
  if (!auth.valid) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body", code: "invalid_request" },
      { status: 400 }
    );
  }

  const { content } = body as { content?: string };

  if (!content || typeof content !== "string") {
    return Response.json(
      { error: "Field 'content' is required and must be a string", code: "invalid_request" },
      { status: 400 }
    );
  }

  if (!content.trim()) {
    return Response.json(
      { error: "Field 'content' cannot be empty", code: "missing_content" },
      { status: 400 }
    );
  }

  const MAX_CONTENT_LENGTH = 50_000;
  if (content.length > MAX_CONTENT_LENGTH) {
    return Response.json(
      { error: "Content too large. Maximum 50,000 characters.", code: "payload_too_large" },
      { status: 413 }
    );
  }

  try {
    const { results, score } = analyzeContract(content);

    return Response.json({
      score,
      riskLevel: getRiskLevel(score),
      findings: results,
      analyzedAt: new Date().toISOString(),
      charCount: content.length,
    });
  } catch {
    return Response.json(
      { error: "Failed to analyze contract", code: "internal_error" },
      { status: 500 }
    );
  }
}
