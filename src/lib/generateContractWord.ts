export interface ContractWordOptions {
  contractTitle: string;
  partyA: string;
  partyB: string;
  partyC?: string;
  contractText: string;
  showConfidentialBadge?: boolean;
  showFingerprint?: boolean;
  showCodudor?: boolean;
}

const CLAUSE_RE =
  /^(CLÁUSULA\s+)?(PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA|UNDÉCIMA|DUODÉCIMA|DECIMOPRIMERA|DECIMOSEGUNDA|DECIMOTERCERA|DECIMOCUARTA|DECIMOQUINTA|DECIMOSEXTA|DECIMOSÉPTIMA|DECIMOCTAVA|DECIMONOVENA|VIGÉSIMA)(\s+(PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA))?\s*[\.\-:]/i;

const SECTION_RE =
  /^(REUNIDOS|EXPONEN|CLÁUSULAS|ESTIPULACIONES|CONSIDERACIONES|ANTECEDENTES|PARTES)$/i;

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseBody(text: string): string {
  const lines = text.split("\n");
  const parts: string[] = [];

  for (const raw of lines) {
    const t = raw.trim();

    if (!t) {
      parts.push(`<p style="margin:0 0 4pt 0;">&nbsp;</p>`);
      continue;
    }

    if (CLAUSE_RE.test(t)) {
      parts.push(`
        <table style="width:100%;border-collapse:collapse;margin:14pt 0 4pt 0;">
          <tr>
            <td style="width:4pt;background-color:#4f46e5;padding:0;">&nbsp;</td>
            <td style="padding:4pt 8pt;background-color:#f8fafc;">
              <p style="margin:0;font-size:9.5pt;font-weight:bold;color:#0f172a;">${esc(t)}</p>
            </td>
          </tr>
        </table>`);
      continue;
    }

    if (SECTION_RE.test(t)) {
      parts.push(`<p style="margin:12pt 0 3pt 0;font-size:7.5pt;font-weight:bold;color:#4f46e5;letter-spacing:2px;">${esc(t)}</p>`);
      continue;
    }

    if (/^[a-z]\)\s/.test(t) || /^(\d+)\.\s/.test(t) || t.startsWith("• ")) {
      parts.push(`<p style="margin:0 0 4pt 0;padding-left:16pt;font-size:10pt;color:#334155;line-height:1.7;">${esc(t)}</p>`);
      continue;
    }

    parts.push(`<p style="margin:0 0 5pt 0;font-size:10pt;color:#334155;line-height:1.75;">${esc(t)}</p>`);
  }

  return parts.join("\n");
}

export function generateContractWord(options: ContractWordOptions): Blob {
  const {
    contractTitle,
    partyA,
    partyB,
    partyC,
    contractText,
    showConfidentialBadge,
    showFingerprint,
    showCodudor,
  } = options;

  const today = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hasCodudor = showCodudor;
  const colPct = hasCodudor ? "30%" : "44%";
  const spacerPct = hasCodudor ? "5%" : "12%";

  const fingerprintHtml = showFingerprint
    ? `<p style="margin:8pt 0 2pt 0;font-size:8pt;color:#64748b;">Huella dactilar:</p>
       <table style="border-collapse:collapse;margin:0;">
         <tr><td style="width:52pt;height:52pt;border:1pt dashed #cbd5e1;">&nbsp;</td></tr>
       </table>`
    : "";

  function sigCol(role: string, name: string): string {
    return `
      <td style="width:${colPct};vertical-align:top;padding:0 10pt 0 0;">
        <p style="border-top:1pt solid #1e293b;margin:0 0 5pt 0;">&nbsp;</p>
        <p style="font-size:7.5pt;font-weight:bold;color:#4f46e5;letter-spacing:1.5px;margin:0 0 2pt 0;">${role}</p>
        <p style="font-size:9.5pt;font-weight:bold;color:#0f172a;margin:0 0 10pt 0;">${esc(name || "_______________")}</p>
        <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0 0 5pt 0;">Firma: _______________________</p>
        <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0 0 5pt 0;">Cédula / DNI / RFC: ___________</p>
        <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0;">Fecha: ________________________</p>
        ${fingerprintHtml}
      </td>`;
  }

  const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
  xmlns:w='urn:schemas-microsoft-com:office:word'
  xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="UTF-8" />
  <title>${esc(contractTitle)}</title>
  <!--[if gte mso 9]><xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml><![endif]-->
  <style>
    @page { margin: 2cm 2.5cm; mso-header-margin: 1cm; mso-footer-margin: 1cm; }
    body { font-family: Helvetica, Arial, sans-serif; font-size: 10pt; color: #334155; margin: 0; padding: 0; }
    p { margin: 0 0 6pt 0; line-height: 1.6; }
    table { border-collapse: collapse; }
  </style>
</head>
<body>

  <!-- Slim header -->
  <table style="width:100%;border-bottom:1.5pt solid #4f46e5;padding-bottom:6pt;margin-bottom:0;">
    <tr>
      <td style="font-size:9pt;font-weight:bold;color:#0f172a;">
        CONTRACT<span style="color:#4f46e5;">AI</span>
      </td>
      <td style="text-align:right;font-size:7.5pt;color:#94a3b8;">
        ${esc(contractTitle)} &middot; ${today}
      </td>
    </tr>
  </table>

  <!-- Title block (white bg, matches PDF) -->
  <div style="margin:20pt 0 0 0;">
    <p style="margin:0 0 6pt 0;font-size:8pt;font-weight:bold;color:#4f46e5;letter-spacing:3px;">
      DOCUMENTO LEGAL${showConfidentialBadge ? "&nbsp;&nbsp;&middot;&nbsp;&nbsp;CONFIDENCIAL" : ""}
    </p>
    <table style="margin:0 0 16pt 0;border-collapse:collapse;">
      <tr>
        <td style="width:36pt;height:2.5pt;background-color:#b8860b;font-size:1pt;">&nbsp;</td>
      </tr>
    </table>
    <p style="margin:0 0 8pt 0;font-size:26pt;font-weight:bold;color:#0f172a;line-height:1.2;">${esc(contractTitle)}</p>
    <p style="margin:0 0 20pt 0;font-size:10pt;color:#94a3b8;">Otorgado el ${today}</p>
  </div>

  <!-- Parties (solo Primera y Segunda parte, el codeudor va solo en firmas) -->
  <table style="width:100%;border:1pt solid #e2e8f0;margin-bottom:16pt;">
    <tr>
      <td style="width:50%;padding:8pt 12pt;background-color:#f8fafc;">
        <p style="font-size:7pt;font-weight:bold;color:#4f46e5;letter-spacing:1.5px;margin:0 0 3pt 0;">PRIMERA PARTE</p>
        <p style="font-size:9.5pt;font-weight:bold;color:#0f172a;margin:0;">${esc(partyA || "—")}</p>
      </td>
      <td style="width:50%;padding:8pt 12pt;background-color:#ffffff;border-left:1pt solid #e2e8f0;">
        <p style="font-size:7pt;font-weight:bold;color:#4f46e5;letter-spacing:1.5px;margin:0 0 3pt 0;">SEGUNDA PARTE</p>
        <p style="font-size:9.5pt;font-weight:bold;color:#0f172a;margin:0;">${esc(partyB || "—")}</p>
      </td>
    </tr>
  </table>

  <!-- Contract body -->
  <div style="margin-bottom:24pt;">
    ${parseBody(contractText)}
  </div>

  <!-- Signatures -->
  <div style="margin-top:28pt;">
    <table style="width:100%;border-collapse:collapse;margin-bottom:14pt;">
      <tr><td style="border-top:1pt solid #cbd5e1;">&nbsp;</td></tr>
    </table>
    <p style="font-size:7.5pt;font-weight:bold;color:#64748b;letter-spacing:2px;text-align:center;margin:0 0 14pt 0;">
      FIRMAS DE CONFORMIDAD
    </p>
    <table style="width:100%;">
      <tr>
        ${sigCol("PRIMERA PARTE", partyA)}
        <td style="width:${spacerPct};">&nbsp;</td>
        ${sigCol("SEGUNDA PARTE", partyB)}
        ${hasCodudor ? `<td style="width:${spacerPct};">&nbsp;</td>${sigCol("CODEUDOR / COARRENDATARIO", partyC!)}` : ""}
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <table style="width:100%;border-top:1pt solid #e2e8f0;margin-top:28pt;">
    <tr>
      <td style="font-size:7.5pt;color:#94a3b8;padding-top:5pt;">Generado por ContractAI &middot; contractai.app</td>
    </tr>
  </table>

</body>
</html>`;

  return new Blob([html], { type: "application/msword" });
}
