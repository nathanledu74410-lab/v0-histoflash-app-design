import "server-only"
import { auth, currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { serverConfig } from "./config"
import { getDb, schema } from "./db"

/** Identifiant Clerk de l'utilisateur connecté, ou `null`. Ne plante jamais si Clerk n'est pas configuré. */
export async function getUserId(): Promise<string | null> {
  if (!serverConfig.auth) return null
  try {
    const { userId } = await auth()
    return userId
  } catch {
    return null
  }
}

/**
 * Renvoie la ligne `users` de l'utilisateur connecté, en la créant au besoin.
 * `null` si personne n'est connecté ou si la base n'est pas configurée.
 */
export async function getOrCreateDbUser() {
  const userId = await getUserId()
  const db = getDb()
  if (!userId || !db) return null

  const existing = await db.query.users.findFirst({ where: eq(schema.users.id, userId) })
  if (existing) return existing

  const clerkUser = await currentUser()
  const email = clerkUser?.primaryEmailAddress?.emailAddress ?? null
  const [created] = await db
    .insert(schema.users)
    .values({ id: userId, email })
    .onConflictDoNothing()
    .returning()
  return created ?? (await db.query.users.findFirst({ where: eq(schema.users.id, userId) })) ?? null
}
