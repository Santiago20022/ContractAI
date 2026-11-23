"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
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

type PageStatus = "loading" | "ready" | "error" | "already_used" | "signed";

function SignPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t") ?? "";

  const [status, setStatus] = useState<PageStatus>("loading");
  const [contract, setContract] = useState<ContractData | null>(null);
  const [role, setRole] = useState<"B" | "C">("B");

  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [sigImage, setSigImage] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signError, setSignError] = useState("");

  useEffect(() => {
    if (!token) { setStatus("error"); return; }

    fetch(`/api/signing/verify?t=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data: { error?: string; contract?: ContractData; role?: "B" | "C" }) => {
        if (data.error === "Token already used") { setStatus("already_used"); return; }
        if (data.error) { setStatus("error"); return; }
        setContract(data.contract!);
        setRole(data.role!);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleSign = async () => {
    if (!name.trim()) { setSignError("El nombre completo es requerido"); return; }
    if (!sigImage) { setSignError("Debes dibujar tu firma antes de continuar"); return; }
    if (!confirmed) { setSignError("Debes confirmar que aceptas los términos"); return; }

    setSignError("");
    setIsSigning(true);

    try {
      const res = await fetch("/api/signing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name: name.trim(), idNumber: idNumber.trim() || undefined, signatureImage: sigImage }),
      });
      const data = await res.json() as { error?: string; success?: boolean };

      if (data.error === "Token already used" || data.error === "Role already signed") {
        setStatus("already_used");
        return;
      }
      if (data.error === "Contract not found") {
        setSignError("No se encontró el contrato. Puede haber sido eliminado.");
        return;
      }
      if (data.error) {
        setSignError("Error al guardar la firma. Intenta de nuevo.");
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

  // ── Static screens ─────────────────────────────────────────────────────────

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
          <p className="text-slate-500 text-sm leading-relaxed">
            Este enlace de firma no es válido o ha expirado. Pide al remitente que genere un enlace nuevo.
          </p>
        </motion.div>
      </div>
    );
  }

  if (status === "already_used") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-md w-full text-center"
        >
          <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Este enlace ya fue utilizado</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Este enlace de firma ya fue usado y no puede utilizarse nuevamente.
            Si necesitas corregir tu firma, pide al propietario del contrato que elimine la firma y te envíe un nuevo enlace.
          </p>
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

  // ── Sign form ──────────────────────────────────────────────────────────────

  const typeName = CONTRACT_TYPE_NAMES[contract!.type] || contract!.type;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header — no navigation links, only branding */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">
              Contract<span className="text-indigo-500">AI</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1.5 rounded-full">
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
              <PenLine className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Tu firma</h2>
              <p className="text-xs text-slate-500">Firmando como {roleLabel}</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Name + ID */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Nombre completo *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="mt-1 w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Cédula / NIT</label>
                <input
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Ej: 1234567890"
                  className="mt-1 w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Draw signature — always required */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Firma dibujada *
                {sigImage && (
                  <span className="ml-2 text-xs text-green-600 font-normal">Firma registrada</span>
                )}
              </label>
              <SignatureCanvas onChange={setSigImage} height={160} />
              <p className="text-xs text-slate-400 mt-1">Usa el mouse o tu dedo para firmar en el recuadro de arriba</p>
            </div>

            {/* Confirmation checkbox */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
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
          </div>

          {signError && (
            <div className="flex items-center gap-2 text-red-600 text-sm mt-4 bg-red-50 px-4 py-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {signError}
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleSign}
            disabled={isSigning || !name.trim() || !sigImage || !confirmed}
            className="w-full mt-5"
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
