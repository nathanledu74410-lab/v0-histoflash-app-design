import type { Metadata } from "next"
import Link from "next/link"
import { and, count, eq, lte } from "drizzle-orm"
import { Brain, CalendarClock, Repeat } from "lucide-react"
import { PremiumCallout } from "@/components/premium-callout"
import { ReviewSession } from "@/components/revisions/review-session"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { allChapterContents, getChapterContent } from "@/content"
import { serverConfig } from "@/lib/config"
import { findChapterBySlug } from "@/lib/curriculum"
import { getDb, schema } from "@/lib/db"
import { getViewer } from "@/lib/entitlements"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Révisions en répétition espacée",
  description:
    "Révise les flashcards d'histoire-géo et d'HGGSP au moment idéal grâce à la répétition espacée. Une file quotidienne pour mémoriser durablement avant le bac.",
  path: "/revisions",
})

export default async function RevisionsPage({ searchParams }: { searchParams: Promise<{ chapitre?: string; session?: string }> }) {
  const { chapitre, session } = await searchParams
  const chapter = chapitre && getChapterContent(chapitre) ? chapitre : undefined
  const viewer = await getViewer()

  return (
    <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6">
      <header className="max-w-2xl space-y-3">
        <p className="eyebrow">Révisions</p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Retenir sur le long terme</h1>
        <p className="text-lg text-muted-foreground">
          Chaque carte revient juste avant que tu l'oublies. Quinze minutes par jour suffisent pour garder tout le programme en tête.
        </p>
      </header>

      <div className="mt-10">
        {viewer.status === "premium" ? (
          session || chapter ? (
            <div className="space-y-4">
              {chapter && (
                <p className="text-sm text-muted-foreground">
                  Chapitre : <span className="font-medium text-foreground">{findChapterBySlug(chapter)?.chapter.title}</span>
                </p>
              )}
              <ReviewSession chapter={chapter} />
            </div>
          ) : (
            <PremiumDashboard userId={viewer.userId} />
          )
        ) : (
          <LockedState status={viewer.status} chapter={chapter} />
        )}
      </div>
    </div>
  )
}

async function PremiumDashboard({ userId }: { userId: string }) {
  const db = getDb()
  if (!db) return <p className="text-muted-foreground">La base de données n'est pas configurée.</p>

  const [due] = await db
    .select({ n: count() })
    .from(schema.cardReviews)
    .where(and(eq(schema.cardReviews.userId, userId), lte(schema.cardReviews.dueAt, new Date())))
  const perChapter = await db
    .select({ slug: schema.cardReviews.chapterSlug, n: count() })
    .from(schema.cardReviews)
    .where(eq(schema.cardReviews.userId, userId))
    .groupBy(schema.cardReviews.chapterSlug)
  const started = new Map(perChapter.map((r) => [r.slug, r.n]))

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-start gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
            <CalendarClock className="size-6" />
          </span>
          <div>
            <p className="font-serif text-3xl font-semibold tabular-nums">{due.n}</p>
            <p className="text-sm text-muted-foreground">carte{due.n > 1 ? "s" : ""} à revoir aujourd'hui</p>
          </div>
        </div>
        <Button asChild size="lg" disabled={due.n === 0 && started.size === 0}>
          <Link href="/revisions?session=1">
            <Repeat /> {due.n > 0 ? "Lancer ma session du jour" : "Apprendre de nouvelles cartes"}
          </Link>
        </Button>
      </div>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Ajouter un chapitre à mes révisions</h2>
        <ul className="mt-5 divide-y rounded-xl border bg-card">
          {allChapterContents().map((c) => {
            const loc = findChapterBySlug(c.slug)
            if (!loc) return null
            const seen = started.get(c.slug) ?? 0
            return (
              <li key={c.slug} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant={loc.subject.slug}>{loc.subject.name}</Badge>
                    <span className="text-xs text-muted-foreground">{loc.level.name}</span>
                  </div>
                  <p className="mt-1 font-medium">{loc.chapter.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {seen} / {c.flashcards.length} cartes apprises
                  </p>
                </div>
                <Button asChild variant={seen === 0 ? "default" : "outline"} size="sm" className="shrink-0">
                  <Link href={`/revisions?chapitre=${c.slug}`}>{seen === 0 ? "Commencer" : "Réviser"}</Link>
                </Button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

function LockedState({ status, chapter }: { status: "anonymous" | "free"; chapter?: string }) {
  const authReady = serverConfig.auth
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Brain, title: "Récupération active", text: "Tu cherches la réponse avant de la voir : c'est ce qui ancre le souvenir." },
          { icon: CalendarClock, title: "Le bon moment", text: "L'algorithme espace les révisions : 1 jour, 6 jours, 2 semaines, puis plus." },
          { icon: Repeat, title: "Tout le programme", text: `Les flashcards de ${allChapterContents().length} chapitres réunies dans une seule file quotidienne.` },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-5">
            <f.icon className="size-5 text-primary" />
            <p className="mt-3 font-semibold">{f.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>

      <PremiumCallout title="La répétition espacée est incluse dans Premium">
        {status === "anonymous" && authReady ? (
          <>
            Tu as déjà un compte ?{" "}
            <Link href="/connexion" className="font-medium text-primary hover:underline">
              Connecte-toi
            </Link>
            .
          </>
        ) : (
          "Tes progrès sont enregistrés sur ton compte et synchronisés sur tous tes appareils."
        )}
      </PremiumCallout>

      {chapter && (
        <p className="text-sm text-muted-foreground">
          En attendant, tu peux réviser les flashcards de ce chapitre directement sur{" "}
          <Link href={`${findChapterBySlug(chapter)?.path}#flashcards`} className="font-medium text-primary hover:underline">
            sa fiche
          </Link>
          .
        </p>
      )}
    </div>
  )
}
