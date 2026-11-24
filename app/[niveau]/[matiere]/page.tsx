import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ChapterCard } from "@/components/chapter-card"
import { JsonLd } from "@/components/json-ld"
import { Badge } from "@/components/ui/badge"
import { hasChapterContent } from "@/content"
import { allChapters, getLevel, getProgramme, getSubject, programmes, themeLabel } from "@/lib/curriculum"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl, siteConfig } from "@/lib/site"

type Params = { niveau: string; matiere: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return programmes.map((p) => ({ niveau: p.level, matiere: p.subject }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { niveau, matiere } = await params
  const level = getLevel(niveau)
  const subject = getSubject(matiere)
  const programme = getProgramme(niveau, matiere)
  if (!level || !subject || !programme) return {}
  return pageMetadata({
    title: `${subject.name} ${level.name} : fiches de révision du programme`,
    description: `Toutes les fiches de ${subject.name} en ${level.name}, thème par thème : ${programme.description} Flashcards et quiz inclus.`.slice(0, 300),
    path: `/${niveau}/${matiere}`,
  })
}

export default async function SubjectPage({ params }: { params: Promise<Params> }) {
  const { niveau, matiere } = await params
  const level = getLevel(niveau)
  const subject = getSubject(matiere)
  const programme = getProgramme(niveau, matiere)
  if (!level || !subject || !programme) notFound()

  const chapters = allChapters.filter((c) => c.programme === programme)
  const ready = chapters.filter((c) => hasChapterContent(c.chapter.slug)).length

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <Breadcrumbs
        items={[
          { name: level.name, href: `/${level.slug}` },
          { name: `${subject.name} ${level.short}`, href: `/${level.slug}/${subject.slug}` },
        ]}
      />
      <header className="mt-6 max-w-3xl space-y-4">
        <Badge variant={subject.slug}>
          {subject.name} · {level.name}
        </Badge>
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{programme.title}</h1>
        <p className="text-lg text-muted-foreground">{programme.description}</p>
        <p className="text-sm text-muted-foreground">
          {chapters.length} chapitres au programme · {ready} fiches complètes avec flashcards et quiz
        </p>
      </header>

      <div className="mt-12 space-y-14">
        {programme.themes.map((theme) => (
          <section key={theme.title} aria-labelledby={`theme-${theme.number}`}>
            <div className="mb-5 flex flex-col gap-1 border-b pb-3">
              <p className="eyebrow">{themeLabel(theme)}</p>
              {theme.number !== "C" && (
                <h2 id={`theme-${theme.number}`} className="font-serif text-2xl font-semibold">
                  {theme.title}
                </h2>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chapters
                .filter((c) => c.theme === theme)
                .map((c) => (
                  <ChapterCard key={c.path} loc={c} available={hasChapterContent(c.chapter.slug)} />
                ))}
            </div>
          </section>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${subject.name} ${level.name} — ${programme.title}`,
          description: programme.description,
          url: absoluteUrl(`/${level.slug}/${subject.slug}`),
          inLanguage: "fr-FR",
          educationalLevel: `${level.name} (lycée général)`,
          isAccessibleForFree: true,
          provider: { "@type": "EducationalOrganization", name: siteConfig.name, url: siteConfig.url },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            courseWorkload: "PT10H",
          },
          offers: { "@type": "Offer", category: "Free", price: 0, priceCurrency: "EUR" },
          hasPart: chapters
            .filter((c) => hasChapterContent(c.chapter.slug))
            .map((c) => ({ "@type": "LearningResource", name: c.chapter.title, url: absoluteUrl(c.path) })),
        }}
      />
    </div>
  )
}
