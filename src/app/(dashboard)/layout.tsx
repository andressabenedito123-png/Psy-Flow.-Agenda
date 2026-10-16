import { DashboardNav } from "@/components/dashboard-nav";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: { email?: string; full_name?: string; avatar_url?: string } | null = null;
  let subscription: { status?: string; tier?: string; trial_ends_at?: string | null } | null = null;

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();

    if (authData?.user) {
      user = {
        email: authData.user.email,
        full_name: authData.user.user_metadata?.full_name || authData.user.email?.split("@")[0],
        avatar_url: authData.user.user_metadata?.avatar_url,
      };

      const { data: subData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", authData.user.id)
        .single();

      subscription = subData;
    }
  } catch (err) {
    console.error("Erro ao carregar sessão no layout:", err);
  }

  // Fallback para visualização de demonstração caso ainda não tenha feito login
  if (!user) {
    user = {
      email: "dra.andressa@psiflow.com.br",
      full_name: "Dra. Andressa Benedito (CRP 06/123456)",
      avatar_url: "",
    };
    subscription = {
      status: "trialing",
      tier: "trial",
      trial_ends_at: "2026-10-13T23:59:59.000Z",
    };
  }

  return (
    <div className="min-h-screen bg-[#08090b] text-[#f3f4f6] flex">
      {/* Sidebar */}
      <DashboardNav user={user} subscription={subscription} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {children}
      </div>
    </div>
  );
}
