import { NewAppointmentModal } from "@/components/new-appointment-modal";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Phone
} from "lucide-react";

export default function AgendaPage() {
  const agendamentosHoje = [
    {
      id: 1,
      horario: "09:00",
      duracao: "50 min",
      paciente: "Mariana Silva Santos",
      telefone: "+55 11 •••••-4321",
      valor: "R$ 180,00",
      status: "completed",
      statusLabel: "Concluída",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      id: 2,
      horario: "10:30",
      duracao: "50 min",
      paciente: "Lucas Gabriel Costa",
      telefone: "+55 11 •••••-8902",
      valor: "R$ 150,00",
      status: "confirmed",
      statusLabel: "Confirmado WhatsApp",
      badge: "bg-[#D2F802]/15 text-[#D2F802] border-[#D2F802]/30",
    },
    {
      id: 3,
      horario: "14:00",
      duracao: "50 min",
      paciente: "Beatriz Ribeiro Lima",
      telefone: "+55 21 •••••-1194",
      valor: "R$ 180,00",
      status: "confirmed",
      statusLabel: "Confirmado WhatsApp",
      badge: "bg-[#D2F802]/15 text-[#D2F802] border-[#D2F802]/30",
    },
    {
      id: 4,
      horario: "15:30",
      duracao: "50 min",
      paciente: "Eduardo Alencar Ramos",
      telefone: "+55 11 •••••-7731",
      valor: "R$ 150,00",
      status: "scheduled",
      statusLabel: "Lembrete 2h Enviado",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    {
      id: 5,
      horario: "17:00",
      duracao: "50 min",
      paciente: "Juliana Ferreira Rocha",
      telefone: "+55 31 •••••-9012",
      valor: "R$ 180,00",
      status: "scheduled",
      statusLabel: "Agendado",
      badge: "bg-gray-500/10 text-gray-400 border-gray-500/30",
    },
  ];

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
              Hoje • 06 de Outubro
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
            <span className="text-xs font-bold text-white px-3 font-mono">06 Out, 2026</span>
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
            Grade de Horários do Dia
          </span>
          <span className="text-xs text-gray-500 font-mono">5 sessões marcadas • 1 intervalo</span>
        </div>

        <div className="space-y-3">
          {agendamentosHoje.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-[#11131a] border border-white/5 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors flex-wrap gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-center font-mono shrink-0 w-16">
                  <span className="block text-base font-extrabold text-white">{item.horario}</span>
                  <span className="text-[10px] text-gray-500">{item.duracao}</span>
                </div>

                <div className="w-px h-8 bg-white/10 hidden sm:block" />

                <div>
                  <h3 className="font-bold text-xs text-white">{item.paciente}</h3>
                  <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3 h-3 text-gray-400" />
                    {item.telefone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-auto sm:ml-0">
                <div className="text-right font-mono">
                  <span className="block text-xs font-bold text-white">{item.valor}</span>
                  <span className="text-[10px] text-emerald-400">PIX</span>
                </div>

                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${item.badge}`}>
                  {item.statusLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
