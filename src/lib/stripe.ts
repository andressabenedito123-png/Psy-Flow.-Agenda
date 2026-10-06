import "server-only";
import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  stripe ??= new Stripe(key);
  return stripe;
}

export const PRICE_TIERS = {
  [process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID ?? "monthly"]: "pro_monthly",
  [process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID ?? "yearly"]: "pro_yearly",
} as const;
