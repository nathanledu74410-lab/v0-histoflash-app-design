import { NextResponse } from "next/server"
import { getViewer } from "@/lib/entitlements"

/** Statut du visiteur, utilisé par les pages statiques pour adapter quelques encarts. */
export async function GET() {
  const viewer = await getViewer()
  return NextResponse.json({ status: viewer.status }, { headers: { "Cache-Control": "private, no-store" } })
}
