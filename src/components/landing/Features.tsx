"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Languages,
  Lock,
  MessageSquareText,
  Search,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card } from "../ui/Card";

export function Features() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Genera en segundos",
      description:
        "Crea contratos profesionales al instante. Solo describe lo que necesitas y obtén un documento listo para firmar.",
      color: "indigo",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Detecta riesgos",
      description:
        "Sube cualquier contrato y detectamos automáticamente cláusulas peligrosas o términos desfavorables.",
      color: "amber",
    },
    {
      icon: <MessageSquareText className="w-6 h-6" />,
      title: "Explica en simple",
      description:
        "No más jerga legal. Te explicamos cada cláusula en lenguaje que cualquiera puede entender.",
      color: "green",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Múltiples tipos",
      description:
        "NDA, servicios, freelance, alquiler, empleados... Tenemos plantillas para todo tipo de situación.",
      color: "purple",
    },
    {
      icon: <Languages className="w-6 h-6" />,
      title: "100% en español",
      description:
        "Diseñado para hispanohablantes. Contratos válidos para España y Latinoamérica.",
      color: "blue",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Privado y seguro",
      description:
        "Tus documentos están encriptados. Nunca compartimos ni almacenamos tu información sensible.",
      color: "slate",
    },
  ];

  const colorClasses = {
    indigo: "bg-indigo-100 text-indigo-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <section id="features" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Potente y simple</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Todo lo que necesitas para{" "}
            <span className="gradient-text">proteger tu negocio</span>
          </h2>
          <p className="text-lg text-slate-600">
            Herramientas inteligentes que hacen el trabajo legal por ti,
            para que puedas enfocarte en lo que importa.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                    colorClasses[feature.color as keyof typeof colorClasses]
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            La tranquilidad de saber que estás protegido
          </h3>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-6">
            Cada contrato es revisado por nuestro sistema de IA entrenado con
            miles de documentos legales. No dejes tu negocio al azar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>+10,000 contratos generados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>+5,000 riesgos detectados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>98% satisfacción</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
