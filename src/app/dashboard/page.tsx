"use client";

import { Card } from "@/components/ui/Card";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { getUserContracts, getUserStats } from "@/lib/contracts-storage";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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
  const [stats, setStats] = useState({ totalContracts: 0, completedContracts: 0, analyzedContracts: 0, draftContracts: 0 });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      const userContracts = getUserContracts(user.id);
      setContracts(userContracts.slice(0, 5));
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
    {
      label: "Tiempo ahorrado",
      value: `${stats.totalContracts * 2}h`,
      change: "estimado",
      icon: Clock,
      color: "green",
    },
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
    const now = new Date();
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
  };

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
                  {parseInt(stat.value) > 0 && <TrendingUp className="w-5 h-5 text-green-500" />}
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

            {contracts.length > 0 ? (
              <div className="space-y-4">
                {contracts.map((contract) => (
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
                        {contractTypeNames[contract.type] || contract.type} · {formatDate(contract.createdAt)}
                      </p>
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
                      <span className="text-sm text-slate-500 capitalize">
                        {contract.status === "completed"
                          ? "Completado"
                          : contract.status === "analyzed"
                          ? "Analizado"
                          : "Borrador"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 mb-4">
                  Aún no has creado ningún contrato
                </p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  Crear tu primer contrato
                </Link>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
