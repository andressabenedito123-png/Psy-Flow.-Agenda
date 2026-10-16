"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/supabase/server";
import { encryptSecret } from "@/lib/crypto";
import { botSettingsSchema, deleteAccountSchema, type ActionState } from "@/lib/validations";
import { sendAccountDeletedEmail } from "@/lib/email";

export async function saveBotSettingsAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) {
    return { ok: false, message: "Não autorizado." };
  }

  // Busca configurações existentes para permitir atualização parcial por abas
  const { data: existing } = await supabase
    .from("bot_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const defaultBusinessHours = {
    monday: { start: "08:00", end: "18:00", enabled: true },
    tuesday: { start: "08:00", end: "18:00", enabled: true },
    wednesday: { start: "08:00", end: "18:00", enabled: true },
    thursday: { start: "08:00", end: "18:00", enabled: true },
    friday: { start: "08:00", end: "18:00", enabled: true },
    saturday: { start: "08:00", end: "12:00", enabled: false },
    sunday: { start: "08:00", end: "12:00", enabled: false },
  };

  let businessHours = existing?.business_hours || defaultBusinessHours;
  try {
    const rawHours = formData.get("business_hours");
    if (rawHours && typeof rawHours === "string") {
      businessHours = JSON.parse(rawHours);
    }
  } catch {
    // Mantém existente se parsing falhar
  }

  const raw = {
    whatsapp_instance_name: formData.has("whatsapp_instance_name")
      ? formData.get("whatsapp_instance_name")
      : (existing?.whatsapp_instance_name ?? "psiflow-consultorio"),
    whatsapp_api_url: formData.has("whatsapp_api_url")
      ? (formData.get("whatsapp_api_url") || "")
      : (existing?.whatsapp_api_url ?? ""),
    whatsapp_api_token: formData.get("whatsapp_api_token") || undefined,
    is_active: formData.has("is_active")
      ? formData.get("is_active") === "on"
      : (existing?.is_active ?? true),
    session_duration_minutes: formData.has("session_duration_minutes")
      ? formData.get("session_duration_minutes")
      : (existing?.session_duration_minutes ?? 50),
    session_price: formData.has("session_price")
      ? formData.get("session_price")
      : (existing?.session_price ?? 150),
    welcome_message: formData.has("welcome_message")
      ? formData.get("welcome_message")
      : (existing?.welcome_message ?? "Olá! Sou a secretária virtual do consultório. Como posso te ajudar com seus agendamentos hoje?"),
    confirmation_message: formData.has("confirmation_message")
      ? formData.get("confirmation_message")
      : (existing?.confirmation_message ?? "Sua consulta está confirmada para {data} às {horario}."),
    cancellation_message: formData.has("cancellation_message")
      ? formData.get("cancellation_message")
      : (existing?.cancellation_message ?? "Sua consulta foi cancelada com sucesso."),
    fallback_message: formData.has("fallback_message")
      ? formData.get("fallback_message")
      : (existing?.fallback_message ?? "Desculpe, não compreendi. Em breve o profissional entrará em contato."),
    business_hours: businessHours,
  };

  const parsed = botSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Verifique os dados informados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const updatePayload: Record<string, unknown> = {
    whatsapp_instance_name: parsed.data.whatsapp_instance_name,
    whatsapp_api_url: parsed.data.whatsapp_api_url,
    is_active: parsed.data.is_active,
    session_duration_minutes: parsed.data.session_duration_minutes,
    session_price: parsed.data.session_price,
    welcome_message: parsed.data.welcome_message,
    confirmation_message: parsed.data.confirmation_message,
    cancellation_message: parsed.data.cancellation_message,
    fallback_message: parsed.data.fallback_message,
    business_hours: parsed.data.business_hours,
  };

  // Se o usuário digitou um novo token, criptografa com AES-256-GCM antes de salvar
  if (parsed.data.whatsapp_api_token && parsed.data.whatsapp_api_token.length > 0) {
    updatePayload.whatsapp_api_token = encryptSecret(parsed.data.whatsapp_api_token);
  }

  const { error } = await supabase
    .from("bot_settings")
    .upsert({
      user_id: user.id,
      ...updatePayload,
    }, { onConflict: "user_id" });

  if (error) {
    return { ok: false, message: `Erro ao salvar configurações: ${error.message}` };
  }

  revalidatePath("/configuracoes");
  revalidatePath("/dashboard");
  return { ok: true, message: "Configurações da secretária virtual salvas com sucesso!" };
}

export async function deleteAccountAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) {
    return { ok: false, message: "Não autorizado." };
  }

  const confirmation = formData.get("confirmation");
  const parsed = deleteAccountSchema.safeParse({ confirmation });
  if (!parsed.success) {
    return { ok: false, message: 'Confirmação incorreta. Digite "EXCLUIR".' };
  }

  const userEmail = user.email;

  // Chama a stored procedure delete_user_account() do PostgreSQL (exclusão em cascata)
  const { error } = await supabase.rpc("delete_user_account");

  if (error) {
    return { ok: false, message: `Erro ao excluir conta: ${error.message}` };
  }

  if (userEmail) {
    await sendAccountDeletedEmail(userEmail);
  }

  await supabase.auth.signOut();
  redirect("/?deleted=1");
}
