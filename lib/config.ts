/**
 * Indicateurs de configuration. Le site fonctionne en « mode dégradé » quand
 * un service n'est pas configuré : les fiches restent accessibles, les fonctions
 * qui dépendent du service affichent un message clair au lieu de planter.
 */

export const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""

/** Disponible côté client et serveur. */
export const authEnabled = clerkPublishableKey.length > 0

/** Côté serveur uniquement. */
export const serverConfig = {
  get auth() {
    return authEnabled && !!process.env.CLERK_SECRET_KEY
  },
  get db() {
    return !!process.env.DATABASE_URL
  },
  get stripe() {
    return !!process.env.STRIPE_SECRET_KEY && !!process.env.STRIPE_PRICE_MONTHLY && !!process.env.STRIPE_PRICE_YEARLY
  },
  get ai() {
    return !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
  },
}
