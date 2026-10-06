"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  Bot, 
  CreditCard, 
  LogOut, 
  ShieldCheck,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface NavProps {
  user: {
    email?: string;
    full_name?: string;
    avatar_url?: string;
  } | null;
  subscription?: {
    status?: string;
    tier?: string;
    trial_ends_at?: string | null;
  } | null;
}

export function DashboardNav({ user, subscription }: NavProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Pacientes", href: "/pacientes", icon: Users },
    { label: "Agenda", href: "/agenda", icon: CalendarDays },
    { label: "Secretária & WhatsApp", href: "/configuracoes", icon: Bot },
    { label: "Assinatura & Planos", href: "/assinatura", icon: CreditCard },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-[#0a0c10] border-r border-white/5 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D2F802] flex items-center justify-center text-[#08090b] font-black shadow-[0_0_15px_rgba(210,248,2,0.3)]">
              <Bot className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white">
                Psi<span className="text-[#D2F802]">Flow</span>
              </span>
              <span className="text-[9px] text-gray-400 font-semibold tracking-wider uppercase">Finpath Edition</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#D2F802]/15 text-[#D2F802] border border-[#D2F802]/30 shadow-[0_0_20px_rgba(210,248,2,0.08)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#D2F802]" : "text-gray-400"}`} />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#D2F802]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Subscription status & Profile */}
      <div className="p-4 border-t border-white/5 space-y-3">
        {/* Trial / Tier badge */}
        <div className="p-3 rounded-xl bg-[#12151d] border border-white/5 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status do Plano</span>
            <span className="finpath-badge finpath-badge-lime text-[10px] py-0 px-2">
              <Sparkles className="w-2.5 h-2.5" />
              {subscription?.tier === "trial" ? "Trial 7 Dias" : "Plano Pro"}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            {subscription?.tier === "trial" ? "Acesso ilimitado à secretária virtual" : "Assinatura ativa no Stripe"}
          </p>
          <Link
            href="/assinatura"
            className="block mt-2 text-[10px] font-bold text-[#D2F802] hover:underline"
          >
            Gerenciar Assinatura →
          </Link>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#1b202c] border border-white/10 flex items-center justify-center font-bold text-xs text-[#D2F802] shrink-0">
              {user?.full_name ? user.full_name[0]?.toUpperCase() : "Ψ"}
            </div>
            <div className="truncate">
              <div className="font-bold text-xs text-white truncate">
                {user?.full_name || "Psicólogo(a)"}
              </div>
              <div className="text-[10px] text-gray-500 truncate">
                {user?.email || "Conectado"}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sair"
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center">
          <Link
            href="/privacidade"
            className="text-[10px] text-gray-600 hover:text-gray-400 flex items-center justify-center gap-1"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> Protegido por RLS & LGPD
          </Link>
        </div>
      </div>
    </aside>
  );
}
