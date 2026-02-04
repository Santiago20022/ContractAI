"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "María García",
      role: "Diseñadora Freelance",
      image: "MG",
      content:
        "Antes perdía horas buscando plantillas de contratos. Ahora en 2 minutos tengo un contrato profesional listo. Me ha ahorrado dinero en abogados y dolores de cabeza con clientes.",
      rating: 5,
    },
    {
      name: "Carlos Rodríguez",
      role: "CEO de Startup",
      image: "CR",
      content:
        "El análisis de contratos es increíble. Detectó una cláusula de penalización que me hubiera costado miles de euros. La mejor inversión que he hecho para mi empresa.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      role: "Consultora de Marketing",
      image: "AM",
      content:
        "Lo que más me gusta es que explica todo en lenguaje normal. Ya no tengo que fingir que entiendo la jerga legal. Mis clientes también aprecian contratos más claros.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Lo que dicen{" "}
            <span className="gradient-text">nuestros usuarios</span>
          </h2>
          <p className="text-lg text-slate-600">
            Miles de profesionales ya confían en ContractAI para proteger sus negocios.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-indigo-100 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-600 leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
