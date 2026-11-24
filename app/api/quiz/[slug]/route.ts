import { NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "drizzle-orm"
import { getChapterContent } from "@/content"
import { getDb, schema } from "@/lib/db"
import { getViewer } from "@/lib/entitlements"
import { parisDay } from "@/lib/srs"

/** Quiz complet avec corrections : réservé aux abonnés Premium. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = getChapterContent(slug)
  if (!content) return NextResponse.json({ error: "Chapitre introuvable." }, { status: 404 })

  const viewer = await getViewer()
  if (viewer.status !== "premium") {
    return NextResponse.json({ error: "premium_required", status: viewer.status }, { status: 402 })
  }
  return NextResponse.json({ questions: content.quiz })
}

const attempt = z.object({ score: z.number().int().min(0), total: z.number().int().min(1).max(50) })

/** Enregistre un résultat de quiz pour le tableau de bord (utilisateurs connectés). */
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getChapterContent(slug)) return NextResponse.json({ error: "Chapitre introuvable." }, { status: 404 })

  const parsed = attempt.safeParse(await req.json().catch(() => null))
  if (!parsed.success || parsed.data.score > parsed.data.total) {
    return NextResponse.json({ error: "Résultat invalide." }, { status: 400 })
  }

  const viewer = await getViewer()
  const db = getDb()
  if (viewer.status === "anonymous" || !db || !viewer.user) return NextResponse.json({ saved: false })

  await db.insert(schema.quizAttempts).values({ userId: viewer.userId, chapterSlug: slug, ...parsed.data })
  await db
    .insert(schema.activityDays)
    .values({ userId: viewer.userId, day: parisDay(), quizzes: 1 })
    .onConflictDoUpdate({
      target: [schema.activityDays.userId, schema.activityDays.day],
      set: { quizzes: sql`${schema.activityDays.quizzes} + 1` },
    })
  return NextResponse.json({ saved: true })
}
