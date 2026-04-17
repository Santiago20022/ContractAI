"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { addContract } from "@/lib/contracts-storage";
import { generateContract, ContractData } from "@/lib/contract-templates";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Cloud,
  Copy,
  Download,
  FileSignature,
  FileText,
  HandshakeIcon,
  Home,
  Loader2,
  Megaphone,
  MessageSquarePlus,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  UserCheck,
  Users,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  {
    id: "consulting",
    title: "Contrato de Consultoría",
    description: "Asesoría estratégica y técnica",
    icon: <BarChart2 className="w-6 h-6" />,
  },
  {
    id: "saas",
    title: "Contrato SaaS",
    description: "Licencia de software como servicio",
    icon: <Cloud className="w-6 h-6" />,
    popular: true,
  },
  {
    id: "agency",
    title: "Contrato de Agencia",
    description: "Representación comercial con comisión",
    icon: <Megaphone className="w-6 h-6" />,
  },
  {
    id: "joboffer",
    title: "Oferta de Trabajo",
    description: "Carta oferta formal al candidato",
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    id: "distribution",
    title: "Contrato de Distribución",
    description: "Canal de distribución y exclusividad",
    icon: <Truck className="w-6 h-6" />,
  },
];

export default function GeneratePage() {
  const { user, isLoading } = useRequireAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const [streamingText, setStreamingText] = useState("");
  const [aiUsed, setAiUsed] = useState<boolean | null>(null);
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

  // Mini-chat state
  type ChatMsg = { role: "user" | "ai"; content: string };
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isModifying, setIsModifying] = useState(false);

  const streamingRef = useRef<HTMLPreElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll streaming container
  useEffect(() => {
    if (streamingRef.current) {
      streamingRef.current.scrollTop = streamingRef.current.scrollHeight;
    }
  }, [streamingText]);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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
      setStreamingText("");
    }
  };

  const handleGenerate = async () => {
    if (!selectedType) return;

    setIsGenerating(true);
    setStep(3);
    setGeneratedContract(null);
    setStreamingText("");
    setAiUsed(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType, data: formData }),
      });

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.includes("application/json")) {
        // Fallback to local template
        const json = await res.json();
        if (json.fallback) {
          const contract = generateContract(selectedType, formData);
          setAiUsed(false);
          setGeneratedContract(contract);
          saveToStorage(contract);
        }
      } else {
        // Streaming response from Gemini
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No readable stream");

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setStreamingText((prev) => prev + chunk);
        }

        setAiUsed(true);
        setGeneratedContract(fullText);
        saveToStorage(fullText);
      }
    } catch {
      // Fallback to local template on any error
      const contract = generateContract(selectedType, formData);
      setAiUsed(false);
      setGeneratedContract(contract);
      saveToStorage(contract);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleModify = async () => {
    const instruction = chatInput.trim();
    if (!instruction || !generatedContract || isModifying) return;

    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: instruction }]);
    setIsModifying(true);

    try {
      const res = await fetch("/api/modify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText: generatedContract, instruction }),
      });

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.includes("application/json")) {
        // Fallback — no Gemini
        setChatMessages((prev) => [
          ...prev,
          { role: "ai", content: "No se pudo modificar con IA ahora. Intenta de nuevo más tarde." },
        ]);
      } else {
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No stream");

        const decoder = new TextDecoder();
        let fullText = "";

        // Add placeholder AI message
        setChatMessages((prev) => [...prev, { role: "ai", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setChatMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "ai", content: "✓ Contrato actualizado" };
            return updated;
          });
        }

        if (fullText.trim()) {
          setGeneratedContract(fullText);
          setAiUsed(true);
          saveToStorage(fullText);
        }
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", content: "Ocurrió un error al modificar el contrato." },
      ]);
    } finally {
      setIsModifying(false);
    }
  };

  const saveToStorage = (contract: string) => {
    if (user) {
      const selectedContractType = contractTypes.find((c) => c.id === selectedType);
      addContract(user.id, {
        title: `${selectedContractType?.title || "Contrato"} - ${formData.partyB || "Sin nombre"}`,
        type: selectedType!,
        content: contract,
        status: "completed",
        partyAName: formData.partyA,
        partyBName: formData.partyB,
      });
    }
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

  const downloadPDF = async () => {
    const { generateContractPDF } = await import("@/lib/generateContractPDF");
    const selectedContractType = contractTypes.find((c) => c.id === selectedType);
    const contractTitle = selectedContractType?.title ?? "Contrato";

    const blob = await generateContractPDF({
      contractText: generatedContract ?? "",
      contractTitle,
      partyA: formData.partyA,
      partyB: formData.partyB,
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contrato-${selectedType}-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading || !user) return null;

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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {isGenerating ? (
                streamingText ? (
                  /* ── Streaming view ── */
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">Generando con IA…</h2>
                        <p className="text-sm text-slate-500">El contrato se está escribiendo en tiempo real</p>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1" />
                      <pre
                        ref={streamingRef}
                        className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed max-h-[520px] overflow-y-auto p-6"
                      >
                        {streamingText}
                        <span className="inline-block w-2 h-4 bg-indigo-500 ml-0.5 animate-pulse align-middle" />
                      </pre>
                    </div>
                  </div>
                ) : (
                  /* ── Initial spinner ── */
                  <div className="text-center py-24">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-40" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-300">
                        <Sparkles className="w-9 h-9 text-white" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Generando tu contrato…</h2>
                    <p className="text-slate-500">Estamos creando un contrato profesional personalizado para ti</p>
                  </div>
                )
              ) : (
                /* ── Contract ready view ── */
                <div className="max-w-4xl mx-auto">

                  {/* Success banner */}
                  <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 mb-6 shadow-lg shadow-indigo-200/50">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl font-bold text-white leading-tight">¡Tu contrato está listo!</h1>
                      <p className="text-indigo-200 text-sm mt-0.5">
                        {user ? "Guardado automáticamente en tu dashboard" : "Descárgalo antes de salir"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {aiUsed === true && (
                        <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                          <Sparkles className="w-3 h-3" />
                          Gemini AI
                        </span>
                      )}
                      {aiUsed === false && (
                        <span className="inline-flex items-center gap-1.5 bg-white/10 text-indigo-200 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                          <FileText className="w-3 h-3" />
                          Plantilla local
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main layout: contract + chat side by side on large screens */}
                  <div className="grid lg:grid-cols-[1fr_340px] gap-5">

                    {/* ── Contract card ── */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                      {/* Card header */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4.5 h-4.5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm leading-tight">
                              {contractTypes.find((c) => c.id === selectedType)?.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-all"
                          >
                            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? "Copiado" : "Copiar"}
                          </button>
                          <button
                            onClick={downloadContract}
                            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            .txt
                          </button>
                          <button
                            onClick={downloadPDF}
                            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-indigo-200"
                          >
                            <Download className="w-3.5 h-3.5" />
                            PDF
                          </button>
                        </div>
                      </div>

                      {/* Contract body */}
                      <div className="p-6 max-h-[600px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-mono text-[13px] text-slate-700 leading-relaxed">
                          {generatedContract}
                        </pre>
                      </div>
                    </div>

                    {/* ── Mini-chat panel ── */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                      {/* Chat header */}
                      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-indigo-50">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <Wand2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Modificar con IA</p>
                          <p className="text-xs text-slate-500">Pide cambios en lenguaje natural</p>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px] max-h-[400px]">
                        {chatMessages.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center text-center py-6">
                            <div className="w-12 h-12 bg-violet-50 rounded-full flex items-center justify-center mb-3">
                              <MessageSquarePlus className="w-6 h-6 text-violet-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-600 mb-1">¿Algo que cambiar?</p>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                              Escribe lo que quieres modificar y la IA actualizará el contrato
                            </p>
                            {/* Suggestion chips */}
                            <div className="mt-4 flex flex-col gap-2 w-full">
                              {[
                                "Agrega cláusula de no competencia",
                                "Cambia el plazo de pago a 15 días",
                                "Añade penalidad por retraso",
                              ].map((s) => (
                                <button
                                  key={s}
                                  onClick={() => setChatInput(s)}
                                  className="text-left text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-2 rounded-xl transition-colors"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <>
                            {chatMessages.map((msg, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "flex",
                                  msg.role === "user" ? "justify-end" : "justify-start"
                                )}
                              >
                                <div
                                  className={cn(
                                    "max-w-[85%] text-xs px-3 py-2 rounded-xl leading-relaxed",
                                    msg.role === "user"
                                      ? "bg-indigo-500 text-white rounded-br-sm"
                                      : "bg-slate-100 text-slate-700 rounded-bl-sm"
                                  )}
                                >
                                  {msg.role === "ai" && isModifying && msg.content === "" ? (
                                    <span className="flex items-center gap-1.5">
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                      Actualizando contrato…
                                    </span>
                                  ) : msg.content === "✓ Contrato actualizado" ? (
                                    <span className="flex items-center gap-1.5 text-green-700 font-medium">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      Contrato actualizado
                                    </span>
                                  ) : (
                                    msg.content
                                  )}
                                </div>
                              </div>
                            ))}
                            <div ref={chatBottomRef} />
                          </>
                        )}
                      </div>

                      {/* Input */}
                      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleModify()}
                            placeholder="Ej: agrega una cláusula de confidencialidad..."
                            disabled={isModifying}
                            className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 disabled:opacity-50"
                          />
                          <button
                            onClick={handleModify}
                            disabled={!chatInput.trim() || isModifying}
                            className="w-9 h-9 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                          >
                            {isModifying ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom actions */}
                  <div className="flex justify-between mt-5">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-xl transition-all hover:border-slate-300"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Editar detalles
                    </button>
                    <Link href={user ? "/dashboard" : "/"}>
                      <button className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-200">
                        {user ? "Ir al dashboard" : "Volver al inicio"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
