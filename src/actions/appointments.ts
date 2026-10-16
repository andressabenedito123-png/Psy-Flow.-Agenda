"use server";

import { revalidatePath } from "next/cache";
import { getAuthenticatedUser } from "@/lib/supabase/server";
import { appointmentSchema, appointmentStatusSchema, type ActionState } from "@/lib/validations";

export async function createAppointmentAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) {
    return { ok: false, message: "Não autorizado. Faça login para continuar." };
  }

  const raw = {
    patient_id: formData.get("patient_id"),
    starts_at: formData.get("starts_at"),
    duration_minutes: formData.get("duration_minutes"),
    price: formData.get("price"),
  };

  const parsed = appointmentSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Verifique os dados da consulta.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const startsAt = parsed.data.starts_at;
  const endsAt = new Date(startsAt.getTime() + parsed.data.duration_minutes * 60000);

  const { error } = await supabase.from("appointments").insert({
    user_id: user.id,
    patient_id: parsed.data.patient_id,
    starts_at: startsAt.toISOString(),
    ends_at: endsAt.toISOString(),
    price: parsed.data.price,
    status: "scheduled",
    is_paid: false,
  });

  if (error) {
    return { ok: false, message: `Erro ao agendar consulta: ${error.message}` };
  }

  revalidatePath("/agenda");
  revalidatePath("/dashboard");
  return { ok: true, message: "Consulta agendada com sucesso!" };
}

export async function updateAppointmentStatusAction(
  id: string,
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show"
): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) {
    return { ok: false, message: "Não autorizado." };
  }

  const parsed = appointmentStatusSchema.safeParse({ id, status });
  if (!parsed.success) {
    return { ok: false, message: "Status inválido." };
  }

  const { error } = await supabase
    .from("appointments")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id)
    .eq("user_id", user.id);

  if (error) {
    return { ok: false, message: `Erro ao atualizar status: ${error.message}` };
  }

  revalidatePath("/agenda");
  revalidatePath("/dashboard");
  return { ok: true, message: "Status da consulta atualizado!" };
}
