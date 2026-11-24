"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Card {
  front: string
  back: string
}

/** Paquet de flashcards d'un chapitre — accessible à tous, sans suivi. */
export function FlashcardDeck({ cards, chapterSlug }: { cards: Card[]; chapterSlug: string }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<Set<number>>(new Set())

  const index = order[pos]
  const card = cards[index]
  const done = pos >= order.length

  function go(delta: number) {
    setFlipped(false)
    setPos((p) => Math.min(Math.max(p + delta, 0), order.length))
  }

  function mark(isKnown: boolean) {
    setKnown((prev) => {
      const next = new Set(prev)
      if (isKnown) next.add(index)
      else next.delete(index)
      return next
    })
    go(1)
  }

  function restart(shuffle: boolean) {
    const next = cards.map((_, i) => i)
    if (shuffle) {
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[next[i], next[j]] = [next[j], next[i]]
      }
    }
    setOrder(next)
    setPos(0)
    setFlipped(false)
    setKnown(new Set())
  }

  if (done) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <p className="font-serif text-2xl font-semibold">
          {known.size} / {cards.length} cartes maîtrisées
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Pour retenir sur le long terme, revois ces cartes au bon moment : c'est le principe de la répétition espacée.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button variant="outline" onClick={() => restart(false)}>
            <RotateCcw /> Recommencer
          </Button>
          <Button variant="outline" onClick={() => restart(true)}>
            <Shuffle /> Mélanger
          </Button>
          <Button asChild>
            <Link href={`/revisions?chapitre=${chapterSlug}`}>Réviser avec la répétition espacée</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Carte {pos + 1} / {order.length}
        </span>
        <button type="button" onClick={() => restart(true)} className="inline-flex items-center gap-1 hover:text-foreground">
          <Shuffle className="size-3.5" /> Mélanger
        </button>
      </div>

      <button
        type="button"
        className="flip-card block w-full text-left"
        data-flipped={flipped}
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "Afficher la question" : "Afficher la réponse"}
      >
        <div className="flip-card-inner relative min-h-56 sm:min-h-52">
          <div className="flip-face absolute inset-0 flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm">
            <span className="eyebrow">Question</span>
            <p className="font-serif text-xl font-medium leading-snug sm:text-2xl">{card.front}</p>
            <span className="text-xs text-muted-foreground">Toucher pour retourner</span>
          </div>
          <div className="flip-face flip-back absolute inset-0 flex flex-col justify-between rounded-xl border border-primary/30 bg-secondary p-6 shadow-sm">
            <span className="eyebrow text-primary">Réponse</span>
            <p className="text-lg leading-relaxed">{card.back}</p>
            <span className="text-xs text-muted-foreground">Toucher pour revoir la question</span>
          </div>
        </div>
      </button>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Button variant="ghost" size="icon" onClick={() => go(-1)} disabled={pos === 0} aria-label="Carte précédente">
          <ChevronLeft />
        </Button>
        {flipped ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => mark(false)}>
              À revoir
            </Button>
            <Button onClick={() => mark(true)}>Je savais</Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setFlipped(true)}>
            Voir la réponse
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => go(1)} aria-label="Carte suivante">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
