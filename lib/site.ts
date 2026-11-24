export const siteConfig = {
  name: "Histoflash",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://histoflash.fr").replace(/\/$/, ""),
  tagline: "Réviser l'histoire-géo et l'HGGSP pour le bac",
  description:
    "Fiches de cours conformes aux programmes officiels, flashcards en répétition espacée, quiz corrigés et méthodologie pour réussir l'histoire-géographie et l'HGGSP au lycée.",
  locale: "fr_FR",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@histoflash.fr",
} as const

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}

/** Offre commerciale — une seule source de vérité pour les prix affichés. */
export const pricing = {
  currency: "EUR",
  trialDays: 7,
  monthly: { amount: 4.99, label: "4,99 €", period: "mois" },
  yearly: { amount: 29.99, label: "29,99 €", period: "an", monthlyEquivalent: "2,50 €" },
  freeAiQuestionsPerDay: 5,
  freeQuizQuestions: 5,
} as const

export const premiumFeatures = [
  "Révisions en répétition espacée sur toutes les flashcards",
  "Quiz complets avec corrections détaillées",
  "Assistant IA illimité",
  "Méthodologie avancée : sujets corrigés et grilles d'auto-évaluation",
  "Tableau de bord de progression",
] as const

export const freeFeatures = [
  "Toutes les fiches de cours, sans limite",
  "Flashcards de chaque chapitre",
  `Quiz express (${pricing.freeQuizQuestions} questions par chapitre)`,
  `Assistant IA : ${pricing.freeAiQuestionsPerDay} questions par jour`,
  "Fiches méthode essentielles",
] as const
