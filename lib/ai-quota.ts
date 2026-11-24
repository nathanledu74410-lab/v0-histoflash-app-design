import "server-only"
import { and, eq, sql } from "drizzle-orm"
import { getDb, schema } from "./db"
import { pricing } from "./site"
import { parisDay } from "./srs"

/** Garde-fou de coût, même pour les abonnés. */
export const PREMIUM_DAILY_CAP = 200

export async function getAiUsageToday(userId: string) {
  const db = getDb()
  if (!db) return 0
  const row = await db.query.aiUsage.findFirst({
    where: and(eq(schema.aiUsage.userId, userId), eq(schema.aiUsage.day, parisDay())),
  })
  return row?.count ?? 0
}

export function dailyLimit(premium: boolean) {
  return premium ? PREMIUM_DAILY_CAP : pricing.freeAiQuestionsPerDay
}

/** Incrémente le compteur du jour et renvoie la nouvelle valeur. */
export async function incrementAiUsage(userId: string) {
  const db = getDb()
  if (!db) return 0
  const [row] = await db
    .insert(schema.aiUsage)
    .values({ userId, day: parisDay(), count: 1 })
    .onConflictDoUpdate({
      target: [schema.aiUsage.userId, schema.aiUsage.day],
      set: { count: sql`${schema.aiUsage.count} + 1` },
    })
    .returning({ count: schema.aiUsage.count })
  return row?.count ?? 0
}
