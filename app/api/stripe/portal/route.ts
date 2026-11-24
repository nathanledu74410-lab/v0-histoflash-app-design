import { NextResponse } from "next/server"
import { getOrCreateDbUser } from "@/lib/auth"
import { absoluteUrl } from "@/lib/site"
import { getStripe } from "@/lib/stripe"

/** Ouvre le portail client Stripe : changer de formule, de carte, résilier. */
export async function POST() {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: "Le paiement n'est pas encore activé." }, { status: 503 })

  const user = await getOrCreateDbUser()
  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "Aucun abonnement associé à ce compte." }, { status: 404 })
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    locale: "fr",
    return_url: absoluteUrl("/tableau-de-bord"),
  })
  return NextResponse.json({ url: session.url })
}
