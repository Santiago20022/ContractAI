import { createResetToken } from "@/lib/reset-tokens";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email } = body as { email?: string };

  if (!email || typeof email !== "string" || !email.trim()) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Always return success to avoid user enumeration
  // (we generate and send a token only if the email actually exists — silently skip otherwise)
  const token = createResetToken(normalizedEmail);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const resetLink = `${appUrl}/reset-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "ContractAI <onboarding@resend.dev>",
    to: normalizedEmail,
    subject: "Restablece tu contraseña — ContractAI",
    html: buildEmailHtml(resetLink),
  });

  if (error) {
    console.error("[password-reset] Resend error:", JSON.stringify(error));
  } else {
    console.log("[password-reset] Email sent, id:", data?.id);
  }

  // Always return success — never confirm/deny if an email is registered
  return Response.json({ success: true });
}

function buildEmailHtml(resetLink: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restablecer contraseña</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:32px;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:inline-flex;align-items:center;justify-content:center;">
                  <span style="color:white;font-size:20px;">📄</span>
                </div>
                <span style="color:white;font-size:22px;font-weight:700;">Contract<span style="opacity:0.85">AI</span></span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0f172a;">
                Restablecer contraseña
              </h1>
              <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en ContractAI.
                Haz clic en el botón de abajo para crear una nueva contraseña.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);border-radius:12px;">
                    <a href="${resetLink}"
                       style="display:inline-block;padding:14px 32px;color:white;font-weight:600;font-size:15px;text-decoration:none;border-radius:12px;">
                      Restablecer contraseña →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry note -->
              <div style="background:#fef9c3;border:1px solid #fde047;border-radius:10px;padding:14px 16px;margin-bottom:24px;">
                <p style="margin:0;font-size:13px;color:#854d0e;">
                  ⏱ Este enlace vence en <strong>1 hora</strong>.
                  Si no solicitaste este cambio, ignora este correo — tu contraseña no cambiará.
                </p>
              </div>

              <!-- Fallback link -->
              <p style="margin:0;font-size:12px;color:#94a3b8;word-break:break-all;">
                Si el botón no funciona, copia este enlace en tu navegador:<br />
                <a href="${resetLink}" style="color:#6366f1;">${resetLink}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #f1f5f9;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © ${new Date().getFullYear()} ContractAI · Tu asistente legal inteligente
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
