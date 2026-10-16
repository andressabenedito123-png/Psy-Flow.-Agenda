"use server";

import { revalidatePath } from "next/cache";
import { getAuthenticatedUser } from "@/lib/supabase/server";
import { patientSchema, patientStatusSchema, type ActionState } from "@/lib/validations";

export async function createPatientAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) {
    return { ok: false, message: "Não autorizado. Faça login para continuar." };
  }

  const raw = {
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email") || "",
    administrative_notes: formData.get("administrative_notes") || "",
  };

  const parsed = patientSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Preencha os campos corretamente.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from("patients").insert({
    user_id: user.id,
    full_name: parsed.data.full_name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    administrative_notes: parsed.data.administrative_notes,
    status: "active",
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: "Já existe um paciente cadastrado com este telefone." };
    }
    return { ok: false, message: `Erro ao cadastrar paciente: ${error.message}` };
  }

  revalidatePath("/pacientes");
  revalidatePath("/dashboard");
  return { ok: true, message: "Paciente cadastrado com sucesso!" };
}

export async function updatePatientStatusAction(
  id: string,
  status: "active" | "inactive" | "archived"
): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) {
    return { ok: false, message: "Não autorizado." };
  }

  const parsed = patientStatusSchema.safeParse({ id, status });
  if (!parsed.success) {
    return { ok: false, message: "Parâmetros inválidos." };
  }

  const { error } = await supabase
    .from("patients")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id)
    .eq("user_id", user.id);

  if (error) {
    return { ok: false, message: `Erro ao atualizar status: ${error.message}` };
  }

  revalidatePath("/pacientes");
  revalidatePath("/dashboard");
  return { ok: true, message: "Status atualizado com sucesso!" };
}
