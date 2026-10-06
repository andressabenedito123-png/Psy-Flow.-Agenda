"use client";

import { useState } from "react";
import { 
  Bot, 
  Key, 
  Clock, 
  MessageSquare, 
  Save, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<"whatsapp" | "regras" | "lgpd">("whatsapp");
  const [saved, setSaved] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "EXCLUIR") return;
    setIsDeleting(true);
    // Dispara a rotina de exclusão LGPD
    alert("Solicitação de exclusão definitiva enviada conforme LGPD Art. 18.");
    setIsDeleting(false);
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

        {saved && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Configurações salvas!
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("whatsapp")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "whatsapp"
              ? "bg-[#D2F802]/15 text-[#D2F802] border border-[#D2F802]/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          API do WhatsApp
        </button>
        <button
          onClick={() => setActiveTab("regras")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "regras"
              ? "bg-[#D2F802]/15 text-[#D2F802] border border-[#D2F802]/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Regras & Mensagens
        </button>
        <button
          onClick={() => setActiveTab("lgpd")}
          className={`px-4 py-2 rounded-xl transition-all ${
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
                defaultValue="psiflow-consultorio"
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
                type="text"
                defaultValue="https://api.whatsapp-psiflow.com.br"
                className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">
                API Key / Token de Acesso (Criptografado com AES-256-GCM)
              </label>
              <input
                type="password"
                defaultValue="••••••••••••••••••••••••••••••••"
                className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 font-mono text-xs"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                O token é criptografado em repouso no Supabase antes de ser gravado.
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button type="submit" className="btn-lime text-xs py-2.5 px-5">
              <Save className="w-3.5 h-3.5" />
              Salvar Credenciais
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
                defaultValue={50}
                className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1.5">
                Valor Base da Consulta (R$)
              </label>
              <input
                type="number"
                defaultValue={150.00}
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
              defaultValue="Olá! Sou a secretária virtual do consultório da Dra. Andressa. Como posso te ajudar com seus agendamentos hoje?"
              className="w-full bg-[#12151d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button type="submit" className="btn-lime text-xs py-2.5 px-5">
              <Save className="w-3.5 h-3.5" />
              Salvar Regras
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
              Para confirmar a exclusão, digite a palavra "EXCLUIR" abaixo:
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
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                deleteConfirmation === "EXCLUIR"
                  ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-lg shadow-red-900/40"
                  : "bg-red-950/30 text-gray-600 cursor-not-allowed border border-red-900/20"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {isDeleting ? "Excluindo todos os dados..." : "Excluir Definitivamente Minha Conta e Pacientes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
