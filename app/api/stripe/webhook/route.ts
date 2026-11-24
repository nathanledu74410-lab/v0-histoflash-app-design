import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe, syncSubscription } from "@/lib/stripe"

/**
 * Webhook Stripe. Événements à activer dans le tableau de bord Stripe :
 * checkout.session.completed, customer.subscription.created,
 * customer.subscription.updated, customer.subscription.deleted.
 */
export async function POST(req: Request) {
  const stripe = getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) return NextResponse.json({ error: "Webhook non configuré." }, { status: 503 })

  const signature = req.headers.get("stripe-signature")
  if (!signature) return NextResponse.json({ error: "Signature manquante." }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret)
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      if (session.mode === "subscription" && session.subscription) {
        const id = typeof session.subscription === "string" ? session.subscription : session.subscription.id
        await syncSubscription(await stripe.subscriptions.retrieve(id))
      }
      break
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await syncSubscription(event.data.object)
      break
  }

  return NextResponse.json({ received: true })
}
