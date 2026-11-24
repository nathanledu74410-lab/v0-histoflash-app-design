import { NextResponse } from "next/server"
import { z } from "zod"
import { eq } from "drizzle-orm"
import { getOrCreateDbUser } from "@/lib/auth"
import { serverConfig } from "@/lib/config"
import { getDb, schema } from "@/lib/db"
import { isPremiumUser } from "@/lib/entitlements"
import { absoluteUrl, pricing } from "@/lib/site"
import { getStripe, priceIdFor } from "@/lib/stripe"

const body = z.object({ plan: z.enum(["monthly", "yearly"]) })

export async function POST(req: Request) {
  const stripe = getStripe()
  const db = getDb()
  if (!stripe || !db || !serverConfig.stripe) {
    return NextResponse.json({ error: "Le paiement n'est pas encore activé sur ce site." }, { status: 503 })
  }

  const parsed = body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: "Formule invalide." }, { status: 400 })

  const user = await getOrCreateDbUser()
  if (!user) return NextResponse.json({ error: "Connecte-toi pour t'abonner." }, { status: 401 })
  if (isPremiumUser(user)) {
    return NextResponse.json({ error: "Tu es déjà abonné·e à Premium." }, { status: 409 })
  }

  let customerId = user.stripeCustomerId
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { userId: user.id },
    })
    customerId = customer.id
    await db.update(schema.users).set({ stripeCustomerId: customerId }).where(eq(schema.users.id, user.id))
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: priceIdFor(parsed.data.plan), quantity: 1 }],
    // Codes promo saisis au paiement : c'est ainsi qu'est appliquée la remise boursiers.
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { userId: user.id },
      ...(user.trialUsed ? {} : { trial_period_days: pricing.trialDays }),
    },
    locale: "fr",
    success_url: absoluteUrl("/tableau-de-bord?abonnement=ok"),
    cancel_url: absoluteUrl("/tarifs?abonnement=annule"),
  })

  return NextResponse.json({ url: session.url })
}
