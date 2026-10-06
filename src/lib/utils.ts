import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TIMEZONE = "America/Sao_Paulo";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const formatCurrency = (value: number) => brl.format(value);

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIMEZONE,
    day: "2-digit",
    month: "short",
    ...opts,
  }).format(new Date(iso));
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** Exibe telefone mascarado (LGPD: minimização na interface). +55 11 9****-4321 */
export function maskPhone(e164: string) {
  const digits = e164.replace(/\D/g, "");
  if (digits.length < 8) return "••••";
  const last = digits.slice(-4);
  const ddd = digits.startsWith("55") ? digits.slice(2, 4) : digits.slice(0, 2);
  return `+55 ${ddd} •••••-${last}`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}
