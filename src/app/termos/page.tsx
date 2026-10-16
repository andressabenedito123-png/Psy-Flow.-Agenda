import Link from "next/link";
import { Bot, ArrowLeft, FileText } from "lucide-react";

export default function TermosDeUsoPage() {
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
              <FileText className="w-3.5 h-3.5" /> Termos de Uso • Versão 1.0 (2026)
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Termos de Uso do Serviço PsiFlow
            </h1>
            <p className="text-xs text-gray-400 mt-2">
              Última atualização: 05 de outubro de 2026 • Em conformidade com a LGPD e o Código de Ética Profissional do Psicólogo (CFP).
            </p>
          </div>

          <section className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              1. Papéis e Responsabilidades no Tratamento de Dados (LGPD)
            </h2>
            <p>
              1.1. <strong>O Psicólogo / Usuário Contratante é o CONTROLADOR</strong> dos dados pessoais e de saúde de seus respectivos pacientes, cabendo exclusivamente a ele obter o consentimento dos pacientes para o contato e definir as diretrizes éticas e clínicas dos atendimentos.
            </p>
            <p>
              1.2. <strong>O PsiFlow atua estritamente como OPERADOR</strong> dos dados, provendo a infraestrutura tecnológica de automação de agenda, mensagens via WhatsApp e conciliação de horários sob as instruções e parametrizações definidas pelo Controlador.
            </p>
          </section>

          <section className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              2. Isenção sobre Conteúdo de Mensagens e Prontuários Clínicos
            </h2>
            <p>
              2.1. O PsiFlow armazena exclusivamente dados logísticos e transacionais de agendamento (nome, número de WhatsApp para notificação, datas e horários de sessão, status de presença e valores combinados).
            </p>
            <p className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs">
              <strong>Importante:</strong> É estritamente vedado o uso do PsiFlow como repositório de prontuários clínicos, diagnósticos, anotações de sessão ou quaisquer dados sensíveis de saúde não relacionados à logística de agendamento. O PsiFlow isenta-se expressamente de responsabilidade sobre o conteúdo das conversas livres mantidas entre o paciente e o profissional via WhatsApp.
            </p>
          </section>

          <section className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              3. Integração com WhatsApp e Serviços de Terceiros
            </h2>
            <p>
              3.1. A conexão da secretária virtual com o WhatsApp ocorre por meio de instâncias e provedores de API (ex.: Evolution API). O Controlador é responsável pela manutenção da legitimidade do seu número telefônico e observância dos termos da plataforma de mensageria.
            </p>
          </section>

          <section className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              4. Direito ao Esquecimento e Exclusão Definitiva (Art. 18 LGPD)
            </h2>
            <p>
              4.1. O Controlador possui o direito inalienável de solicitar a qualquer tempo a exclusão definitiva de sua conta. Ao acionar o comando de exclusão na área de configurações, todos os registros de pacientes, consultas, integrações e histórico vinculados ao seu identificador (tenant) serão expurgados de forma irreversível de nossos bancos de dados (<em>Hard Delete</em>).
            </p>
          </section>

          <div className="border-t border-white/5 pt-6 flex items-center justify-between flex-wrap gap-4">
            <Link href="/privacidade" className="text-xs text-[#D2F802] hover:underline font-semibold">
              Consulte também nossa Política de Privacidade →
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
