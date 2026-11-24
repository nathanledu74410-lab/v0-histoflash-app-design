import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { and, count, desc, eq, gte, lte } from "drizzle-orm"
import { CalendarClock, CircleCheck, Flame, Layers, ListChecks } from "lucide-react"
import { PortalButton } from "@/components/checkout-button"
import { PremiumCallout } from "@/components/premium-callout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { allChapterContents } from "@/content"
import { serverConfig } from "@/lib/config"
import { findChapterBySlug } from "@/lib/curriculum"
import { getDb, schema } from "@/lib/db"
import { getViewer } from "@/lib/entitlements"
import { pricing } from "@/lib/site"
import { parisDay } from "@/lib/srs"

export const metadata: Metadata = {
  title: "Mon espace",
  robots: { index: false, follow: false },
}

function streak(days: string[]) {
  const set = new Set(days)
  let n = 0
  const cursor = new Date()
  // La série continue si l'élève n'a pas encore révisé aujourd'hui.
  if (!set.has(parisDay(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (set.has(parisDay(cursor))) {
    n++
    cursor.setDate(cursor.getDate() - 1)
  }
  return n
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ abonnement?: string }> }) {
  const { abonnement } = await searchParams

  if (!serverConfig.auth) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6">
        <h1 className="font-serif text-3xl font-semibold">Mon espace</h1>
        <p className="mt-3 text-muted-foreground">Les comptes ne sont pas encore activés sur ce site. Les fiches restent accessibles librement.</p>
      </div>
    )
  }

  const viewer = await getViewer()
  if (viewer.status === "anonymous") redirect("/connexion?redirect_url=/tableau-de-bord")

  const db = getDb()
  const isPremium = viewer.status === "premium"
  const user = viewer.user

  let stats = { due: 0, learned: 0, quizzes: 0, avg: 0, streak: 0 }
  let recent: { chapterSlug: string; score: number; total: number; createdAt: Date }[] = []
  if (db) {
    const since = new Date(Date.now() - 60 * 86_400_000)
    const [[due], [learned], attempts, activity] = await Promise.all([
      db.select({ n: count() }).from(schema.cardReviews).where(and(eq(schema.cardReviews.userId, viewer.userId), lte(schema.cardReviews.dueAt, new Date()))),
      db.select({ n: count() }).from(schema.cardReviews).where(eq(schema.cardReviews.userId, viewer.userId)),
      db.select().from(schema.quizAttempts).where(eq(schema.quizAttempts.userId, viewer.userId)).orderBy(desc(schema.quizAttempts.createdAt)).limit(50),
      db.select({ day: schema.activityDays.day }).from(schema.activityDays).where(and(eq(schema.activityDays.userId, viewer.userId), gte(schema.activityDays.day, parisDay(since)))),
    ])
    recent = attempts.slice(0, 6)
    stats = {
      due: due.n,
      learned: learned.n,
      quizzes: attempts.length,
      avg: attempts.length ? Math.round((attempts.reduce((s, a) => s + a.score / a.total, 0) / attempts.length) * 100) : 0,
      streak: streak(activity.map((a) => a.day)),
    }
  }

  const totalCards = allChapterContents().reduce((s, c) => s + c.flashcards.length, 0)

  return (
    <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
      {abonnement === "ok" && (
        <div role="status" className="mb-8 flex items-center gap-3 rounded-xl border border-success/40 bg-success/10 p-4">
          <CircleCheck className="size-5 text-success" />
          <p className="text-sm">
            Bienvenue dans Premium ! L'activation peut prendre quelques secondes : actualise la page si besoin.
          </p>
        </div>
      )}

      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Mon espace</p>
          <h1 className="mt-1 font-serif text-4xl font-semibold tracking-tight">Tableau de bord</h1>
        </div>
        <div className="flex items-center gap-2">
          {isPremium ? (
            <Badge variant="premium">
              Premium{user?.subscriptionStatus === "trialing" ? " · essai" : ""}
            </Badge>
          ) : (
            <Badge variant="outline">Compte gratuit</Badge>
          )}
        </div>
      </header>

      {isPremium ? (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Flame, label: "Jours d'affilée", value: stats.streak },
              { icon: CalendarClock, label: "Cartes à revoir", value: stats.due },
              { icon: Layers, label: "Cartes apprises", value: `${stats.learned} / ${totalCards}` },
              { icon: ListChecks, label: "Réussite aux quiz", value: stats.quizzes ? `${stats.avg} %` : "—" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-5">
                <s.icon className="size-5 text-primary" />
                <p className="mt-3 font-serif text-3xl font-semibold tabular-nums">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/revisions?session=1">{stats.due > 0 ? `Réviser mes ${stats.due} cartes` : "Lancer une session"}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/revisions">Choisir un chapitre</Link>
            </Button>
          </div>
        </>
      ) : (
        <PremiumCallout title="Débloque ton tableau de bord de progression" className="mt-8">
          Série de jours, cartes à revoir, taux de réussite aux quiz : avec Premium, tu sais exactement où tu en es.
        </PremiumCallout>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">Derniers quiz</h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-muted-foreground">
            Aucun quiz pour l'instant. Choisis une fiche et teste-toi en fin de page.
          </p>
        ) : (
          <ul className="mt-4 divide-y rounded-xl border bg-card">
            {recent.map((a) => {
              const loc = findChapterBySlug(a.chapterSlug)
              return (
                <li key={a.createdAt.toISOString()} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <Link href={loc?.path ?? "/"} className="line-clamp-1 font-medium hover:text-primary">
                      {loc?.chapter.title ?? a.chapterSlug}
                    </Link>
                    <p className="text-xs text-muted-foreground">{a.createdAt.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}</p>
                  </div>
                  <span className="shrink-0 font-semibold tabular-nums">
                    {a.score} / {a.total}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="mt-12 rounded-xl border bg-card p-6">
        <h2 className="font-serif text-xl font-semibold">Abonnement</h2>
        {isPremium && user ? (
          <div className="mt-3 space-y-4 text-sm text-muted-foreground">
            <p>
              Formule {user.plan === "yearly" ? "annuelle" : user.plan === "monthly" ? "mensuelle" : "Premium"}
              {user.currentPeriodEnd &&
                ` · ${user.cancelAtPeriodEnd ? "se termine" : user.subscriptionStatus === "trialing" ? "essai jusqu'au" : "renouvellement le"} ${user.currentPeriodEnd.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`}
            </p>
            <PortalButton>Gérer mon abonnement</PortalButton>
          </div>
        ) : (
          <div className="mt-3 space-y-4 text-sm text-muted-foreground">
            <p>
              Tu utilises la version gratuite. Premium : {pricing.monthly.label}/mois ou {pricing.yearly.label}/an, {pricing.trialDays} jours d'essai offerts.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/tarifs">Voir les formules</Link>
              </Button>
              {user?.stripeCustomerId && <PortalButton>Mes factures</PortalButton>}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
