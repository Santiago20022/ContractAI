"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/Button";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Gratis",
      monthlyPrice: "0",
      annualPrice: "0",
      annualNote: null,
      description: "Perfecto para empezar",
      features: [
        "3 contratos al mes",
        "Análisis básico de riesgos",
        "Plantillas esenciales",
        "Descargar en .txt",
      ],
      cta: "Empezar gratis",
      href: "/register",
      popular: false,
    },
    {
      name: "Pro",
      monthlyPrice: "19",
      annualPrice: "13",
      annualNote: "$156/año · ahorras $72",
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
      href: "/register",
      popular: true,
    },
    {
      name: "Empresa",
      monthlyPrice: "49",
      annualPrice: "34",
      annualNote: "$408/año · ahorras $180",
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
      href: "/register",
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
          className="text-center max-w-3xl mx-auto mb-10"
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

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={`text-sm font-medium ${!isAnnual ? "text-slate-900" : "text-slate-400"}`}>
            Mensual
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? "bg-indigo-500" : "bg-slate-300"}`}
            aria-label="Toggle annual billing"
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                isAnnual ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? "text-slate-900" : "text-slate-400"}`}>
            Anual
            <span className="ml-1.5 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Ahorra 30%
            </span>
          </span>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
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
                    {currentPrice === "0" ? (
                      <span className="text-4xl font-bold text-slate-900">Gratis</span>
                    ) : (
                      <>
                        <span className="text-2xl font-semibold text-slate-500">USD</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currentPrice}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="text-4xl font-bold text-slate-900"
                          >
                            {currentPrice}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-slate-500">/mes</span>
                      </>
                    )}
                  </div>
                  <AnimatePresence>
                    {isAnnual && plan.annualNote && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-green-600 mt-1"
                      >
                        {plan.annualNote}
                      </motion.p>
                    )}
                  </AnimatePresence>
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
                <Link href={plan.href} className="block">
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Trust message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-12"
        >
          Todos los planes incluyen almacenamiento privado en tu navegador y acceso sin tarjeta de crédito
        </motion.p>
      </div>
    </section>
  );
}
