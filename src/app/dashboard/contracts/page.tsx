"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { getUserContracts, deleteContract, Contract } from "@/lib/contracts-storage";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Download,
  Eye,
  FileCheck,
  FileText,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContractsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setContracts(getUserContracts(user.id));
    }
  }, [user]);

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este contrato?")) {
      deleteContract(id);
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
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || contract.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Mis Contratos</h1>
            <p className="text-slate-600">
              {contracts.length} {contracts.length === 1 ? "contrato" : "contratos"} en total
            </p>
          </div>
          <Link href="/generate">
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              Nuevo contrato
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar contratos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
          >
            <option value="all">Todos los tipos</option>
            {Object.entries(contractTypeNames).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </Card>

        {/* Contracts list */}
        {filteredContracts.length > 0 ? (
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredContracts.map((contract, index) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileCheck className="w-6 h-6 text-indigo-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">
                          {contract.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span className="bg-slate-100 px-2 py-0.5 rounded">
                            {contractTypeNames[contract.type] || contract.type}
                          </span>
                          <span>{formatDate(contract.createdAt)}</span>
                          {contract.riskScore !== undefined && (
                            <span
                              className={`px-2 py-0.5 rounded ${
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
                        <span
                          className={`w-2 h-2 rounded-full ${
                            contract.status === "completed"
                              ? "bg-green-500"
                              : contract.status === "analyzed"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                          }`}
                        />
                        <span className="text-sm text-slate-500 hidden sm:block">
                          {contract.status === "completed"
                            ? "Completado"
                            : contract.status === "analyzed"
                            ? "Analizado"
                            : "Borrador"}
                        </span>
                      </div>

                      {/* Actions menu */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === contract.id ? null : contract.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-slate-400" />
                        </button>

                        {openMenu === contract.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-10"
                          >
                            <Link
                              href={`/dashboard/contracts/${contract.id}`}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700"
                              onClick={() => setOpenMenu(null)}
                            >
                              <Eye className="w-4 h-4" />
                              Ver contrato
                            </Link>
                            <button
                              onClick={() => handleCopy(contract)}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 w-full"
                            >
                              <Copy className="w-4 h-4" />
                              Copiar
                            </button>
                            <button
                              onClick={() => handleDownload(contract)}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 w-full"
                            >
                              <Download className="w-4 h-4" />
                              Descargar
                            </button>
                            <hr className="my-2 border-slate-100" />
                            <button
                              onClick={() => handleDelete(contract.id)}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full"
                            >
                              <Trash2 className="w-4 h-4" />
                              Eliminar
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Card className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {searchTerm || filterType !== "all"
                ? "No se encontraron contratos"
                : "No tienes contratos aún"}
            </h3>
            <p className="text-slate-600 mb-6">
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
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
