import type { ReactNode } from "react"
import { Breadcrumbs } from "./breadcrumbs"

/** Gabarit des pages éditoriales et légales. */
export function ProsePage({ title, path, intro, children }: { title: string; path: string; intro?: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <Breadcrumbs items={[{ name: title, href: path }]} />
      <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight">{title}</h1>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
      <div className="prose-hf mt-10 space-y-8 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  )
}

/** Marqueur visible des informations que l'éditeur doit compléter avant la mise en ligne. */
export function ToFill({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-accent/40 px-1 text-foreground">[À compléter : {children}]</mark>
}
