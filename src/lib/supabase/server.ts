import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Cliente Supabase por requisição (Server Components, Server Actions, Route Handlers).
 * Usa a sessão do usuário: todas as queries passam pelo RLS (auth.uid() = user_id).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Chamado a partir de um Server Component: o proxy renova a sessão.
          }
        },
      },
    },
  );
}

/** Retorna o usuário autenticado validado no servidor do Supabase Auth (não confia só no cookie). */
export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}
