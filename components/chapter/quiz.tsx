"use client"

import { useState } from "react"
import Link from "next/link"
import { CircleCheck, CircleX, Lock, LoaderCircle, RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Question {
  question: string
  options: string[]
  answer: number
  explanation?: string
}

type Unlock = "idle" | "loading" | "anonymous" | "free" | "error"

export function Quiz({
  slug,
  freeQuestions,
  totalCount,
}: {
  slug: string
  freeQuestions: Question[]
  totalCount: number
}) {
  const [questions, setQuestions] = useState<Question[]>(freeQuestions)
  const [full, setFull] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [unlock, setUnlock] = useState<Unlock>("idle")

  const q = questions[current]

  function choose(i: number) {
    if (selected !== null) return
    setSelected(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  function next() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1)
      setSelected(null)
      return
    }
    setFinished(true)
    const finalScore = score
    fetch(`/api/quiz/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: finalScore, total: questions.length }),
    }).catch(() => {})
  }

  function restart(list = questions) {
    setQuestions(list)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  async function unlockFull() {
    setUnlock("loading")
    try {
      const res = await fetch(`/api/quiz/${slug}`)
      if (res.ok) {
        const data = (await res.json()) as { questions: Question[] }
        setFull(true)
        setUnlock("idle")
        restart(data.questions)
        return
      }
      const data = await res.json().catch(() => ({}))
      setUnlock(data.status === "free" ? "free" : res.status === 402 ? "anonymous" : "error")
    } catch {
      setUnlock("error")
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="rounded-xl border bg-card p-6 sm:p-8">
        <p className="eyebrow">Résultat</p>
        <p className="mt-1 font-serif text-4xl font-semibold">
          {score}
          <span className="text-2xl text-muted-foreground"> / {questions.length}</span>
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {pct >= 80 ? "Excellent, ce chapitre est bien maîtrisé." : pct >= 50 ? "Bonne base : revois les points manqués." : "Relis la fiche puis retente le quiz."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => restart()}>
            <RotateCcw /> Recommencer
          </Button>
          {!full && (
            <Button onClick={unlockFull} disabled={unlock === "loading"}>
              {unlock === "loading" ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
              Quiz complet ({totalCount} questions) et corrections
            </Button>
          )}
        </div>

        {(unlock === "anonymous" || unlock === "free") && (
          <div className="mt-5 rounded-lg border border-accent/60 bg-accent/10 p-4 text-sm">
            <p className="font-medium">Le quiz complet et les corrections détaillées font partie de Premium.</p>
            <p className="mt-1 text-muted-foreground">
              Chaque réponse est expliquée et replacée dans son contexte, pour comprendre et pas seulement retenir.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link href="/tarifs">Voir les formules</Link>
              </Button>
              {unlock === "anonymous" && (
                <Button asChild size="sm" variant="outline">
                  <Link href="/connexion">J'ai déjà un compte</Link>
                </Button>
              )}
            </div>
          </div>
        )}
        {unlock === "error" && <p className="mt-4 text-sm text-destructive">Impossible de charger le quiz complet. Réessaie plus tard.</p>}
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>
          Question {current + 1} / {questions.length}
        </span>
        <span>{full ? "Quiz complet" : "Quiz express"}</span>
      </div>
      <div className="mb-5 h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
        <div className="h-full bg-primary transition-all" style={{ width: `${(current / questions.length) * 100}%` }} />
      </div>

      <fieldset>
        <legend className="font-serif text-xl font-semibold leading-snug">{q.question}</legend>
        <div className="mt-5 grid gap-2">
          {q.options.map((opt, i) => {
            const isAnswer = selected !== null && i === q.answer
            const isWrong = selected === i && i !== q.answer
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={selected !== null}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-[0.95rem] transition-colors",
                  selected === null && "hover:border-primary/50 hover:bg-secondary",
                  isAnswer && "border-success bg-success/10",
                  isWrong && "border-destructive bg-destructive/10",
                  selected !== null && !isAnswer && !isWrong && "opacity-60",
                )}
              >
                <span>{opt}</span>
                {isAnswer && <CircleCheck className="size-5 shrink-0 text-success" aria-label="Bonne réponse" />}
                {isWrong && <CircleX className="size-5 shrink-0 text-destructive" aria-label="Mauvaise réponse" />}
              </button>
            )
          })}
        </div>
      </fieldset>

      {selected !== null && (
        <div className="mt-5 space-y-4" aria-live="polite">
          {q.explanation ? (
            <div className="rounded-lg bg-muted p-4 text-sm leading-relaxed">
              <p className="mb-1 font-semibold">{selected === q.answer ? "Bonne réponse !" : "Correction"}</p>
              {q.explanation}
            </div>
          ) : (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="size-3.5" /> Correction détaillée disponible avec Premium
            </p>
          )}
          <div className="flex justify-end">
            <Button onClick={next}>{current + 1 < questions.length ? "Question suivante" : "Voir le résultat"}</Button>
          </div>
        </div>
      )}
    </div>
  )
}
