import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Bot, CalendarDays, Clock, Layers, ListChecks, NotebookPen, Users } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ChapterCard } from "@/components/chapter-card"
import { FlashcardDeck } from "@/components/chapter/flashcard-deck"
import { Quiz } from "@/components/chapter/quiz"
import { JsonLd } from "@/components/json-ld"
import { PremiumCallout } from "@/components/premium-callout"
import { HideForPremium } from "@/components/viewer-gate"
import { RichText, stripMarks } from "@/components/rich-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getChapterContent, hasChapterContent } from "@/content"
import type { ChapterContent } from "@/content/types"
import { allChapters, findChapter, themeLabel, type ChapterLocation } from "@/lib/curriculum"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl, pricing, siteConfig } from "@/lib/site"

type Params = { niveau: string; matiere: string; chapitre: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return allChapters.map((c) => ({ niveau: c.level.slug, matiere: c.subject.slug, chapitre: c.chapter.slug }))
}

function readingMinutes(content: ChapterContent) {
  const text = [content.intro, ...content.sections.flatMap((s) => [...s.paragraphs, ...(s.keyPoints ?? [])])].join(" ")
  return Math.max(3, Math.round(text.split(/\s+/).length / 200))
}

function seoTitle(loc: ChapterLocation) {
  return `${loc.chapter.title} — Fiche ${loc.subject.name} ${loc.level.name}`
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { niveau, matiere, chapitre } = await params
  const loc = findChapter(niveau, matiere, chapitre)
  if (!loc) return {}
  const content = getChapterContent(chapitre)
  return pageMetadata({
    title: seoTitle(loc),
    description:
      content?.metaDescription ??
      `${loc.chapter.title} : chapitre du programme de ${loc.subject.name} en ${loc.level.name}. Fiche de révision en préparation.`,
    path: loc.path,
    type: content ? "article" : "website",
    modifiedTime: content?.updatedAt,
    // Une page sans contenu rédigé ne doit pas être indexée (contenu trop mince).
    noindex: !content,
  })
}

export default async function ChapterPage({ params }: { params: Promise<Params> }) {
  const { niveau, matiere, chapitre } = await params
  const loc = findChapter(niveau, matiere, chapitre)
  if (!loc) notFound()
  const content = getChapterContent(chapitre)

  const crumbs = [
    { name: loc.level.name, href: `/${loc.level.slug}` },
    { name: `${loc.subject.name} ${loc.level.short}`, href: `/${loc.level.slug}/${loc.subject.slug}` },
    { name: loc.chapter.title, href: loc.path },
  ]
  const siblings = allChapters.filter((c) => c.theme === loc.theme && c.chapter.slug !== loc.chapter.slug)

  return (
    <article>
      <header className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-6 sm:px-6 lg:grid-cols-[1fr_340px] lg:items-end">
          <div className="space-y-5">
            <Breadcrumbs items={crumbs} />
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={loc.subject.slug}>{loc.subject.name}</Badge>
              <Badge variant="outline">{loc.level.name}</Badge>
              <span className="text-sm text-muted-foreground">
                {themeLabel(loc.theme)} · {loc.chapter.label}
              </span>
            </div>
            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {loc.chapter.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {loc.theme.number !== "C" && <>Thème {loc.theme.number} : </>}
              {loc.theme.title}
            </p>
            {content && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" /> {readingMinutes(content)} min de lecture
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="size-4" /> {content.flashcards.length} flashcards
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ListChecks className="size-4" /> Quiz de {content.quiz.length} questions
                </span>
              </div>
            )}
          </div>
          {loc.chapter.image && (
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl border lg:block">
              <Image
                src={loc.chapter.image}
                alt=""
                fill
                priority
                sizes="340px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </header>

      {content ? <ChapterBody loc={loc} content={content} /> : <ChapterPlaceholder loc={loc} />}

      {siblings.length > 0 && (
        <section aria-labelledby="meme-theme" className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
          <h2 id="meme-theme" className="font-serif text-2xl font-semibold">
            Dans le même thème
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => (
              <ChapterCard key={s.path} loc={s} available={hasChapterContent(s.chapter.slug)} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

function ChapterBody({ loc, content }: { loc: ChapterLocation; content: ChapterContent }) {
  const toc = [
    { id: "problematique", label: "Problématique" },
    ...content.sections.map((s, i) => ({ id: `partie-${i + 1}`, label: s.title })),
    { id: "dates-cles", label: "Dates clés" },
    { id: "notions", label: "Notions" },
    { id: "acteurs", label: "Acteurs" },
    { id: "flashcards", label: "Flashcards" },
    { id: "quiz", label: "Quiz" },
    { id: "sujets", label: "Sujets d'entraînement" },
  ]

  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-10 sm:px-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="Sommaire de la fiche" className="sticky top-24 space-y-1 text-sm">
            <p className="eyebrow mb-3">Sommaire</p>
            {toc.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block rounded px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 max-w-3xl space-y-14">
          <section className="space-y-6">
            <p className="prose-hf text-lg">
              <RichText text={content.intro} />
            </p>
            <div id="problematique" className="scroll-mt-24 rounded-xl border-l-4 border-primary bg-secondary/60 p-5">
              <p className="eyebrow text-primary">Problématique</p>
              <p className="mt-2 font-serif text-xl font-medium leading-snug">{content.problematique}</p>
            </div>
          </section>

          {content.sections.map((section, i) => (
            <section key={section.title} id={`partie-${i + 1}`} className="scroll-mt-24">
              <h2 className="flex items-baseline gap-3 font-serif text-2xl font-semibold sm:text-[1.75rem]">
                <span className="font-sans text-base font-semibold text-accent-foreground/70 dark:text-accent">{["I", "II", "III", "IV", "V"][i]}.</span>
                {section.title}
              </h2>
              <div className="prose-hf mt-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
              {section.keyPoints && (
                <div className="mt-5 rounded-lg border bg-card p-4">
                  <p className="eyebrow mb-2">À retenir</p>
                  <ul className="space-y-1.5 text-[0.95rem]">
                    {section.keyPoints.map((k) => (
                      <li key={k} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          <section id="dates-cles" className="scroll-mt-24">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              <CalendarDays className="size-5 text-primary" /> Dates clés
            </h2>
            <ol className="relative mt-5 space-y-4 border-l-2 border-border pl-6">
              {content.dates.map((d) => (
                <li key={d.date + d.event} className="relative">
                  <span className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-primary" aria-hidden />
                  <p className="font-semibold tabular-nums">{d.date}</p>
                  <p className="text-muted-foreground">{d.event}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="notions" className="scroll-mt-24">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              <NotebookPen className="size-5 text-primary" /> Notions à maîtriser
            </h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {content.notions.map((n) => (
                <div key={n.term} className="rounded-lg border bg-card p-4">
                  <dt className="font-semibold">{n.term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="acteurs" className="scroll-mt-24">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              <Users className="size-5 text-primary" /> Acteurs
            </h2>
            <ul className="mt-5 divide-y rounded-lg border bg-card">
              {content.actors.map((a) => (
                <li key={a.name} className="p-4">
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.role}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="flashcards" className="scroll-mt-24">
            <h2 className="font-serif text-2xl font-semibold">Flashcards</h2>
            <p className="mt-1 mb-5 text-muted-foreground">Teste ta mémoire, puis retourne la carte pour vérifier.</p>
            <FlashcardDeck cards={content.flashcards} chapterSlug={loc.chapter.slug} />
          </section>

          <section id="quiz" className="scroll-mt-24">
            <h2 className="font-serif text-2xl font-semibold">Quiz</h2>
            <p className="mt-1 mb-5 text-muted-foreground">
              {pricing.freeQuizQuestions} questions en accès libre. Le quiz complet et ses corrections sont inclus dans Premium.
            </p>
            <Quiz
              slug={loc.chapter.slug}
              freeQuestions={content.quiz.slice(0, pricing.freeQuizQuestions).map(({ question, options, answer }) => ({ question, options, answer }))}
              totalCount={content.quiz.length}
            />
          </section>

          <section id="sujets" className="scroll-mt-24">
            <h2 className="font-serif text-2xl font-semibold">Sujets d'entraînement</h2>
            <p className="mt-1 text-sm text-muted-foreground">Formulations de type bac, rédigées par Histoflash pour s'entraîner.</p>
            <ul className="mt-4 space-y-2">
              {content.sujets.map((s) => (
                <li key={s} className="rounded-lg border bg-card px-4 py-3 font-serif text-lg">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/methodologie/dissertation">Méthode de la dissertation</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/assistant?sujet=${encodeURIComponent(content.sujets[0])}`}>
                  <Bot /> Construire un plan avec l'assistant
                </Link>
              </Button>
            </div>
          </section>

          <HideForPremium>
          <PremiumCallout title="Retiens ce chapitre jusqu'au bac">
            Avec Premium, les {content.flashcards.length} flashcards de ce chapitre entrent dans tes révisions en répétition espacée : chaque carte
            revient au moment où tu risques de l'oublier.
          </PremiumCallout>
          </HideForPremium>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          "@id": absoluteUrl(loc.path),
          url: absoluteUrl(loc.path),
          name: loc.chapter.title,
          headline: seoTitle(loc),
          description: content.metaDescription,
          abstract: stripMarks(content.intro),
          inLanguage: "fr-FR",
          learningResourceType: ["Fiche de révision", "Flashcards", "Quiz"],
          educationalLevel: `${loc.level.name} (lycée général)`,
          educationalAlignment: {
            "@type": "AlignmentObject",
            alignmentType: "educationalSubject",
            targetName: `${loc.subject.name} — ${loc.programme.title}`,
          },
          teaches: content.notions.map((n) => n.term),
          about: { "@type": "Thing", name: loc.theme.title },
          isAccessibleForFree: true,
          timeRequired: `PT${readingMinutes(content)}M`,
          dateModified: content.updatedAt,
          image: loc.chapter.image ? absoluteUrl(loc.chapter.image) : undefined,
          isPartOf: { "@type": "Course", name: `${loc.subject.name} ${loc.level.name}`, url: absoluteUrl(`/${loc.level.slug}/${loc.subject.slug}`) },
          publisher: { "@type": "EducationalOrganization", name: siteConfig.name, url: siteConfig.url },
        }}
      />
    </>
  )
}

function ChapterPlaceholder({ loc }: { loc: ChapterLocation }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
      <div className="rounded-xl border bg-card p-6 sm:p-8">
        <p className="eyebrow">Fiche en préparation</p>
        <p className="mt-3 font-serif text-2xl font-semibold">Ce chapitre arrive bientôt sur Histoflash.</p>
        <p className="mt-3 text-muted-foreground">
          Notre équipe rédige la fiche, les flashcards et le quiz de ce chapitre du programme de {loc.subject.name} en {loc.level.name}. En
          attendant, l'assistant IA peut t'expliquer les notions clés et t'aider à construire un plan.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild>
            <Link href={`/assistant?sujet=${encodeURIComponent(loc.chapter.title)}`}>
              <Bot /> Demander à l'assistant
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${loc.level.slug}/${loc.subject.slug}`}>Voir le programme</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
