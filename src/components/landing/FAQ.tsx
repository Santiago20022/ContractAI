"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "¿Qué tipo de contratos puedo generar con ContractAI?",
    answer:
      "Puedes generar 8 tipos de contratos: Prestación de Servicios, NDA (Confidencialidad), Contrato de Trabajo, Contrato de Socios, Alquiler, Compraventa, Términos y Condiciones, y Política de Privacidad. Todos están redactados en español con lenguaje legal válido para España y Latinoamérica.",
  },
  {
    question: "¿Necesito conocimientos legales para usar la plataforma?",
    answer:
      "No. ContractAI está diseñado para freelancers, emprendedores y pequeñas empresas sin formación legal. Solo describes lo que necesitas en lenguaje cotidiano y el sistema genera el contrato completo. También explicamos cada cláusula en lenguaje sencillo.",
  },
  {
    question: "¿Los contratos generados tienen validez legal?",
    answer:
      "Los contratos generados por ContractAI están basados en plantillas profesionales con cláusulas estándar del derecho civil. Sin embargo, siempre recomendamos que un abogado revise los contratos importantes antes de firmarlos, especialmente en casos de alto valor o complejidad.",
  },
  {
    question: "¿Cómo funciona el análisis de riesgos?",
    answer:
      "Pega el texto de cualquier contrato y el sistema lo analiza automáticamente buscando 9 tipos de cláusulas problemáticas: penalizaciones excesivas, cesión total de derechos, exclusividades sin límite temporal, responsabilidad ilimitada y más. Recibes un puntaje de seguridad del 0 al 100 con sugerencias concretas para negociar cada punto.",
  },
  {
    question: "¿Dónde se guardan mis contratos?",
    answer:
      "Tus contratos se almacenan localmente en tu navegador, sin enviarse a ningún servidor externo. Eso significa que tus documentos son completamente privados. La desventaja es que si limpias el navegador perderás el historial, por eso recomendamos descargar los contratos importantes.",
  },
  {
    question: "¿Funciona para España y Latinoamérica?",
    answer:
      "Sí. ContractAI está diseñado específicamente para el mercado hispanohablante. Las plantillas incluyen referencias al derecho civil español y latinoamericano. Puedes especificar la ciudad y jurisdicción para que el contrato quede adaptado a tu país.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Preguntas{" "}
            <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="text-lg text-slate-600">
            Todo lo que necesitas saber sobre cómo funciona ContractAI.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="divide-y divide-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between py-6 text-left gap-4 group"
                >
                  <span
                    className={cn(
                      "text-base font-semibold transition-colors",
                      isOpen ? "text-indigo-600" : "text-slate-900 group-hover:text-indigo-600"
                    )}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-all duration-300",
                      isOpen
                        ? "rotate-180 text-indigo-600"
                        : "text-slate-400 group-hover:text-indigo-500"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-slate-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
