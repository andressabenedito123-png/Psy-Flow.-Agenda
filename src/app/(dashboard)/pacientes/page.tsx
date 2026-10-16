import { NewPatientModal } from "@/components/new-patient-modal";
import { 
  Search, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  MoreVertical
} from "lucide-react";

export default function PacientesPage() {
  const pacientesMock = [
    {
      id: "1",
      nome: "Mariana Silva Santos",
      telefone: "+55 11 •••••-4321",
      email: "mariana.santos@email.com",
      status: "active",
      totalSessoes: 14,
      ultimaSessao: "06 Out 2026",
      proximaSessao: "13 Out 2026 às 09:00",
      anotacoes: "Prefere atendimento matutino. Pontual.",
    },
    {
      id: "2",
      nome: "Lucas Gabriel Costa",
      telefone: "+55 11 •••••-8902",
      email: "lucas.costa@email.com",
      status: "active",
      totalSessoes: 8,
      ultimaSessao: "29 Set 2026",
      proximaSessao: "06 Out 2026 às 10:30",
      anotacoes: "Comprovante enviado via PIX.",
    },
    {
      id: "3",
      nome: "Beatriz Ribeiro Lima",
      telefone: "+55 21 •••••-1194",
      email: "beatriz.lima@email.com",
      status: "active",
      totalSessoes: 22,
      ultimaSessao: "30 Set 2026",
      proximaSessao: "07 Out 2026 às 14:00",
      anotacoes: "Sessões semanais às quartas.",
    },
    {
      id: "4",
      nome: "Eduardo Alencar Ramos",
      telefone: "+55 11 •••••-7731",
      email: "eduardo.ramos@email.com",
      status: "active",
      totalSessoes: 6,
      ultimaSessao: "22 Set 2026",
      proximaSessao: "06 Out 2026 às 15:30",
      anotacoes: "Lembrete enviado com 24h e 2h de antecedência.",
    },
    {
      id: "5",
      nome: "Juliana Ferreira Rocha",
      telefone: "+55 31 •••••-9012",
      email: "juliana.rocha@email.com",
      status: "inactive",
      totalSessoes: 4,
      ultimaSessao: "15 Set 2026",
      proximaSessao: "Aguardando confirmação",
      anotacoes: "Solicitou remarcação para o fim do mês.",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Gestão de Pacientes
            </h1>
            <span className="finpath-badge finpath-badge-lime text-[11px]">
              {pacientesMock.length} cadastrados
            </span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Lista de pacientes, dados de contato protegidos e histórico logístico de agendamentos.
          </p>
        </div>

        <NewPatientModal />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome ou telefone..."
            className="w-full bg-[#11131a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D2F802]/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-[#D2F802]" />
          <span>Telefones mascarados conforme Art. 6º LGPD</span>
        </div>
      </div>

      {/* Finpath Patient Tracking Table */}
      <div className="finpath-card overflow-hidden border border-white/10 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#12151d] text-gray-400 uppercase tracking-wider font-semibold text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3.5 px-5">Paciente</th>
                <th className="py-3.5 px-5">WhatsApp / Contato</th>
                <th className="py-3.5 px-5">Sessões Realizadas</th>
                <th className="py-3.5 px-5">Próxima Consulta</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {pacientesMock.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-[#D2F802]">
                        {paciente.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{paciente.nome}</div>
                        <div className="text-[10px] text-gray-500">{paciente.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5 font-mono text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      {paciente.telefone}
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-bold text-white font-mono">{paciente.totalSessoes}</div>
                    <div className="text-[10px] text-gray-500">Última: {paciente.ultimaSessao}</div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-semibold text-gray-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D2F802]" />
                      {paciente.proximaSessao}
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      paciente.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${paciente.status === "active" ? "bg-emerald-400" : "bg-gray-400"}`} />
                      {paciente.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
