"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const C = {
  indigo:      "#4f46e5",
  indigoDark:  "#3730a3",
  indigoLight: "#c7d2fe",
  slate900:    "#0f172a",
  slate800:    "#1e293b",
  slate700:    "#334155",
  slate600:    "#475569",
  slate500:    "#64748b",
  slate400:    "#94a3b8",
  slate300:    "#cbd5e1",
  slate200:    "#e2e8f0",
  slate100:    "#f1f5f9",
  slate50:     "#f8fafc",
  white:       "#ffffff",
};

const MH = 44;   // margin horizontal
const HDR = 28;  // slim header height
const FTR = 30;  // footer height

const s = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    fontFamily: "Helvetica",
    paddingTop: HDR,
    paddingBottom: FTR,
  },

  /* ── Slim header — fixed on ALL pages ─────── */
  slimHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HDR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: MH,
    backgroundColor: C.white,
    borderBottomWidth: 1.5,
    borderBottomColor: C.indigo,
  },
  slimBrand: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.slate900,
    letterSpacing: 0.2,
  },
  slimAI: { color: C.indigo },
  slimMeta: { fontSize: 7.5, color: C.slate400 },

  /* ── Title block — page 1 ONLY (not fixed) ── */
  titleBlock: {
    backgroundColor: C.indigo,
    paddingTop: 22,
    paddingBottom: 20,
    paddingHorizontal: MH,
  },
  docKind: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.indigoLight,
    letterSpacing: 2.8,
    marginBottom: 6,
  },
  docTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    lineHeight: 1.2,
  },

  /* ── Body ────────────────────────────────── */
  body: {
    paddingHorizontal: MH,
    paddingTop: 16,
  },

  /* ── Parties card ────────────────────────── */
  partiesCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: C.slate200,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  partyA: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: C.slate50,
  },
  partyB: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: C.white,
    borderLeftWidth: 1,
    borderLeftColor: C.slate200,
  },
  partyLabel: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: C.indigo,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  partyName: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: C.slate900,
  },

  /* ── Content elements ────────────────────── */
  divider: {
    height: 0.75,
    backgroundColor: C.slate200,
    marginVertical: 8,
  },
  sectionLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.indigo,
    letterSpacing: 2.5,
    marginTop: 14,
    marginBottom: 4,
  },
  clauseRow: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 16,
    marginBottom: 6,
  },
  clauseBar: {
    width: 3,
    backgroundColor: C.indigo,
    borderRadius: 1.5,
    marginRight: 8,
  },
  clauseBox: {
    flex: 1,
    backgroundColor: C.slate50,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  clauseHeader: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: C.slate900,
  },
  para: {
    fontSize: 10,
    lineHeight: 1.75,
    marginBottom: 6,
    color: C.slate700,
  },
  listRow: {
    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 10,
  },
  bullet: {
    width: 22,
    fontSize: 10,
    color: C.indigo,
    fontFamily: "Helvetica-Bold",
  },
  listPara: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.68,
    color: C.slate700,
  },

  /* ── Signature block ─────────────────────── */
  sigSection: { marginTop: 36 },
  sigRule: { height: 0.75, backgroundColor: C.slate300, marginBottom: 22 },
  sigTitle: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.slate500,
    letterSpacing: 1.5,
    textAlign: "center",
    marginBottom: 18,
  },
  sigRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sigCol: { width: "44%" },
  sigLine: {
    height: 0.75,
    backgroundColor: C.slate800,
    width: "100%",
    marginBottom: 8,
  },
  sigRole: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.slate900,
    marginBottom: 2,
  },
  sigName: {
    fontSize: 9.5,
    color: C.slate700,
    marginBottom: 14,
  },
  sigField: {
    fontSize: 8,
    color: C.slate400,
    borderTopWidth: 0.5,
    borderTopColor: C.slate200,
    paddingTop: 5,
    marginBottom: 7,
  },

  /* ── Footer — fixed on ALL pages ─────────── */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: FTR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: MH,
    borderTopWidth: 0.5,
    borderTopColor: C.slate200,
    backgroundColor: C.white,
  },
  footerLeft:  { fontSize: 7.5, color: C.slate400 },
  footerRight: { fontSize: 7.5, color: C.slate400 },
});

/* ── Parser ─────────────────────────────────── */
type El =
  | { type: "divider" }
  | { type: "space"; h: number }
  | { type: "sectionLabel"; text: string }
  | { type: "clauseHeader"; text: string }
  | { type: "para"; text: string }
  | { type: "listItem"; bullet: string; text: string };

const CLAUSE_RE =
  /^(PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA|UNDÉCIMA|DUODÉCIMA|DECIMOPRIMERA|DECIMOSEGUNDA|DECIMOTERCERA|DECIMOCUARTA|DECIMOQUINTA|DECIMOSEXTA|DECIMOSÉPTIMA|DECIMOCTAVA|DECIMONOVENA|VIGÉSIMA)\s*[\.\-]/i;

const SECTION_RE = /^(REUNIDOS|EXPONEN|CLÁUSULAS|ESTIPULACIONES|CONSIDERACIONES|ANTECEDENTES|PARTES)$/i;

function parseContract(text: string): El[] {
  const lines = text.split("\n");
  const els: El[] = [];
  let skipRest = false;
  let prevWasSpace = false;

  for (let i = 0; i < lines.length; i++) {
    if (skipRest) break;
    const raw = lines[i].trimEnd();
    const t = raw.trim();

    if (!t) {
      if (!prevWasSpace && els.length > 0) {
        els.push({ type: "space", h: 4 });
        prevWasSpace = true;
      }
      continue;
    }
    prevWasSpace = false;

    if (/^[═─=]{5,}/.test(t.replace(/\s/g, ""))) {
      els.push({ type: "divider" });
      continue;
    }

    if (
      els.length > 0 &&
      els[els.length - 1].type === "divider" &&
      /^[A-ZÁÉÍÓÚÑÜ\s\(\)\-\.]+$/.test(t) &&
      t.length > 8
    ) {
      continue;
    }

    if (SECTION_RE.test(t)) {
      els.push({ type: "sectionLabel", text: t.toUpperCase() });
      continue;
    }

    if (CLAUSE_RE.test(t)) {
      els.push({ type: "clauseHeader", text: t });
      continue;
    }

    if (/^Y en prueba de conformidad/i.test(t)) {
      els.push({ type: "para", text: t });
      skipRest = true;
      continue;
    }

    if (/^[a-z]\)\s/.test(t)) {
      els.push({ type: "listItem", bullet: t.slice(0, 2), text: t.slice(2).trim() });
      continue;
    }

    const numMatch = t.match(/^(\d+)\.\s(.+)$/);
    if (numMatch) {
      els.push({ type: "listItem", bullet: numMatch[1] + ".", text: numMatch[2] });
      continue;
    }

    if (t.startsWith("• ") || t.startsWith("•")) {
      els.push({ type: "listItem", bullet: "•", text: t.replace(/^•\s*/, "") });
      continue;
    }

    els.push({ type: "para", text: t });
  }

  return els;
}

function renderEl(el: El, idx: number) {
  switch (el.type) {
    case "divider":
      return <View key={idx} style={s.divider} />;
    case "space":
      return <View key={idx} style={{ height: el.h }} />;
    case "sectionLabel":
      return <Text key={idx} style={s.sectionLabel}>{el.text}</Text>;
    case "clauseHeader":
      return (
        <View key={idx} style={s.clauseRow}>
          <View style={s.clauseBar} />
          <View style={s.clauseBox}>
            <Text style={s.clauseHeader}>{el.text}</Text>
          </View>
        </View>
      );
    case "listItem":
      return (
        <View key={idx} style={s.listRow}>
          <Text style={s.bullet}>{el.bullet}</Text>
          <Text style={s.listPara}>{el.text}</Text>
        </View>
      );
    default:
      return <Text key={idx} style={s.para}>{el.text}</Text>;
  }
}

export interface ContractPDFProps {
  contractText: string;
  contractTitle: string;
  partyA: string;
  partyB: string;
  signatureA?: { name: string; signedAt: string; image?: string };
  signatureB?: { name: string; signedAt: string; image?: string };
}

export function ContractPDF({ contractText, contractTitle, partyA, partyB, signatureA, signatureB }: ContractPDFProps) {
  const today = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const elements = parseContract(contractText);

  return (
    <Document title={contractTitle} author="ContractAI" creator="ContractAI — contractai.app">
      <Page size="A4" style={s.page}>

        {/* ── Slim header (all pages) ── */}
        <View style={s.slimHeader} fixed>
          <Text style={s.slimBrand}>
            Contract<Text style={s.slimAI}>AI</Text>
          </Text>
          <Text style={s.slimMeta}>{contractTitle} · {today}</Text>
        </View>

        {/* ── Title block (page 1 only — not fixed) ── */}
        <View style={s.titleBlock}>
          <Text style={s.docKind}>DOCUMENTO LEGAL</Text>
          <Text style={s.docTitle}>{contractTitle}</Text>
        </View>

        {/* ── Body ── */}
        <View style={s.body}>

          {/* Parties card */}
          <View style={s.partiesCard}>
            <View style={s.partyA}>
              <Text style={s.partyLabel}>PRIMERA PARTE</Text>
              <Text style={s.partyName}>{partyA || "—"}</Text>
            </View>
            <View style={s.partyB}>
              <Text style={s.partyLabel}>SEGUNDA PARTE</Text>
              <Text style={s.partyName}>{partyB || "—"}</Text>
            </View>
          </View>

          {/* Contract content */}
          {elements.map((el, idx) => renderEl(el, idx))}

          {/* Signature block */}
          <View style={s.sigSection}>
            <View style={s.sigRule} />
            <Text style={s.sigTitle}>FIRMAS DE CONFORMIDAD</Text>
            <View style={s.sigRow}>
              <View style={s.sigCol}>
                <View style={s.sigLine} />
                <Text style={s.sigRole}>PRIMERA PARTE</Text>
                <Text style={s.sigName}>{signatureA?.name || partyA || "_______________"}</Text>
                {signatureA?.image ? (
                  <Image src={signatureA.image} style={{ width: 100, height: 35, objectFit: "contain" }} />
                ) : (
                  <Text style={s.sigField}>Firma: ________________________</Text>
                )}
                <Text style={s.sigField}>Cédula / DNI / RFC: ____________</Text>
                <Text style={s.sigField}>
                  Fecha: {signatureA?.signedAt ? new Date(signatureA.signedAt).toLocaleDateString("es-ES") : "_________________________"}
                </Text>
              </View>
              <View style={s.sigCol}>
                <View style={s.sigLine} />
                <Text style={s.sigRole}>SEGUNDA PARTE</Text>
                <Text style={s.sigName}>{signatureB?.name || partyB || "_______________"}</Text>
                {signatureB?.image ? (
                  <Image src={signatureB.image} style={{ width: 100, height: 35, objectFit: "contain" }} />
                ) : (
                  <Text style={s.sigField}>Firma: ________________________</Text>
                )}
                <Text style={s.sigField}>Cédula / DNI / RFC: ____________</Text>
                <Text style={s.sigField}>
                  Fecha: {signatureB?.signedAt ? new Date(signatureB.signedAt).toLocaleDateString("es-ES") : "_________________________"}
                </Text>
              </View>
            </View>
          </View>

        </View>

        {/* ── Footer (all pages) ── */}
        <View style={s.footer} fixed>
          <Text style={s.footerLeft}>Generado por ContractAI · contractai.app</Text>
          <Text
            style={s.footerRight}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>

      </Page>
    </Document>
  );
}
