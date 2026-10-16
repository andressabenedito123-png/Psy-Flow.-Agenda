import { 
  CreditCard, 
  Check, 
  Sparkles, 
  ArrowRight,
  Clock
} from "lucide-react";

export default function AssinaturaPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Assinatura & Planos
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Gerencie seu plano de acesso ao PsiFlow e faturamento via Stripe.
          </p>
        </div>

        <div className="finpath-badge finpath-badge-lime text-xs">
          <Clock className="w-3.5 h-3.5" />
          Período de Testes: 7 dias restantes
        </div>
      </div>

      {/* Current Status Banner */}
      <div className="finpath-card-highlight p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D2F802]">Seu Status Atual</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D2F802]" />
            <span className="text-xs text-gray-300">Trial Gratuito de 7 Dias</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Acesso Total Liberado
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-lg">
            Você está usufruindo de todas as funcionalidades de secretária virtual, agendamentos ilimitados e conformidade LGPD.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-500 block mb-1">Processamento Seguro</span>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
            <CreditCard className="w-4 h-4 text-[#D2F802]" />
            Stripe Checkout SSL 256-bit
          </div>
        </div>
      </div>

      {/* Pricing Cards (Finpath Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Plano Pro Mensal */}
        <div className="finpath-card p-8 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Plano Pro Mensal</span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-white">R$ 149</span>
              <span className="text-xs text-gray-400 font-medium">/ mês</span>
            </div>

            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Ideal para psicólogos autônomos que buscam liberar tempo clínico e zerar faltas.
            </p>

            <ul className="space-y-3 text-xs text-gray-300 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D2F802] shrink-0" />
                Secretária Virtual WhatsApp (Evolution API) 24/7
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D2F802] shrink-0" />
                Agendamentos e confirmações ilimitadas
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D2F802] shrink-0" />
                Lembretes automáticos 24h e 2h antes
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D2F802] shrink-0" />
                Isolamento multi-tenant seguro (LGPD e RLS)
              </li>
            </ul>
          </div>

          <button className="btn-secondary w-full py-3 text-xs justify-center cursor-pointer">
            Assinar Plano Mensal
          </button>
        </div>

        {/* Plano Pro Anual (Destaque Finpath Lime) */}
        <div className="finpath-card-highlight p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="finpath-badge finpath-badge-lime text-[10px]">
              <Sparkles className="w-3 h-3" /> Economize 2 meses
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D2F802]">Plano Pro Anual</span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-white">R$ 124</span>
              <span className="text-xs text-gray-400 font-medium">/ mês (faturado R$ 1.490/ano)</span>
            </div>

            <p className="text-xs text-gray-300 mb-6 leading-relaxed">
              O melhor custo-benefício com prioridade na infraestrutura e suporte dedicado.
            </p>

            <ul className="space-y-3 text-xs text-gray-200 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D2F802] shrink-0" />
                Todos os recursos do plano mensal
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D2F802] shrink-0" />
                2 meses de economia no ano
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D2F802] shrink-0" />
                Configuração assistida da Evolution API
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D2F802] shrink-0" />
                Exportação de relatórios financeiros e de presença
              </li>
            </ul>
          </div>

          <button className="btn-lime w-full py-3 text-xs justify-center cursor-pointer">
            Assinar Anual com Desconto
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
