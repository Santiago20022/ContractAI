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
  ink:         "#0b0f19",
  inkSoft:     "#1f2937",
  body:        "#27303f",
  muted:       "#6b7280",
  hairline:    "#d1d5db",
  hairlineSoft: "#e5e7eb",
  paper:       "#ffffff",
  paperWarm:   "#fbfaf7",
  accent:      "#4f46e5",
  accentDark:  "#312e81",
  accentSoft:  "#eef2ff",
  gold:        "#b08d57",
  goldSoft:    "#f0e6d2",
};

const MH = 56;   // horizontal margin
const HDR = 36;  // header height
const FTR = 38;  // footer height

const s = StyleSheet.create({
  page: {
    backgroundColor: C.paper,
    fontFamily: "Times-Roman",
    color: C.body,
    paddingTop: HDR,
    paddingBottom: FTR,
  },

  /* ── Header (all pages) ─────────────────── */
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HDR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: MH,
    paddingTop: 14,
  },
  headerBrand: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
    letterSpacing: 1.4,
  },
  headerBrandAccent: { color: C.accent },
  headerLine: {
    position: "absolute",
    bottom: 6,
    left: MH,
    right: MH,
    height: 0.5,
    backgroundColor: C.hairline,
  },
  headerGold: {
    position: "absolute",
    bottom: 6,
    left: MH,
    width: 32,
    height: 0.75,
    backgroundColor: C.gold,
  },
  headerMeta: { fontSize: 7.5, color: C.muted, fontFamily: "Helvetica" },

  /* ── Cover block — page 1 ───────────────── */
  cover: {
    paddingHorizontal: MH,
    paddingTop: 12,
    paddingBottom: 28,
  },
  kicker: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 3.6,
    color: C.accent,
    marginBottom: 10,
  },
  goldRule: {
    width: 28,
    height: 1.2,
    backgroundColor: C.gold,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontFamily: "Times-Bold",
    color: C.ink,
    lineHeight: 1.18,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 10,
    color: C.muted,
    fontFamily: "Helvetica",
    marginTop: 10,
    letterSpacing: 0.3,
  },

  /* ── Body container ─────────────────────── */
  body: {
    paddingHorizontal: MH,
  },

  /* ── Parties card ───────────────────────── */
  partiesCard: {
    flexDirection: "row",
    borderTopWidth: 0.75,
    borderTopColor: C.hairline,
    borderBottomWidth: 0.75,
    borderBottomColor: C.hairline,
    marginBottom: 24,
    backgroundColor: C.paperWarm,
  },
  partyCol: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  partyDivider: {
    width: 0.5,
    backgroundColor: C.hairline,
  },
  partyKicker: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: C.accent,
    letterSpacing: 2,
    marginBottom: 5,
  },
  partyName: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    color: C.ink,
    lineHeight: 1.3,
  },

  /* ── Section / clause typography ────────── */
  sectionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.accent,
    letterSpacing: 3,
    marginTop: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  sectionRule: {
    alignSelf: "center",
    width: 24,
    height: 0.6,
    backgroundColor: C.gold,
    marginBottom: 14,
  },

  clauseHeader: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    color: C.ink,
    marginTop: 14,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  clauseHeaderRule: {
    width: 18,
    height: 0.75,
    backgroundColor: C.accent,
    marginBottom: 8,
  },

  para: {
    fontSize: 10.5,
    lineHeight: 1.65,
    marginBottom: 7,
    color: C.body,
    textAlign: "justify",
  },

  /* ── Lists ──────────────────────────────── */
  listRow: {
    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 14,
  },
  bullet: {
    width: 20,
    fontSize: 10.5,
    color: C.accent,
    fontFamily: "Helvetica-Bold",
  },
  listPara: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 1.6,
    color: C.body,
    textAlign: "justify",
  },

  /* ── Divider ────────────────────────────── */
  divider: {
    height: 0.4,
    backgroundColor: C.hairlineSoft,
    marginVertical: 10,
  },

  /* ── Signature block ────────────────────── */
  sigSection: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 0.5,
    borderTopColor: C.hairline,
  },
  sigKicker: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.accent,
    letterSpacing: 3,
    textAlign: "center",
    marginBottom: 6,
  },
  sigTitle: {
    fontSize: 13,
    fontFamily: "Times-Bold",
    color: C.ink,
    textAlign: "center",
    marginBottom: 4,
  },
  sigGold: {
    alignSelf: "center",
    width: 22,
    height: 0.6,
    backgroundColor: C.gold,
    marginBottom: 22,
  },
  sigRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sigCol: { width: "45%" },
  sigImageWrap: {
    height: 38,
    marginBottom: 4,
    justifyContent: "flex-end",
  },
  sigImage: {
    width: 110,
    height: 36,
    objectFit: "contain",
  },
  sigLine: {
    height: 0.6,
    backgroundColor: C.ink,
    width: "100%",
    marginBottom: 6,
  },
  sigRole: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.accent,
    letterSpacing: 1.6,
    marginBottom: 2,
  },
  sigName: {
    fontSize: 10.5,
    fontFamily: "Times-Bold",
    color: C.ink,
    marginBottom: 10,
  },
  sigField: {
    fontSize: 8,
    color: C.muted,
    fontFamily: "Helvetica",
    marginBottom: 4,
  },
  sigFieldLabel: {
    fontFamily: "Helvetica-Bold",
    color: C.inkSoft,
  },

  /* ── Footer ─────────────────────────────── */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: FTR,
    paddingHorizontal: MH,
    paddingBottom: 14,
  },
  footerLine: {
    height: 0.5,
    backgroundColor: C.hairline,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerLeft: {
    fontSize: 7,
    color: C.muted,
    fontFamily: "Helvetica",
    letterSpacing: 0.5,
  },
  footerCenter: {
    fontSize: 7,
    color: C.gold,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.8,
  },
  footerRight: {
    fontSize: 7,
    color: C.muted,
    fontFamily: "Helvetica",
    letterSpacing: 0.5,
  },
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
  /^(PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA|UNDÉCIMA|DUODÉCIMA|DECIMOPRIMERA|DECIMOSEGUNDA|DECIMOTERCERA|DECIMOCUARTA|DECIMOQUINTA|DECIMOSEXTA|DECIMOSÉPTIMA|DECIMOCTAVA|DECIMONOVENA|VIGÉSIMA|CLÁUSULA)\s*[\.\-:]?/i;

const SECTION_RE = /^(REUNIDOS|EXPONEN|CLÁUSULAS|ESTIPULACIONES|CONSIDERACIONES|ANTECEDENTES|PARTES|FIRMAS?(?:\s+DE\s+(?:LAS\s+PARTES|CONFORMIDAD))?)$/i;

function stripBoldMarkdown(t: string): string {
  return t.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
}

function parseContract(text: string): El[] {
  const lines = text.split("\n");
  const els: El[] = [];
  let skipRest = false;
  let prevWasSpace = false;
  let signatureBlockDetected = false;

  for (let i = 0; i < lines.length; i++) {
    if (skipRest) break;
    const raw = stripBoldMarkdown(lines[i].trimEnd());
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
      // Skip the AI's own signature heading; the PDF builds its own block
      if (/^FIRMAS?(?:\s+DE\s+(?:LAS\s+PARTES|CONFORMIDAD))?$/i.test(t)) {
        signatureBlockDetected = true;
        skipRest = true;
        continue;
      }
      els.push({ type: "sectionLabel", text: t.toUpperCase() });
      continue;
    }

    if (CLAUSE_RE.test(t)) {
      els.push({ type: "clauseHeader", text: t });
      continue;
    }

    if (/^Y en prueba de conformidad|^EN FE DE LO CUAL/i.test(t)) {
      els.push({ type: "para", text: t });
      skipRest = true;
      continue;
    }

    // Drop signature placeholders that the AI inserts at the end
    if (signatureBlockDetected) continue;
    if (/^(Nombre|Firma|C[eé]dula|DNI|RFC|Fecha|PARTE\s+[AB])\s*[:\-_]/i.test(t)) {
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
      return (
        <View key={idx}>
          <Text style={s.sectionLabel}>{el.text}</Text>
          <View style={s.sectionRule} />
        </View>
      );
    case "clauseHeader":
      return (
        <View key={idx}>
          <Text style={s.clauseHeader}>{el.text}</Text>
          <View style={s.clauseHeaderRule} />
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

        {/* ── Header (all pages) ── */}
        <View style={s.header} fixed>
          <Text style={s.headerBrand}>
            CONTRACT<Text style={s.headerBrandAccent}>AI</Text>
          </Text>
          <Text style={s.headerMeta}>{contractTitle}</Text>
        </View>
        <View style={s.headerLine} fixed />
        <View style={s.headerGold} fixed />

        {/* ── Cover block (page 1) ── */}
        <View style={s.cover}>
          <Text style={s.kicker}>DOCUMENTO LEGAL · CONFIDENCIAL</Text>
          <View style={s.goldRule} />
          <Text style={s.title}>{contractTitle}</Text>
          <Text style={s.subtitle}>Otorgado el {today}</Text>
        </View>

        {/* ── Body ── */}
        <View style={s.body}>

          {/* Parties */}
          <View style={s.partiesCard}>
            <View style={s.partyCol}>
              <Text style={s.partyKicker}>PRIMERA PARTE</Text>
              <Text style={s.partyName}>{partyA || "—"}</Text>
            </View>
            <View style={s.partyDivider} />
            <View style={s.partyCol}>
              <Text style={s.partyKicker}>SEGUNDA PARTE</Text>
              <Text style={s.partyName}>{partyB || "—"}</Text>
            </View>
          </View>

          {/* Contract content */}
          {elements.map((el, idx) => renderEl(el, idx))}

          {/* Signature block */}
          <View style={s.sigSection} wrap={false}>
            <Text style={s.sigKicker}>EN FE DE LO CUAL</Text>
            <Text style={s.sigTitle}>Firmas de Conformidad</Text>
            <View style={s.sigGold} />
            <View style={s.sigRow}>
              <View style={s.sigCol}>
                <View style={s.sigImageWrap}>
                  {signatureA?.image ? (
                    <Image src={signatureA.image} style={s.sigImage} />
                  ) : null}
                </View>
                <View style={s.sigLine} />
                <Text style={s.sigRole}>PRIMERA PARTE</Text>
                <Text style={s.sigName}>{signatureA?.name || partyA || "_______________"}</Text>
                <Text style={s.sigField}>
                  <Text style={s.sigFieldLabel}>Cédula / DNI / RFC: </Text>____________________
                </Text>
                <Text style={s.sigField}>
                  <Text style={s.sigFieldLabel}>Fecha: </Text>
                  {signatureA?.signedAt ? new Date(signatureA.signedAt).toLocaleDateString("es-ES") : "____________________"}
                </Text>
              </View>
              <View style={s.sigCol}>
                <View style={s.sigImageWrap}>
                  {signatureB?.image ? (
                    <Image src={signatureB.image} style={s.sigImage} />
                  ) : null}
                </View>
                <View style={s.sigLine} />
                <Text style={s.sigRole}>SEGUNDA PARTE</Text>
                <Text style={s.sigName}>{signatureB?.name || partyB || "_______________"}</Text>
                <Text style={s.sigField}>
                  <Text style={s.sigFieldLabel}>Cédula / DNI / RFC: </Text>____________________
                </Text>
                <Text style={s.sigField}>
                  <Text style={s.sigFieldLabel}>Fecha: </Text>
                  {signatureB?.signedAt ? new Date(signatureB.signedAt).toLocaleDateString("es-ES") : "____________________"}
                </Text>
              </View>
            </View>
          </View>

        </View>

        {/* ── Footer (all pages) ── */}
        <View style={s.footer} fixed>
          <View style={s.footerLine} />
          <View style={s.footerRow}>
            <Text style={s.footerLeft}>Generado por ContractAI</Text>
            <Text style={s.footerCenter}>· · ·</Text>
            <Text
              style={s.footerRight}
              render={({ pageNumber, totalPages }) =>
                `Pág. ${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </View>

      </Page>
    </Document>
  );
}
