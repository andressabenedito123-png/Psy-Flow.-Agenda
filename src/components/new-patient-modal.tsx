"use client";

import { useState } from "react";
import { Plus, X, User, Phone, Mail, CheckCircle2 } from "lucide-react";
import { createPatientAction } from "@/actions/patients";

export function NewPatientModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await createPatientAction({ ok: false, message: "" }, formData);

    setLoading(false);
    if (!res.ok) {
      setError(res.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
      }, 1500);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-lime text-xs py-2.5 px-4 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        Cadastrar Novo Paciente
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="finpath-card w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D2F802]/10 border border-[#D2F802]/20 flex items-center justify-center text-[#D2F802]">
                  <User className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-white">Cadastrar Novo Paciente</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            {success ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#D2F802] mx-auto animate-bounce" />
                <h3 className="text-sm font-bold text-white">Paciente cadastrado com sucesso!</h3>
                <p className="text-xs text-gray-400">Os dados foram protegidos por RLS no banco.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Nome Completo *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      name="full_name"
                      required
                      placeholder="Ex: Mariana Silva Santos"
                      className="w-full bg-[#12151d] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">WhatsApp / Telefone *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      name="phone"
                      required
                      placeholder="Ex: 11999998888"
                      className="w-full bg-[#12151d] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Formato com DDD. Usado pela secretária virtual para confirmações e lembretes.
                  </span>
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">E-mail (opcional)</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Ex: paciente@email.com"
                      className="w-full bg-[#12151d] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">
                    Observações Administrativas / Logísticas
                  </label>
                  <textarea
                    name="administrative_notes"
                    rows={2}
                    placeholder="Ex: Prefere atendimento no período da manhã. Pagamento por sessão."
                    className="w-full bg-[#12151d] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs"
                  />
                  <span className="text-[10px] text-gray-500 mt-0.5 block">
                    Aviso: Não insira anotações clínicas ou dados de prontuário neste campo.
                  </span>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-lime text-xs py-2 px-5"
                  >
                    {loading ? "Salvando..." : "Salvar Paciente"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
