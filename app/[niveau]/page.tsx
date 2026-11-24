import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ChapterCard } from "@/components/chapter-card"
import { Badge } from "@/components/ui/badge"
import { hasChapterContent } from "@/content"
import { allChapters, getLevel, getProgrammesForLevel, getSubject, levels } from "@/lib/curriculum"
import { pageMetadata } from "@/lib/seo"

type Params = { niveau: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return levels.map((l) => ({ niveau: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { niveau } = await params
  const level = getLevel(niveau)
  if (!level) return {}
  const subjectsList = getProgrammesForLevel(niveau)
    .map((p) => getSubject(p.subject)?.name)
    .join(", ")
  return pageMetadata({
    title: `Réviser l'histoire-géo en ${level.name} : fiches, flashcards et quiz`,
    description: `Fiches de révision ${level.name} conformes au programme officiel (${subjectsList}). ${level.description}`,
    path: `/${niveau}`,
  })
}

export default async function LevelPage({ params }: { params: Promise<Params> }) {
  const { niveau } = await params
  const level = getLevel(niveau)
  if (!level) notFound()
  const progs = getProgrammesForLevel(niveau)
  const featured = allChapters.filter((c) => c.level.slug === niveau && hasChapterContent(c.chapter.slug))

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <Breadcrumbs items={[{ name: level.name, href: `/${level.slug}` }]} />
      <header className="mt-6 max-w-3xl space-y-4">
        <p className="eyebrow">Lycée général · {level.short}</p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Histoire-géographie en {level.name}</h1>
        <p className="text-lg text-muted-foreground">{level.description}</p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {progs.map((p) => {
          const subject = getSubject(p.subject)!
          const count = allChapters.filter((c) => c.programme === p).length
          return (
            <Link
              key={p.subject}
              href={`/${niveau}/${p.subject}`}
              className="group flex flex-col gap-3 rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <Badge variant={subject.slug} className="self-start">
                {subject.name}
              </Badge>
              <h2 className="font-serif text-xl font-semibold leading-snug group-hover:text-primary">{p.title}</h2>
              <p className="text-sm text-muted-foreground">{p.themes.length} thèmes · {count} chapitres</p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                Voir le programme <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )
        })}
      </div>

      {featured.length > 0 && (
        <section className="mt-16" aria-labelledby="fiches-completes">
          <h2 id="fiches-completes" className="font-serif text-2xl font-semibold">
            Fiches complètes en {level.name}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <ChapterCard key={c.path} loc={c} available />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
