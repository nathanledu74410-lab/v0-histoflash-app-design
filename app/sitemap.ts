import type { MetadataRoute } from "next"
import { getChapterContent } from "@/content"
import { methods } from "@/content/methodes"
import { allChapters, levels, programmes } from "@/lib/curriculum"
import { absoluteUrl } from "@/lib/site"

/** Seules les pages indexables figurent ici : les chapitres non rédigés (noindex) en sont exclus. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", lastModified: Date = now) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  })

  return [
    page("/", 1, "weekly"),
    ...levels.map((l) => page(`/${l.slug}`, 0.9, "weekly")),
    ...programmes.map((p) => page(`/${p.level}/${p.subject}`, 0.85, "weekly")),
    ...allChapters.flatMap((c) => {
      const content = getChapterContent(c.chapter.slug)
      return content ? [page(c.path, 0.8, "monthly", new Date(content.updatedAt))] : []
    }),
    page("/methodologie", 0.7),
    ...methods.map((m) => page(`/methodologie/${m.slug}`, 0.7)),
    page("/tarifs", 0.6),
    page("/revisions", 0.5),
    page("/assistant", 0.5),
    page("/boursiers", 0.4, "yearly"),
    page("/a-propos", 0.3, "yearly"),
    page("/mentions-legales", 0.1, "yearly"),
    page("/confidentialite", 0.1, "yearly"),
    page("/cgv", 0.1, "yearly"),
  ]
}
