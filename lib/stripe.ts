import "server-only"
import Stripe from "stripe"
import { eq } from "drizzle-orm"
import { getDb, schema } from "./db"

let client: Stripe | null = null

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  if (!client) client = new Stripe(key, { appInfo: { name: "Histoflash" } })
  return client
}

export type PlanId = "monthly" | "yearly"

export function priceIdFor(plan: PlanId) {
  return plan === "monthly" ? process.env.STRIPE_PRICE_MONTHLY : process.env.STRIPE_PRICE_YEARLY
}

function planFromPrice(priceId: string | undefined): PlanId | null {
  if (!priceId) return null
  if (priceId === process.env.STRIPE_PRICE_MONTHLY) return "monthly"
  if (priceId === process.env.STRIPE_PRICE_YEARLY) return "yearly"
  return null
}

/**
 * Recopie l'état d'un abonnement Stripe dans la table `users`.
 * Depuis l'API 2025-03-31, la fin de période est portée par les éléments d'abonnement.
 */
export async function syncSubscription(subscription: Stripe.Subscription) {
  const db = getDb()
  if (!db) return

  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id
  const item = subscription.items.data[0]
  const periodEnd = item?.current_period_end ?? null

  const values = {
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    plan: planFromPrice(item?.price.id),
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end || subscription.cancel_at !== null,
    trialUsed: subscription.trial_start !== null ? true : undefined,
    updatedAt: new Date(),
  }

  const userId = subscription.metadata?.userId
  if (userId) {
    await db
      .update(schema.users)
      .set({ ...values, stripeCustomerId: customerId })
      .where(eq(schema.users.id, userId))
  } else {
    await db.update(schema.users).set(values).where(eq(schema.users.stripeCustomerId, customerId))
  }
}
