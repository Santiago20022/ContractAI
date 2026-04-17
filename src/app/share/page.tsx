"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Download, Shield, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { decodeShareToken } from "@/lib/share-utils";
import { Button } from "@/components/ui/Button";

interface SharedContract {
  title: string;
  partyA: string;
  partyB: string;
  type: string;
  content: string;
}

const contractTypeNames: Record<string, string> = {
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

function SharePageContent() {
  const searchParams = useSearchParams();
  const [contract, setContract] = useState<SharedContract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const token = searchParams.get("c");
    if (!token) {
      setError(true);
      setLoading(false);
      return;
    }

    decodeShareToken(token).then((data) => {
      if (!data) {
        setError(true);
      } else {
        setContract(data);
      }
      setLoading(false);
    });
  }, [searchParams]);

  const handleDownloadPDF = async () => {
    if (!contract || isDownloading) return;
    setIsDownloading(true);
    try {
      const { generateContractPDF } = await import("@/lib/generateContractPDF");
      const blob = await generateContractPDF({
        contractTitle: contract.title,
        partyA: contract.partyA,
        partyB: contract.partyB,
        contractText: contract.content,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${contract.title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Cargando contrato...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !contract) {
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
          <h2 className="text-xl font-bold text-slate-900 mb-2">Enlace no válido</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            El enlace de este contrato no es válido o ha expirado. Pide al remitente que genere un nuevo enlace de compartir.
          </p>
          <Link href="/">
            <Button variant="primary">Ir al inicio</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const typeName = contractTypeNames[contract.type] || contract.type;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">
              Contract<span className="text-indigo-500">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" />
              Ver contrato compartido
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Contract header card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    {typeName}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-4">{contract.title}</h1>

                {/* Parties */}
                <div className="flex flex-wrap gap-3">
                  {contract.partyA && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                        Parte A: {contract.partyA}
                      </span>
                    </div>
                  )}
                  {contract.partyB && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                        Parte B: {contract.partyB}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  icon={isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                >
                  {isDownloading ? "Generando..." : "Descargar PDF"}
                </Button>
              </div>
            </div>
          </div>

          {/* Contract text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Contenido del contrato
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
                {contract.content}
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Bottom CTA bar */}
      <div className="bg-white border-t border-slate-200 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">¿Quieres crear tus propios contratos?</p>
              <p className="text-xs text-slate-500">ContractAI genera contratos legales con IA en segundos.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              icon={isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            >
              {isDownloading ? "Generando..." : "Descargar PDF"}
            </Button>
            <Link href="/register">
              <Button variant="primary" size="sm">
                Genera tu propio contrato gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Cargando...</p>
          </div>
        </div>
      }
    >
      <SharePageContent />
    </Suspense>
  );
}
