"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  PenLine,
  Shield,
  User,
  X,
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

function SignPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t") ?? "";

  const [status, setStatus] = useState<"loading" | "ready" | "error" | "signed">("loading");
  const [contract, setContract] = useState<ContractData | null>(null);
  const [role, setRole] = useState<"B" | "C">("B");

  const [name, setName] = useState("");
  const [sigMode, setSigMode] = useState<"text" | "draw">("text");
  const [sigImage, setSigImage] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signError, setSignError] = useState("");

  useEffect(() => {
    if (!token) { setStatus("error"); return; }

    fetch(`/api/signing/verify?t=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setStatus("error"); return; }
        setContract(data.contract);
        setRole(data.role);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleSign = async () => {
    if (!name.trim()) { setSignError("El nombre es requerido"); return; }
    if (sigMode === "draw" && !sigImage) { setSignError("Por favor dibuja tu firma"); return; }

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
      const data = await res.json();
      if (data.error) {
        setSignError(data.error === "Invalid or expired token"
          ? "Este enlace ya fue usado o ha expirado."
          : "Error al guardar la firma. Intenta de nuevo.");
        return;
      }
      setStatus("signed");
    } catch {
      setSignError("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsSigning(false);
    }
  };

  const roleLabel = role === "B" ? "Parte B" : "Codeudor / Coarrendatario";

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
            Este enlace de firma no es válido, ya fue usado, o ha expirado. Pide al remitente que genere un nuevo enlace.
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

        {/* Contract text */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Contenido del contrato</h2>
          <div className="bg-slate-50 rounded-xl p-5 max-h-80 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
              {contract!.content}
            </pre>
          </div>
        </motion.div>

        {/* Sign form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
              <PenLine className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Tu firma</h2>
              <p className="text-xs text-slate-500">Firmando como {roleLabel}</p>
            </div>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-4">
            {[{ id: "text", label: "Escribir nombre" }, { id: "draw", label: "Dibujar firma" }].map((tab) => (
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

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Nombre completo *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className="mt-1 w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>

            {sigMode === "draw" && (
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Dibuja tu firma</label>
                <SignatureCanvas onChange={setSigImage} height={150} />
              </div>
            )}

            {sigMode === "text" && (
              <p className="text-xs text-slate-500">Tu nombre escrito arriba servirá como firma electrónica.</p>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 mb-5">
            <p className="text-xs text-amber-700 leading-relaxed">
              Al firmar confirmas que has leído el contrato completo y aceptas todos sus términos y condiciones.
            </p>
          </div>

          {signError && (
            <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 px-4 py-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {signError}
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleSign}
            disabled={isSigning || !name.trim() || (sigMode === "draw" && !sigImage)}
            className="w-full"
          >
            {isSigning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Firmando...
              </>
            ) : (
              <>
                <PenLine className="w-4 h-4" />
                Firmar contrato
              </>
            )}
          </Button>
        </motion.div>
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
