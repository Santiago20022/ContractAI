"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileCheck, MessageSquare, Upload } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Describe lo que necesitas",
      description:
        "Cuéntanos en tus propias palabras qué tipo de contrato necesitas. Nuestro asistente te guiará con preguntas simples.",
      color: "indigo",
    },
    {
      number: "02",
      icon: <Upload className="w-8 h-8" />,
      title: "Sube o genera",
      description:
        "Genera un contrato nuevo desde cero o sube uno existente que quieras analizar. Aceptamos PDF, Word y más.",
      color: "purple",
    },
    {
      number: "03",
      icon: <FileCheck className="w-8 h-8" />,
      title: "Revisa y personaliza",
      description:
        "Obtén tu contrato listo con explicaciones claras de cada cláusula. Personaliza lo que necesites y descarga.",
      color: "green",
    },
  ];

  const colorClasses = {
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      border: "border-indigo-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-200",
    },
  };

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Tan simple como{" "}
            <span className="gradient-text">1, 2, 3</span>
          </h2>
          <p className="text-lg text-slate-600">
            Sin complicaciones, sin jerga legal, sin perder tiempo.
            Tu contrato listo en minutos.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-green-200" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Step card */}
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                    {/* Number badge */}
                    <div
                      className={`absolute -top-4 left-8 ${colors.bg} ${colors.text} px-4 py-1 rounded-full text-sm font-bold border-4 border-white`}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 ${colors.text}`}
                    >
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (not on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2 z-10">
                      <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
