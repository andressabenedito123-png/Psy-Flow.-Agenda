import { createClient } from "./supabase/client";

/**
 * Cliente Supabase para uso no lado do cliente (Browser).
 * 
 * Exemplo de uso:
 * import { supabase } from "@/lib/supabaseClient";
 * const { data, error } = await supabase.from("pacientes").select("*");
 * 
 * NOTA: Para Server Components, Server Actions ou Route Handlers,
 * use `createClient` de `@/lib/supabase/server` para manter a sessão
 * de cookies atualizada com segurança.
 */
export const supabase = createClient();

export default supabase;
