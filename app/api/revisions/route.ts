import { NextResponse } from "next/server"
import { z } from "zod"
import { and, asc, eq, lte, sql } from "drizzle-orm"
import { allChapterContents, flashcardId, getChapterContent } from "@/content"
import { findChapterBySlug } from "@/lib/curriculum"
import { getDb, schema } from "@/lib/db"
import { getViewer } from "@/lib/entitlements"
import { initialSrsState, parisDay, schedule } from "@/lib/srs"

const NEW_CARDS_PER_SESSION = 10
const MAX_DUE_PER_SESSION = 50

function cardPayload(cardId: string) {
  const [slug, index] = cardId.split("#")
  const content = getChapterContent(slug)
  const card = content?.flashcards[Number(index)]
  if (!content || !card) return null
  const loc = findChapterBySlug(slug)
  return {
    id: cardId,
    chapterSlug: slug,
    chapterTitle: loc?.chapter.title ?? slug,
    subject: loc?.subject.slug ?? "histoire",
    front: card.front,
    back: card.back,
  }
}

/**
 * File de révision : cartes dues, puis cartes nouvelles.
 * ?chapitre=<slug> limite la session à un chapitre (et y ajoute des cartes nouvelles).
 */
export async function GET(req: Request) {
  const viewer = await getViewer()
  if (viewer.status !== "premium") return NextResponse.json({ error: "premium_required" }, { status: 402 })
  const db = getDb()
  if (!db) return NextResponse.json({ error: "Base de données non configurée." }, { status: 503 })

  const chapter = new URL(req.url).searchParams.get("chapitre")
  if (chapter && !getChapterContent(chapter)) return NextResponse.json({ error: "Chapitre introuvable." }, { status: 404 })

  const now = new Date()
  const dueRows = await db
    .select()
    .from(schema.cardReviews)
    .where(
      and(
        eq(schema.cardReviews.userId, viewer.userId),
        lte(schema.cardReviews.dueAt, now),
        chapter ? eq(schema.cardReviews.chapterSlug, chapter) : undefined,
      ),
    )
    .orderBy(asc(schema.cardReviews.dueAt))
    .limit(MAX_DUE_PER_SESSION)

  const seen = await db
    .select({ cardId: schema.cardReviews.cardId })
    .from(schema.cardReviews)
    .where(eq(schema.cardReviews.userId, viewer.userId))
  const seenIds = new Set(seen.map((r) => r.cardId))

  // Cartes nouvelles : celles du chapitre demandé, sinon celles des chapitres déjà commencés.
  const startedChapters = new Set(seen.map((r) => r.cardId.split("#")[0]))
  const sources = chapter
    ? [getChapterContent(chapter)!]
    : allChapterContents().filter((c) => startedChapters.has(c.slug))
  const newIds: string[] = []
  for (const content of sources) {
    content.flashcards.forEach((_, i) => {
      const id = flashcardId(content.slug, i)
      if (!seenIds.has(id) && newIds.length < NEW_CARDS_PER_SESSION) newIds.push(id)
    })
  }

  const states = Object.fromEntries(
    dueRows.map((r) => [r.cardId, { ease: r.ease, intervalDays: r.intervalDays, repetitions: r.repetitions, lapses: r.lapses }]),
  )
  const queue = [...dueRows.map((r) => r.cardId), ...newIds]
    .map((id) => {
      const payload = cardPayload(id)
      return payload ? { ...payload, isNew: !states[id], state: states[id] ?? initialSrsState } : null
    })
    .filter((c) => c !== null)

  return NextResponse.json({ queue })
}

const review = z.object({
  cardId: z.string().regex(/^[a-z0-9-]+#\d+$/),
  grade: z.enum(["again", "hard", "good", "easy"]),
})

export async function POST(req: Request) {
  const viewer = await getViewer()
  if (viewer.status !== "premium") return NextResponse.json({ error: "premium_required" }, { status: 402 })
  const db = getDb()
  if (!db) return NextResponse.json({ error: "Base de données non configurée." }, { status: 503 })

  const parsed = review.safeParse(await req.json().catch(() => null))
  if (!parsed.success || !cardPayload(parsed.data.cardId)) {
    return NextResponse.json({ error: "Carte invalide." }, { status: 400 })
  }
  const { cardId, grade } = parsed.data

  const existing = await db.query.cardReviews.findFirst({
    where: and(eq(schema.cardReviews.userId, viewer.userId), eq(schema.cardReviews.cardId, cardId)),
  })
  const next = schedule(existing ?? initialSrsState, grade)
  const values = {
    ease: next.ease,
    intervalDays: next.intervalDays,
    repetitions: next.repetitions,
    lapses: next.lapses,
    dueAt: next.dueAt,
    lastReviewedAt: new Date(),
  }

  await db
    .insert(schema.cardReviews)
    .values({ userId: viewer.userId, cardId, chapterSlug: cardId.split("#")[0], ...values })
    .onConflictDoUpdate({ target: [schema.cardReviews.userId, schema.cardReviews.cardId], set: values })
  await db
    .insert(schema.activityDays)
    .values({ userId: viewer.userId, day: parisDay(), reviews: 1 })
    .onConflictDoUpdate({
      target: [schema.activityDays.userId, schema.activityDays.day],
      set: { reviews: sql`${schema.activityDays.reviews} + 1` },
    })

  return NextResponse.json({ dueAt: next.dueAt.toISOString(), intervalDays: next.intervalDays })
}
