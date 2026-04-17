"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { getUserSettings, saveUserSettings, UserSettings } from "@/lib/user-settings";
import { updateUserName } from "@/lib/auth";
import { getUserContracts } from "@/lib/contracts-storage";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Key,
  Lock,
  Mail,
  Palette,
  PenLine,
  Phone,
  Shield,
  Sliders,
  Star,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "contratos", label: "Contratos", icon: FileText },
  { id: "apariencia", label: "Apariencia", icon: Palette },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "seguridad", label: "Seguridad", icon: Lock },
  { id: "api", label: "API & Datos", icon: Key },
  { id: "plan", label: "Plan", icon: Star },
  { id: "peligro", label: "Zona de peligro", icon: Trash2 },
];

const ACCENT_COLORS = [
  { id: "indigo", label: "Índigo", bg: "bg-indigo-500", ring: "ring-indigo-500" },
  { id: "violet", label: "Violeta", bg: "bg-violet-500", ring: "ring-violet-500" },
  { id: "blue", label: "Azul", bg: "bg-blue-500", ring: "ring-blue-500" },
  { id: "emerald", label: "Esmeralda", bg: "bg-emerald-500", ring: "ring-emerald-500" },
  { id: "rose", label: "Rosa", bg: "bg-rose-500", ring: "ring-rose-500" },
  { id: "amber", label: "Ámbar", bg: "bg-amber-500", ring: "ring-amber-500" },
];

const CURRENCIES = ["COP", "USD", "EUR", "MXN", "ARS", "CLP", "PEN", "BRL", "UYU"];
const JURISDICTIONS = ["Colombia", "México", "Argentina", "Chile", "Perú", "España", "Costa Rica", "Ecuador", "Venezuela", "Panamá", "Bolivia", "Paraguay", "Uruguay"];
const COUNTRIES = ["Colombia", "México", "Argentina", "Chile", "Perú", "España", "Estados Unidos", "Costa Rica", "Ecuador", "Venezuela", "Panamá", "Bolivia", "Paraguay", "Uruguay", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Cuba", "República Dominicana"];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? "bg-indigo-600" : "bg-slate-200"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function SectionHeader({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6 pb-4 border-b border-slate-100">
      <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>
        {desc && <p className="text-xs text-slate-500 mt-0.5">{desc}</p>}
      </div>
    </div>
  );
}

function FieldRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-50 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("perfil");
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  // Profile fields
  const [displayName, setDisplayName] = useState("");
  const [nameEditing, setNameEditing] = useState(false);

  // Security fields
  const [showPassForm, setShowPassForm] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState(false);

  // API key copied
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      const s = getUserSettings();
      setSettings(s);
      setDisplayName(user.name);
    }
  }, [user]);

  if (isLoading || !user || !settings) return null;

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveUserSettings({ [key]: value });
  };

  const flashSaved = (section: string) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 2000);
  };

  const handleSaveName = () => {
    if (displayName.trim().length < 2) return;
    updateUserName(user.id, displayName);
    setNameEditing(false);
    flashSaved("perfil");
  };

  const handleChangePassword = async () => {
    setPassError("");
    if (newPass.length < 6) { setPassError("La nueva contraseña debe tener al menos 6 caracteres"); return; }
    if (newPass !== confirmPass) { setPassError("Las contraseñas no coinciden"); return; }

    const { login, updatePassword } = await import("@/lib/auth");
    const check = login(user.email, currentPass);
    if (!check.success) { setPassError("La contraseña actual es incorrecta"); return; }
    const result = updatePassword(user.email, newPass);
    if (result.success) {
      setPassSuccess(true);
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      setShowPassForm(false);
      setTimeout(() => setPassSuccess(false), 3000);
    } else {
      setPassError(result.error || "Error al cambiar la contraseña");
    }
  };

  const handleExportData = () => {
    const contracts = getUserContracts(user.id);
    const data = { user: { name: user.name, email: user.email, createdAt: user.createdAt }, settings, contracts, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contractai-datos-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (confirm("¿Estás seguro? Esta acción eliminará tu cuenta y todos tus datos permanentemente. No se puede deshacer.")) {
      localStorage.clear();
      logout();
      router.push("/");
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(`contractai_${user.id}`);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const inputCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 bg-white text-slate-700";
  const selectCls = "px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 bg-white text-slate-700";

  const renderSection = () => {
    switch (activeSection) {

      case "perfil":
        return (
          <Card>
            <SectionHeader icon={User} title="Perfil" desc="Tu información personal y de empresa" />

            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                {nameEditing ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSaveName(); if (e.key === "Escape") { setNameEditing(false); setDisplayName(user.name); } }}
                      className="flex-1 text-sm font-semibold border border-indigo-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button onClick={handleSaveName} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700">Guardar</button>
                    <button onClick={() => { setNameEditing(false); setDisplayName(user.name); }} className="text-slate-500 px-2 py-1.5 rounded-lg text-xs hover:bg-slate-200">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{displayName}</p>
                    <button onClick={() => setNameEditing(true)} className="text-xs text-indigo-500 hover:text-indigo-700 underline">Editar</button>
                  </div>
                )}
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5"><Mail className="w-3.5 h-3.5" />{user.email}</p>
              </div>
            </div>

            <div className="space-y-0">
              <FieldRow label="Empresa / Organización" desc="Aparece en el pie de contratos">
                <input value={settings.companyName} onChange={(e) => updateSetting("companyName", e.target.value)} placeholder="Tu empresa S.A." className={inputCls + " w-44"} />
              </FieldRow>
              <FieldRow label="Cargo / Título" desc="Tu rol profesional">
                <input value={settings.jobTitle} onChange={(e) => updateSetting("jobTitle", e.target.value)} placeholder="CEO, Abogado, Freelancer..." className={inputCls + " w-44"} />
              </FieldRow>
              <FieldRow label="Teléfono" desc="Para contacto en contratos">
                <input value={settings.phone} onChange={(e) => updateSetting("phone", e.target.value)} placeholder="+57 300 000 0000" className={inputCls + " w-44"} />
              </FieldRow>
              <FieldRow label="País" desc="Tu país de residencia">
                <select value={settings.country} onChange={(e) => updateSetting("country", e.target.value)} className={selectCls}>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </FieldRow>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 flex items-center gap-3">
              <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-indigo-900">Plan Gratuito</p>
                <p className="text-xs text-indigo-600">Contratos ilimitados · IA · Firma electrónica · PDF</p>
              </div>
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Mejorar <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <AnimatePresence>
              {savedSection === "perfil" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Cambios guardados
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );

      case "contratos":
        return (
          <Card>
            <SectionHeader icon={FileText} title="Preferencias de contratos" desc="Valores por defecto al generar nuevos contratos" />
            <div className="space-y-0">
              <FieldRow label="Ciudad por defecto" desc="Pre-rellena el campo ciudad al generar">
                <input value={settings.defaultCity} onChange={(e) => updateSetting("defaultCity", e.target.value)} placeholder="Bogotá" className={inputCls + " w-36"} />
              </FieldRow>
              <FieldRow label="Moneda por defecto" desc="Para monto y valores económicos">
                <select value={settings.defaultCurrency} onChange={(e) => updateSetting("defaultCurrency", e.target.value)} className={selectCls}>
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </FieldRow>
              <FieldRow label="Jurisdicción por defecto" desc="País de ley aplicable en contratos">
                <select value={settings.defaultJurisdiction} onChange={(e) => updateSetting("defaultJurisdiction", e.target.value)} className={selectCls}>
                  {JURISDICTIONS.map((j) => <option key={j} value={j}>{j}</option>)}
                </select>
              </FieldRow>
              <FieldRow label="Nombre para firma" desc="Pre-rellena el campo de nombre al firmar">
                <input value={settings.signatureName} onChange={(e) => updateSetting("signatureName", e.target.value)} placeholder={user.name} className={inputCls + " w-44"} />
              </FieldRow>
              <FieldRow label="Formato de fecha" desc="Cómo se muestran las fechas en contratos">
                <select value={settings.dateFormat} onChange={(e) => updateSetting("dateFormat", e.target.value)} className={selectCls}>
                  <option value="dd/MM/yyyy">DD/MM/AAAA</option>
                  <option value="MM/dd/yyyy">MM/DD/AAAA</option>
                  <option value="yyyy-MM-dd">AAAA-MM-DD</option>
                  <option value="long">17 de abril de 2026</option>
                </select>
              </FieldRow>
            </div>
            <p className="text-xs text-slate-400 mt-4">Los cambios se aplican automáticamente en el próximo contrato que generes.</p>
          </Card>
        );

      case "apariencia":
        return (
          <Card>
            <SectionHeader icon={Palette} title="Apariencia" desc="Personaliza el color de la interfaz" />
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Color de acento</p>
                <div className="flex gap-3 flex-wrap">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => updateSetting("accentColor", color.id)}
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <div className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center transition-all ${settings.accentColor === color.id ? `ring-2 ring-offset-2 ${color.ring} scale-110` : "hover:scale-105 opacity-70"}`}>
                        {settings.accentColor === color.id && <Check className="w-5 h-5 text-white" />}
                      </div>
                      <span className="text-xs text-slate-500">{color.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">La personalización de color estará disponible en la próxima actualización.</p>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <p className="text-sm font-medium text-slate-700 mb-1">Tema</p>
                <p className="text-xs text-slate-400 mb-3">Modo oscuro disponible próximamente.</p>
                <div className="flex gap-3">
                  {[{ id: "light", label: "Claro" }, { id: "dark", label: "Oscuro" }, { id: "system", label: "Sistema" }].map((t) => (
                    <button key={t.id} disabled={t.id !== "light"} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${t.id === "light" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-200 text-slate-400 cursor-not-allowed"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <p className="text-sm font-medium text-slate-700 mb-3">Densidad de contenido</p>
                <div className="flex gap-3">
                  {[{ id: "comfortable", label: "Cómodo" }, { id: "compact", label: "Compacto" }].map((d) => (
                    <button key={d.id} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${d.id === "comfortable" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        );

      case "notificaciones":
        return (
          <Card>
            <SectionHeader icon={Bell} title="Notificaciones" desc="Elige qué eventos te notificamos" />
            <div className="space-y-0">
              {[
                { key: "notifExpiry" as const, label: "Alertas de vencimiento", desc: "Cuando un contrato vence en menos de 30 días" },
                { key: "notifSigned" as const, label: "Contratos firmados", desc: "Cuando una parte completa su firma electrónica" },
                { key: "notifWeeklyReport" as const, label: "Reporte semanal", desc: "Resumen de actividad de tu cuenta cada lunes" },
              ].map((item) => (
                <FieldRow key={item.key} label={item.label} desc={item.desc}>
                  <Toggle value={settings[item.key]} onChange={(v) => updateSetting(item.key, v)} />
                </FieldRow>
              ))}
              <div className="pt-4">
                <FieldRow label="Análisis y mejoras" desc="Ayúdanos a mejorar ContractAI con datos anónimos de uso">
                  <Toggle value={settings.analyticsEnabled} onChange={(v) => updateSetting("analyticsEnabled", v)} />
                </FieldRow>
              </div>
            </div>
          </Card>
        );

      case "seguridad":
        return (
          <Card>
            <SectionHeader icon={Lock} title="Seguridad" desc="Gestiona tu contraseña y acceso a la cuenta" />
            <div className="space-y-4">
              {/* Change password */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Contraseña</p>
                    <p className="text-xs text-slate-400">Última actualización: Desconocida</p>
                  </div>
                  <button onClick={() => setShowPassForm(!showPassForm)} className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
                    {showPassForm ? "Cancelar" : "Cambiar"}
                  </button>
                </div>

                <AnimatePresence>
                  {showPassForm && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200">
                        <div className="relative">
                          <input type={showPass ? "text" : "password"} placeholder="Contraseña actual" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} className={inputCls + " pr-10"} />
                          <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <input type={showPass ? "text" : "password"} placeholder="Nueva contraseña (mín. 6 caracteres)" value={newPass} onChange={(e) => setNewPass(e.target.value)} className={inputCls} />
                        <input type={showPass ? "text" : "password"} placeholder="Confirmar nueva contraseña" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className={inputCls} />
                        {passError && <p className="text-xs text-red-600">{passError}</p>}
                        <Button variant="primary" onClick={handleChangePassword} className="w-full">
                          Actualizar contraseña
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {passSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-green-600 text-sm mt-2">
                      <CheckCircle2 className="w-4 h-4" /> Contraseña actualizada correctamente
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-medium text-slate-800 mb-1">Sesiones activas</p>
                <p className="text-xs text-slate-400 mb-3">Estás conectado en este navegador.</p>
                <button onClick={() => { logout(); router.push("/login"); }} className="text-sm text-red-600 font-medium hover:text-red-800 flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  Cerrar sesión en todos los dispositivos
                </button>
              </div>
            </div>
          </Card>
        );

      case "api":
        return (
          <Card>
            <SectionHeader icon={Key} title="API & Datos" desc="Accede a tus datos y usa la API pública" />
            <div className="space-y-6">
              {/* API Key */}
              <div>
                <p className="text-sm font-medium text-slate-800 mb-2">Tu API Key</p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <code className="flex-1 text-xs font-mono text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200 truncate">
                      contractai_{user.id}
                    </code>
                    <button
                      onClick={handleCopyApiKey}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${apiKeyCopied ? "bg-green-100 text-green-700" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                    >
                      {apiKeyCopied ? <><Check className="w-3.5 h-3.5" /> Copiado</> : "Copiar"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">Incluye este header en tus peticiones: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">X-API-Key: contractai_{user.id.slice(0, 8)}...</code></p>
                </div>
                <a href="/developers" className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 mt-2 font-medium">
                  Ver documentación completa <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* Export data */}
              <div className="border-t border-slate-100 pt-5">
                <p className="text-sm font-medium text-slate-800 mb-1">Exportar mis datos</p>
                <p className="text-xs text-slate-500 mb-3">Descarga todos tus contratos, análisis y configuración en formato JSON.</p>
                <button onClick={handleExportData} className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  <Download className="w-4 h-4 text-slate-500" />
                  Descargar mis datos
                </button>
              </div>

              {/* Language */}
              <div className="border-t border-slate-100 pt-5">
                <p className="text-sm font-medium text-slate-800 mb-3 flex items-center gap-2"><Globe className="w-4 h-4 text-slate-500" /> Idioma de la interfaz</p>
                <select value={settings.language} onChange={(e) => updateSetting("language", e.target.value)} className={selectCls + " w-full"}>
                  <option value="es">Español (LATAM)</option>
                  <option value="es-es">Español (España)</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>
            </div>
          </Card>
        );

      case "plan":
        return (
          <Card>
            <SectionHeader icon={Star} title="Plan & Facturación" desc="Tu suscripción actual y opciones de mejora" />
            <div className="space-y-4">
              {/* Current plan */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Plan actual</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">Gratuito</h3>
                  </div>
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                {[
                  "Contratos ilimitados generados con IA",
                  "Análisis de riesgo con Gemini",
                  "Firma electrónica simple",
                  "Export PDF profesional",
                  "13 tipos de contrato",
                  "Chat con el contrato (IA)",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 py-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pro plan */}
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-5 text-white overflow-hidden">
                <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">PRÓXIMAMENTE</div>
                <div className="mb-3">
                  <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">ContractAI</span>
                  <h3 className="text-xl font-bold mt-0.5">Pro</h3>
                  <p className="text-indigo-200 text-sm">$19/mes · o $13/mes anual</p>
                </div>
                {[
                  "Todo lo del plan gratuito",
                  "Firma electrónica avanzada con certificado",
                  "Contratos en inglés y portugués",
                  "Marca blanca en PDFs",
                  "Colaboración en tiempo real",
                  "Integraciones (Slack, Notion, Drive)",
                  "Soporte prioritario 24/7",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 py-1">
                    <Star className="w-4 h-4 text-indigo-200 flex-shrink-0" />
                    <span className="text-sm text-indigo-100">{feature}</span>
                  </div>
                ))}
                <button disabled className="mt-4 w-full bg-white/20 text-white font-semibold py-2.5 rounded-xl text-sm cursor-not-allowed opacity-60">
                  Próximamente disponible
                </button>
              </div>
            </div>
          </Card>
        );

      case "peligro":
        return (
          <Card className="border-red-200">
            <SectionHeader icon={Trash2} title="Zona de peligro" desc="Acciones irreversibles sobre tu cuenta" />
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <div>
                  <p className="text-sm font-semibold text-red-800">Eliminar todos los contratos</p>
                  <p className="text-xs text-red-600 mt-0.5">Borra todos tus contratos permanentemente. Tu cuenta queda activa.</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm("¿Eliminar TODOS tus contratos? Esta acción no se puede deshacer.")) {
                      const { getUserContracts, deleteContract } = require("@/lib/contracts-storage");
                      getUserContracts(user.id).forEach((c: { id: string }) => deleteContract(c.id, user.id));
                      alert("Contratos eliminados.");
                    }
                  }}
                  className="text-xs font-semibold text-red-700 hover:text-red-900 px-3 py-1.5 border border-red-300 rounded-lg hover:bg-red-100 transition-colors flex-shrink-0 ml-4"
                >
                  Eliminar todo
                </button>
              </div>

              <div className="flex items-start justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <div>
                  <p className="text-sm font-semibold text-red-800">Eliminar mi cuenta</p>
                  <p className="text-xs text-red-600 mt-0.5">Borra permanentemente tu cuenta, contratos y todos los datos asociados.</p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="text-xs font-semibold text-red-700 hover:text-red-900 px-3 py-1.5 border border-red-300 rounded-lg hover:bg-red-100 transition-colors flex-shrink-0 ml-4 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Eliminar
                </button>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Configuración</h1>
          <p className="text-slate-500 text-sm mt-1">Personaliza tu cuenta y preferencias de ContractAI</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Sidebar nav */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block w-52 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-2 sticky top-20">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    activeSection === section.id
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  } ${section.id === "peligro" ? "mt-2 border-t border-slate-100 pt-3" : ""}`}
                >
                  <section.icon className={`w-4 h-4 flex-shrink-0 ${section.id === "peligro" ? "text-red-400" : ""}`} />
                  {section.label}
                </button>
              ))}
            </div>
          </motion.aside>

          {/* Mobile section tabs */}
          <div className="md:hidden w-full mb-4 flex gap-2 overflow-x-auto pb-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeSection === section.id
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-0"
          >
            {renderSection()}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
