/**
 * Répétition espacée — variante simplifiée de l'algorithme SM-2 (SuperMemo).
 * Quatre réponses possibles, comme dans la plupart des applis de flashcards.
 */

export type Grade = "again" | "hard" | "good" | "easy"

export interface SrsState {
  ease: number
  intervalDays: number
  repetitions: number
  lapses: number
}

export const initialSrsState: SrsState = { ease: 2.5, intervalDays: 0, repetitions: 0, lapses: 0 }

const MIN_EASE = 1.3
const DAY = 86_400_000

export function schedule(state: SrsState, grade: Grade, now = new Date()): SrsState & { dueAt: Date } {
  let { ease, intervalDays, repetitions, lapses } = state

  if (grade === "again") {
    repetitions = 0
    lapses += 1
    ease = Math.max(MIN_EASE, ease - 0.2)
    // À revoir dans 10 minutes.
    return { ease, intervalDays: 0, repetitions, lapses, dueAt: new Date(now.getTime() + 10 * 60_000) }
  }

  const quality = grade === "hard" ? 3 : grade === "good" ? 4 : 5
  ease = Math.max(MIN_EASE, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

  if (repetitions === 0) intervalDays = grade === "easy" ? 3 : 1
  else if (repetitions === 1) intervalDays = grade === "hard" ? 3 : grade === "easy" ? 8 : 6
  else {
    const factor = grade === "hard" ? 1.2 : grade === "easy" ? ease * 1.3 : ease
    intervalDays = Math.max(intervalDays + 1, Math.round(intervalDays * factor))
  }
  repetitions += 1
  intervalDays = Math.min(intervalDays, 365)

  return { ease, intervalDays, repetitions, lapses, dueAt: new Date(now.getTime() + intervalDays * DAY) }
}

/** Libellé lisible de l'intervalle proposé pour chaque bouton. */
export function previewInterval(state: SrsState, grade: Grade) {
  if (grade === "again") return "10 min"
  const { intervalDays } = schedule(state, grade)
  if (intervalDays < 30) return `${intervalDays} j`
  if (intervalDays < 365) return `${Math.round(intervalDays / 30)} mois`
  return "1 an"
}

/** Date du jour au format YYYY-MM-DD, fuseau de Paris. */
export function parisDay(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(date)
}
