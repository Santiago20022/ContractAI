import { createResetToken } from "@/lib/reset-tokens";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
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
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Restablece tu contraseña — ContractAI</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
    style="background:#f1f5f9;padding:48px 16px;">
    <tr><td align="center">

      <!-- Card -->
      <table width="560" cellpadding="0" cellspacing="0" role="presentation"
        style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;
               box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

        <!-- ── Header ── -->
        <tr>
          <td style="background:linear-gradient(135deg,#6366f1 0%,#7c3aed 100%);
                     padding:36px 40px;text-align:center;">
            <!-- Logo -->
            <table cellpadding="0" cellspacing="0" role="presentation"
              style="margin:0 auto 20px;">
              <tr>
                <td style="background:rgba(255,255,255,0.15);border-radius:14px;
                           padding:10px 14px;vertical-align:middle;">
                  <span style="font-size:22px;vertical-align:middle;">📄</span>
                  <span style="color:#ffffff;font-size:20px;font-weight:800;
                               vertical-align:middle;margin-left:8px;letter-spacing:-0.3px;">
                    Contract<span style="opacity:0.75">AI</span>
                  </span>
                </td>
              </tr>
            </table>
            <!-- Título header -->
            <p style="margin:0;color:rgba(255,255,255,0.9);font-size:13px;
                      font-weight:500;letter-spacing:1.5px;text-transform:uppercase;">
              Seguridad de la cuenta
            </p>
          </td>
        </tr>

        <!-- ── Icono central ── -->
        <tr>
          <td style="text-align:center;padding:36px 40px 0;">
            <div style="display:inline-block;background:#eef2ff;border-radius:50%;
                        width:64px;height:64px;line-height:64px;font-size:28px;">
              🔐
            </div>
          </td>
        </tr>

        <!-- ── Cuerpo ── -->
        <tr>
          <td style="padding:24px 40px 32px;">
            <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;
                       color:#0f172a;text-align:center;letter-spacing:-0.5px;">
              Restablecer contraseña
            </h1>
            <p style="margin:0 0 28px;font-size:15px;color:#64748b;
                      line-height:1.7;text-align:center;">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta en
              <strong style="color:#6366f1;">ContractAI</strong>.
              Si fuiste tú, haz clic en el botón de abajo.
            </p>

            <!-- Divider -->
            <div style="height:1px;background:#f1f5f9;margin:0 0 28px;"></div>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" role="presentation"
              style="margin:0 auto 28px;">
              <tr>
                <td style="border-radius:14px;overflow:hidden;
                           background:linear-gradient(135deg,#6366f1,#7c3aed);
                           box-shadow:0 4px 14px rgba(99,102,241,0.4);">
                  <a href="${resetLink}"
                    style="display:inline-block;padding:16px 40px;
                           color:#ffffff;font-size:16px;font-weight:700;
                           text-decoration:none;letter-spacing:0.2px;">
                    Crear nueva contraseña &rarr;
                  </a>
                </td>
              </tr>
            </table>

            <!-- Info chips -->
            <table cellpadding="0" cellspacing="0" role="presentation"
              style="width:100%;margin-bottom:28px;">
              <tr>
                <td style="background:#f8fafc;border:1px solid #e2e8f0;
                           border-radius:12px;padding:16px 20px;">
                  <table cellpadding="0" cellspacing="0" role="presentation"
                    style="width:100%;">
                    <tr>
                      <td style="width:28px;vertical-align:top;padding-top:1px;">
                        <span style="font-size:16px;">⏱</span>
                      </td>
                      <td style="font-size:13px;color:#475569;line-height:1.6;">
                        <strong style="color:#0f172a;">Este enlace vence en 1 hora</strong>
                        y solo puede usarse una vez.
                      </td>
                    </tr>
                    <tr><td colspan="2" style="height:10px;"></td></tr>
                    <tr>
                      <td style="width:28px;vertical-align:top;padding-top:1px;">
                        <span style="font-size:16px;">🛡️</span>
                      </td>
                      <td style="font-size:13px;color:#475569;line-height:1.6;">
                        Si <strong style="color:#0f172a;">no solicitaste este cambio</strong>,
                        ignora este correo. Tu contraseña actual no cambiará.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Fallback link -->
            <div style="background:#fafafa;border-radius:10px;padding:14px 16px;
                        border:1px dashed #cbd5e1;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#94a3b8;
                        text-transform:uppercase;letter-spacing:0.8px;">
                ¿El botón no funciona?
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;
                        word-break:break-all;line-height:1.5;">
                Copia y pega este enlace en tu navegador:<br />
                <a href="${resetLink}"
                  style="color:#6366f1;text-decoration:none;">${resetLink}</a>
              </p>
            </div>
          </td>
        </tr>

        <!-- ── Footer ── -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #f1f5f9;
                     padding:20px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;">
              Este correo fue enviado automáticamente por ContractAI. Por favor no respondas.
            </p>
            <p style="margin:0;font-size:12px;color:#cbd5e1;">
              &copy; ${year} ContractAI &middot; Tu asistente legal inteligente
            </p>
          </td>
        </tr>

      </table>
      <!-- /Card -->

    </td></tr>
  </table>
</body>
</html>`;
}
