import { allChapters, findChapter } from "@/lib/curriculum"
import { ogSize, renderOg } from "@/lib/og"

export const alt = "Fiche de révision Histoflash"
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
  return allChapters.map((c) => ({ niveau: c.level.slug, matiere: c.subject.slug, chapitre: c.chapter.slug }))
}

export default async function Image({ params }: { params: Promise<{ niveau: string; matiere: string; chapitre: string }> }) {
  const { niveau, matiere, chapitre } = await params
  const loc = findChapter(niveau, matiere, chapitre)
  if (!loc) return renderOg({ eyebrow: "Histoflash", title: "Fiche de révision" })
  return renderOg({
    eyebrow: `${loc.subject.name} · ${loc.level.name} · ${loc.chapter.label}`,
    title: loc.chapter.title,
    subject: loc.subject.slug,
  })
}
