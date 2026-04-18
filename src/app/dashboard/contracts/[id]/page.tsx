"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import {
  getContract,
  deleteContract,
  updateContract,
  addContract,
  signContract,
  Contract,
  Signature,
} from "@/lib/contracts-storage";
import { getSavedSignatures, saveSignature, deleteSignature, SavedSignature } from "@/lib/saved-signatures";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const SignatureCanvas = dynamic(() => import("@/components/shared/SignatureCanvas"), { ssr: false });
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  FileText,
  Loader2,
  MessageCircle,
  PenLine,
  Send,
  Share2,
  Trash2,
  User,
  X,
  Plus,
  Pencil,
  Copy as CloneIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CONTRACT_TYPE_NAMES: Record<string, string> = {
  services: "Contrato de Servicios",
  nda: "NDA (Confidencialidad)",
  employment: "Contrato de Trabajo",
  partnership: "Contrato de Socios",
  rental: "Contrato de Alquiler",
  sale: "Contrato de Compraventa",
  terms: "Términos y Condiciones",
  privacy: "Política de Privacidad",
  analyzed: "Documento Analizado",
};

const CHAT_SUGGESTIONS = [
  "¿Cuáles son mis obligaciones?",
  "¿Qué pasa si cancelo?",
  "¿Cuándo y cómo se paga?",
  "¿Cómo se resuelven disputas?",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getDaysRemaining(expiresAt: string): number {
  const now = new Date();
  const exp = new Date(expiresAt);
  return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ContractDetailPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const contractId = typeof params.id === "string" ? params.id : "";

  // Core state
  const [contract, setContract] = useState<Contract | null>(null);

  // Action state
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareCopied, setShareCopied] = useState(false);

  // Sign modal state
  const [showSignModal, setShowSignModal] = useState(false);
  const [sigRole, setSigRole] = useState<"A" | "B">("A");
  const [sigName, setSigName] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [sigMode, setSigMode] = useState<"text" | "draw" | "saved">("text");
  const [sigImageBase64, setSigImageBase64] = useState<string | null>(null);
  const [savedSigs, setSavedSigs] = useState<SavedSignature[]>([]);
  const [saveLabel, setSaveLabel] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [sigToDelete, setSigToDelete] = useState<SavedSignature | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Expiry state
  const [expiryEditing, setExpiryEditing] = useState(false);
  const [expiryValue, setExpiryValue] = useState("");

  // ── Auth redirect ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // ── Load contract ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (contractId && user) {
      const found = getContract(contractId, user.id);
      if (found) {
        setContract(found);
        setExpiryValue(found.expiresAt ? found.expiresAt.slice(0, 10) : "");
      } else {
        router.push("/dashboard/contracts");
      }
    }
  }, [contractId, user, router]);

  // ── Scroll chat to bottom ──────────────────────────────────────────────────

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatting]);

  // ── Action handlers ────────────────────────────────────────────────────────

  const handleCopy = () => {
    if (!contract) return;
    navigator.clipboard.writeText(contract.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    if (!contract) return;
    try {
      const { generateContractPDF } = await import("@/lib/generateContractPDF");
      const blob = await generateContractPDF({
        contractTitle: contract.title,
        partyA: contract.partyAName || "",
        partyB: contract.partyBName || "",
        contractText: contract.content,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${contract.title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  const handleShare = async () => {
    if (!contract) return;
    try {
      const { encodeShareToken } = await import("@/lib/share-utils");
      const token = await encodeShareToken({
        title: contract.title,
        partyA: contract.partyAName || "",
        partyB: contract.partyBName || "",
        type: contract.type,
        content: contract.content,
      });
      const url = `${window.location.origin}/share?c=${token}`;
      setShareLink(url);
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleClone = async () => {
    if (!contract || !user) return;
    const cloned = addContract(user.id, {
      title: `Copia de ${contract.title}`,
      type: contract.type,
      content: contract.content,
      status: "draft",
      partyAName: contract.partyAName,
      partyBName: contract.partyBName,
    });
    router.push(`/dashboard/contracts/${cloned.id}`);
  };

  const handleDelete = () => {
    if (!contract || !user) return;
    if (confirm("¿Estás seguro de que quieres eliminar este contrato?")) {
      deleteContract(contract.id, user.id);
      router.push("/dashboard/contracts");
    }
  };

  // ── Signature handlers ─────────────────────────────────────────────────────

  const openSignModal = (role: "A" | "B") => {
    setSigRole(role);
    setSigName("");
    setSavedSigs(getSavedSignatures());
    setSigMode("text");
    setSigImageBase64(null);
    setSaveLabel("");
    setShowSaveForm(false);
    setShowSignModal(true);
  };

  const handleSign = async () => {
    if (!contract || !user || !sigName.trim()) return;
    if ((sigMode === "draw" || sigMode === "saved") && !sigImageBase64) return;
    setIsSigning(true);
    const sig: Signature = {
      role: sigRole,
      name: sigName.trim(),
      signedAt: new Date().toISOString(),
      ...(sigImageBase64 ? { signatureImage: sigImageBase64 } : {}),
    };
    const updated = signContract(contract.id, user.id, sig);
    if (updated) setContract(updated);
    setIsSigning(false);
    setShowSignModal(false);
  };

  // ── Chat handler ───────────────────────────────────────────────────────────

  const handleChatSend = async (question?: string) => {
    if (!contract) return;
    const q = (question ?? chatInput).trim();
    if (!q || isChatting) return;

    setChatMessages((prev) => [...prev, { role: "user", content: q }]);
    setChatInput("");
    setIsChatting(true);

    let aiText = "";
    setChatMessages((prev) => [...prev, { role: "ai", content: "" }]);

    try {
      const res = await fetch("/api/chat-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText: contract.content, question: q }),
      });

      if (!res.ok) throw new Error("Request failed");

      // Try streaming first
      if (res.headers.get("content-type")?.includes("text/plain")) {
        const reader = res.body?.getReader();
        if (reader) {
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            aiText += decoder.decode(value, { stream: true });
            setChatMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "ai", content: aiText };
              return updated;
            });
          }
        }
      } else {
        // Fallback: JSON response
        const data = await res.json() as { answer?: string };
        aiText = data.answer ?? "No se pudo obtener una respuesta.";
        setChatMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "ai", content: aiText };
          return updated;
        });
      }
    } catch {
      setChatMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          content: "No se pudo procesar la consulta. Intenta de nuevo.",
        };
        return updated;
      });
    } finally {
      setIsChatting(false);
    }
  };

  // ── Expiry handler ─────────────────────────────────────────────────────────

  const handleExpiryChange = (value: string) => {
    if (!contract || !user) return;
    setExpiryValue(value);
    const updated = updateContract(contract.id, user.id, {
      expiresAt: value ? new Date(value).toISOString() : undefined,
    });
    if (updated) setContract(updated);
    setExpiryEditing(false);
  };

  // ── Loading / auth states ──────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (!contract) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto text-center py-20">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Contrato no encontrado
          </h2>
          <p className="text-slate-600 mb-6">
            El contrato que buscas no existe o ha sido eliminado.
          </p>
          <Link href="/dashboard/contracts">
            <Button variant="primary">Ver mis contratos</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const typeName = CONTRACT_TYPE_NAMES[contract.type] || contract.type;
  const sigA = contract.signatures?.find((s) => s.role === "A");
  const sigB = contract.signatures?.find((s) => s.role === "B");

  const expiryDays = contract.expiresAt ? getDaysRemaining(contract.expiresAt) : null;
  const expiryColor =
    expiryDays === null
      ? ""
      : expiryDays < 0
      ? "text-red-600"
      : expiryDays < 7
      ? "text-red-500"
      : expiryDays < 30
      ? "text-amber-500"
      : "text-green-600";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/dashboard/contracts"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a mis contratos
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 break-words">
                {contract.title}
              </h1>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-500">
                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-medium">
                  {typeName}
                </span>

                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(contract.createdAt)}
                </span>

                {contract.riskScore !== undefined && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      contract.riskScore >= 70
                        ? "bg-green-100 text-green-700"
                        : contract.riskScore >= 40
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Score: {contract.riskScore}%
                  </span>
                )}

                {/* Expiry date section */}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {expiryEditing ? (
                    <input
                      type="date"
                      autoFocus
                      value={expiryValue}
                      onChange={(e) => setExpiryValue(e.target.value)}
                      onBlur={(e) => handleExpiryChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleExpiryChange(expiryValue);
                        if (e.key === "Escape") setExpiryEditing(false);
                      }}
                      className="border border-slate-300 rounded-lg px-2 py-0.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  ) : contract.expiresAt ? (
                    <span className={`flex items-center gap-1 ${expiryColor}`}>
                      Vence: {formatDate(contract.expiresAt)}
                      {expiryDays !== null && (
                        <span className="text-xs">
                          ({expiryDays < 0
                            ? "Expirado"
                            : expiryDays === 0
                            ? "Hoy"
                            : `${expiryDays}d restantes`})
                        </span>
                      )}
                      <button
                        onClick={() => setExpiryEditing(true)}
                        className="ml-1 text-slate-400 hover:text-indigo-500 transition-colors"
                        title="Editar fecha de vencimiento"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </span>
                  ) : (
                    <button
                      onClick={() => setExpiryEditing(true)}
                      className="flex items-center gap-1 text-slate-400 hover:text-indigo-500 transition-colors text-xs"
                      title="Añadir fecha de vencimiento"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Añadir vencimiento
                    </button>
                  )}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4" />
                {copied ? "¡Copiado!" : "Copiar texto"}
              </Button>

              <Button variant="secondary" size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4" />
                Descargar PDF
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className={shareCopied ? "text-green-600 hover:text-green-700 hover:bg-green-50" : ""}
              >
                {shareCopied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    ¡Link copiado!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Compartir
                  </>
                )}
              </Button>

              <Button variant="ghost" size="sm" onClick={handleClone}>
                <CloneIcon className="w-4 h-4" />
                Clonar
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ── Contract content ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Contenido del contrato
              </h2>
              {contract.partyAName && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {contract.partyAName}
                  </span>
                  {contract.partyBName && (
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                      {contract.partyBName}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="bg-slate-50 rounded-xl p-6 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
                {contract.content}
              </pre>
            </div>
          </Card>
        </motion.div>

        {/* ── Firma electrónica ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                <PenLine className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Firma electrónica</h2>
                <p className="text-xs text-slate-500">Ambas partes deben firmar para completar el contrato</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["A", "B"] as const).map((role) => {
                const sig = role === "A" ? sigA : sigB;
                return (
                  <div
                    key={role}
                    className={`rounded-xl border p-4 ${
                      sig
                        ? "border-green-200 bg-green-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Parte {role}
                      </span>
                      {sig && (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Firmado
                        </span>
                      )}
                    </div>

                    {sig ? (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-green-600" />
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{sig.name}</span>
                        </div>
                        {sig.signatureImage && (
                          <img
                            src={sig.signatureImage}
                            alt="Firma"
                            className="h-10 max-w-[160px] object-contain mt-1 rounded bg-white border border-slate-100 p-1"
                          />
                        )}
                        <p className="text-xs text-slate-500">
                          {formatDate(sig.signedAt)} a las{" "}
                          {new Date(sig.signedAt).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-slate-500 mb-3">Pendiente de firma</p>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openSignModal(role)}
                        >
                          <PenLine className="w-3.5 h-3.5" />
                          Firmar como Parte {role}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* ── Chat con el contrato ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Pregúntale a la IA</h2>
                <p className="text-xs text-slate-500">Consultas sobre este contrato</p>
              </div>
            </div>

            {/* Suggestion chips */}
            {chatMessages.length === 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {CHAT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setChatInput(s);
                      handleChatSend(s);
                    }}
                    className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-indigo-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Messages */}
            {chatMessages.length > 0 && (
              <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-2xl rounded-br-sm"
                          : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-sm shadow-sm"
                      }`}
                    >
                      {msg.content || (
                        <span className="flex items-center gap-2 text-slate-400">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Pensando...
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}

            {/* Thinking spinner when last message is empty AI */}
            {isChatting && chatMessages[chatMessages.length - 1]?.content === "" && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                  <span className="flex items-center gap-2 text-slate-400 text-sm">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Pensando...
                  </span>
                </div>
              </div>
            )}

            {/* Input row */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSend();
                  }
                }}
                placeholder="Escribe tu pregunta sobre el contrato..."
                disabled={isChatting}
                className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent disabled:opacity-50 bg-white"
              />
              <button
                onClick={() => handleChatSend()}
                disabled={isChatting || !chatInput.trim()}
                className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
              >
                {isChatting ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </button>
            </div>

            {/* Reset suggestions link */}
            {chatMessages.length > 0 && (
              <button
                onClick={() => setChatMessages([])}
                className="mt-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                Limpiar conversación
              </button>
            )}
          </Card>
        </motion.div>

      </div>

      {/* ── Sign Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSignModal && (
          <motion.div
            key="sign-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowSignModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <PenLine className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Firmar contrato
                  </h3>
                </div>
                <button
                  onClick={() => setShowSignModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-500 mb-4">
                Estás firmando como{" "}
                <span className="font-semibold text-indigo-600">Parte {sigRole}</span>
              </p>

              <div className="space-y-4">
                <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                  {[
                    { id: "text", label: "Escribir" },
                    { id: "draw", label: "Dibujar" },
                    { id: "saved", label: `Guardadas (${savedSigs.length})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setSigMode(tab.id as "text" | "draw" | "saved"); setSigImageBase64(null); }}
                      className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                        sigMode === tab.id ? "bg-white shadow text-indigo-600" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Nombre del firmante *</label>
                  <input
                    value={sigName}
                    onChange={(e) => setSigName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSign(); }}
                    placeholder="Tu nombre completo"
                    autoFocus
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400"
                  />
                </div>

                {sigMode === "text" && (
                  <p className="text-xs text-slate-500 text-center">
                    Tu nombre escrito arriba servirá como firma electrónica
                  </p>
                )}

                {sigMode === "draw" && (
                  <div className="space-y-3">
                    <SignatureCanvas onChange={setSigImageBase64} height={150} />
                    {sigImageBase64 && (
                      <div className="space-y-2">
                        {!showSaveForm ? (
                          <button
                            onClick={() => setShowSaveForm(true)}
                            className="text-xs text-indigo-600 hover:text-indigo-700 underline"
                          >
                            + Guardar esta firma para futuros contratos
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              value={saveLabel}
                              onChange={(e) => setSaveLabel(e.target.value)}
                              placeholder='Nombre, ej: "Mi firma habitual"'
                              className="flex-1 px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400"
                            />
                            <button
                              onClick={() => {
                                if (saveLabel.trim() && sigImageBase64) {
                                  saveSignature(saveLabel.trim(), sigImageBase64);
                                  setSavedSigs(getSavedSignatures());
                                  setShowSaveForm(false);
                                  setSaveLabel("");
                                }
                              }}
                              className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700"
                            >
                              Guardar
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {sigMode === "saved" && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {savedSigs.length === 0 ? (
                      <p className="text-sm text-slate-400 text-center py-6">
                        Aún no tienes firmas guardadas.<br />
                        <span className="text-xs">Dibuja una y guárdala para reutilizarla.</span>
                      </p>
                    ) : (
                      savedSigs.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => setSigImageBase64(s.imageData)}
                          className={`flex items-center gap-3 p-2 rounded-xl border-2 cursor-pointer transition-all ${
                            sigImageBase64 === s.imageData
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 hover:border-indigo-300"
                          }`}
                        >
                          <img src={s.imageData} alt={s.label} className="h-10 w-32 object-contain bg-white rounded border border-slate-100" />
                          <span className="flex-1 text-sm font-medium text-slate-700">{s.label}</span>
                          {sigToDelete?.id === s.id ? (
                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <span className="text-xs text-slate-500">¿Eliminar?</span>
                              <button
                                onClick={() => {
                                  deleteSignature(s.id);
                                  setSavedSigs(getSavedSignatures());
                                  if (sigImageBase64 === s.imageData) setSigImageBase64(null);
                                  setSigToDelete(null);
                                }}
                                className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              >
                                Sí
                              </button>
                              <button
                                onClick={() => setSigToDelete(null)}
                                className="px-2 py-0.5 text-xs bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => { e.stopPropagation(); setSigToDelete(s); }}
                              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 mb-5">
                <p className="text-xs text-amber-700 leading-relaxed">
                  Al firmar confirmas que has leído el contrato completo y aceptas todos sus términos y condiciones.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSignModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSign}
                  disabled={
                    isSigning ||
                    !sigName.trim() ||
                    ((sigMode === "draw" || sigMode === "saved") && !sigImageBase64)
                  }
                  className="flex-1"
                >
                  {isSigning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Firmando...
                    </>
                  ) : (
                    <>
                      <PenLine className="w-4 h-4" />
                      Firmar contrato
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Share toast ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {shareCopied && shareLink && (
          <motion.div
            key="share-toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              ¡Link copiado al portapapeles!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
