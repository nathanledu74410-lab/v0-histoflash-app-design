"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { LoaderCircle, PartyPopper } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { previewInterval, type Grade, type SrsState } from "@/lib/srs"

interface QueueCard {
  id: string
  chapterSlug: string
  chapterTitle: string
  subject: "histoire" | "geographie" | "hggsp"
  front: string
  back: string
  isNew: boolean
  state: SrsState
}

const grades: { grade: Grade; label: string; className: string; key: string }[] = [
  { grade: "again", label: "À revoir", className: "border-destructive/40 hover:bg-destructive/10", key: "1" },
  { grade: "hard", label: "Difficile", className: "hover:bg-muted", key: "2" },
  { grade: "good", label: "Bien", className: "border-primary/50 hover:bg-secondary", key: "3" },
  { grade: "easy", label: "Facile", className: "border-success/50 hover:bg-success/10", key: "4" },
]

export function ReviewSession({ chapter }: { chapter?: string }) {
  const [queue, setQueue] = useState<QueueCard[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/revisions${chapter ? `?chapitre=${encodeURIComponent(chapter)}` : ""}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error === "premium_required" ? "Réservé à Premium." : (data.error ?? "Erreur"))
        setQueue(data.queue)
      })
      .catch((e: Error) => setError(e.message))
  }, [chapter])

  const card = queue?.[0]

  const grade = useCallback(
    async (g: Grade) => {
      if (!card || saving) return
      setSaving(true)
      try {
        const res = await fetch("/api/revisions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId: card.id, grade: g }),
        })
        if (!res.ok) throw new Error()
        setReviewed((n) => n + 1)
        setQueue((q) => {
          if (!q) return q
          const [head, ...rest] = q
          // « À revoir » : la carte revient en fin de session.
          return g === "again" ? [...rest, { ...head, isNew: false, state: { ...head.state, repetitions: 0 } }] : rest
        })
        setRevealed(false)
      } catch {
        setError("La réponse n'a pas pu être enregistrée. Vérifie ta connexion.")
      } finally {
        setSaving(false)
      }
    },
    [card, saving],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!card) return
      if (!revealed && (e.key === " " || e.key === "Enter")) {
        e.preventDefault()
        setRevealed(true)
      } else if (revealed) {
        const g = grades.find((x) => x.key === e.key)
        if (g) grade(g.grade)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [card, revealed, grade])

  if (error) return <p className="rounded-xl border bg-card p-6 text-destructive">{error}</p>
  if (!queue) {
    return (
      <div className="flex items-center gap-2 rounded-xl border bg-card p-6 text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin" /> Préparation de ta session…
      </div>
    )
  }

  if (!card) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <PartyPopper className="mx-auto size-8 text-accent-foreground dark:text-accent" />
        <p className="mt-3 font-serif text-2xl font-semibold">{reviewed > 0 ? "Session terminée !" : "Rien à réviser pour l'instant"}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {reviewed > 0
            ? `${reviewed} carte${reviewed > 1 ? "s" : ""} révisée${reviewed > 1 ? "s" : ""}. Les prochaines reviendront au moment idéal.`
            : "Ajoute un chapitre à tes révisions pour commencer, ou reviens plus tard pour tes cartes à revoir."}
        </p>
        <Button asChild className="mt-5" variant="outline">
          <Link href="/revisions">Retour aux révisions</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {queue.length} carte{queue.length > 1 ? "s" : ""} restante{queue.length > 1 ? "s" : ""}
        </span>
        <span>{reviewed} révisée{reviewed > 1 ? "s" : ""}</span>
      </div>
      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={card.subject}>{card.subject === "hggsp" ? "HGGSP" : card.subject === "histoire" ? "Histoire" : "Géographie"}</Badge>
          <span className="line-clamp-1 text-xs text-muted-foreground">{card.chapterTitle}</span>
          {card.isNew && <Badge variant="premium">Nouvelle</Badge>}
        </div>
        <p className="mt-6 font-serif text-2xl font-medium leading-snug">{card.front}</p>
        {revealed && (
          <div className="mt-6 border-t pt-6">
            <p className="text-lg leading-relaxed">{card.back}</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        {revealed ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {grades.map((g) => (
              <button
                key={g.grade}
                type="button"
                disabled={saving}
                onClick={() => grade(g.grade)}
                className={`rounded-lg border bg-card px-3 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${g.className}`}
              >
                {g.label}
                <span className="block text-xs font-normal text-muted-foreground">{previewInterval(card.state, g.grade)}</span>
              </button>
            ))}
          </div>
        ) : (
          <Button size="lg" className="w-full" onClick={() => setRevealed(true)}>
            Afficher la réponse
          </Button>
        )}
        <p className="mt-3 hidden text-center text-xs text-muted-foreground sm:block">
          Raccourcis : Espace pour retourner, 1 à 4 pour noter.
        </p>
      </div>
    </div>
  )
}
