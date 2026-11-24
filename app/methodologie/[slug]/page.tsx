import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CircleAlert, CircleCheck, Clock, Lightbulb, Square } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { JsonLd } from "@/components/json-ld"
import { PremiumExercise } from "@/components/methode/premium-exercise"
import { getMethod, methods } from "@/content/methodes"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl, siteConfig } from "@/lib/site"

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return methods.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const method = getMethod(slug)
  if (!method) return {}
  return pageMetadata({ title: `${method.title} : la méthode pas à pas`, description: method.metaDescription, path: `/methodologie/${slug}` })
}

export default async function MethodPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const method = getMethod(slug)
  if (!method) notFound()
  const others = methods.filter((m) => m.slug !== slug)

  return (
    <article className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Méthodologie", href: "/methodologie" },
          { name: method.title, href: `/methodologie/${slug}` },
        ]}
      />
      <header className="mt-6 space-y-4">
        <p className="eyebrow">{method.scope}</p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">{method.title}</h1>
        {method.duration && (
          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" /> {method.duration}
          </p>
        )}
        <p className="prose-hf text-lg">{method.intro}</p>
      </header>

      <section className="mt-12" aria-labelledby="etapes">
        <h2 id="etapes" className="font-serif text-2xl font-semibold">
          Les étapes
        </h2>
        <ol className="mt-6 space-y-6">
          {method.steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary font-serif text-lg font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold">{step.title}</h3>
                <p className="prose-hf mt-1">{step.text}</p>
                {step.tips && (
                  <ul className="mt-3 space-y-1 rounded-lg bg-muted p-3 text-sm">
                    {step.tips.map((t) => (
                      <li key={t} className="flex gap-2">
                        <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent-foreground dark:text-accent" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <section className="rounded-xl border bg-card p-5">
          <h2 className="flex items-center gap-2 font-semibold">
            <CircleAlert className="size-4 text-destructive" /> Erreurs fréquentes
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {method.pitfalls.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border bg-card p-5">
          <h2 className="flex items-center gap-2 font-semibold">
            <CircleCheck className="size-4 text-success" /> Avant de rendre ta copie
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {method.checklist.map((c) => (
              <li key={c} className="flex gap-2">
                <Square className="mt-0.5 size-4 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-12" aria-labelledby="entrainement">
        <h2 id="entrainement" className="font-serif text-2xl font-semibold">
          Entraînement corrigé
        </h2>
        <p className="mt-1 mb-5 text-muted-foreground">Un exemple traité de bout en bout, à comparer avec ton propre travail.</p>
        <PremiumExercise slug={slug} />
      </section>

      <nav aria-label="Autres méthodes" className="mt-14 border-t pt-8">
        <p className="eyebrow mb-3">Autres méthodes</p>
        <ul className="flex flex-wrap gap-2">
          {others.map((m) => (
            <li key={m.slug}>
              <Link href={`/methodologie/${m.slug}`} className="inline-block rounded-full border px-4 py-1.5 text-sm hover:bg-muted">
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: method.title,
          description: method.metaDescription,
          inLanguage: "fr-FR",
          url: absoluteUrl(`/methodologie/${slug}`),
          step: method.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
          publisher: { "@type": "EducationalOrganization", name: siteConfig.name, url: siteConfig.url },
        }}
      />
    </article>
  )
}
