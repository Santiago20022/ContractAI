"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Braces,
  Check,
  Copy,
  ExternalLink,
  FileText,
  List,
  Rocket,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// ─── Syntax-highlighted code blocks ──────────────────────────────────────────

function CodeBlock({
  code,
  label,
  lang = "json",
}: {
  code: string;
  label?: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          {label && (
            <span className="text-slate-400 text-xs font-mono">{label}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto">
        <code className={`language-${lang} font-mono text-sm leading-relaxed text-slate-300`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

// ─── Endpoint card ────────────────────────────────────────────────────────────

type EndpointCardProps = {
  method: "POST" | "GET";
  path: string;
  description: string;
  icon: React.ReactNode;
  requestCode?: string;
  responseCode: string;
  index: number;
};

function EndpointCard({
  method,
  path,
  description,
  icon,
  requestCode,
  responseCode,
  index,
}: EndpointCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3 flex-1">
            <span
              className={cn(
                "px-3 py-1 rounded-lg text-sm font-mono font-bold",
                method === "POST"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-green-100 text-green-700"
              )}
            >
              {method}
            </span>
            <code className="text-slate-700 font-mono text-sm font-medium">
              {path}
            </code>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            {icon}
            <span className="text-sm">{description}</span>
          </div>
        </div>

        {/* Code columns */}
        <div className={cn("grid gap-4", requestCode ? "md:grid-cols-2" : "")}>
          {requestCode && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Request body
              </p>
              <CodeBlock code={requestCode} label="request.json" />
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Response 200
            </p>
            <CodeBlock code={responseCode} label="response.json" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const fetchExample = `const response = await fetch("https://tuapp.com/api/v1/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "tu-api-key-aqui"
  },
  body: JSON.stringify({
    type: "services",
    data: {
      partyA: "María García López",
      partyB: "Empresa XYZ S.L.",
      description: "Diseño de identidad visual corporativa",
      amount: "2.500€",
      duration: "3 meses",
      city: "Madrid"
    }
  })
});

const contract = await response.json();
console.log(contract.content); // texto completo del contrato`;

const curlExample = `curl -X POST https://tuapp.com/api/v1/generate \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: tu-api-key-aqui" \\
  -d '{
    "type": "services",
    "data": {
      "partyA": "María García López",
      "partyB": "Empresa XYZ S.L.",
      "description": "Diseño de identidad visual corporativa",
      "amount": "2.500€",
      "duration": "3 meses",
      "city": "Madrid"
    }
  }'`;

const endpoints = [
  {
    method: "POST" as const,
    path: "/api/v1/generate",
    description: "Genera un contrato profesional",
    icon: <Zap className="w-4 h-4" />,
    requestCode: `{
  "type": "services",
  "data": {
    "partyA": "María García",
    "partyB": "Empresa XYZ S.L.",
    "description": "Desarrollo web",
    "amount": "3.000€",
    "duration": "2 meses",
    "city": "Madrid"
  }
}`,
    responseCode: `{
  "content": "═══════════════...",
  "type": "services",
  "generatedAt": "2026-04-10T12:00:00Z",
  "wordCount": 847
}`,
  },
  {
    method: "POST" as const,
    path: "/api/v1/analyze",
    description: "Detecta cláusulas de riesgo",
    icon: <Search className="w-4 h-4" />,
    requestCode: `{
  "content": "CONTRATO DE SERVICIOS... responsabilidad ilimitada e indemnizar sin límite..."
}`,
    responseCode: `{
  "score": 60,
  "riskLevel": "medium",
  "findings": [
    {
      "id": 1,
      "title": "Responsabilidad ilimitada",
      "risk": "high",
      "suggestion": "Establece un límite..."
    }
  ],
  "analyzedAt": "2026-04-10T12:00:00Z",
  "charCount": 4821
}`,
  },
  {
    method: "GET" as const,
    path: "/api/v1/contracts/types",
    description: "Lista los tipos disponibles",
    icon: <List className="w-4 h-4" />,
    responseCode: `{
  "types": [
    {
      "id": "services",
      "label": "Prestación de Servicios",
      "description": "Contrato entre prestador y cliente"
    },
    {
      "id": "nda",
      "label": "Acuerdo de Confidencialidad",
      "description": "NDA para proteger información"
    }
    // ...6 más
  ],
  "total": 8
}`,
  },
];

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<"fetch" | "curl">("fetch");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-800">ContractAI</span>
            </Link>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Braces className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            API de{" "}
            <span className="gradient-text">ContractAI</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Integra la generación y análisis de contratos directamente en tu aplicación.
            Simples, rápidos y listos para usar.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm font-medium">
              REST API
            </span>
            <span className="bg-emerald-100 text-emerald-700 rounded-full px-4 py-1.5 text-sm font-medium">
              JSON
            </span>
            <span className="bg-slate-100 text-slate-600 rounded-full px-4 py-1.5 text-sm font-medium">
              v1.0
            </span>
          </div>
        </motion.div>

        {/* ── Autenticación ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold text-slate-900">Autenticación</h2>
          </div>
          <Card>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Todos los endpoints requieren el header{" "}
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-sm font-mono text-indigo-700">
                    X-API-Key
                  </code>{" "}
                  con tu clave secreta. Sin ella, recibirás un{" "}
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-sm font-mono">
                    401 Unauthorized
                  </code>.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Nunca expongas tu API key en el frontend. Úsala siempre desde
                    un servidor o variables de entorno.
                  </p>
                </div>
              </div>
              <CodeBlock
                code={`// Header requerido en cada request\nX-API-Key: tu-api-key-secreta\n\n// Configurar en .env\nCONTRACTAI_API_KEY=tu-api-key-secreta`}
                label=".env + header"
                lang="bash"
              />
            </div>
          </Card>
        </motion.section>

        {/* ── Endpoints ── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Braces className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold text-slate-900">Endpoints</h2>
          </motion.div>
          <div className="space-y-6">
            {endpoints.map((ep, i) => (
              <EndpointCard key={ep.path} {...ep} index={i} />
            ))}
          </div>
        </section>

        {/* ── Primeros pasos ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold text-slate-900">Primeros pasos</h2>
          </div>

          {/* Tab switcher */}
          <div className="bg-slate-100 rounded-xl p-1 inline-flex gap-1 mb-4">
            {(["fetch", "curl"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2 text-sm font-medium rounded-lg transition-all",
                  activeTab === tab
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CodeBlock
                code={activeTab === "fetch" ? fetchExample : curlExample}
                label={activeTab === "fetch" ? "example.js" : "example.sh"}
                lang={activeTab === "fetch" ? "javascript" : "bash"}
              />
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* ── Errores ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold text-slate-900">Errores</h2>
          </div>
          <Card>
            <p className="text-slate-600 mb-4">Todos los errores tienen el mismo formato:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <CodeBlock
                code={`{
  "error": "Field 'type' is required",
  "code": "invalid_request"
}`}
                label="error.json"
              />
              <div className="space-y-3">
                {[
                  { status: "400", code: "invalid_request", desc: "Campo faltante o inválido" },
                  { status: "400", code: "invalid_type", desc: "Tipo de contrato no existe" },
                  { status: "400", code: "missing_content", desc: "Contenido vacío en /analyze" },
                  { status: "401", code: "unauthorized", desc: "API key inválida o ausente" },
                  { status: "500", code: "internal_error", desc: "Error inesperado del servidor" },
                ].map((err) => (
                  <div key={err.code} className="flex items-center gap-3 text-sm">
                    <span className={cn(
                      "px-2 py-0.5 rounded font-mono font-bold text-xs",
                      err.status === "401" ? "bg-red-100 text-red-700" :
                      err.status === "500" ? "bg-orange-100 text-orange-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {err.status}
                    </span>
                    <code className="text-indigo-600 font-mono">{err.code}</code>
                    <span className="text-slate-500">{err.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para integrar?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
            Regístrate gratis, obtén tu API key y empieza a generar contratos
            en minutos desde tu propia aplicación.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button variant="secondary" size="lg" icon={<ExternalLink className="w-5 h-5" />}>
                Crear cuenta gratis
              </Button>
            </Link>
            <Link
              href="/"
              className="text-white underline underline-offset-4 hover:text-indigo-100 transition-colors self-center text-sm"
            >
              Ver la plataforma →
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
