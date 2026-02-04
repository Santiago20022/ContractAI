"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function Hero() {
  const features = [
    "Genera contratos en segundos",
    "Detecta cláusulas peligrosas",
    "100% en español",
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tu abogado de bolsillo con IA</span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Contratos legales{" "}
              <span className="gradient-text">sin complicaciones</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-slate-600 mb-8 max-w-lg">
              Genera, analiza y comprende cualquier contrato en segundos.
              Protege tu negocio sin necesidad de ser abogado.
            </p>

            {/* Features list */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/generate">
                <Button variant="primary" size="lg" icon={<Sparkles className="w-5 h-5" />}>
                  Generar contrato gratis
                </Button>
              </Link>
              <Link href="/analyze">
                <Button variant="secondary" size="lg" icon={<Shield className="w-5 h-5" />}>
                  Analizar mi contrato
                </Button>
              </Link>
            </div>

            {/* Trust badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-sm text-slate-500 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-green-500" />
              Usado por más de 10,000 freelancers y emprendedores
            </motion.p>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 p-8 border border-slate-100">
              {/* Contract preview header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-slate-400 font-medium">contrato_servicios.pdf</span>
              </div>

              {/* Contract preview content */}
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-5/6" />

                {/* Highlighted clause */}
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Cláusula detectada</p>
                      <p className="text-xs text-amber-600 mt-1">
                        Esta cláusula podría limitar tus derechos de propiedad intelectual.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-2/3" />
              </div>

              {/* Analysis result */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-800">Análisis completado</p>
                      <p className="text-xs text-green-600">3 sugerencias de mejora</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Generado en</p>
                  <p className="text-lg font-bold text-slate-800">12 seg</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Protección</p>
                  <p className="text-lg font-bold text-green-600">98%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
