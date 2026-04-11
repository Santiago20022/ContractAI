"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

const rows = [
  {
    feature: "Costo por contrato",
    traditional: "$200 – $500 USD",
    contractai: "Gratis – $19/mes",
  },
  {
    feature: "Tiempo de entrega",
    traditional: "3 – 7 días hábiles",
    contractai: "Menos de 3 minutos",
  },
  {
    feature: "Disponibilidad",
    traditional: "Horario de oficina",
    contractai: "24/7, desde cualquier dispositivo",
  },
  {
    feature: "Idioma",
    traditional: "Depende del profesional",
    contractai: "100% en español",
  },
  {
    feature: "Análisis de riesgos",
    traditional: "Manual y costoso",
    contractai: "Automático e instantáneo",
  },
  {
    feature: "Historial de contratos",
    traditional: "Archivos físicos o correo",
    contractai: "Dashboard organizado",
  },
];

export function Comparison() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            ¿Por qué{" "}
            <span className="gradient-text">ContractAI</span>?
          </h2>
          <p className="text-lg text-slate-600">
            Lo que antes costaba cientos de dólares y días de espera, ahora
            toma minutos — sin salir de tu navegador.
          </p>
        </motion.div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
            <div className="p-4 sm:p-5 text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Criterio
            </div>
            <div className="p-4 sm:p-5 text-center text-sm font-semibold text-slate-500 uppercase tracking-wide border-l border-slate-200">
              Abogado tradicional
            </div>
            <div className="p-4 sm:p-5 text-center text-sm font-bold text-indigo-600 uppercase tracking-wide border-l border-indigo-100 bg-indigo-50">
              ContractAI
            </div>
          </div>

          {/* Table rows */}
          {rows.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="grid grid-cols-3 border-b border-slate-100 last:border-b-0"
            >
              <div className="p-4 sm:p-5 text-sm font-medium text-slate-700 flex items-center">
                {row.feature}
              </div>
              <div className="p-4 sm:p-5 border-l border-slate-100 flex flex-col items-center justify-center gap-2 text-center">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-500">
                  {row.traditional}
                </span>
              </div>
              <div className="p-4 sm:p-5 border-l border-indigo-100 bg-indigo-50/40 flex flex-col items-center justify-center gap-2 text-center">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  {row.contractai}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/register">
            <Button variant="primary" size="lg">
              Empieza gratis hoy
            </Button>
          </Link>
          <p className="mt-3 text-sm text-slate-500">
            Sin tarjeta de crédito · Cancela cuando quieras
          </p>
        </motion.div>
      </div>
    </section>
  );
}
