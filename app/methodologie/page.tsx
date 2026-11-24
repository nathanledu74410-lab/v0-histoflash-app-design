import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Map, Mic, PenLine, ScrollText } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { methods } from "@/content/methodes"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Méthodologie du bac en histoire-géo et HGGSP",
  description:
    "Méthode de la dissertation, de l'étude critique de document, du croquis de géographie et du grand oral : étapes, conseils et erreurs à éviter pour le bac.",
  path: "/methodologie",
})

const icons: Record<string, typeof PenLine> = {
  dissertation: PenLine,
  "etude-critique-de-document": ScrollText,
  "croquis-geographie": Map,
  "grand-oral": Mic,
}

export default function MethodsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <Breadcrumbs items={[{ name: "Méthodologie", href: "/methodologie" }]} />
      <header className="mt-6 max-w-2xl space-y-4">
        <p className="eyebrow">Méthodologie</p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Les méthodes du bac, étape par étape</h1>
        <p className="text-lg text-muted-foreground">
          Les connaissances ne suffisent pas : il faut savoir les mobiliser. Chaque fiche détaille les attentes, les étapes et les erreurs les plus
          fréquentes.
        </p>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {methods.map((m) => {
          const Icon = icons[m.slug] ?? PenLine
          return (
            <Link key={m.slug} href={`/methodologie/${m.slug}`} className="group flex gap-4 rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h2 className="font-serif text-xl font-semibold group-hover:text-primary">{m.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{m.short}</p>
                <p className="mt-3 text-xs text-muted-foreground">{m.scope}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Lire la méthode <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
