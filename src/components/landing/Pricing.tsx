"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function Pricing() {
  const plans = [
    {
      name: "Gratis",
      price: "0",
      description: "Perfecto para empezar",
      features: [
        "3 contratos al mes",
        "Análisis básico de riesgos",
        "Plantillas esenciales",
        "Exportar a PDF",
      ],
      cta: "Empezar gratis",
      popular: false,
    },
    {
      name: "Pro",
      price: "19",
      description: "Para freelancers activos",
      features: [
        "Contratos ilimitados",
        "Análisis avanzado de riesgos",
        "Todas las plantillas",
        "Sugerencias de mejora",
        "Historial de contratos",
        "Soporte prioritario",
      ],
      cta: "Comenzar prueba",
      popular: true,
    },
    {
      name: "Empresa",
      price: "49",
      description: "Para equipos y negocios",
      features: [
        "Todo lo de Pro",
        "5 usuarios incluidos",
        "Plantillas personalizadas",
        "API de integración",
        "Revisión legal humana",
        "Account manager dedicado",
      ],
      cta: "Contactar ventas",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Precios{" "}
            <span className="gradient-text">simples y transparentes</span>
          </h2>
          <p className="text-lg text-slate-600">
            Empieza gratis y escala según tus necesidades.
            Sin sorpresas, sin letra pequeña.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 ${
                plan.popular
                  ? "border-2 border-indigo-500 shadow-xl shadow-indigo-500/10"
                  : "border border-slate-200"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium px-4 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Más popular
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-slate-900">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500">/mes</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/dashboard" className="block">
                <Button
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-12"
        >
          Todos los planes incluyen encriptación de datos y garantía de satisfacción de 30 días
        </motion.p>
      </div>
    </section>
  );
}
