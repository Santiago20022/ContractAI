"use client";

import { generateContract } from "@/lib/contract-templates";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DEMO_TYPES = [
  { id: "services", label: "Servicios" },
  { id: "nda", label: "NDA" },
  { id: "employment", label: "Contrato Laboral" },
];

export function LiveDemo() {
  const [selectedType, setSelectedType] = useState("services");
  const [partyA, setPartyA] = useState("");
  const [partyB, setPartyB] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!partyA || !partyB) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 800));
    const contract = generateContract(selectedType, {
      partyA,
      partyB,
      description: "Servicios profesionales según acuerdo",
      amount: "A convenir",
      duration: "3 meses",
      additionalClauses: "",
    });
    setPreview(contract);
    setIsGenerating(false);
  };

  const visibleText = preview?.slice(0, 500) ?? "";
  const hiddenText = preview?.slice(500, 1200) ?? "";

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            Demo en vivo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pruébalo ahora, sin registrarte
          </h2>
          <p className="text-slate-400 text-lg">
            Genera un contrato de muestra en segundos
          </p>
        </motion.div>

        {/* Demo card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800 rounded-3xl border border-slate-700 p-8"
        >
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Type selector */}
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-3 block">
                    Tipo de contrato
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {DEMO_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedType(t.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedType === t.id
                            ? "bg-indigo-500 text-white"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Names */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Tu nombre o empresa
                    </label>
                    <input
                      value={partyA}
                      onChange={(e) => setPartyA(e.target.value)}
                      placeholder="Ej: María García"
                      className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Nombre del cliente
                    </label>
                    <input
                      value={partyB}
                      onChange={(e) => setPartyB(e.target.value)}
                      placeholder="Ej: Empresa XYZ"
                      className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!partyA || !partyB || isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generar preview gratis
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-green-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                    Contrato generado
                  </p>
                  <button
                    onClick={() => setPreview(null)}
                    className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Generar otro &rarr;
                  </button>
                </div>

                {/* Preview with blur */}
                <div className="relative bg-slate-900 rounded-2xl p-6 font-mono text-xs text-slate-300 leading-relaxed max-h-[300px] overflow-hidden">
                  <pre className="whitespace-pre-wrap">{visibleText}</pre>
                  {hiddenText && (
                    <div className="absolute bottom-0 left-0 right-0">
                      <pre className="whitespace-pre-wrap blur-sm select-none text-slate-400 px-6">
                        {hiddenText}
                      </pre>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/80 to-transparent" />
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
                  <Lock className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                  <p className="text-white font-semibold mb-1">Ver el contrato completo</p>
                  <p className="text-slate-400 text-sm mb-4">
                    Regístrate gratis para descargar en PDF y guardar todos tus contratos
                  </p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
                  >
                    Crear cuenta gratis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
