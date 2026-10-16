import Link from "next/link";
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Users, 
  Clock, 
  Plus, 
  ShieldCheck, 
  ArrowUpRight,
  ChevronRight,
  Bot
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Visão Geral do Consultório
            </h1>
            <span className="finpath-badge finpath-badge-lime text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2F802] animate-pulse" />
              WhatsApp Online
            </span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Métricas de agendamento, faturamento previsto e atendimento automatizado via IA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/pacientes"
            className="btn-secondary text-xs py-2 px-3.5"
          >
            <Users className="w-3.5 h-3.5" />
            Novo Paciente
          </Link>
          <Link
            href="/agenda"
            className="btn-lime text-xs py-2 px-3.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Nova Consulta
          </Link>
        </div>
      </div>

      {/* KPI Cards (Finpath Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Faturamento Previsto */}
        <div className="finpath-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Faturamento Previsto</span>
            <div className="w-8 h-8 rounded-lg bg-[#D2F802]/10 border border-[#D2F802]/20 flex items-center justify-center text-[#D2F802]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            R$ 8.450,00
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-[#D2F802] font-semibold flex items-center gap-1">
              +18.4% <ArrowUpRight className="w-3 h-3" />
            </span>
            <span className="text-gray-500 text-[11px]">vs mês anterior</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#D2F802] h-full w-[72%] rounded-full" />
          </div>
        </div>

        {/* Card 2: Consultas do Mês */}
        <div className="finpath-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Consultas (Mês)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            48 sessões
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-emerald-400 font-semibold">38 confirmadas</span>
            <span className="text-gray-500 text-[11px]">10 agendadas</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full w-[80%] rounded-full" />
          </div>
        </div>

        {/* Card 3: Taxa de Comparecimento */}
        <div className="finpath-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Comparecimento</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            96.2%
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-cyan-400 font-semibold">Lembretes 24h & 2h</span>
            <span className="text-gray-500 text-[11px]">Apenas 2 faltas</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-cyan-400 h-full w-[96%] rounded-full" />
          </div>
        </div>

        {/* Card 4: Pacientes Ativos */}
        <div className="finpath-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Pacientes Ativos</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            34 pacientes
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-purple-400 font-semibold">+4 este mês</span>
            <span className="text-gray-500 text-[11px]">Via WhatsApp</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-400 h-full w-[65%] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Grid: Consultas de Hoje + Atividade do Bot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Agenda de Hoje (Finpath Tracking Table) */}
        <div className="lg:col-span-2 finpath-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D2F802]" />
                Agenda do Dia • Sessões de Hoje
              </h2>
              <span className="text-xs text-gray-500">6 consultas programadas</span>
            </div>
            <Link
              href="/agenda"
              className="text-xs font-bold text-[#D2F802] hover:underline flex items-center gap-1"
            >
              Ver Agenda Completa <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 1,
                paciente: "Mariana Silva Santos",
                telefone: "+55 11 •••••-4321",
                horario: "09:00 - 09:50",
                valor: "R$ 180,00",
                pagamento: "PIX Recebido",
                status: "Concluída",
                badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
              },
              {
                id: 2,
                paciente: "Lucas Gabriel Costa",
                telefone: "+55 11 •••••-8902",
                horario: "10:30 - 11:20",
                valor: "R$ 150,00",
                pagamento: "PIX Pendente",
                status: "Confirmada (WhatsApp)",
                badge: "bg-[#D2F802]/15 text-[#D2F802] border-[#D2F802]/30",
              },
              {
                id: 3,
                paciente: "Beatriz Ribeiro Lima",
                telefone: "+55 21 •••••-1194",
                horario: "14:00 - 14:50",
                valor: "R$ 180,00",
                pagamento: "Cartão de Crédito",
                status: "Confirmada (WhatsApp)",
                badge: "bg-[#D2F802]/15 text-[#D2F802] border-[#D2F802]/30",
              },
              {
                id: 4,
                paciente: "Eduardo Alencar Ramos",
                telefone: "+55 11 •••••-7731",
                horario: "15:30 - 16:20",
                valor: "R$ 150,00",
                pagamento: "Pendente",
                status: "Lembrete 2h Enviado",
                badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
              },
              {
                id: 5,
                paciente: "Juliana Ferreira Rocha",
                telefone: "+55 31 •••••-9012",
                horario: "17:00 - 17:50",
                valor: "R$ 180,00",
                pagamento: "Pendente",
                status: "Agendada",
                badge: "bg-gray-500/10 text-gray-400 border-gray-500/30",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="p-4 bg-[#11131a] border border-white/5 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors flex-wrap gap-3"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-extrabold text-xs text-[#D2F802]">
                    {item.paciente.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white">{item.paciente}</h3>
                    <div className="text-[11px] text-gray-500 font-mono flex items-center gap-2 mt-0.5">
                      <span>{item.telefone}</span>
                      <span>•</span>
                      <span>{item.horario}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-mono font-bold text-xs text-white">{item.valor}</div>
                    <div className="text-[10px] text-gray-500">{item.pagamento}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${item.badge}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Bot WhatsApp Status & Quick Config */}
        <div className="space-y-6">
          {/* Bot Automation Card */}
          <div className="finpath-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#D2F802]" />
                Secretária Virtual
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="p-3.5 bg-[#11141c] border border-white/5 rounded-xl space-y-2">
              <div className="text-[11px] text-gray-400 flex items-center justify-between">
                <span>Instância Ativa:</span>
                <span className="font-mono text-white font-bold">psiflow-consultorio</span>
              </div>
              <div className="text-[11px] text-gray-400 flex items-center justify-between">
                <span>Duração Padrão:</span>
                <span className="font-mono text-white font-bold">50 min</span>
              </div>
              <div className="text-[11px] text-gray-400 flex items-center justify-between">
                <span>Valor Base da Sessão:</span>
                <span className="font-mono text-[#D2F802] font-bold">R$ 150,00</span>
              </div>
              <div className="text-[11px] text-gray-400 flex items-center justify-between">
                <span>Lembretes Automáticos:</span>
                <span className="font-mono text-emerald-400 font-bold">24h e 2h antes</span>
              </div>
            </div>

            <Link
              href="/configuracoes"
              className="btn-secondary w-full text-xs text-center justify-center"
            >
              Ajustar Regras do WhatsApp
            </Link>
          </div>

          {/* LGPD Safety Card */}
          <div className="finpath-card p-6 space-y-3 bg-gradient-to-b from-[#0e1015] to-[#121620]">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#D2F802]" />
              Conformidade LGPD Ativa
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Os dados dos seus pacientes estão protegidos por RLS no PostgreSQL. Nenhum prontuário clínico é armazenado neste sistema.
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
              <span>Isolamento Multi-Tenant</span>
              <span className="text-emerald-400 font-semibold">100% Protegido</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
