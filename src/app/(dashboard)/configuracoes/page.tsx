"use client";

import { useState, useEffect } from "react";
import { 
  Key, 
  Clock, 
  Save, 
  Trash2, 
  CheckCircle2,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { saveBotSettingsAction, deleteAccountAction } from "@/actions/settings";

interface BotSettingsData {
  whatsapp_instance_name?: string | null;
  whatsapp_api_url?: string | null;
  session_duration_minutes?: number;
  session_price?: number;
  welcome_message?: string;
  is_active?: boolean;
}

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<"whatsapp" | "regras" | "lgpd">("whatsapp");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Form states initialized with reasonable defaults
  const [settings, setSettings] = useState<BotSettingsData>({
    whatsapp_instance_name: "psiflow-consultorio",
    whatsapp_api_url: "https://api.whatsapp-psiflow.com.br",
    session_duration_minutes: 50,
    session_price: 150.0,
    welcome_message: "Olá! Sou a secretária virtual do consultório da Dra. Andressa. Como posso te ajudar com seus agendamentos hoje?",
    is_active: true,
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("bot_settings")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

          if (data && !error) {
            setSettings((prev) => ({
              ...prev,
              whatsapp_instance_name: data.whatsapp_instance_name || prev.whatsapp_instance_name,
              whatsapp_api_url: data.whatsapp_api_url || prev.whatsapp_api_url,
              session_duration_minutes: data.session_duration_minutes || prev.session_duration_minutes,
              session_price: data.session_price || prev.session_price,
              welcome_message: data.welcome_message || prev.welcome_message,
              is_active: data.is_active ?? prev.is_active,
            }));
          }
        }
      } catch (err) {
        console.error("Erro ao carregar configurações:", err);
      }
    }

    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await saveBotSettingsAction({ ok: false, message: "" }, formData);
      if (res.ok) {
        setMessage({ type: "success", text: res.message || "Configurações salvas com sucesso!" });
      } else {
        setMessage({ type: "error", text: res.message || "Erro ao salvar configurações." });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Ocorreu um erro ao salvar.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "EXCLUIR") return;
    setIsDeleting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("confirmation", "EXCLUIR");

    try {
      const res = await deleteAccountAction({ ok: false, message: "" }, formData);
      if (!res.ok) {
        setMessage({ type: "error", text: res.message });
      }
    } catch (err: unknown) {
      // Se redirecionou, o Next.js lança uma exceção de redirect que é normal
      if (typeof err === "object" && err !== null && "digest" in err) {
        const digest = String((err as { digest?: string }).digest);
        if (digest.startsWith("NEXT_REDIRECT")) return;
      }
      const errorMsg = err instanceof Error ? err.message : "Erro ao solicitar exclusão de conta.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Configurações da Secretária Virtual
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Integração com WhatsApp (Evolution API), horários de atendimento e conformidade LGPD.
          </p>
        </div>

        {message && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold animate-fade-in ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
                : "bg-red-500/10 border border-red-500/25 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
            {message.text}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("whatsapp")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === "whatsapp"
              ? "bg-[#D2F802]/15 text-[#D2F802] border border-[#D2F802]/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          API do WhatsApp
        </button>
        <button
          onClick={() => setActiveTab("regras")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === "regras"
              ? "bg-[#D2F802]/15 text-[#D2F802] border border-[#D2F802]/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Regras & Mensagens
        </button>
        <button
          onClick={() => setActiveTab("lgpd")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === "lgpd"
              ? "bg-red-500/15 text-red-400 border border-red-500/30"
              : "text-gray-400 hover:text-red-400"
          }`}
        >
          Privacidade & LGPD
        </button>
      </div>

      {/* Tab 1: WhatsApp API */}
      {activeTab === "whatsapp" && (
        <form onSubmit={handleSave} className="finpath-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Key className="w-4 h-4 text-[#D2F802]" />
            Credenciais da Evolution API / Provedor WhatsApp
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">
                Nome da Instância
              </label>
              <input
                type="text"
                name="whatsapp_instance_name"
                defaultValue={settings.whatsapp_instance_name || "psiflow-consultorio"}
                className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 font-mono text-xs"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                Nome identificador da instância configurada no seu servidor Evolution API.
              </span>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">
                URL da API (Evolution API Server)
              </label>
              <input
                type="url"
                name="whatsapp_api_url"
                defaultValue={settings.whatsapp_api_url || "https://api.whatsapp-psiflow.com.br"}
                className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">
                API Key / Token de Acesso (Criptografado com AES-256-GCM)
              </label>
              <input
                type="password"
                name="whatsapp_api_token"
                placeholder="Deixe em branco para manter o token atual"
                className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 font-mono text-xs"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                O token é criptografado em repouso no Supabase antes de ser gravado.
              </span>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={settings.is_active ?? true}
                  className="rounded border-white/20 bg-[#12151d] text-[#D2F802] focus:ring-[#D2F802]"
                />
                <span className="text-gray-300 font-semibold text-xs">
                  Ativar secretária virtual e agendamento automático
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-lime text-xs py-2.5 px-5 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {isSaving ? "Salvando..." : "Salvar Credenciais"}
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Regras e Horários */}
      {activeTab === "regras" && (
        <form onSubmit={handleSave} className="finpath-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Clock className="w-4 h-4 text-[#D2F802]" />
            Parâmetros de Sessão e Lembretes
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">
                Duração da Sessão (minutos)
              </label>
              <input
                type="number"
                name="session_duration_minutes"
                defaultValue={settings.session_duration_minutes ?? 50}
                className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">
                Valor Base da Consulta (R$)
              </label>
              <input
                type="number"
                name="session_price"
                step="0.01"
                defaultValue={settings.session_price ?? 150.0}
                className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 font-semibold mb-1.5 text-xs">
              Mensagem de Boas-Vindas da Secretária Virtual
            </label>
            <textarea
              rows={3}
              name="welcome_message"
              defaultValue={settings.welcome_message || "Olá! Sou a secretária virtual do consultório da Dra. Andressa. Como posso te ajudar com seus agendamentos hoje?"}
              className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-lime text-xs py-2.5 px-5 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {isSaving ? "Salvando..." : "Salvar Regras"}
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: LGPD / Exclusão de Conta */}
      {activeTab === "lgpd" && (
        <div className="finpath-card p-6 sm:p-8 space-y-6 border-red-500/20 bg-red-950/10">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <Trash2 className="w-4 h-4" />
            Direito ao Esquecimento • Exclusão Definitiva de Conta (Art. 18 LGPD)
          </div>

          <p className="text-gray-300 text-xs leading-relaxed">
            A exclusão é <strong>permanente e irreversível</strong>. Ao confirmar, a função segura do PostgreSQL (<code>delete_user_account</code>) apagará:
          </p>

          <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
            <li>Seu perfil de usuário e credenciais no Supabase Auth</li>
            <li>Todos os pacientes vinculados ao seu consultório</li>
            <li>Todo o histórico de consultas e agendamentos</li>
            <li>Credenciais da instância do WhatsApp e histórico de mensagens</li>
            <li>Dados e tokens de assinatura</li>
          </ul>

          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-3">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              Para confirmar a exclusão, digite a palavra &quot;EXCLUIR&quot; abaixo:
            </div>

            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Digite EXCLUIR"
              className="w-full bg-[#08090b] border border-red-500/30 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-400 font-mono"
            />

            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== "EXCLUIR" || isDeleting}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                deleteConfirmation === "EXCLUIR"
                  ? "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/40"
                  : "bg-red-950/30 text-gray-600 cursor-not-allowed border border-red-900/20"
              }`}
            >
              {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              {isDeleting ? "Excluindo todos os dados..." : "Excluir Definitivamente Minha Conta e Pacientes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
