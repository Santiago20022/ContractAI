"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { addContract } from "@/lib/contracts-storage";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
  UserPlus,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const CONTRACT_TYPES = [
  { id: "services", label: "Contrato de Servicios" },
  { id: "nda", label: "NDA (Confidencialidad)" },
  { id: "employment", label: "Contrato de Trabajo" },
  { id: "partnership", label: "Contrato de Socios" },
  { id: "rental", label: "Contrato de Alquiler" },
  { id: "sale", label: "Contrato de Compraventa" },
  { id: "terms", label: "Términos y Condiciones" },
  { id: "privacy", label: "Política de Privacidad" },
  { id: "other", label: "Otro tipo de contrato" },
];

// Detect contract type from text keywords
function detectType(text: string): string {
  const t = text.toUpperCase();
  if (t.includes("ARRENDAMIENTO") || t.includes("ALQUILER") || t.includes("ARRENDADOR") || t.includes("ARRENDATARIO")) return "rental";
  if (t.includes("TRABAJO") || t.includes("EMPLEO") || t.includes("EMPLEADOR") || t.includes("TRABAJADOR")) return "employment";
  if (t.includes("CONFIDENCIALIDAD") || t.includes("NDA") || t.includes("NO DIVULGAR") || t.includes("SECRETO")) return "nda";
  if (t.includes("SERVICIOS") || t.includes("PRESTACIÓN DE SERVICIO")) return "services";
  if (t.includes("SOCIOS") || t.includes("SOCIEDAD") || t.includes("PARTICIPACIÓN")) return "partnership";
  if (t.includes("COMPRAVENTA") || t.includes("VENTA") || t.includes("VENDEDOR") || t.includes("COMPRADOR")) return "sale";
  if (t.includes("TÉRMINOS") || t.includes("CONDICIONES DE USO")) return "terms";
  if (t.includes("PRIVACIDAD") || t.includes("DATOS PERSONALES") || t.includes("GDPR")) return "privacy";
  return "other";
}

// Try to extract party names from ContractAI-generated contracts
function detectParties(text: string): { partyA: string; partyB: string; partyC: string } {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  let partyA = "";
  let partyB = "";
  let partyC = "";

  // ContractAI format patterns
  const patterns = [
    /^(?:Parte A|PARTE A|Arrendador|ARRENDADOR|Empleador|EMPLEADOR|Prestador|PRESTADOR|Vendedor|VENDEDOR)[:\s]+(.+)/i,
  ];
  const patternsB = [
    /^(?:Parte B|PARTE B|Arrendatario|ARRENDATARIO|Empleado|EMPLEADO|Cliente|CLIENTE|Comprador|COMPRADOR)[:\s]+(.+)/i,
  ];
  const patternsC = [
    /^(?:Codeudor|CODEUDOR|Coarrendatario|COARRENDATARIO|Garante|GARANTE)[:\s]+(.+)/i,
  ];

  for (const line of lines) {
    if (!partyA) {
      for (const p of patterns) {
        const m = line.match(p);
        if (m) { partyA = m[1].replace(/[,;.].*/, "").trim(); break; }
      }
    }
    if (!partyB) {
      for (const p of patternsB) {
        const m = line.match(p);
        if (m) { partyB = m[1].replace(/[,;.].*/, "").trim(); break; }
      }
    }
    if (!partyC) {
      for (const p of patternsC) {
        const m = line.match(p);
        if (m) { partyC = m[1].replace(/[,;.].*/, "").trim(); break; }
      }
    }
  }

  // Also try "Entre [NAME] (Parte A)" patterns
  const betweenMatch = text.match(/Entre\s+(.+?)\s*(?:\(Parte A\)|,\s*identificad)/i);
  if (!partyA && betweenMatch) partyA = betweenMatch[1].trim();
  const yMatch = text.match(/y\s+(.+?)\s*(?:\(Parte B\)|,\s*identificad)/i);
  if (!partyB && yMatch) partyB = yMatch[1].trim();

  return { partyA, partyB, partyC };
}

function fileNameToTitle(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "") // remove extension
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

type Step = "upload" | "configure" | "done";

export default function ImportPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");

  const [extractedText, setExtractedText] = useState("");
  const [title, setTitle] = useState("");
  const [contractType, setContractType] = useState("other");
  const [partyAName, setPartyAName] = useState("");
  const [partyAId, setPartyAId] = useState("");
  const [partyBName, setPartyBName] = useState("");
  const [partyBId, setPartyBId] = useState("");
  const [showCodudor, setShowCodudor] = useState(false);
  const [codudorName, setCodudorName] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [savedId, setSavedId] = useState("");

  const handleFile = useCallback(async (file: File) => {
    const allowedExts = [".pdf", ".docx", ".txt", ".md"];
    const hasValidExt = allowedExts.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExt) {
      setExtractError("Formato no soportado. Usa PDF, Word (.docx) o texto plano (.txt).");
      return;
    }

    setIsExtracting(true);
    setExtractError("");

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/import/extract", { method: "POST", body: form });
      const data = await res.json() as { text?: string; error?: string };

      if (data.error || !data.text) {
        setExtractError(data.error || "No se pudo extraer el texto del archivo.");
        return;
      }

      const text = data.text;
      setExtractedText(text);

      // Auto-detect metadata
      const detectedType = detectType(text);
      const { partyA, partyB, partyC } = detectParties(text);

      setTitle(fileNameToTitle(file.name));
      setContractType(detectedType);
      setPartyAName(partyA);
      setPartyBName(partyB);
      if (partyC) { setCodudorName(partyC); setShowCodudor(true); }

      setStep("configure");
    } catch {
      setExtractError("Error de conexión al procesar el archivo.");
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }, [handleFile]);

  const handleSave = async () => {
    if (!user || !extractedText.trim() || !title.trim()) return;
    setIsSaving(true);
    try {
      const saved = await addContract(user.id, {
        title: title.trim(),
        type: contractType,
        content: extractedText,
        status: "completed",
        partyAName: partyAName.trim() || undefined,
        partyAId: partyAId.trim() || undefined,
        partyBName: partyBName.trim() || undefined,
        partyBId: partyBId.trim() || undefined,
      });

      // Store codeudor option in localStorage
      if (showCodudor && codudorName.trim()) {
        localStorage.setItem(`contractai_opts_${saved.id}`, JSON.stringify({
          fingerprint: false,
          confidential: false,
          codeudor: true,
          codudorName: codudorName.trim(),
        }));
      }

      setSavedId(saved.id);
      setStep("done");
    } catch {
      setExtractError("Error al guardar el contrato. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Importar contrato</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Importa un contrato existente en PDF, Word o texto plano. Se guarda en tu cuenta lista para firmar y gestionar.
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* ── Step 1: Upload ──────────────────────────────────────────── */}
          {step === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <Card>
                <label
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all ${
                    isDragging
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt,.md"
                    onChange={handleInput}
                    className="sr-only"
                    disabled={isExtracting}
                  />
                  {isExtracting ? (
                    <>
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
                        <Loader2 className="w-7 h-7 text-indigo-500 animate-spin" />
                      </div>
                      <p className="text-slate-600 font-medium">Extrayendo texto...</p>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
                        <Upload className="w-7 h-7 text-indigo-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-800 font-semibold mb-1">Arrastra tu contrato aquí</p>
                        <p className="text-sm text-slate-500">o haz clic para seleccionar un archivo</p>
                      </div>
                      <div className="flex gap-2">
                        {["PDF", "Word .docx", "Texto .txt"].map((f) => (
                          <span key={f} className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                            {f}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </label>

                {extractError && (
                  <div className="mt-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {extractError}
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {/* ── Step 2: Configure ───────────────────────────────────────── */}
          {step === "configure" && (
            <motion.div key="configure" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-5">

              {/* Text preview */}
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-700">Texto extraído</h2>
                  <button
                    onClick={() => { setStep("upload"); setExtractedText(""); }}
                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cambiar archivo
                  </button>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 max-h-48 overflow-y-auto">
                  <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono leading-relaxed">
                    {extractedText.slice(0, 1500)}{extractedText.length > 1500 ? "\n\n[...]" : ""}
                  </pre>
                </div>
                <p className="text-xs text-slate-400 mt-2">{extractedText.length.toLocaleString()} caracteres extraídos</p>
              </Card>

              {/* Metadata form */}
              <Card>
                <h2 className="text-sm font-semibold text-slate-700 mb-4">Información del contrato</h2>
                <div className="space-y-4">

                  <Input
                    label="Título del contrato *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Contrato de Arrendamiento - Juan Pérez"
                  />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de contrato</label>
                    <select
                      value={contractType}
                      onChange={(e) => setContractType(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    >
                      {CONTRACT_TYPES.map((t) => (
                        <option key={t.id} value={t.id}>{t.label}</option>
                      ))}
                    </select>
                    {detectType(extractedText) !== "other" && (
                      <p className="text-xs text-indigo-600 mt-1">Tipo detectado automáticamente</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Partes del contrato</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          label="Parte A — Nombre"
                          value={partyAName}
                          onChange={(e) => setPartyAName(e.target.value)}
                          placeholder="Nombre o empresa"
                        />
                        <Input
                          label="Parte A — Cédula / NIT"
                          value={partyAId}
                          onChange={(e) => setPartyAId(e.target.value)}
                          placeholder="Número de documento"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          label="Parte B — Nombre"
                          value={partyBName}
                          onChange={(e) => setPartyBName(e.target.value)}
                          placeholder="Nombre o empresa"
                        />
                        <Input
                          label="Parte B — Cédula / NIT"
                          value={partyBId}
                          onChange={(e) => setPartyBId(e.target.value)}
                          placeholder="Número de documento"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Codeudor */}
                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowCodudor((v) => !v)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                        <UserPlus className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          Codeudor / Coarrendatario{" "}
                          <span className="text-slate-400 font-normal">(opcional)</span>
                        </p>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${showCodudor ? "bg-emerald-500" : "bg-slate-200"}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${showCodudor ? "translate-x-6" : "translate-x-1"}`} />
                      </div>
                    </button>
                    {showCodudor && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50">
                        <Input
                          label="Nombre del codeudor / coarrendatario"
                          value={codudorName}
                          onChange={(e) => setCodudorName(e.target.value)}
                          placeholder="Nombre completo"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {extractError && (
                  <div className="mt-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {extractError}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => { setStep("upload"); setExtractedText(""); setExtractError(""); }}
                    className="flex-1"
                  >
                    Atrás
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={isSaving || !title.trim()}
                    className="flex-1"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        Importar contrato
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ── Step 3: Done ────────────────────────────────────────────── */}
          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="text-center py-10">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">¡Contrato importado!</h2>
                <p className="text-slate-500 text-sm mb-8">
                  El contrato fue guardado en tu cuenta y está listo para gestionar y firmar.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="ghost" onClick={() => { setStep("upload"); setExtractedText(""); setTitle(""); setPartyAName(""); setPartyBName(""); setPartyAId(""); setPartyBId(""); setCodudorName(""); setShowCodudor(false); setSavedId(""); }}>
                    Importar otro
                  </Button>
                  <Button variant="primary" onClick={() => router.push(`/dashboard/contracts/${savedId}`)}>
                    Ver contrato
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
