import Link from "next/link";
import { Bot, ArrowLeft, ShieldCheck, Lock, Database, Trash2 } from "lucide-react";

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#08090b] text-[#f3f4f6]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#08090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D2F802] flex items-center justify-center text-[#08090b] font-black">
              <Bot className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              Psi<span className="text-[#D2F802]">Flow</span>
            </span>
          </Link>

          <Link href="/" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Início
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="finpath-card p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D2F802]/10 text-[#D2F802] text-xs font-semibold mb-4 border border-[#D2F802]/25">
              <ShieldCheck className="w-3.5 h-3.5" /> Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Política de Privacidade e Proteção de Dados
            </h1>
            <p className="text-xs text-gray-400 mt-2">
              Última atualização: 05 de outubro de 2026 • Diretrizes específicas para consultórios de psicologia.
            </p>
          </div>

          <section className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-[#D2F802]" /> 1. Dados Coletados e Princípio da Minimização
            </h2>
            <p>
              O PsiFlow coleta apenas os dados estritamente necessários para a prestação do serviço de automação de agendamentos e lembretes via WhatsApp:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-gray-300">
              <li><strong>Do Psicólogo:</strong> Nome completo, e-mail institucional, número do CRP (Conselho Regional de Psicologia) e telefone de contato.</li>
              <li><strong>Do Paciente:</strong> Nome completo ou prenome fornecido, número de telefone WhatsApp (formato E.164) e histórico de datas e horários de agendamento.</li>
            </ul>
            <p className="text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
              ✓ <strong>Nenhum prontuário clínico ou anotação terapêutica é armazenado no banco de dados do PsiFlow.</strong>
            </p>
          </section>

          <section className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D2F802]" /> 2. Arquitetura Multi-Tenant e Row Level Security (RLS)
            </h2>
            <p>
              Todos os dados são armazenados em instâncias protegidas por <strong>Row Level Security (RLS)</strong> no PostgreSQL (Supabase). Isso garante que, a nível de engenharia e banco de dados, nenhum profissional ou consultório tenha acesso às informações, pacientes ou agendas de outro profissional.
            </p>
          </section>

          <section className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" /> 3. Direito ao Esquecimento e Eliminação de Dados (Art. 18 LGPD)
            </h2>
            <p>
              O titular dos dados (ou o psicólogo em nome do paciente) pode requisitar a anonimização ou exclusão total dos dados.
            </p>
            <p>
              Disponibilizamos no painel de configurações a funcionalidade de <strong>Exclusão Definitiva de Conta</strong>, que executa uma rotina de exclusão em cascata (<em>CASCADE</em>), expurgando permanentemente todos os registros, pacientes, configurações e logs relacionados ao tenant.
            </p>
          </section>

          <div className="border-t border-white/5 pt-6 flex items-center justify-between flex-wrap gap-4">
            <Link href="/termos" className="text-xs text-[#D2F802] hover:underline font-semibold">
              ← Consulte também nossos Termos de Uso
            </Link>
            <Link href="/login" className="btn-lime text-xs py-2 px-4">
              Concordar e Acessar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
