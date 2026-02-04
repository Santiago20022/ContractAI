"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/context/AuthContext";
import { addContract } from "@/lib/contracts-storage";
import { generateContract, ContractData } from "@/lib/contract-templates";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronRight,
  Copy,
  Download,
  FileSignature,
  FileText,
  HandshakeIcon,
  Home,
  Loader2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ContractType = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
};

const contractTypes: ContractType[] = [
  {
    id: "services",
    title: "Contrato de Servicios",
    description: "Para freelancers y profesionales",
    icon: <HandshakeIcon className="w-6 h-6" />,
    popular: true,
  },
  {
    id: "nda",
    title: "NDA (Confidencialidad)",
    description: "Protege información sensible",
    icon: <ShieldCheck className="w-6 h-6" />,
    popular: true,
  },
  {
    id: "employment",
    title: "Contrato de Trabajo",
    description: "Relación empleador-empleado",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: "partnership",
    title: "Contrato de Socios",
    description: "Define roles y participación",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "rental",
    title: "Contrato de Alquiler",
    description: "Arrendamiento de propiedades",
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: "sale",
    title: "Contrato de Compraventa",
    description: "Transacciones de bienes",
    icon: <FileSignature className="w-6 h-6" />,
  },
  {
    id: "terms",
    title: "Términos y Condiciones",
    description: "Para tu sitio web o app",
    icon: <Building2 className="w-6 h-6" />,
    popular: true,
  },
  {
    id: "privacy",
    title: "Política de Privacidad",
    description: "Cumple con GDPR",
    icon: <UserCheck className="w-6 h-6" />,
  },
];

export default function GeneratePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<ContractData>({
    partyA: "",
    partyB: "",
    description: "",
    amount: "",
    duration: "",
    additionalClauses: "",
    city: "",
  });

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleNext = () => {
    if (step === 1 && selectedType) {
      setStep(2);
    } else if (step === 2) {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
      setGeneratedContract(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedType) return;

    setIsGenerating(true);
    setStep(3);

    // Simulate generation time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const contract = generateContract(selectedType, formData);
    setGeneratedContract(contract);

    // Save to storage if user is logged in
    if (user) {
      const selectedContractType = contractTypes.find((c) => c.id === selectedType);
      addContract(user.id, {
        title: `${selectedContractType?.title || "Contrato"} - ${formData.partyB || "Sin nombre"}`,
        type: selectedType,
        content: contract,
        status: "completed",
      });
    }

    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    if (generatedContract) {
      navigator.clipboard.writeText(generatedContract);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadContract = () => {
    if (generatedContract) {
      const blob = new Blob([generatedContract], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contrato-${selectedType}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href={user ? "/dashboard" : "/"}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </Link>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-800">ContractAI</span>
            </Link>

            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                    step >= s
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-100 text-slate-400"
                  )}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                <span
                  className={cn(
                    "ml-3 font-medium hidden sm:block",
                    step >= s ? "text-slate-900" : "text-slate-400"
                  )}
                >
                  {s === 1 && "Tipo de contrato"}
                  {s === 2 && "Detalles"}
                  {s === 3 && "Contrato listo"}
                </span>
                {s < 3 && (
                  <ChevronRight className="w-5 h-5 text-slate-300 mx-4 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Select contract type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                  ¿Qué tipo de contrato necesitas?
                </h1>
                <p className="text-lg text-slate-600">
                  Selecciona el tipo de contrato y lo personalizaremos para ti
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {contractTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      onClick={() => handleTypeSelect(type.id)}
                      className={cn(
                        "relative bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all h-full",
                        selectedType === type.id
                          ? "border-indigo-500 shadow-lg shadow-indigo-500/10"
                          : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      {type.popular && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}

                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                          selectedType === type.id
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-slate-100 text-slate-600"
                        )}
                      >
                        {type.icon}
                      </div>

                      <h3 className="font-semibold text-slate-900 mb-1">
                        {type.title}
                      </h3>
                      <p className="text-sm text-slate-500">{type.description}</p>

                      {selectedType === type.id && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!selectedType}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Continuar
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Contract details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                  Cuéntanos los detalles
                </h1>
                <p className="text-lg text-slate-600">
                  Completa la información para personalizar tu contrato
                </p>
              </div>

              <Card className="max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Tu nombre o empresa"
                      placeholder="Ej: María García López"
                      value={formData.partyA}
                      onChange={(e) =>
                        setFormData({ ...formData, partyA: e.target.value })
                      }
                    />
                    <Input
                      label="Nombre del cliente/otra parte"
                      placeholder="Ej: Empresa XYZ S.L."
                      value={formData.partyB}
                      onChange={(e) =>
                        setFormData({ ...formData, partyB: e.target.value })
                      }
                    />
                  </div>

                  <Textarea
                    label="Descripción del servicio o acuerdo"
                    placeholder="Describe brevemente el objeto del contrato: qué servicios prestarás, qué bienes se intercambian, etc."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Importe / Precio"
                      placeholder="Ej: 2.500€"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                    />
                    <Input
                      label="Duración del contrato"
                      placeholder="Ej: 3 meses"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                    />
                  </div>

                  <Input
                    label="Ciudad (para jurisdicción)"
                    placeholder="Ej: Madrid"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />

                  <Textarea
                    label="Cláusulas adicionales (opcional)"
                    placeholder="¿Hay algo específico que quieras incluir? Ej: cláusula de exclusividad, penalizaciones, etc."
                    value={formData.additionalClauses}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additionalClauses: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </Card>

              <div className="flex justify-between mt-8 max-w-2xl mx-auto">
                <Button variant="secondary" onClick={handleBack}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Atrás
                </Button>
                <Button
                  onClick={handleNext}
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  Generar contrato
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Generated contract */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isGenerating ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    Generando tu contrato...
                  </h2>
                  <p className="text-slate-600">
                    Estamos creando un contrato profesional personalizado
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-3">
                      ¡Tu contrato está listo!
                    </h1>
                    <p className="text-lg text-slate-600">
                      Revisa el contenido y descárgalo cuando estés listo
                      {user && " (guardado automáticamente)"}
                    </p>
                  </div>

                  <Card className="max-w-3xl mx-auto mb-6">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {contractTypes.find((c) => c.id === selectedType)?.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            Generado justo ahora
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          icon={<Copy className="w-4 h-4" />}
                        >
                          {copied ? "¡Copiado!" : "Copiar"}
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={downloadContract}
                          icon={<Download className="w-4 h-4" />}
                        >
                          Descargar
                        </Button>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 max-h-[500px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
                        {generatedContract}
                      </pre>
                    </div>
                  </Card>

                  <div className="flex justify-between max-w-3xl mx-auto">
                    <Button variant="secondary" onClick={handleBack}>
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Editar detalles
                    </Button>
                    <Link href={user ? "/dashboard" : "/"}>
                      <Button variant="primary">
                        {user ? "Ir al dashboard" : "Volver al inicio"}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
