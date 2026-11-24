export interface ChapterSection {
  title: string
  paragraphs: string[]
  keyPoints?: string[]
}

export interface KeyDate {
  date: string
  event: string
}

export interface Notion {
  term: string
  definition: string
}

export interface Actor {
  name: string
  role: string
}

export interface Flashcard {
  front: string
  back: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  /** Index de la bonne réponse dans `options`. */
  answer: number
  explanation: string
}

export interface ChapterContent {
  slug: string
  /** Résumé de 150 à 160 caractères pour la meta description. */
  metaDescription: string
  updatedAt: string
  intro: string
  problematique: string
  sections: ChapterSection[]
  dates: KeyDate[]
  notions: Notion[]
  actors: Actor[]
  /** Sujets d'entraînement (formulations type bac, non officielles). */
  sujets: string[]
  flashcards: Flashcard[]
  quiz: QuizQuestion[]
}
