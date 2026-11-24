import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Bot, Brain, Check, GraduationCap, Layers, ListChecks, PenLine, ScrollText } from "lucide-react"
import { ChapterCard } from "@/components/chapter-card"
import { Faq, type FaqItem } from "@/components/faq"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { hasChapterContent } from "@/content"
import { allChapters, levels, programmes } from "@/lib/curriculum"
import { pageMetadata } from "@/lib/seo"
import { freeFeatures, premiumFeatures, pricing, siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — Fiches de révision histoire-géo et HGGSP pour le bac`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
})

const faq: FaqItem[] = [
  {
    q: "Les fiches sont-elles conformes aux programmes officiels ?",
    a: "Oui. Chaque fiche suit l'intitulé exact d'un chapitre (ou d'un axe en HGGSP) des programmes du lycée général, de la Seconde à la Terminale. On y retrouve les notions, les repères et les acteurs attendus.",
  },
  {
    q: "Qu'est-ce qui est gratuit ?",
    a: `Toutes les fiches de cours, les flashcards de chaque chapitre, un quiz express de ${pricing.freeQuizQuestions} questions par chapitre, les fiches méthode essentielles et ${pricing.freeAiQuestionsPerDay} questions par jour à l'assistant IA avec un compte gratuit.`,
  },
  {
    q: "Que m'apporte Premium ?",
    a: "La révision en répétition espacée de toutes les flashcards, les quiz complets avec corrections détaillées, l'assistant IA sans limite quotidienne, des sujets corrigés en méthodologie et un tableau de bord de progression.",
  },
  {
    q: "Combien coûte Premium ?",
    a: `${pricing.monthly.label} par mois ou ${pricing.yearly.label} par an (soit ${pricing.yearly.monthlyEquivalent} par mois), avec ${pricing.trialDays} jours d'essai gratuit. L'abonnement se résilie en deux clics depuis ton espace. Les élèves boursiers peuvent demander une réduction.`,
  },
  {
    q: "La répétition espacée, comment ça marche ?",
    a: "Après chaque carte, tu indiques si tu l'as retenue facilement ou non. L'algorithme programme alors la prochaine révision juste avant que tu risques de l'oublier : quelques minutes, quelques jours, puis quelques semaines. Tu révises moins longtemps et tu retiens mieux.",
  },
  {
    q: "L'assistant IA peut-il faire mes devoirs ?",
    a: "Non, et ce n'est pas son rôle. Il explique les notions, aide à problématiser un sujet et à construire un plan, et vérifie ta compréhension. Il t'encourage à rédiger toi-même : c'est ce qui fait progresser.",
  },
]

const facts = [
  { title: "Le mot « tiers-monde »", text: "Le démographe Alfred Sauvy l'invente en 1952, par analogie avec le tiers état de 1789." },
  { title: "Une mer presque disparue", text: "La mer d'Aral a perdu l'essentiel de son volume depuis les années 1960, à cause de l'irrigation du coton." },
  { title: "La deuxième ZEE du monde", text: "Grâce à ses outre-mer, la France possède environ 10,2 millions de km² de zone économique exclusive." },
]

export default function HomePage() {
  const featured = allChapters.filter((c) => hasChapterContent(c.chapter.slug)).slice(-6).reverse()
  const totalChapters = allChapters.length

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="paper-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-20">
          <div className="space-y-7">
            <Badge variant="outline" className="bg-background">
              <GraduationCap /> Programmes officiels · Seconde, Première, Terminale
            </Badge>
            <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Réviser l'histoire‑géo et l'HGGSP,{" "}
              <span className="relative whitespace-nowrap text-primary">
                avec méthode
                <svg viewBox="0 0 220 12" className="absolute -bottom-2 left-0 h-3 w-full text-accent" aria-hidden preserveAspectRatio="none">
                  <path d="M2 9c50-6 120-8 216-4" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Des fiches de cours claires, des flashcards en répétition espacée, des quiz corrigés et la méthodologie du bac. Tout ce qu'il faut pour
              comprendre, retenir et réussir.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#niveaux">
                  Choisir mon niveau <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/tarifs">Gratuit · Premium dès {pricing.yearly.monthlyEquivalent}/mois</Link>
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Fiches gratuites et sans publicité", `${totalChapters} chapitres au programme`, "Pensé pour le bac"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="size-4 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Aperçu visuel d'une fiche et d'une flashcard */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden>
            <div className="rotate-[-2deg] rounded-2xl border bg-card p-6 shadow-xl shadow-primary/5">
              <div className="flex items-center gap-2">
                <Badge variant="histoire">Histoire</Badge>
                <span className="text-xs text-muted-foreground">Terminale · Thème 2</span>
              </div>
              <p className="mt-4 font-serif text-2xl font-semibold leading-snug">Bipolarisation et émergence du tiers-monde</p>
              <div className="mt-4 rounded-lg border-l-4 border-primary bg-secondary/60 p-3 text-sm">
                Comment la guerre froide recompose-t-elle l'ordre international entre 1947 et 1973 ?
              </div>
              <div className="mt-4 space-y-2">
                {[["1947", "Doctrine Truman, plan Marshall"], ["1955", "Conférence de Bandung"], ["1962", "Crise des missiles de Cuba"]].map(([d, e]) => (
                  <div key={d} className="flex gap-3 text-sm">
                    <span className="w-10 font-semibold tabular-nums text-primary">{d}</span>
                    <span className="text-muted-foreground">{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-20 -right-2 w-60 rotate-[4deg] rounded-xl border border-primary/30 bg-secondary p-4 shadow-lg sm:-right-6">
              <p className="eyebrow text-primary">Flashcard</p>
              <p className="mt-2 font-serif text-lg font-medium leading-snug">Qui invente l'expression « tiers-monde » ?</p>
              <div className="mt-3 grid grid-cols-4 gap-1 text-center text-[11px] font-medium">
                {["À revoir", "Difficile", "Bien", "Facile"].map((g, i) => (
                  <span key={g} className={i === 2 ? "rounded bg-primary py-1 text-primary-foreground" : "rounded bg-background py-1"}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Niveaux */}
      <section id="niveaux" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Par niveau</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Tout le programme du lycée, chapitre par chapitre</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {levels.map((level) => {
            const progs = programmes.filter((p) => p.level === level.slug)
            const count = allChapters.filter((c) => c.level.slug === level.slug).length
            return (
              <div key={level.slug} className="flex flex-col rounded-2xl border bg-card p-6">
                <p className="font-serif text-5xl font-semibold text-primary/90">{level.short}</p>
                <h3 className="mt-3 font-serif text-2xl font-semibold">{level.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{count} chapitres</p>
                <ul className="mt-5 space-y-1.5">
                  {progs.map((p) => (
                    <li key={p.subject}>
                      <Link
                        href={`/${level.slug}/${p.subject}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        {p.subject === "hggsp" ? "Spécialité HGGSP" : p.subject === "histoire" ? "Histoire" : "Géographie"}
                        <ArrowRight className="size-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Méthode Histoflash */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">La méthode</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Comprendre, retenir, s'entraîner</h2>
          <p className="mt-3 text-muted-foreground">
            Trois étapes issues des recherches sur l'apprentissage : la récupération active et la répétition espacée sont parmi les techniques de
            révision les plus efficaces.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: ScrollText, title: "Comprendre", text: "Une fiche structurée par chapitre : problématique, cours en parties, dates clés, notions et acteurs." },
            { icon: Brain, title: "Retenir", text: "Des flashcards qui reviennent au bon moment grâce à la répétition espacée, pour mémoriser durablement." },
            { icon: ListChecks, title: "S'entraîner", text: "Des quiz corrigés, des sujets type bac et la méthode de la dissertation, de l'étude de document et du croquis." },
          ].map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border bg-card p-6">
              <span className="absolute right-5 top-4 font-serif text-5xl font-semibold text-muted-foreground/15">{i + 1}</span>
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                <step.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fiches à la une */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">À réviser</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Fiches complètes</h2>
          </div>
          <Button asChild variant="ghost">
            <Link href="/terminale">
              Toutes les fiches de Terminale <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <ChapterCard key={c.path} loc={c} available showLevel />
          ))}
        </div>
      </section>

      {/* Le saviez-vous ? */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="rounded-2xl border bg-secondary/50 p-6 sm:p-10">
          <p className="eyebrow">Le saviez-vous ?</p>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {facts.map((f) => (
              <div key={f.title}>
                <p className="font-serif text-lg font-semibold">{f.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outils */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Layers, title: "Révisions espacées", text: "Une file de révision quotidienne, toutes matières confondues.", href: "/revisions" },
            { icon: PenLine, title: "Méthodologie", text: "Dissertation, étude critique, croquis, grand oral : étape par étape.", href: "/methodologie" },
            { icon: Bot, title: "Assistant IA", text: "Pose tes questions de cours et construis tes plans, avec une IA cadrée sur le programme.", href: "/assistant" },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href} className="group rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
              <tool.icon className="size-6 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-semibold group-hover:text-primary">{tool.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tool.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tarifs */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Tarifs</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Gratuit pour apprendre, Premium pour aller plus loin</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-7">
            <p className="font-serif text-2xl font-semibold">Gratuit</p>
            <p className="mt-1 text-sm text-muted-foreground">Pour tous les lycéens, sans carte bancaire.</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {freeFeatures.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-card p-7 shadow-lg shadow-primary/10">
            <div className="flex items-center justify-between">
              <p className="font-serif text-2xl font-semibold">Premium</p>
              <Badge variant="premium">{pricing.trialDays} jours offerts</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {pricing.yearly.label}/an ({pricing.yearly.monthlyEquivalent}/mois) ou {pricing.monthly.label}/mois.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link href="/tarifs">Découvrir Premium</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
        <div className="mt-8">
          <Faq items={faq} />
        </div>
      </section>
    </>
  )
}
