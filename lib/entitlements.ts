import "server-only"
import type { User } from "./db/schema"
import { getOrCreateDbUser, getUserId } from "./auth"

const PREMIUM_STATUSES = new Set(["active", "trialing"])

export function isPremiumUser(user: Pick<User, "subscriptionStatus" | "currentPeriodEnd"> | null | undefined) {
  if (!user?.subscriptionStatus || !PREMIUM_STATUSES.has(user.subscriptionStatus)) return false
  // Marge de 2 jours : le webhook de renouvellement peut arriver après l'échéance.
  if (user.currentPeriodEnd && user.currentPeriodEnd.getTime() + 2 * 86_400_000 < Date.now()) return false
  return true
}

export type Viewer =
  | { status: "anonymous" }
  | { status: "free"; userId: string; user: User | null }
  | { status: "premium"; userId: string; user: User }

/** Qui consulte la page, et avec quels droits. */
export async function getViewer(): Promise<Viewer> {
  const userId = await getUserId()
  if (!userId) return { status: "anonymous" }
  const user = await getOrCreateDbUser()
  if (user && isPremiumUser(user)) return { status: "premium", userId, user }
  return { status: "free", userId, user }
}
