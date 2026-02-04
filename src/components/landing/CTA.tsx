"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-[2.5rem] p-12 md:p-20"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Shield className="w-4 h-4" />
              <span>Protección garantizada</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Protege tu negocio{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                desde hoy
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              No esperes a tener un problema legal. Empieza gratis y genera
              tu primer contrato profesional en menos de 2 minutos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generate">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-slate-100"
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  Generar mi primer contrato
                </Button>
              </Link>
              <Link href="/analyze">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-2 border-white/20 hover:bg-white/10"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Analizar un contrato
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Cancela cuando quieras</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Soporte en español</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
