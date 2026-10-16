"use client";

import { useState } from "react";
import { Plus, X, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { createAppointmentAction } from "@/actions/appointments";

interface PatientOption {
  id: string;
  full_name: string;
}

interface NewAppointmentModalProps {
  patients?: PatientOption[];
}

export function NewAppointmentModal({ patients = [] }: NewAppointmentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await createAppointmentAction({ ok: false, message: "" }, formData);

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
        Agendar Nova Consulta
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="finpath-card w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D2F802]/10 border border-[#D2F802]/20 flex items-center justify-center text-[#D2F802]">
                  <Calendar className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-white">Agendar Nova Consulta</h2>
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
                <h3 className="text-sm font-bold text-white">Consulta agendada com sucesso!</h3>
                <p className="text-xs text-gray-400">O paciente receberá lembretes automáticos no WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Paciente *</label>
                  {patients.length > 0 ? (
                    <select
                      name="patient_id"
                      required
                      className="w-full bg-[#12151d] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs"
                    >
                      <option value="">Selecione um paciente...</option>
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.full_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name="patient_id"
                      required
                      placeholder="ID do paciente cadastrado"
                      defaultValue="00000000-0000-0000-0000-000000000001"
                      className="w-full bg-[#12151d] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs font-mono"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Data e Horário *</label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="datetime-local"
                      name="starts_at"
                      required
                      defaultValue="2026-10-08T14:00"
                      className="w-full bg-[#12151d] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">Duração (minutos) *</label>
                    <input
                      type="number"
                      name="duration_minutes"
                      required
                      defaultValue={50}
                      className="w-full bg-[#12151d] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">Valor da Sessão (R$) *</label>
                    <input
                      type="number"
                      name="price"
                      required
                      defaultValue={150.00}
                      step="0.01"
                      className="w-full bg-[#12151d] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D2F802]/50 text-xs font-mono"
                    />
                  </div>
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
                    {loading ? "Agendando..." : "Confirmar Agendamento"}
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
