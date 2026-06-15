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

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const contractBody = escapeHtml(contractText)
    .split("\n")
    .map((line) => (line.trim() ? `<p style="margin:0 0 6pt 0;">${line}</p>` : `<p style="margin:0 0 4pt 0;">&nbsp;</p>`))
    .join("\n");

  const confidentialBadge = showConfidentialBadge
    ? `<p style="text-align:center;font-size:8pt;letter-spacing:4px;color:#94a3b8;margin:0 0 12pt 0;">
        D O C U M E N T O &nbsp; L E G A L &nbsp; · &nbsp; C O N F I D E N C I A L
      </p>`
    : "";

  const fingerprintBox = showFingerprint
    ? `<p style="margin:10pt 0 4pt 0;font-size:8pt;color:#64748b;">Huella dactilar:</p>
       <div style="width:60pt;height:60pt;border:1pt dashed #cbd5e1;display:inline-block;"></div>`
    : "";

  const hasCodudor = showCodudor && partyC;
  const colWidth = hasCodudor ? "30%" : "44%";

  const sigColA = `
    <td style="width:${colWidth};vertical-align:top;padding:0 8pt;">
      <p style="border-top:1pt solid #1e293b;margin:0 0 6pt 0;">&nbsp;</p>
      <p style="font-size:8pt;font-weight:bold;color:#0f172a;margin:0 0 2pt 0;">PRIMERA PARTE</p>
      <p style="font-size:9pt;color:#334155;margin:0 0 10pt 0;">${escapeHtml(partyA || "_______________")}</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0 0 4pt 0;">Firma: _______________________</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0 0 4pt 0;">Cédula / DNI / RFC: ___________</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0;">Fecha: ________________________</p>
      ${fingerprintBox}
    </td>`;

  const sigColB = `
    <td style="width:${colWidth};vertical-align:top;padding:0 8pt;">
      <p style="border-top:1pt solid #1e293b;margin:0 0 6pt 0;">&nbsp;</p>
      <p style="font-size:8pt;font-weight:bold;color:#0f172a;margin:0 0 2pt 0;">SEGUNDA PARTE</p>
      <p style="font-size:9pt;color:#334155;margin:0 0 10pt 0;">${escapeHtml(partyB || "_______________")}</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0 0 4pt 0;">Firma: _______________________</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0 0 4pt 0;">Cédula / DNI / RFC: ___________</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0;">Fecha: ________________________</p>
      ${fingerprintBox}
    </td>`;

  const sigColC = hasCodudor
    ? `
    <td style="width:${colWidth};vertical-align:top;padding:0 8pt;">
      <p style="border-top:1pt solid #1e293b;margin:0 0 6pt 0;">&nbsp;</p>
      <p style="font-size:8pt;font-weight:bold;color:#0f172a;margin:0 0 2pt 0;">CODEUDOR / COARRENDATARIO</p>
      <p style="font-size:9pt;color:#334155;margin:0 0 10pt 0;">${escapeHtml(partyC || "_______________")}</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0 0 4pt 0;">Firma: _______________________</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0 0 4pt 0;">Cédula / DNI / RFC: ___________</p>
      <p style="font-size:8pt;color:#94a3b8;border-top:1pt solid #e2e8f0;padding-top:4pt;margin:0;">Fecha: ________________________</p>
      ${fingerprintBox}
    </td>`
    : "";

  const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
  xmlns:w='urn:schemas-microsoft-com:office:word'
  xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(contractTitle)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: Helvetica, Arial, sans-serif;
      font-size: 10pt;
      color: #334155;
      margin: 0;
      padding: 0;
    }
    @page {
      margin: 2.5cm 2cm;
    }
    p { margin: 0 0 6pt 0; line-height: 1.6; }
    table { border-collapse: collapse; width: 100%; }
  </style>
</head>
<body>

  <!-- Header -->
  <table style="width:100%;border-bottom:2pt solid #4f46e5;margin-bottom:16pt;">
    <tr>
      <td style="font-size:9pt;font-weight:bold;color:#0f172a;padding-bottom:6pt;">
        Contract<span style="color:#4f46e5;">AI</span>
      </td>
      <td style="text-align:right;font-size:7pt;color:#94a3b8;padding-bottom:6pt;">
        ${escapeHtml(contractTitle)} &middot; ${today}
      </td>
    </tr>
  </table>

  <!-- Title block -->
  <div style="background-color:#4f46e5;padding:18pt 24pt;margin-bottom:16pt;">
    <p style="font-size:7pt;font-weight:bold;color:#c7d2fe;letter-spacing:3px;margin:0 0 6pt 0;">DOCUMENTO LEGAL</p>
    <p style="font-size:20pt;font-weight:bold;color:#ffffff;margin:0;">${escapeHtml(contractTitle)}</p>
  </div>

  ${confidentialBadge}

  <!-- Parties -->
  <table style="border:1pt solid #e2e8f0;margin-bottom:16pt;">
    <tr>
      <td style="width:50%;padding:8pt 12pt;background-color:#f8fafc;">
        <p style="font-size:7pt;font-weight:bold;color:#4f46e5;letter-spacing:2px;margin:0 0 4pt 0;">PRIMERA PARTE</p>
        <p style="font-size:9pt;font-weight:bold;color:#0f172a;margin:0;">${escapeHtml(partyA || "—")}</p>
      </td>
      <td style="width:50%;padding:8pt 12pt;background-color:#ffffff;border-left:1pt solid #e2e8f0;">
        <p style="font-size:7pt;font-weight:bold;color:#4f46e5;letter-spacing:2px;margin:0 0 4pt 0;">SEGUNDA PARTE</p>
        <p style="font-size:9pt;font-weight:bold;color:#0f172a;margin:0;">${escapeHtml(partyB || "—")}</p>
      </td>
    </tr>
  </table>

  <!-- Contract body -->
  <div style="white-space:pre-wrap;font-size:10pt;line-height:1.75;color:#334155;margin-bottom:24pt;">
    ${contractBody}
  </div>

  <!-- Signatures -->
  <div style="margin-top:24pt;">
    <hr style="border:none;border-top:1pt solid #cbd5e1;margin-bottom:16pt;" />
    <p style="font-size:7pt;font-weight:bold;color:#64748b;letter-spacing:2px;text-align:center;margin:0 0 16pt 0;">
      FIRMAS DE CONFORMIDAD
    </p>
    <table style="width:100%;">
      <tr>
        ${sigColA}
        ${hasCodudor ? "" : `<td style="width:12%;">&nbsp;</td>`}
        ${sigColB}
        ${sigColC}
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <div style="margin-top:32pt;border-top:1pt solid #e2e8f0;padding-top:6pt;">
    <p style="font-size:7pt;color:#94a3b8;margin:0;">Generado por ContractAI &middot; contractai.app</p>
  </div>

</body>
</html>`;

  return new Blob(["﻿", html], { type: "application/msword" });
}
