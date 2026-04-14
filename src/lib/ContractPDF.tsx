"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

/* ── Color tokens ───────────────────────────────── */
const C = {
  indigo:      "#4f46e5",
  indigoDark:  "#3730a3",
  indigoLight: "#c7d2fe",
  slate900:    "#0f172a",
  slate800:    "#1e293b",
  slate700:    "#334155",
  slate600:    "#475569",
  slate400:    "#94a3b8",
  slate200:    "#e2e8f0",
  slate100:    "#f1f5f9",
  white:       "#ffffff",
};

/* ── Styles ─────────────────────────────────────── */
const s = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    fontFamily: "Helvetica",
    color: C.slate700,
    paddingBottom: 54,
  },

  /* Header */
  header: {
    backgroundColor: C.indigo,
    paddingTop: 28,
    paddingBottom: 22,
    paddingHorizontal: 48,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  brand: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    letterSpacing: 0.3,
  },
  brandAI: { color: C.indigoLight },
  headerDate: { fontSize: 8, color: C.indigoLight, marginTop: 2 },
  headerRule: { height: 0.5, backgroundColor: "rgba(255,255,255,0.25)", marginBottom: 12 },
  docKind: {
    fontSize: 7.5,
    color: C.indigoLight,
    letterSpacing: 2.5,
    marginBottom: 5,
  },
  docTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: C.white,
  },

  /* Body */
  body: {
    paddingHorizontal: 48,
    paddingTop: 24,
  },

  /* Section elements */
  divider: {
    height: 0.75,
    backgroundColor: C.slate200,
    marginVertical: 10,
  },
  sectionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.indigo,
    letterSpacing: 3,
    marginTop: 10,
    marginBottom: 6,
  },
  clauseHeaderWrap: {
    backgroundColor: C.slate100,
    borderLeftWidth: 2.5,
    borderLeftColor: C.indigo,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 14,
    marginBottom: 5,
  },
  clauseHeader: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: C.slate900,
  },
  para: {
    fontSize: 10,
    lineHeight: 1.7,
    marginBottom: 6,
    color: C.slate700,
  },
  listRow: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 8,
  },
  bullet: {
    width: 20,
    fontSize: 10,
    color: C.indigo,
    fontFamily: "Helvetica-Bold",
  },
  listPara: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.65,
    color: C.slate700,
  },

  /* Parties info card */
  partiesCard: {
    flexDirection: "row",
    backgroundColor: C.slate100,
    borderRadius: 4,
    padding: 12,
    marginTop: 8,
    marginBottom: 12,
    gap: 12,
  },
  partyBlock: { flex: 1 },
  partyRole: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.indigo,
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  partyName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.slate900,
  },
  partyDivider: { width: 0.75, backgroundColor: C.slate200 },

  /* Signatures */
  sigSection: { marginTop: 30 },
  sigRule: {
    height: 0.75,
    backgroundColor: C.slate200,
    marginBottom: 16,
  },
  sigRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 0,
  },
  sigCol: { width: "42%", alignItems: "center" },
  sigLine: { height: 0.75, backgroundColor: C.slate800, width: "100%", marginBottom: 6 },
  sigRole: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.slate900, marginBottom: 2 },
  sigName: { fontSize: 9, color: C.slate600, marginBottom: 8 },
  sigDNI: {
    fontSize: 8,
    color: C.slate400,
    borderTopWidth: 0.5,
    borderTopColor: C.slate200,
    paddingTop: 4,
    width: "100%",
    textAlign: "center",
  },

  /* Footer (fixed) */
  footer: {
    position: "absolute",
    bottom: 18,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: C.slate200,
  },
  footerLeft: { fontSize: 7.5, color: C.slate400 },
  footerRight: { fontSize: 7.5, color: C.slate400 },
});

/* ── Parser ─────────────────────────────────────── */
type El =
  | { type: "divider" }
  | { type: "space"; h: number }
  | { type: "sectionLabel"; text: string }
  | { type: "clauseHeader"; text: string }
  | { type: "para"; text: string }
  | { type: "listItem"; bullet: string; text: string };

const CLAUSE_RE =
  /^(PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA|UNDÉCIMA|DUODÉCIMA|DECIMOPRIMERA|DECIMOSEGUNDA|DECIMOTERCERA|DECIMOCUARTA|DECIMOQUINTA|DECIMOSEXTA|DECIMOSÉPTIMA|DECIMOCTAVA|DECIMONOVENA|VIGÉSIMA)\s*\.-/i;

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

    /* Empty line */
    if (!t) {
      if (!prevWasSpace && els.length > 0) {
        els.push({ type: "space", h: 4 });
        prevWasSpace = true;
      }
      continue;
    }
    prevWasSpace = false;

    /* ═══ dividers — render as thin line */
    if (/^[═─=]{5,}/.test(t.replace(/\s/g, ""))) {
      els.push({ type: "divider" });
      continue;
    }

    /* Skip all-caps title line right after divider (it goes in the header) */
    if (
      els.length > 0 &&
      els[els.length - 1].type === "divider" &&
      /^[A-ZÁÉÍÓÚÑÜ\s\(\)\-\.]+$/.test(t) &&
      t.length > 8
    ) {
      continue;
    }

    /* Section labels */
    if (SECTION_RE.test(t)) {
      els.push({ type: "sectionLabel", text: t.toUpperCase() });
      continue;
    }

    /* Clause headers */
    if (CLAUSE_RE.test(t)) {
      els.push({ type: "clauseHeader", text: t });
      continue;
    }

    /* Signature intro line — include it then stop (we render custom sig block) */
    if (/^Y en prueba de conformidad/i.test(t)) {
      els.push({ type: "para", text: t });
      skipRest = true;
      continue;
    }

    /* List: a) b) c)... */
    if (/^[a-z]\)\s/.test(t)) {
      els.push({ type: "listItem", bullet: t.slice(0, 2), text: t.slice(2).trim() });
      continue;
    }

    /* List: 1. 2. 3. */
    const numMatch = t.match(/^(\d+)\.\s(.+)$/);
    if (numMatch) {
      els.push({ type: "listItem", bullet: numMatch[1] + ".", text: numMatch[2] });
      continue;
    }

    /* Bullet: • */
    if (t.startsWith("• ") || t.startsWith("•")) {
      els.push({ type: "listItem", bullet: "•", text: t.replace(/^•\s*/, "") });
      continue;
    }

    /* Default paragraph */
    els.push({ type: "para", text: t });
  }

  return els;
}

/* ── Render helpers ─────────────────────────────── */
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
        <View key={idx} style={s.clauseHeaderWrap}>
          <Text style={s.clauseHeader}>{el.text}</Text>
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

/* ── Props ──────────────────────────────────────── */
export interface ContractPDFProps {
  contractText: string;
  contractTitle: string;
  partyA: string;
  partyB: string;
}

/* ── Document ───────────────────────────────────── */
export function ContractPDF({ contractText, contractTitle, partyA, partyB }: ContractPDFProps) {
  const today = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const elements = parseContract(contractText);

  return (
    <Document
      title={contractTitle}
      author="ContractAI"
      creator="ContractAI — contractai.app"
    >
      <Page size="A4" style={s.page}>
        {/* ── HEADER ── */}
        <View style={s.header} fixed>
          <View style={s.headerRow}>
            <Text style={s.brand}>
              Contract<Text style={s.brandAI}>AI</Text>
            </Text>
            <Text style={s.headerDate}>{today}</Text>
          </View>
          <View style={s.headerRule} />
          <Text style={s.docKind}>DOCUMENTO LEGAL</Text>
          <Text style={s.docTitle}>{contractTitle}</Text>
        </View>

        {/* ── PARTIES CARD ── */}
        <View style={s.body}>
          <View style={s.partiesCard}>
            <View style={s.partyBlock}>
              <Text style={s.partyRole}>PARTE A — PRESTADOR / PRIMERA PARTE</Text>
              <Text style={s.partyName}>{partyA || "—"}</Text>
            </View>
            <View style={s.partyDivider} />
            <View style={s.partyBlock}>
              <Text style={s.partyRole}>PARTE B — CLIENTE / SEGUNDA PARTE</Text>
              <Text style={s.partyName}>{partyB || "—"}</Text>
            </View>
          </View>

          {/* ── BODY CONTENT ── */}
          {elements.map((el, idx) => renderEl(el, idx))}

          {/* ── SIGNATURE BLOCK ── */}
          <View style={s.sigSection}>
            <View style={s.sigRule} />
            <View style={s.sigRow}>
              <View style={s.sigCol}>
                <View style={s.sigLine} />
                <Text style={s.sigRole}>PARTE A</Text>
                <Text style={s.sigName}>{partyA || "___________________"}</Text>
                <Text style={s.sigDNI}>DNI / NIF / RFC: ___________________</Text>
              </View>
              <View style={s.sigCol}>
                <View style={s.sigLine} />
                <Text style={s.sigRole}>PARTE B</Text>
                <Text style={s.sigName}>{partyB || "___________________"}</Text>
                <Text style={s.sigDNI}>DNI / NIF / RFC: ___________________</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── FOOTER (per page) ── */}
        <View style={s.footer} fixed>
          <Text style={s.footerLeft}>contractai.app</Text>
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
