/**
 * Registre des fiches rédigées. À n'importer que côté serveur :
 * il contient les corrections des quiz réservées aux abonnés.
 */
import "server-only"
import type { ChapterContent } from "./types"
import changementClimatique from "./chapters/changement-climatique"
import conquetesPuissanceRivalites from "./chapters/conquetes-puissance-rivalites"
import constructionEuropeenne from "./chapters/construction-europeenne"
import guerreFroide from "./chapters/guerre-froide-bipolarisation"
import mediterraneeAntique from "./chapters/mediterranee-antique"
import memoiresDesConflits from "./chapters/memoires-des-conflits"
import mersOceans from "./chapters/mers-oceans-mondialisation"
import premiereGuerreMondiale from "./chapters/premiere-guerre-mondiale"
import puissanceEtatsUnis from "./chapters/puissance-etats-unis"
import regimesTotalitaires from "./chapters/regimes-totalitaires"
import renaissance from "./chapters/renaissance-humanisme-reformes"
import ressourcesSousPression from "./chapters/ressources-sous-pression"
import revolutionFrancaise from "./chapters/revolution-francaise-et-empire"
import secondeGuerreMondiale from "./chapters/seconde-guerre-mondiale"

const all: ChapterContent[] = [
  mediterraneeAntique,
  renaissance,
  ressourcesSousPression,
  revolutionFrancaise,
  premiereGuerreMondiale,
  puissanceEtatsUnis,
  regimesTotalitaires,
  secondeGuerreMondiale,
  guerreFroide,
  constructionEuropeenne,
  mersOceans,
  conquetesPuissanceRivalites,
  memoiresDesConflits,
  changementClimatique,
]

const bySlug = new Map(all.map((c) => [c.slug, c]))

export function getChapterContent(slug: string): ChapterContent | undefined {
  return bySlug.get(slug)
}

export function hasChapterContent(slug: string) {
  return bySlug.has(slug)
}

export function allChapterContents() {
  return all
}

/** Identifiant stable d'une flashcard, utilisé pour la répétition espacée. */
export function flashcardId(slug: string, index: number) {
  return `${slug}#${index}`
}
