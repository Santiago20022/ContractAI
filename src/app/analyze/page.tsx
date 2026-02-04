"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/context/AuthContext";
import { addContract } from "@/lib/contracts-storage";
import { analyzeContract } from "@/lib/contract-templates";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Info,
  Loader2,
  Search,
  Shield,
  Sparkles,
  Upload,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

type RiskLevel = "high" | "medium" | "low" | "info";

type AnalysisItem = {
  id: number;
  title: string;
  description: string;
  clause: string;
  risk: RiskLevel;
  suggestion: string;
};

export default function AnalyzePage() {
  const { user } = useAuth();
  const [contractText, setContractText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisItem[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setContractText(text);
    };

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      // For PDF, we'll just show a message
      setContractText(
        `[Archivo PDF cargado: ${file.name}]\n\nPara analizar el contenido de un PDF, por favor copia y pega el texto del contrato en el área de texto.`
      );
    } else {
      reader.readAsText(file);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handleAnalyze = async () => {
    if (!contractText.trim()) return;

    setIsAnalyzing(true);

    // Simulate analysis time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const { results, score } = analyzeContract(contractText);

    setAnalysisResults(results);
    setOverallScore(score);

    // Save to storage if user is logged in
    if (user) {
      addContract(user.id, {
        title: fileName || `Análisis - ${new Date().toLocaleDateString("es-ES")}`,
        type: "analyzed",
        content: contractText,
        status: "analyzed",
        riskScore: score,
      });
    }

    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getRiskStyles = (risk: RiskLevel) => {
    switch (risk) {
      case "high":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          badge: "bg-red-100 text-red-700",
          label: "Alto riesgo",
        };
      case "medium":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          badge: "bg-amber-100 text-amber-700",
          label: "Riesgo medio",
        };
      case "low":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: <Info className="w-5 h-5 text-blue-500" />,
          badge: "bg-blue-100 text-blue-700",
          label: "Riesgo bajo",
        };
      case "info":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
          badge: "bg-green-100 text-green-700",
          label: "Correcto",
        };
    }
  };

  const resetAnalysis = () => {
    setContractText("");
    setFileName("");
    setAnalysisComplete(false);
    setAnalysisResults([]);
    setOverallScore(0);
    setExpandedItems([]);
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

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!analysisComplete ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-indigo-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                  Analiza tu contrato
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Sube tu contrato o pega el texto y detectaremos cláusulas
                  peligrosas, términos desfavorables y te daremos sugerencias de mejora
                </p>
              </div>

              {/* Input area */}
              <Card className="max-w-3xl mx-auto">
                <div className="space-y-6">
                  {/* Upload area */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={cn(
                      "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
                      isDragging
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 hover:border-indigo-300 bg-slate-50/50"
                    )}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload
                        className={cn(
                          "w-10 h-10 mx-auto mb-3 transition-colors",
                          isDragging ? "text-indigo-500" : "text-slate-400"
                        )}
                      />
                      {fileName ? (
                        <div>
                          <p className="text-indigo-600 font-medium mb-1">
                            {fileName}
                          </p>
                          <p className="text-sm text-slate-500">
                            Archivo cargado correctamente
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-slate-600 font-medium mb-1">
                            Arrastra un archivo aquí o haz clic para subir
                          </p>
                          <p className="text-sm text-slate-400">
                            TXT, PDF, DOC, DOCX (máx. 10MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-sm text-slate-400 font-medium">
                      o pega el texto
                    </span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  <Textarea
                    placeholder="Pega aquí el texto de tu contrato para analizarlo..."
                    value={contractText}
                    onChange={(e) => setContractText(e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
                  />

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      {contractText.length > 0 && (
                        <>
                          {contractText.split(/\s+/).filter(Boolean).length} palabras ·{" "}
                          {contractText.length} caracteres
                        </>
                      )}
                    </p>
                    <Button
                      onClick={handleAnalyze}
                      disabled={!contractText.trim() || isAnalyzing}
                      icon={
                        isAnalyzing ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Sparkles className="w-5 h-5" />
                        )
                      }
                    >
                      {isAnalyzing ? "Analizando..." : "Analizar contrato"}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Info cards */}
              <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <Shield className="w-8 h-8 text-indigo-500 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">
                    100% privado
                  </h3>
                  <p className="text-sm text-slate-500">
                    Tu contrato no se almacena ni se comparte
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <Sparkles className="w-8 h-8 text-purple-500 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Análisis inteligente
                  </h3>
                  <p className="text-sm text-slate-500">
                    Detectamos patrones de riesgo automáticamente
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <Check className="w-8 h-8 text-green-500 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Sugerencias claras
                  </h3>
                  <p className="text-sm text-slate-500">
                    Explicaciones en lenguaje simple
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Score header */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-32 h-32 mx-auto mb-6 relative"
                >
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={
                        overallScore >= 70
                          ? "#22c55e"
                          : overallScore >= 40
                          ? "#f59e0b"
                          : "#ef4444"
                      }
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(overallScore / 100) * 352} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900">
                      {overallScore}
                    </span>
                  </div>
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                  Puntuación de seguridad
                </h1>
                <p className="text-lg text-slate-600">
                  Encontramos{" "}
                  <span className="font-semibold text-red-600">
                    {analysisResults.filter((r) => r.risk === "high").length} problemas graves
                  </span>
                  {analysisResults.filter((r) => r.risk === "medium").length > 0 && (
                    <>
                      {" "}
                      y{" "}
                      <span className="font-semibold text-amber-600">
                        {analysisResults.filter((r) => r.risk === "medium").length} advertencias
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                {[
                  {
                    label: "Alto riesgo",
                    count: analysisResults.filter((r) => r.risk === "high").length,
                    color: "red",
                  },
                  {
                    label: "Riesgo medio",
                    count: analysisResults.filter((r) => r.risk === "medium").length,
                    color: "amber",
                  },
                  {
                    label: "Riesgo bajo",
                    count: analysisResults.filter((r) => r.risk === "low").length,
                    color: "blue",
                  },
                  {
                    label: "Correctos",
                    count: analysisResults.filter((r) => r.risk === "info").length,
                    color: "green",
                  },
                ].map((stat) => (
                  <Card key={stat.label} className="text-center py-4">
                    <p
                      className={cn(
                        "text-2xl font-bold",
                        stat.color === "red" && "text-red-600",
                        stat.color === "amber" && "text-amber-600",
                        stat.color === "blue" && "text-blue-600",
                        stat.color === "green" && "text-green-600"
                      )}
                    >
                      {stat.count}
                    </p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </Card>
                ))}
              </div>

              {/* Results list */}
              <div className="max-w-3xl mx-auto space-y-4 mb-8">
                {analysisResults.map((item, index) => {
                  const styles = getRiskStyles(item.risk);
                  const isExpanded = expandedItems.includes(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={cn(
                          "bg-white rounded-2xl border overflow-hidden transition-all",
                          styles.border
                        )}
                      >
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="w-full p-5 flex items-start gap-4 text-left hover:bg-slate-50/50 transition-colors"
                        >
                          {styles.icon}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-900">
                                {item.title}
                              </h3>
                              <span
                                className={cn(
                                  "px-2 py-0.5 rounded-full text-xs font-medium",
                                  styles.badge
                                )}
                              >
                                {styles.label}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          )}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className={cn("p-5 pt-0 space-y-4", styles.bg)}>
                                <div>
                                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                                    Cláusula detectada
                                  </p>
                                  <p className="text-sm text-slate-700 bg-white/80 p-3 rounded-lg border border-slate-200 italic">
                                    {item.clause}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                                    Nuestra sugerencia
                                  </p>
                                  <p className="text-sm text-slate-700 bg-white/80 p-3 rounded-lg border border-slate-200">
                                    💡 {item.suggestion}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex justify-between max-w-3xl mx-auto">
                <Button variant="secondary" onClick={resetAnalysis}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Analizar otro
                </Button>
                <Link href="/generate">
                  <Button variant="primary">
                    Generar contrato seguro
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
