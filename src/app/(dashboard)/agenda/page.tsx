"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { NewAppointmentModal } from "@/components/new-appointment-modal";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Phone,
  Loader2
} from "lucide-react";

// Conexão direta com o Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AgendaPage() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarAgendamentos() {
      // Vai buscar as consultas e faz um "join" com a tabela de pacientes para obter o nome e telemóvel
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          starts_at,
          duration_minutes,
          price,
          status,
          patients (
            full_name,
            phone
          )
        `)
        .order('starts_at', { ascending: true });

      if (data) {
        setAgendamentos(data);
      }
      setCarregando(false);
    }

    buscarAgendamentos();
  }, []);

  // Formata os dados para o design da lista
  const formatarHorario = (dataIso: string) => {
    const data = new Date(dataIso);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Agenda de Atendimentos
            </h1>
            <span className="finpath-badge finpath-badge-lime text-[11px]">
              {carregando ? "A carregar..." : `${agendamentos.length} consultas`}
            </span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Visualização de horários, confirmações automatizadas pelo WhatsApp e controle de presença.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#11131a] border border-white/10 rounded-xl p-1">
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-white px-3 font-mono">Hoje</span>
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <NewAppointmentModal />
        </div>
      </div>

      {/* Finpath Timeline List */}
      <div className="finpath-card p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D2F802]" />
            Grade de Horários
          </span>
          <span className="text-xs text-gray-500 font-mono">
            {agendamentos.length} sessões
          </span>
        </div>

        <div className="space-y-3">
          {carregando ? (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center">
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
              <p>A sincronizar agenda...</p>
            </div>
          ) : agendamentos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhuma consulta agendada para hoje.
            </div>
          ) : (
            agendamentos.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-[#11131a] border border-white/5 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors flex-wrap gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center font-mono shrink-0 w-16">
                    <span className="block text-base font-extrabold text-white">
                      {formatarHorario(item.starts_at)}
                    </span>
                    <span className="text-[10px] text-gray-500">{item.duration_minutes} min</span>
                  </div>

                  <div className="w-px h-8 bg-white/10 hidden sm:block" />

                  <div>
                    <h3 className="font-bold text-xs text-white">
                      {item.patients?.full_name || "Paciente Removido"}
                    </h3>
                    <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {item.patients?.phone || "Sem número"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 ml-auto sm:ml-0">
                  <div className="text-right font-mono">
                    <span className="block text-xs font-bold text-white">R$ {item.price}</span>
                  </div>

                  {/* Etiqueta genérica até implementarmos o sistema de status real */}
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-[#D2F802]/15 text-[#D2F802] border-[#D2F802]/30">
                    Agendado
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}