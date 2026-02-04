"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  FileSignature,
  HandshakeIcon,
  Home,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function ContractTypes() {
  const contracts = [
    {
      icon: <HandshakeIcon className="w-6 h-6" />,
      title: "Contrato de Servicios",
      description: "Para freelancers y profesionales independientes",
      popular: true,
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "NDA (Confidencialidad)",
      description: "Protege tu información sensible y secretos comerciales",
      popular: true,
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Contrato de Trabajo",
      description: "Relación laboral clara entre empleador y empleado",
      popular: false,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Contrato de Socios",
      description: "Define roles, responsabilidades y participación",
      popular: false,
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Contrato de Alquiler",
      description: "Para arrendamiento de propiedades y espacios",
      popular: false,
    },
    {
      icon: <FileSignature className="w-6 h-6" />,
      title: "Contrato de Compraventa",
      description: "Transacciones de bienes y servicios",
      popular: false,
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Términos y Condiciones",
      description: "Para tu sitio web o aplicación",
      popular: true,
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Política de Privacidad",
      description: "Cumple con GDPR y normativas de datos",
      popular: false,
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
            Contratos para{" "}
            <span className="gradient-text">cada situación</span>
          </h2>
          <p className="text-lg text-slate-600">
            Tenemos plantillas optimizadas para los contratos más comunes.
            Y si no encuentras lo que buscas, créalo desde cero.
          </p>
        </motion.div>

        {/* Contract types grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contracts.map((contract, index) => (
            <motion.div
              key={contract.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href="/generate">
                <div className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer h-full">
                  {/* Popular badge */}
                  {contract.popular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className="w-12 h-12 bg-slate-100 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors mb-4">
                    {contract.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {contract.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {contract.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">
            ¿No encuentras el contrato que necesitas?
          </p>
          <Link href="/generate">
            <Button variant="secondary">
              Crear contrato personalizado
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
