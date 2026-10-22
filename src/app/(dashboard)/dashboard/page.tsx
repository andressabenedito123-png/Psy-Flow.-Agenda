"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
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
  Bot,
  Loader2
} from "lucide-react";

// Conexão com o Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [agendamentosHoje, setAgendamentosHoje] = useState<any[]>([]);
  const [totalPacientes, setTotalPacientes] = useState<number>(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDadosDashboard() {
      // 1. Carregar contagem de pacientes
      const { count } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true });

      if (count !== null) setTotalPacientes(count);

      // 2. Carregar agendamentos (Join com tabela de pacientes)
      const { data } = await supabase
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
        .order('starts_at', { ascending: true })
        .limit(10); // Limita para não sobrecarregar o dashboard

      if (data) setAgendamentosHoje(data);

      setCarregando(false);
    }

    carregarDadosDashboard();
  }, []);

  const formatarHorario = (dataIso: string, duracao: number) => {
    const inicio = new Date(dataIso);
    const fim = new Date(inicio.getTime() + duracao * 60000);
    const timeIn = inicio.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const timeOut = fim.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${timeIn} - ${timeOut}`;
  };

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
        {/* Card 1: Faturamento Previsto (Ainda mockado para a UI) */}
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

        {/* Card 2: Consultas do Mês (Ainda mockado para a UI) */}
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

        {/* Card 3: Taxa de Comparecimento (Ainda mockado para a UI) */}
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

        {/* Card 4: Pacientes Ativos (Conectado ao BD) */}
        <div className="finpath-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Pacientes Cadastrados</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {carregando ? "..." : totalPacientes} pacientes
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-purple-400 font-semibold">Base de dados</span>
            <span className="text-gray-500 text-[11px]">Sincronizado</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-400 h-full w-[100%] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Grid: Consultas de Hoje + Atividade do Bot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Agenda de Hoje */}
        <div className="lg:col-span-2 finpath-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D2F802]" />
                Agenda de Consultas Recentes
              </h2>
              <span className="text-xs text-gray-500">
                {carregando ? "Carregando..." : `${agendamentosHoje.length} consultas listadas`}
              </span>
            </div>
            <Link
              href="/agenda"
              className="text-xs font-bold text-[#D2F802] hover:underline flex items-center gap-1"
            >
              Ver Agenda Completa <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {carregando ? (
              <div className="py-8 text-center text-gray-500 flex flex-col items-center">
                <Loader2 className="w-5 h-5 animate-spin mb-2" />
                Sincronizando dados...
              </div>
            ) : agendamentosHoje.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-sm">
                Nenhuma consulta na sua agenda.
              </div>
            ) : (
              agendamentosHoje.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#11131a] border border-white/5 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors flex-wrap gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-extrabold text-xs text-[#D2F802]">
                      {(item.patients?.full_name || "??").split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-white">{item.patients?.full_name || "Paciente Removido"}</h3>
                      <div className="text-[11px] text-gray-500 font-mono flex items-center gap-2 mt-0.5">
                        <span>{item.patients?.phone || "Sem número"}</span>
                        <span>•</span>
                        <span>{formatarHorario(item.starts_at, item.duration_minutes)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-white">R$ {item.price}</div>
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-[#D2F802]/15 text-[#D2F802] border-[#D2F802]/30">
                      Agendado
                    </span>
                  </div>
                </div>
              ))
            )}
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