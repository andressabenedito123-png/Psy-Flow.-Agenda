import { z } from "zod";

/**
 * Schemas Zod: toda entrada de Server Action / API passa por aqui.
 * - Strings são aparadas e têm tamanho máximo (mitiga abuso/XSS armazenado).
 * - Caracteres de controle e "<>" são bloqueados em campos de texto livre.
 * - O Supabase usa queries parametrizadas (PostgREST), o que já impede SQL Injection.
 */

const SAFE_TEXT = /^[^<>\u0000-\u0008\u000B\u000C\u000E-\u001F]*$/;

const safeText = (max: number) =>
  z.string().trim().max(max, `Máximo de ${max} caracteres.`).regex(SAFE_TEXT, "Caracteres inválidos.");

/** Normaliza telefone BR para E.164 (+55DDDNÚMERO). */
export const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/\D/g, ""))
  .transform((d) => (d.startsWith("55") && d.length >= 12 ? d : `55${d}`))
  .refine((d) => /^55\d{10,11}$/.test(d), "Telefone inválido. Use DDD + número.")
  .transform((d) => `+${d}`);

export const uuidSchema = z.uuid("Identificador inválido.");

export const loginSchema = z.object({
  consent: z.literal("on", { error: "Você precisa aceitar os Termos e a Política de Privacidade." }),
});

export const patientSchema = z.object({
  full_name: safeText(120).min(2, "Informe o nome completo."),
  phone: phoneSchema,
  email: z.union([z.literal(""), z.email("E-mail inválido.").max(160)]).transform((v) => v || null),
  administrative_notes: safeText(500).transform((v) => v || null),
});

export const patientStatusSchema = z.object({
  id: uuidSchema,
  status: z.enum(["active", "inactive", "archived"]),
});

// datetime-local => "2026-10-06T14:00". Brasil sem horário de verão desde 2019: offset fixo -03:00.
const localDateTime = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Data/hora inválida.")
  .transform((v) => new Date(`${v}:00-03:00`))
  .refine((d) => !Number.isNaN(d.getTime()), "Data/hora inválida.");

export const appointmentSchema = z.object({
  patient_id: uuidSchema,
  starts_at: localDateTime,
  duration_minutes: z.coerce.number().int().min(15).max(240),
  price: z.coerce.number().min(0).max(100000),
});

export const appointmentStatusSchema = z.object({
  id: uuidSchema,
  status: z.enum(["scheduled", "confirmed", "completed", "cancelled", "no_show"]),
});

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Horário inválido.");
export const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

export const businessHoursSchema = z.record(
  z.enum(WEEKDAYS),
  z.object({ start: hhmm, end: hhmm, enabled: z.boolean() }),
);

export const botSettingsSchema = z.object({
  whatsapp_instance_name: safeText(80).transform((v) => v || null),
  whatsapp_api_url: z
    .union([z.literal(""), z.url({ protocol: /^https$/, error: "Use uma URL https://" }).max(300)])
    .transform((v) => v || null),
  // vazio = manter o token atual
  whatsapp_api_token: z.string().trim().max(500).optional(),
  is_active: z.boolean(),
  session_duration_minutes: z.coerce.number().int().min(15).max(240),
  session_price: z.coerce.number().min(0).max(100000),
  welcome_message: safeText(1000).min(1),
  confirmation_message: safeText(1000).min(1),
  cancellation_message: safeText(1000).min(1),
  fallback_message: safeText(1000).min(1),
  business_hours: businessHoursSchema,
});

export const deleteAccountSchema = z.object({
  confirmation: z.literal("EXCLUIR", { error: 'Digite "EXCLUIR" para confirmar.' }),
});

export type ActionState = { ok: boolean; message: string; fieldErrors?: Record<string, string[] | undefined> };
export const initialActionState: ActionState = { ok: false, message: "" };
