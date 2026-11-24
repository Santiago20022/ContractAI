"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  FileText,
  PenLine,
  Search,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  {
    icon: Sparkles,
    color: "bg-indigo-500",
    title: "Bienvenido a ContractAI",
    desc: "Tu asistente legal inteligente para crear, importar y gestionar contratos profesionales en minutos, sin complicaciones.",
    cta: null,
    ctaHref: null,
  },
  {
    icon: FileText,
    color: "bg-violet-500",
    title: "Genera contratos en segundos",
    desc: "Describe qué necesitas y la IA crea un contrato profesional listo para firmar. Arriendos, servicios, trabajo, NDAs y más.",
    cta: "Generar contrato",
    ctaHref: "/generate",
  },
  {
    icon: Upload,
    color: "bg-sky-500",
    title: "Importa contratos existentes",
    desc: "¿Tienes contratos en Word o PDF? Impórtalos con un clic. Detectamos las partes, el tipo y toda la información automáticamente.",
    cta: "Importar contrato",
    ctaHref: "/dashboard/import",
  },
  {
    icon: PenLine,
    color: "bg-emerald-500",
    title: "Firma electrónica sin cuentas",
    desc: "Envía un link de firma a la otra parte. Firman desde su celular o computador, sin necesidad de crear cuenta. Rápido y seguro.",
    cta: null,
    ctaHref: null,
  },
  {
    icon: Search,
    color: "bg-amber-500",
    title: "Analiza cualquier contrato",
    desc: "Sube un contrato y la IA identifica riesgos, cláusulas importantes y te explica todo en lenguaje sencillo.",
    cta: "Analizar contrato",
    ctaHref: "/analyze",
  },
  {
    icon: BarChart2,
    color: "bg-rose-500",
    title: "Todo bajo control",
    desc: "Ve el estado de todos tus contratos, firma pendiente, fechas de vencimiento y estadísticas desde el panel de inicio.",
    cta: "Ver mi panel",
    ctaHref: "/dashboard",
  },
];

const STORAGE_KEY = "contractai_tour_seen";

interface Props {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function OnboardingTour({ forceOpen, onClose }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
      setStep(0);
      return;
    }
    if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, [forceOpen]);

  const handleClose = () => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
    onClose?.();
  };

  const handleNav = (href: string) => {
    handleClose();
    window.location.href = href;
  };

  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="tour-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            key={`tour-step-${step}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className={`h-1.5 ${current.color}`} />

            {/* Content */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 ${current.color} rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-2">{current.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">{current.desc}</p>

              {/* Nav row */}
              <div className="flex items-center justify-between gap-4">
                {/* Dots */}
                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      className={`rounded-full transition-all ${
                        i === step ? "w-5 h-2 bg-indigo-500" : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      Anterior
                    </button>
                  )}
                  {step < STEPS.length - 1 ? (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      ¡Empezar!
                    </button>
                  )}
                </div>
              </div>

              {/* Optional CTA link */}
              {current.cta && current.ctaHref && (
                <button
                  onClick={() => handleNav(current.ctaHref!)}
                  className="w-full mt-4 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-colors"
                >
                  {current.cta} →
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
