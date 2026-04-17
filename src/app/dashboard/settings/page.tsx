"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Bell,
  Globe,
  Key,
  Lock,
  Mail,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [notifExpiry, setNotifExpiry] = useState(true);
  const [notifSigned, setNotifSigned] = useState(true);
  const [language, setLanguage] = useState("es");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDeleteAccount = () => {
    if (confirm("¿Estás seguro? Esta acción eliminará tu cuenta y todos tus contratos permanentemente.")) {
      localStorage.clear();
      logout();
      router.push("/");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Configuración</h1>
          <p className="text-slate-500">Administra tu cuenta y preferencias</p>
        </motion.div>

        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">Perfil</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-lg">{user.name}</p>
                  <p className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="bg-indigo-50 rounded-xl px-4 py-3 flex items-center gap-3">
                <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-indigo-900">Plan gratuito activo</p>
                  <p className="text-xs text-indigo-600">Contratos ilimitados · Análisis IA · Firma electrónica</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* API Key */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">API & Integraciones</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tu API Key</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 text-sm font-mono text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 truncate">
                    contractai_dev_{user.id.slice(0, 16)}...
                  </code>
                  <Button variant="secondary" size="sm" onClick={() => {
                    navigator.clipboard.writeText(`contractai_dev_${user.id}`);
                  }}>
                    Copiar
                  </Button>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Usa esta key para integrar ContractAI en tus propias aplicaciones.{" "}
                <a href="/developers" className="text-indigo-600 hover:underline">Ver documentación →</a>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">Notificaciones</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Alertas de vencimiento", desc: "Cuando un contrato venza en menos de 30 días", value: notifExpiry, onChange: setNotifExpiry },
                { label: "Contratos firmados", desc: "Cuando una parte firma un contrato", value: notifSigned, onChange: setNotifSigned },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => item.onChange(!item.value)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${item.value ? "bg-indigo-600" : "bg-slate-200"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.value ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">Idioma</h2>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white text-slate-700"
            >
              <option value="es">Español (LATAM)</option>
              <option value="es-es">Español (España)</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </Card>
        </motion.div>

        {/* Save */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button variant="primary" onClick={handleSave} className="w-full">
            {saved ? "¡Guardado!" : "Guardar cambios"}
          </Button>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-red-500" />
              <h2 className="font-semibold text-red-700">Zona de peligro</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Eliminar tu cuenta borrará permanentemente todos tus contratos, análisis y configuraciones. Esta acción no se puede deshacer.
            </p>
            <Button
              variant="ghost"
              onClick={handleDeleteAccount}
              className="text-red-600 hover:bg-red-50 border border-red-200"
              icon={<Trash2 className="w-4 h-4" />}
            >
              Eliminar mi cuenta
            </Button>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
