"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Lock, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PremiumContent {
  exercise: { sujet: string; analyse: string[]; problematique: string; plan: { partie: string; sousParties: string[] }[] }
  grille: { critere: string; detail: string }[]
}

/** Sujet corrigé et grille : chargés depuis l'API seulement pour les abonnés. */
export function PremiumExercise({ slug }: { slug: string }) {
  const [state, setState] = useState<"loading" | "locked" | "error" | PremiumContent>("loading")

  useEffect(() => {
    fetch(`/api/methodologie/${slug}`)
      .then(async (res) => {
        if (res.ok) setState((await res.json()) as PremiumContent)
        else setState(res.status === 402 ? "locked" : "error")
      })
      .catch(() => setState("error"))
  }, [slug])

  if (state === "loading") {
    return (
      <div className="flex items-center gap-2 rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin" /> Chargement de l'entraînement…
      </div>
    )
  }

  if (state === "locked" || state === "error") {
    return (
      <div className="relative overflow-hidden rounded-xl border bg-card">
        <div className="space-y-3 p-6 blur-[3px] select-none" aria-hidden>
          <p className="font-serif text-lg font-semibold">Sujet : ███████ ████ ██ ████████ ████</p>
          <p className="text-sm text-muted-foreground">Analyse des termes, bornes et enjeux du sujet ████████ █████ ███████.</p>
          <p className="text-sm text-muted-foreground">I. ██████ ███ ████████ — II. ████ ██ ███████ — III. ██████</p>
          <p className="text-sm text-muted-foreground">Grille d'auto-évaluation en quatre critères ███████ ████.</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 p-6 text-center">
          <Lock className="size-5 text-primary" />
          <p className="font-semibold">Sujet corrigé et grille d'auto-évaluation</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {state === "error" ? "Contenu momentanément indisponible." : "Inclus dans Premium : un sujet analysé pas à pas, avec plan détaillé et critères de notation."}
          </p>
          {state === "locked" && (
            <Button asChild size="sm">
              <Link href="/tarifs">Débloquer avec Premium</Link>
            </Button>
          )}
        </div>
      </div>
    )
  }

  const { exercise, grille } = state
  return (
    <div className="space-y-6 rounded-xl border bg-card p-6">
      <div>
        <p className="eyebrow">Sujet</p>
        <p className="mt-1 font-serif text-xl font-semibold">{exercise.sujet}</p>
      </div>
      <div>
        <p className="eyebrow">Analyse du sujet</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {exercise.analyse.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border-l-4 border-primary bg-secondary/60 p-4">
        <p className="eyebrow text-primary">Problématique</p>
        <p className="mt-1 font-serif text-lg">{exercise.problematique}</p>
      </div>
      <div>
        <p className="eyebrow">Plan détaillé</p>
        <ol className="mt-2 space-y-3">
          {exercise.plan.map((p) => (
            <li key={p.partie}>
              <p className="font-semibold">{p.partie}</p>
              <ul className="mt-1 list-[lower-alpha] space-y-0.5 pl-6 text-sm text-muted-foreground">
                {p.sousParties.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <p className="eyebrow">Grille d'auto-évaluation</p>
        <dl className="mt-2 grid gap-2 sm:grid-cols-2">
          {grille.map((g) => (
            <div key={g.critere} className="rounded-lg bg-muted p-3">
              <dt className="text-sm font-semibold">{g.critere}</dt>
              <dd className="text-sm text-muted-foreground">{g.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
