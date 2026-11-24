"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { getUserContracts, deleteContract, addContract, Contract } from "@/lib/contracts-storage";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Eye,
  FileCheck,
  FileText,
  Link2,
  MoreVertical,
  PenLine,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ContractsPageContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuOpenUp, setMenuOpenUp] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Handle sidebar filter links (?filter=signed / ?filter=expiring)
  const sidebarFilter = searchParams.get("filter");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      getUserContracts(user.id).then(setContracts);
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (user && confirm("¿Estás seguro de que quieres eliminar este contrato?")) {
      await deleteContract(id, user.id);
      setContracts(contracts.filter((c) => c.id !== id));
    }
    setOpenMenu(null);
  };

  const handleDownload = (contract: Contract) => {
    const blob = new Blob([contract.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contract.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOpenMenu(null);
  };

  const handleCopy = (contract: Contract) => {
    navigator.clipboard.writeText(contract.content);
    alert("Contrato copiado al portapapeles");
    setOpenMenu(null);
  };

  const handleShare = async (contract: Contract) => {
    setOpenMenu(null);
    const { encodeShareToken } = await import("@/lib/share-utils");
    const token = await encodeShareToken({
      title: contract.title,
      partyA: contract.partyAName ?? "",
      partyB: contract.partyBName ?? "",
      type: contract.type,
      content: contract.content,
    });
    const shareUrl = `${window.location.origin}/share?token=${token}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopiedId(contract.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClone = async (contract: Contract) => {
    if (!user) return;
    setOpenMenu(null);
    const cloned = await addContract(user.id, {
      title: `Copia de ${contract.title}`,
      type: contract.type,
      content: contract.content,
      status: "draft",
      riskScore: contract.riskScore,
      partyAName: contract.partyAName,
      partyBName: contract.partyBName,
      expiresAt: contract.expiresAt,
    });
    setContracts((prev) => [cloned, ...prev]);
    router.push(`/dashboard/contracts/${cloned.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const contractTypeNames: Record<string, string> = {
    services: "Servicios",
    nda: "NDA",
    employment: "Trabajo",
    partnership: "Socios",
    rental: "Alquiler",
    sale: "Compraventa",
    terms: "Términos",
    privacy: "Privacidad",
    consulting: "Consultoría",
    saas: "SaaS",
    agency: "Agencia",
    joboffer: "Oferta Trabajo",
    distribution: "Distribución",
    analyzed: "Analizado",
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contract.partyAName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contract.partyBName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || contract.type === filterType;

    // Sidebar filter overrides
    if (sidebarFilter === "signed") return true; // show all — signature column handles the view
    if (sidebarFilter === "expiring") {
      if (!contract.expiresAt) return false;
      const days = Math.ceil((new Date(contract.expiresAt).getTime() - Date.now()) / 86400000);
      return days <= 60;
    }

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getExpiryBadge = (expiresAt: string | undefined) => {
    if (!expiresAt) return null;
    const now = new Date();
    const expiry = new Date(expiresAt);
    const daysLeft = Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft <= 0) {
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
          Expirado
        </span>
      );
    }
    if (daysLeft <= 7) {
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
          Vence en {daysLeft}d
        </span>
      );
    }
    if (daysLeft <= 30) {
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
          Vence en {daysLeft}d
        </span>
      );
    }
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        Vence en {daysLeft}d
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {sidebarFilter === "signed" ? "Firmas" : sidebarFilter === "expiring" ? "Vencimientos" : "Mis Contratos"}
            </h1>
            <p className="text-slate-600">
              {sidebarFilter === "signed"
                ? "Gestiona las firmas electrónicas de tus contratos"
                : sidebarFilter === "expiring"
                ? "Contratos próximos a vencer en los próximos 60 días"
                : `${contracts.length} ${contracts.length === 1 ? "contrato" : "contratos"} en total`}
            </p>
          </div>
          <Link href="/generate">
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              Nuevo contrato
            </Button>
          </Link>
        </div>

        {/* Signatures banner */}
        {sidebarFilter === "signed" && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <PenLine className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-indigo-900 text-sm">Firma electrónica</p>
              <p className="text-indigo-700 text-sm">Abre cualquier contrato y usa la sección "Firma electrónica" para que Parte A y Parte B firmen digitalmente con nombre y fecha.</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar contratos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 cursor-pointer"
          >
            <option value="all">Todos los tipos</option>
            {Object.entries(contractTypeNames).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* Click-outside overlay for dropdown */}
        {openMenu && (
          <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
        )}

        {/* Contracts list */}
        {filteredContracts.length > 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {filteredContracts.map((contract, index) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.15 }}
                  layout
                  className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group"
                >
                  {/* Main link area */}
                  <Link
                    href={`/dashboard/contracts/${contract.id}`}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-4 h-4 text-indigo-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate text-sm leading-tight">
                        {contract.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-xs text-slate-500">
                          {contractTypeNames[contract.type] || contract.type}
                        </span>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-xs text-slate-400">{formatDate(contract.createdAt)}</span>
                        {contract.riskScore !== undefined && (
                          <>
                            <span className="text-slate-300 text-xs">·</span>
                            <span className={`text-xs font-medium ${
                              contract.riskScore >= 70 ? "text-green-600" : contract.riskScore >= 40 ? "text-amber-600" : "text-red-600"
                            }`}>
                              {contract.riskScore}%
                            </span>
                          </>
                        )}
                        {getExpiryBadge(contract.expiresAt)}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="hidden sm:flex items-center flex-shrink-0 mr-1">
                      {sidebarFilter === "signed" ? (
                        contract.status === "signed" ? (
                          <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                            <CheckCircle2 className="w-3 h-3" />
                            Firmado
                          </span>
                        ) : (contract.signatures?.length ?? 0) > 0 ? (
                          <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
                            <Clock className="w-3 h-3" />
                            {contract.signatures!.length}/2 firmas
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                            <PenLine className="w-3 h-3" />
                            Sin firmar
                          </span>
                        )
                      ) : (
                        <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                          contract.status === "completed" ? "bg-green-50 text-green-700 border border-green-100"
                          : contract.status === "analyzed" ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : contract.status === "signed" ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            contract.status === "completed" ? "bg-green-500"
                            : contract.status === "analyzed" ? "bg-blue-500"
                            : contract.status === "signed" ? "bg-indigo-500"
                            : "bg-amber-500"
                          }`} />
                          {contract.status === "completed" ? "Completado"
                            : contract.status === "analyzed" ? "Analizado"
                            : contract.status === "signed" ? "Firmado"
                            : "Borrador"}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Actions menu */}
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setMenuOpenUp(rect.bottom + 280 > window.innerHeight);
                        setOpenMenu(openMenu === contract.id ? null : contract.id);
                      }}
                      className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {openMenu === contract.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`absolute right-0 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 ${menuOpenUp ? "bottom-full mb-1" : "top-full mt-1"}`}
                      >
                        <Link
                          href={`/dashboard/contracts/${contract.id}`}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700"
                          onClick={() => setOpenMenu(null)}
                        >
                          <Eye className="w-4 h-4 text-slate-400" />
                          Ver contrato
                        </Link>
                        <button onClick={() => handleCopy(contract)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 w-full">
                          <Copy className="w-4 h-4 text-slate-400" />
                          Copiar texto
                        </button>
                        <button onClick={() => handleDownload(contract)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 w-full">
                          <Download className="w-4 h-4 text-slate-400" />
                          Descargar
                        </button>
                        <div className="my-1 border-t border-slate-100" />
                        <button onClick={() => handleShare(contract)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 w-full">
                          <Link2 className="w-4 h-4 text-slate-400" />
                          {copiedId === contract.id ? "¡Copiado!" : "Compartir link"}
                        </button>
                        <button onClick={() => handleClone(contract)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 w-full">
                          <FileText className="w-4 h-4 text-slate-400" />
                          Clonar
                        </button>
                        <div className="my-1 border-t border-slate-100" />
                        <button onClick={() => handleDelete(contract.id)} className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-sm text-red-600 w-full">
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 text-center py-16 px-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              {sidebarFilter === "expiring"
                ? "Sin vencimientos próximos"
                : searchTerm || filterType !== "all"
                ? "No se encontraron contratos"
                : "No tienes contratos aún"}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {searchTerm || filterType !== "all"
                ? "Intenta con otros filtros de búsqueda"
                : "Crea tu primer contrato para empezar"}
            </p>
            {!searchTerm && filterType === "all" && (
              <Link href="/generate">
                <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                  Crear primer contrato
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function ContractsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ContractsPageContent />
    </Suspense>
  );
}
