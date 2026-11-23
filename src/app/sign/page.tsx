"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  Loader2,
  PenLine,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

const SignatureCanvas = dynamic(() => import("@/components/shared/SignatureCanvas"), { ssr: false });

interface ContractData {
  id: string;
  title: string;
  type: string;
  content: string;
  partyAName?: string;
  partyBName?: string;
}

interface AlreadySigned {
  name: string;
  signedAt: string;
}

const CONTRACT_TYPE_NAMES: Record<string, string> = {
  services: "Contrato de Servicios",
  nda: "NDA (Confidencialidad)",
  employment: "Contrato de Trabajo",
  partnership: "Contrato de Socios",
  rental: "Contrato de Alquiler",
  sale: "Contrato de Compraventa",
  terms: "Términos y Condiciones",
  privacy: "Política de Privacidad",
  analyzed: "Documento Analizado",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SignPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t") ?? "";

  const [status, setStatus] = useState<"loading" | "ready" | "error" | "signed">("loading");
  const [contract, setContract] = useState<ContractData | null>(null);
  const [role, setRole] = useState<"B" | "C">("B");
  const [alreadySigned, setAlreadySigned] = useState<AlreadySigned | null>(null);
  const [reSignMode, setReSignMode] = useState(false);

  const [name, setName] = useState("");
  const [sigMode, setSigMode] = useState<"text" | "draw">("draw");
  const [sigImage, setSigImage] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signError, setSignError] = useState("");

  useEffect(() => {
    if (!token) { setStatus("error"); return; }

    fetch(`/api/signing/verify?t=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data: { error?: string; contract?: ContractData; role?: "B" | "C"; alreadySigned?: AlreadySigned | null }) => {
        if (data.error) { setStatus("error"); return; }
        setContract(data.contract!);
        setRole(data.role!);
        setAlreadySigned(data.alreadySigned ?? null);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleSign = async () => {
    if (!name.trim()) { setSignError("El nombre completo es requerido"); return; }
    if (sigMode === "draw" && !sigImage) { setSignError("Por favor dibuja tu firma"); return; }
    if (!confirmed) { setSignError("Debes confirmar que aceptas los términos"); return; }

    setSignError("");
    setIsSigning(true);

    try {
      const res = await fetch("/api/signing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          name: name.trim(),
          signatureImage: sigImage ?? undefined,
        }),
      });
      const data = await res.json() as { error?: string; success?: boolean };
      if (data.error) {
        setSignError(
          data.error === "Invalid or expired token"
            ? "Este enlace ha expirado. Pide al remitente que genere uno nuevo."
            : data.error === "Contract not found"
            ? "No se encontró el contrato. Puede haber sido eliminado."
            : "Error al guardar la firma. Intenta de nuevo."
        );
        return;
      }
      setStatus("signed");
    } catch {
      setSignError("Error de conexión. Verifica tu internet e intenta de nuevo.");
    } finally {
      setIsSigning(false);
    }
  };

  const roleLabel = role === "B" ? "Parte B" : "Codeudor / Coarrendatario";

  const canSubmit =
    name.trim().length > 0 &&
    confirmed &&
    (sigMode === "text" || (sigMode === "draw" && !!sigImage));

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Cargando contrato...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-md w-full text-center"
        >
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Enlace inválido</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            Este enlace de firma no es válido o ha expirado. Pide al remitente que genere un nuevo enlace.
          </p>
          <Link href="/">
            <Button variant="primary">Ir al inicio</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (status === "signed") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-md w-full text-center"
        >
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">¡Contrato firmado!</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Tu firma ha sido registrada correctamente. El propietario del contrato ya puede verla.
          </p>
        </motion.div>
      </div>
    );
  }

  const typeName = CONTRACT_TYPE_NAMES[contract!.type] || contract!.type;
  const showAlreadySigned = alreadySigned && !reSignMode;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">
              Contract<span className="text-indigo-500">AI</span>
            </span>
          </Link>
          <span className="hidden sm:flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5" />
            Firma segura
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Contract info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">{typeName}</span>
              <h1 className="text-xl font-bold text-slate-900">{contract!.title}</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {contract!.partyAName && (
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                Parte A: {contract!.partyAName}
              </span>
            )}
            {contract!.partyBName && (
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                Parte B: {contract!.partyBName}
              </span>
            )}
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Firmando como: {roleLabel}
            </span>
          </div>
        </motion.div>

        {/* Already signed banner */}
        {alreadySigned && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-blue-900 mb-0.5">Ya firmaste este contrato</p>
                <p className="text-xs text-blue-700">
                  Firmado por <span className="font-medium">{alreadySigned.name}</span> el {formatDate(alreadySigned.signedAt)}
                </p>
                {!reSignMode && (
                  <button
                    onClick={() => setReSignMode(true)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    Actualizar mi firma
                  </button>
                )}
              </div>
              {!reSignMode && (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Contract text */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Contenido del contrato</h2>
          <div className="bg-slate-50 rounded-xl p-5 max-h-80 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
              {contract!.content}
            </pre>
          </div>
        </motion.div>

        {/* Sign form — only shown if not already signed, OR if re-sign mode */}
        {(!showAlreadySigned) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                <PenLine className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {reSignMode ? "Actualizar tu firma" : "Tu firma"}
                </h2>
                <p className="text-xs text-slate-500">Firmando como {roleLabel}</p>
              </div>
            </div>

            {/* Mode tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5">
              {[
                { id: "draw", label: "Dibujar firma" },
                { id: "text", label: "Solo nombre" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setSigMode(tab.id as "text" | "draw"); setSigImage(null); }}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    sigMode === tab.id ? "bg-white shadow text-indigo-600" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {/* Name field */}
              <div>
                <label className="text-sm font-medium text-slate-700">Nombre completo *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo tal como aparece en tu documento"
                  className="mt-1 w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              {/* Draw mode */}
              {sigMode === "draw" && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Dibuja tu firma *</label>
                  <SignatureCanvas onChange={setSigImage} height={160} />
                  {!sigImage && (
                    <p className="text-xs text-slate-400 mt-1">Usa el mouse o tu dedo para firmar en el recuadro</p>
                  )}
                </div>
              )}

              {/* Text mode preview */}
              {sigMode === "text" && name.trim() && (
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Vista previa de tu firma</label>
                  <div className="mt-2 bg-slate-50 border border-slate-200 rounded-xl px-6 py-5 flex items-center justify-center">
                    <span
                      className="text-3xl text-slate-800"
                      style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
                    >
                      {name.trim()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Esta representación de tu nombre servirá como firma electrónica</p>
                </div>
              )}

              {sigMode === "text" && !name.trim() && (
                <p className="text-xs text-slate-400">Escribe tu nombre arriba para ver la vista previa de tu firma.</p>
              )}
            </div>

            {/* Confirmation checkbox */}
            <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-sm text-slate-700 leading-snug">
                  He leído el contrato completo y acepto todos sus términos y condiciones. Entiendo que esta firma tiene validez legal.
                </span>
              </label>
            </div>

            {signError && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-4 bg-red-50 px-4 py-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {signError}
              </div>
            )}

            <div className="flex gap-3 mt-5">
              {reSignMode && (
                <Button
                  variant="ghost"
                  onClick={() => { setReSignMode(false); setSignError(""); setName(""); setSigImage(null); setConfirmed(false); }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              )}
              <Button
                variant="primary"
                onClick={handleSign}
                disabled={isSigning || !canSubmit}
                className="flex-1"
              >
                {isSigning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Firmando...
                  </>
                ) : (
                  <>
                    <PenLine className="w-4 h-4" />
                    {reSignMode ? "Actualizar firma" : "Firmar contrato"}
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* If already signed and not re-signing: show a final message */}
        {showAlreadySigned && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
            <p className="text-sm text-slate-500">
              Si necesitas corregir tu firma, usa el botón <span className="font-medium text-blue-600">Actualizar mi firma</span> de arriba.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default function SignPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SignPageContent />
    </Suspense>
  );
}
