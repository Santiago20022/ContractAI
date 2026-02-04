"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { getContract, deleteContract, Contract } from "@/lib/contracts-storage";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Copy,
  Download,
  FileText,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContractDetailPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [contract, setContract] = useState<Contract | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const found = getContract(params.id);
      if (found) {
        setContract(found);
      }
    }
  }, [params.id]);

  const handleCopy = () => {
    if (contract) {
      navigator.clipboard.writeText(contract.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (contract) {
      const blob = new Blob([contract.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${contract.title.replace(/\s+/g, "_")}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = () => {
    if (contract && confirm("¿Estás seguro de que quieres eliminar este contrato?")) {
      deleteContract(contract.id);
      router.push("/dashboard/contracts");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (!contract) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto text-center py-20">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Contrato no encontrado
          </h2>
          <p className="text-slate-600 mb-6">
            El contrato que buscas no existe o ha sido eliminado.
          </p>
          <Link href="/dashboard/contracts">
            <Button variant="primary">Ver mis contratos</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/dashboard/contracts"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a mis contratos
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{contract.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="bg-slate-100 px-2 py-1 rounded">
                  {contractTypeNames[contract.type] || contract.type}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(contract.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                {contract.riskScore !== undefined && (
                  <span
                    className={`px-2 py-1 rounded ${
                      contract.riskScore >= 70
                        ? "bg-green-100 text-green-700"
                        : contract.riskScore >= 40
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Score: {contract.riskScore}%
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4" />
                {copied ? "¡Copiado!" : "Copiar"}
              </Button>
              <Button variant="secondary" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4" />
                Descargar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="bg-slate-50 rounded-xl p-6 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
                {contract.content}
              </pre>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
