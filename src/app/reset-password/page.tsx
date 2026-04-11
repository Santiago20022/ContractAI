"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { updatePassword } from "@/lib/auth";
import { motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, FileText, KeyRound, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type Status = "loading" | "invalid" | "form" | "success";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<Status>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    fetch("/api/password-reset/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, consume: false }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setEmail(data.email);
          setStatus("form");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsSubmitting(true);

    try {
      // Consume the token (one-time use)
      const res = await fetch("/api/password-reset/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, consume: true }),
      });
      const data = await res.json();

      if (!data.valid) {
        setError("El enlace ya fue usado o ha expirado. Solicita uno nuevo.");
        setIsSubmitting(false);
        return;
      }

      // Update password in localStorage
      const result = updatePassword(data.email, password);
      if (!result.success) {
        setError(result.error ?? "Error al actualizar la contraseña");
        setIsSubmitting(false);
        return;
      }

      setStatus("success");
      setTimeout(() => router.push("/login"), 3000);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              Contract<span className="text-indigo-500">AI</span>
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">

          {/* Loading */}
          {status === "loading" && (
            <div className="text-center py-8">
              <svg className="w-8 h-8 animate-spin text-indigo-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-slate-500 text-sm">Verificando enlace...</p>
            </div>
          )}

          {/* Invalid token */}
          {status === "invalid" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-7 h-7 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Enlace inválido o expirado
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Este enlace de restablecimiento no es válido o ya expiró.
                Los enlaces tienen una duración de 1 hora.
              </p>
              <Link href="/forgot-password">
                <Button variant="primary">
                  Solicitar nuevo enlace
                </Button>
              </Link>
            </div>
          )}

          {/* Form */}
          {status === "form" && (
            <>
              <div className="mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <KeyRound className="w-6 h-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">
                  Nueva contraseña
                </h1>
                <p className="text-slate-500 text-sm">
                  Creando contraseña para{" "}
                  <span className="font-medium text-slate-700">{email}</span>
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <Input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Confirmar contraseña
                  </label>
                  <Input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repite tu contraseña"
                    required
                  />
                </div>

                {/* Password strength indicator */}
                {password.length > 0 && (
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          password.length >= i * 3
                            ? i <= 1
                              ? "bg-red-400"
                              : i <= 2
                              ? "bg-amber-400"
                              : i <= 3
                              ? "bg-yellow-400"
                              : "bg-green-400"
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">
                      {password.length < 6
                        ? "Muy corta"
                        : password.length < 9
                        ? "Débil"
                        : password.length < 12
                        ? "Buena"
                        : "Fuerte"}
                    </span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Actualizando...
                    </span>
                  ) : (
                    "Guardar nueva contraseña"
                  )}
                </Button>
              </form>
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                ¡Contraseña actualizada!
              </h2>
              <p className="text-slate-500 text-sm">
                Tu contraseña se actualizó correctamente.
                Redirigiendo al inicio de sesión...
              </p>
            </motion.div>
          )}
        </div>

        {status === "form" && (
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <svg className="w-8 h-8 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
