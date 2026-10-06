import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Cliente com service_role: IGNORA o RLS.
 * Uso restrito a processos de sistema sem sessão de usuário (ex.: webhook do Stripe).
 * Nunca importe em componentes cliente e sempre filtre explicitamente por user_id.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY não configurada.");

  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
