import Link from "next/link";
import { 
  Bot, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Users, 
  CreditCard,
  Lock,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08090b] text-[#f3f4f6]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#08090b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#D2F802] flex items-center justify-center text-[#08090b] font-black shadow-[0_0_20px_rgba(210,248,2,0.35)] group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight flex items-center gap-1.5">
                Psi<span className="text-[#D2F802]">Flow</span>
              </span>
              <span className="text-[10px] text-gray-400 -mt-1 font-medium tracking-wider uppercase">Virtual Secretary</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#recursos" className="hover:text-white transition-colors">Recursos</Link>
            <Link href="#seguranca" className="hover:text-white transition-colors">Segurança LGPD</Link>
            <Link href="#planos" className="hover:text-white transition-colors">Planos</Link>
            <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Entrar
            </Link>
            <Link 
              href="/login" 
              className="btn-lime text-sm py-2 px-4 shadow-[0_0_20px_rgba(210,248,2,0.25)]"
            >
              Criar Conta Grátis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-20 pb-28 px-6 overflow-hidden">
          {/* Subtle Glow Backgrounds */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D2F802]/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D2F802]/10 border border-[#D2F802]/25 text-[#D2F802] text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              Secretária Virtual WhatsApp + Gestão para Psicólogos
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Automatize seus agendamentos com a <span className="text-[#D2F802] underline decoration-[#D2F802]/40 decoration-wavy underline-offset-8">precisão Finpath</span>.
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Reduza o cancelamento de sessões para menos de 5%. O PsiFlow atende seus pacientes no WhatsApp 24/7, confirma consultas, recebe comprovantes e isola seus dados com segurança de nível bancário e conformidade estrita com a LGPD e o CRP.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/login" 
                className="btn-lime text-base py-3.5 px-8 w-full sm:w-auto text-center font-bold"
              >
                Começar Teste Grátis de 7 Dias
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/dashboard" 
                className="btn-secondary text-base py-3.5 px-6 w-full sm:w-auto text-center"
              >
                Ver Demonstração do Painel
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D2F802]" /> 100% LGPD Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#D2F802]" /> RLS Multi-Tenant no PostgreSQL
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D2F802]" /> Sem dados clínicos no banco
              </span>
            </div>
          </div>

          {/* Interactive Preview Mockup Inspired by Finpath */}
          <div className="max-w-6xl mx-auto mt-16 relative">
            <div className="finpath-card p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-gray-500">psiflow.app/dashboard • Visualização ao Vivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="finpath-badge finpath-badge-lime">
                    <span className="w-2 h-2 rounded-full bg-[#D2F802] animate-pulse" />
                    Bot WhatsApp Ativo (Evolution API)
                  </span>
                </div>
              </div>

              {/* Grid of Metric Cards (Finpath KPI Style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#12151b] border border-white/5 rounded-xl p-5 hover:border-[#D2F802]/30 transition-all">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Faturamento Previsto</span>
                    <TrendingUp className="w-4 h-4 text-[#D2F802]" />
                  </div>
                  <div className="text-2xl font-black text-white">R$ 8.450,00</div>
                  <div className="text-xs text-[#D2F802] mt-1 flex items-center gap-1 font-semibold">
                    +18.4% <span className="text-gray-500 font-normal">vs mês anterior</span>
                  </div>
                </div>

                <div className="bg-[#12151b] border border-white/5 rounded-xl p-5 hover:border-[#D2F802]/30 transition-all">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Consultas Hoje</span>
                    <Calendar className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">6 / 8</div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                    75% concluídas <span className="text-gray-500 font-normal">(2 restantes)</span>
                  </div>
                </div>

                <div className="bg-[#12151b] border border-white/5 rounded-xl p-5 hover:border-[#D2F802]/30 transition-all">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Comparecimento</span>
                    <CheckCircle2 className="w-4 h-4 text-[#D2F802]" />
                  </div>
                  <div className="text-2xl font-black text-white">96.8%</div>
                  <div className="text-xs text-[#D2F802] mt-1 flex items-center gap-1 font-semibold">
                    -3.2% faltas <span className="text-gray-500 font-normal">(lembretes 24h/2h)</span>
                  </div>
                </div>

                <div className="bg-[#12151b] border border-white/5 rounded-xl p-5 hover:border-[#D2F802]/30 transition-all">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Pacientes Ativos</span>
                    <Users className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white">42</div>
                  <div className="text-xs text-cyan-400 mt-1 flex items-center gap-1 font-semibold">
                    +4 novos <span className="text-gray-500 font-normal">nesta semana</span>
                  </div>
                </div>
              </div>

              {/* Two Column Layout: WhatsApp Flow + Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Simulated WhatsApp Secretary Dialog */}
                <div className="bg-[#0b0d11] border border-white/5 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#D2F802]" />
                        Conversa Automatizada no WhatsApp
                      </span>
                      <span className="text-[11px] font-mono text-[#D2F802]">Instância Conectada</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-[#171a22] p-3 rounded-lg max-w-[85%] text-gray-200">
                        <p className="font-semibold text-gray-400 text-[10px] mb-0.5">Paciente (Mariana S.) • 10:14</p>
                        Olá! Gostaria de saber os horários disponíveis para consulta na quinta-feira.
                      </div>

                      <div className="bg-[#D2F802]/15 border border-[#D2F802]/30 p-3 rounded-lg max-w-[85%] ml-auto text-gray-100">
                        <p className="font-bold text-[#D2F802] text-[10px] mb-0.5">Secretária Virtual PsiFlow • 10:14</p>
                        Olá Mariana! Temos os seguintes horários na quinta (08/10):<br />
                        • <strong>14:00</strong><br />
                        • <strong>16:00</strong><br />
                        Qual deles fica melhor para você?
                      </div>

                      <div className="bg-[#171a22] p-3 rounded-lg max-w-[85%] text-gray-200">
                        <p className="font-semibold text-gray-400 text-[10px] mb-0.5">Paciente (Mariana S.) • 10:15</p>
                        Quero às 16h, por favor!
                      </div>

                      <div className="bg-[#D2F802]/15 border border-[#D2F802]/30 p-3 rounded-lg max-w-[85%] ml-auto text-gray-100">
                        <p className="font-bold text-[#D2F802] text-[10px] mb-0.5">Secretária Virtual PsiFlow • 10:15</p>
                        Perfeito! Sua consulta está agendada para <strong>quinta às 16:00</strong>. Já reservei na agenda da psicóloga e você receberá um lembrete 24h antes. ✨
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                    <span>Processado em 1.1s via Evolution API</span>
                    <span className="text-[#D2F802] font-semibold">Status: Confirmado no Banco</span>
                  </div>
                </div>

                {/* Upcoming Schedule List */}
                <div className="bg-[#0b0d11] border border-white/5 rounded-xl p-5">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      Próximas Sessões do Dia
                    </span>
                    <span className="text-xs text-gray-500 font-mono">Hoje, 06 Out</span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { hora: "09:00", nome: "Carlos Eduardo F.", status: "Concluído", valor: "R$ 180,00", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
                      { hora: "10:30", nome: "Beatriz Ribeiro", status: "Confirmado (WhatsApp)", valor: "R$ 150,00", badge: "bg-[#D2F802]/15 text-[#D2F802] border-[#D2F802]/30" },
                      { hora: "14:00", nome: "Lucas Mendes", status: "Confirmado (WhatsApp)", valor: "R$ 180,00", badge: "bg-[#D2F802]/15 text-[#D2F802] border-[#D2F802]/30" },
                      { hora: "15:30", nome: "Fernanda Costa", status: "Lembrete 2h Enviado", valor: "R$ 150,00", badge: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-[#13161e] border border-white/5 rounded-lg flex items-center justify-between hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-white">{item.hora}</span>
                          <div>
                            <div className="font-semibold text-xs text-gray-200">{item.nome}</div>
                            <div className="text-[10px] text-gray-500 font-mono">{item.valor} • 50 min</div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badge}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Total previsto hoje</span>
                    <span className="font-mono font-bold text-white text-sm">R$ 660,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="recursos" className="py-20 border-t border-white/5 bg-[#0b0d11]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D2F802]">Arquitetura de Alto Desempenho</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
                Tudo o que seu consultório precisa para rodar no piloto automático
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Criado especificamente para as necessidades e restrições éticas de profissionais de saúde mental.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="finpath-card p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-[#D2F802]/10 border border-[#D2F802]/20 flex items-center justify-center text-[#D2F802] mb-5">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Secretária Virtual 24/7</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Conexão direta com a Evolution API. Seu WhatsApp responde novos pacientes, tira dúvidas sobre valores, oferece horários da sua grade e fecha agendamentos sem você parar a sessão.
                </p>
              </div>

              <div className="finpath-card p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Blindagem LGPD & CRP</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Você é o Controlador e o PsiFlow é o Operador. Não guardamos anotações clínicas nem prontuários, apenas dados transacionais de agenda. Isolamento multi-tenant via RLS a nível de banco.
                </p>
              </div>

              <div className="finpath-card p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Clareza Financeira Finpath</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Acompanhe em tempo real previsões de faturamento, sessões pagas via PIX ou cartão, controle de inadimplência e histórico de comparecimento dos pacientes em uma interface impecável.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security / LGPD Highlight */}
        <section id="seguranca" className="py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="finpath-card-highlight p-8 sm:p-12 rounded-3xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="finpath-badge finpath-badge-lime mb-4">
                    <ShieldCheck className="w-3.5 h-3.5" /> Segurança Grau Saúde Mental
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    Privacidade e sigilo profissional inegociáveis
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    O PsiFlow implementa o princípio de <em>Privacy by Design</em>. Em conformidade com a LGPD (Lei nº 13.709/2018) e o Código de Ética do Psicólogo:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D2F802] shrink-0" />
                      <strong>Row Level Security (RLS) rígido:</strong> Impossível um psicólogo acessar dados de outro.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D2F802] shrink-0" />
                      <strong>Direito ao Esquecimento:</strong> Exclusão total e definitiva de conta e dados com um clique.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D2F802] shrink-0" />
                      <strong>Minimização de Dados:</strong> Telefones mascarados na interface e tokens de API encriptados com AES-256-GCM.
                    </li>
                  </ul>
                </div>

                <div className="w-full md:w-auto shrink-0 flex flex-col gap-3">
                  <Link href="/privacidade" className="btn-secondary text-sm w-full text-center">
                    Ler Política de Privacidade
                  </Link>
                  <Link href="/termos" className="btn-secondary text-sm w-full text-center">
                    Ler Termos de Uso
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section id="planos" className="py-20 border-t border-white/5 bg-[#0b0d11]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Pronto para transformar a gestão do seu consultório?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Comece agora mesmo com 7 dias grátis. Não pedimos cartão de crédito antecipado para testar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="btn-lime text-base py-3.5 px-8 font-bold">
                Criar Minha Conta Grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#060709] text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#D2F802] flex items-center justify-center text-[#08090b] font-black text-xs">
              Ψ
            </div>
            <span className="font-bold text-gray-300">PsiFlow</span>
            <span>— SaaS de Gestão & Secretária Virtual para Psicólogos</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/termos" className="hover:text-gray-300 transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-gray-300 transition-colors">Política de Privacidade (LGPD)</Link>
            <Link href="/login" className="hover:text-gray-300 transition-colors">Login Profissional</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
