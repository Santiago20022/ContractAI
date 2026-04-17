"use client";

import { Card } from "@/components/ui/Card";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { getUserContracts, getUserStats } from "@/lib/contracts-storage";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  Plus,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [contracts, setContracts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalContracts: 0,
    completedContracts: 0,
    analyzedContracts: 0,
    draftContracts: 0,
    signedContracts: 0,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      const userContracts = getUserContracts(user.id);
      setContracts(userContracts); // load ALL contracts for expiry check
      setStats(getUserStats(user.id));
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  // Expiry logic — contracts expiring within 60 days (or already expired)
  const now = new Date();
  const expiringContracts = contracts.filter((c) => {
    if (!c.expiresAt) return false;
    const expiry = new Date(c.expiresAt);
    const daysLeft = Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysLeft <= 60;
  });

  const getDaysLeft = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    return Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getExpiryLabel = (daysLeft: number) => {
    if (daysLeft <= 0) return `Expiró hace ${Math.abs(daysLeft)} días`;
    if (daysLeft === 0) return "Vence hoy";
    return `Vence en ${daysLeft} días`;
  };

  const getExpiryColorClass = (daysLeft: number) => {
    if (daysLeft <= 0) return "text-red-600 bg-red-50";
    if (daysLeft <= 7) return "text-red-600 bg-red-50";
    if (daysLeft <= 30) return "text-amber-600 bg-amber-50";
    return "text-green-600 bg-green-50";
  };

  const signedContracts = stats.signedContracts ?? 0;

  const statsData = [
    {
      label: "Contratos creados",
      value: stats.totalContracts.toString(),
      change: `${stats.completedContracts} completados`,
      icon: FileText,
      color: "indigo",
    },
    {
      label: "Contratos analizados",
      value: stats.analyzedContracts.toString(),
      change: "documentos revisados",
      icon: Search,
      color: "purple",
    },
    {
      label: "Borradores",
      value: stats.draftContracts.toString(),
      change: "pendientes",
      icon: Shield,
      color: "amber",
    },
    ...(signedContracts > 0
      ? [
          {
            label: "Firmados",
            value: signedContracts.toString(),
            change: "contratos firmados",
            icon: CheckCircle2,
            color: "green",
          },
        ]
      : [
          {
            label: "Tiempo ahorrado",
            value: `${stats.totalContracts * 2}h`,
            change: "estimado",
            icon: Clock,
            color: "green",
          },
        ]),
  ];

  const quickActions = [
    {
      title: "Generar contrato",
      description: "Crea un nuevo contrato personalizado",
      icon: Sparkles,
      href: "/generate",
      color: "indigo",
    },
    {
      title: "Analizar contrato",
      description: "Revisa un contrato existente",
      icon: Search,
      href: "/analyze",
      color: "purple",
    },
  ];

  const colorClasses = {
    indigo: "bg-indigo-100 text-indigo-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-green-100 text-green-600",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString("es-ES");
  };

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

  // Only show last 5 in recent list
  const recentContracts = contracts.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                ¡Hola, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-indigo-100 max-w-lg">
                {contracts.length === 0
                  ? "Bienvenido a ContractAI. Crea tu primer contrato para empezar."
                  : `Tienes ${stats.totalContracts} contratos en tu cuenta. Tu negocio está protegido.`}
              </p>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex-shrink-0"
            >
              <Plus className="w-5 h-5" />
              Nuevo contrato
            </Link>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      colorClasses[stat.color as keyof typeof colorClasses]
                    }`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  {parseInt(stat.value) > 0 && (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                  <p className="text-xs text-green-600 mt-2">{stat.change}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Expiry alerts */}
        {expiringContracts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="border-amber-200 bg-amber-50/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Contratos próximos a vencer
                  </h2>
                  <p className="text-xs text-slate-500">
                    {expiringContracts.length}{" "}
                    {expiringContracts.length === 1
                      ? "contrato requiere atención"
                      : "contratos requieren atención"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {expiringContracts.map((contract) => {
                  const daysLeft = getDaysLeft(contract.expiresAt);
                  const colorClass = getExpiryColorClass(daysLeft);
                  return (
                    <Link
                      key={contract.id}
                      href={`/dashboard/contracts/${contract.id}`}
                      className="flex items-center justify-between gap-4 p-3 bg-white rounded-xl border border-slate-100 hover:border-amber-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-800 truncate">
                          {contract.title}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${colorClass}`}
                      >
                        {getExpiryLabel(daysLeft)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Quick actions */}
        <div className="grid md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link href={action.href}>
                <Card hover className="h-full">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        colorClasses[action.color as keyof typeof colorClasses]
                      }`}
                    >
                      <action.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent contracts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Contratos recientes
              </h2>
              <Link
                href="/dashboard/contracts"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                Ver todos
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {recentContracts.length > 0 ? (
              <div className="space-y-4">
                {recentContracts.map((contract) => (
                  <Link
                    key={contract.id}
                    href={`/dashboard/contracts/${contract.id}`}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">
                        {contract.title}
                      </p>
                      <p className="text-sm text-slate-500">
                        {contractTypeNames[contract.type] || contract.type} ·{" "}
                        {formatDate(contract.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          contract.status === "completed"
                            ? "bg-green-500"
                            : contract.status === "analyzed"
                            ? "bg-blue-500"
                            : contract.status === "signed"
                            ? "bg-indigo-500"
                            : "bg-amber-500"
                        }`}
                      />
                      <span className="text-sm text-slate-500 capitalize">
                        {contract.status === "completed"
                          ? "Completado"
                          : contract.status === "analyzed"
                          ? "Analizado"
                          : contract.status === "signed"
                          ? "Firmado"
                          : "Borrador"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-8">
                {/* Welcome card */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Crea tu primer contrato en 2 minutos
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
                    ContractAI genera contratos profesionales personalizados para
                    tu situación específica.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/generate"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generar contrato
                    </Link>
                    <Link
                      href="/analyze"
                      className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:border-indigo-300 transition-all"
                    >
                      <Search className="w-4 h-4" />
                      Analizar un contrato
                    </Link>
                  </div>
                </div>

                {/* Getting started checklist */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Primeros pasos
                  </p>
                  {[
                    { done: true, label: "Crear tu cuenta", href: null },
                    {
                      done: false,
                      label: "Generar tu primer contrato",
                      href: "/generate",
                    },
                    {
                      done: false,
                      label: "Analizar un contrato existente",
                      href: "/analyze",
                    },
                    {
                      done: false,
                      label: "Explorar la API pública",
                      href: "/developers",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        item.done ? "bg-green-50" : "bg-white border border-slate-100"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.done ? "bg-green-500" : "bg-slate-100"
                        }`}
                      >
                        {item.done ? (
                          <Check className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm text-slate-700 hover:text-indigo-600 font-medium transition-colors flex-1"
                        >
                          {item.label} &rarr;
                        </Link>
                      ) : (
                        <span className="text-sm text-slate-500 flex-1">
                          {item.label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
