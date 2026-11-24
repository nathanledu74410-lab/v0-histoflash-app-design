import Link from "next/link"
import { ArrowUpRight, CircleCheck } from "lucide-react"
import type { ChapterLocation } from "@/lib/curriculum"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"

export const subjectAccent: Record<string, string> = {
  histoire: "before:bg-histoire",
  geographie: "before:bg-geographie",
  hggsp: "before:bg-hggsp",
}

export function ChapterCard({
  loc,
  available,
  showLevel = false,
}: {
  loc: ChapterLocation
  available: boolean
  showLevel?: boolean
}) {
  return (
    <Link
      href={loc.path}
      className={cn(
        "group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border bg-card p-5 pl-6 transition-all hover:-translate-y-0.5 hover:shadow-md",
        "before:absolute before:inset-y-0 before:left-0 before:w-1",
        subjectAccent[loc.subject.slug],
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={loc.subject.slug}>{loc.subject.name}</Badge>
        {showLevel && <Badge variant="outline">{loc.level.name}</Badge>}
        <span className="text-xs text-muted-foreground">{loc.chapter.label}</span>
      </div>
      <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">{loc.chapter.title}</h3>
      <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
        {available ? (
          <span className="inline-flex items-center gap-1 font-medium text-success">
            <CircleCheck className="size-3.5" />
            Fiche complète · flashcards · quiz
          </span>
        ) : (
          <span>Fiche en préparation</span>
        )}
        <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  )
}
