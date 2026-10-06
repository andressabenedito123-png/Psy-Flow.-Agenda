import "server-only";
import type { Tables } from "@/types/database";

export type Subscription = Tables<"subscriptions">;

/** Regra de acesso: trial dentro do prazo ou assinatura ativa no Stripe. */
export function hasActiveAccess(sub: Subscription | null) {
  if (!sub) return false;
  if (sub.status === "active") return true;
  if (sub.status === "trialing") {
    const end = sub.trial_ends_at ?? sub.current_period_end;
    return !!end && new Date(end).getTime() > Date.now();
  }
  // past_due: tolerância até o fim do período já pago
  if (sub.status === "past_due" && sub.current_period_end) {
    return new Date(sub.current_period_end).getTime() > Date.now();
  }
  return false;
}

export function trialDaysLeft(sub: Subscription | null) {
  if (!sub?.trial_ends_at || sub.status !== "trialing") return null;
  const ms = new Date(sub.trial_ends_at).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
