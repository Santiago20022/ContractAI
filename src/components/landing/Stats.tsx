"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("es-LA"));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold text-white">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </div>
  );
}

const stats = [
  { value: 12000, prefix: "+", suffix: "", label: "Contratos generados" },
  { value: 8500, prefix: "+", suffix: "", label: "Riesgos detectados" },
  { value: 98, prefix: "", suffix: "%", label: "Tasa de satisfacción" },
  { value: 3, prefix: "", suffix: " min", label: "Tiempo promedio" },
];

export function Stats() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-indigo-400 font-medium text-sm uppercase tracking-widest mb-12"
        >
          ContractAI en números
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <p className="mt-2 text-slate-400 text-sm sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
