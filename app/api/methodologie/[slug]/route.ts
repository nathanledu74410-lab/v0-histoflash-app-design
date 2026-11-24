import { NextResponse } from "next/server"
import { premiumMethods } from "@/content/methodes-premium"
import { getViewer } from "@/lib/entitlements"

/** Entraînement corrigé et grille d'auto-évaluation : réservés aux abonnés. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = premiumMethods[slug]
  if (!content) return NextResponse.json({ error: "Méthode introuvable." }, { status: 404 })

  const viewer = await getViewer()
  if (viewer.status !== "premium") return NextResponse.json({ error: "premium_required" }, { status: 402 })
  return NextResponse.json(content)
}
