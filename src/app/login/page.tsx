"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, ShieldCheck, Lock, Check } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    if (!acceptedTerms) {
      setError("Você deve aceitar os Termos de Uso e a Política de Privacidade (LGPD) para prosseguir.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?consent=1&next=/dashboard`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (signInError) {
        console.error("Erro ao fazer login:", signInError);
        setError(signInError.message || "Erro ao conectar com o Google.");
        setLoading(false);
      }
    } catch (err: unknown) {
      console.error("Erro inesperado ao fazer login:", err);
      const message = err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-[#f3f4f6] flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D2F802]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D2F802] flex items-center justify-center text-[#08090b] font-black shadow-[0_0_20px_rgba(210,248,2,0.35)]">
            <Bot className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            Psi<span className="text-[#D2F802]">Flow</span>
          </span>
        </Link>

        <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
          ← Voltar para o início
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-12 relative z-10">
        <div className="finpath-card p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#D2F802]/15 border border-[#D2F802]/30 flex items-center justify-center text-[#D2F802] mx-auto mb-4 shadow-[0_0_25px_rgba(210,248,2,0.15)]">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Acesso ao PsiFlow
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Área exclusiva para psicólogos e gestores de clínicas.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* LGPD Mandatory Consent Checkbox */}
          <div className="mb-6 p-4 rounded-xl bg-[#12151b] border border-white/5 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="lgpd-consent-checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (e.target.checked) setError(null);
                  }}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded-md border border-gray-600 bg-[#08090b] peer-checked:bg-[#D2F802] peer-checked:border-[#D2F802] transition-all flex items-center justify-center">
                  {acceptedTerms && <Check className="w-3.5 h-3.5 text-[#08090b] stroke-[3]" />}
                </div>
              </div>
              <span className="text-xs text-gray-300 leading-relaxed">
                Li e concordo com a{" "}
                <Link href="/privacidade" target="_blank" className="text-[#D2F802] underline hover:text-[#bde002]">
                  Política de Tratamento de Dados (LGPD)
                </Link>{" "}
                e os{" "}
                <Link href="/termos" target="_blank" className="text-[#D2F802] underline hover:text-[#bde002]">
                  Termos de Uso
                </Link>.
              </span>
            </label>

            <div className="text-[11px] text-gray-500 flex items-center gap-1.5 pt-1 border-t border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D2F802] shrink-0" />
              <span>Você é o Controlador dos dados e o PsiFlow atua como Operador.</span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading || !acceptedTerms}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all ${acceptedTerms
                ? "bg-white text-gray-900 hover:bg-gray-100 shadow-lg cursor-pointer"
                : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/5"
              }`}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.1 0-5.74-2.1-6.68-4.93H1.28v3.09C3.26 21.3 7.32 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.32 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32V6.59H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.41l4.04-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            Continuar com Google
          </button>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500">
              Novo no PsiFlow? Ao fazer login pela primeira vez, seu{" "}
              <span className="text-[#D2F802] font-semibold">teste de 7 dias</span> é ativado automaticamente.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-gray-600">
        PsiFlow © 2026 • Em conformidade com a LGPD (Lei 13.709/2018) e normas do Conselho Federal de Psicologia.
      </footer>
    </div>
  );
}
