import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const consent = requestUrl.searchParams.get("consent");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      // Se consent=1 foi passado, atualiza o consentimento formal na tabela users
      if (consent === "1") {
        const forwardedFor = request.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

        await supabase
          .from("users")
          .update({
            privacy_policy_accepted: true,
            accepted_terms_at: new Date().toISOString(),
            consent_ip: ip,
          })
          .eq("id", data.user.id);
      }

      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Em caso de erro, redireciona para login com mensagem
  return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
}
