import Link from "next/link"
import { levels, programmes, subjects } from "@/lib/curriculum"
import { Logo } from "./logo"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Fiches, flashcards et quiz pour réviser l'histoire, la géographie et l'HGGSP au lycée, conformes aux
            programmes officiels.
          </p>
        </div>

        {levels.map((level) => (
          <div key={level.slug}>
            <p className="mb-3 text-sm font-semibold">{level.name}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {programmes
                .filter((p) => p.level === level.slug)
                .map((p) => (
                  <li key={p.subject}>
                    <Link href={`/${level.slug}/${p.subject}`} className="hover:text-foreground">
                      {subjects.find((s) => s.slug === p.subject)?.name} {level.short}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-3 text-sm font-semibold">Histoflash</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/methodologie" className="hover:text-foreground">Méthodologie</Link></li>
            <li><Link href="/tarifs" className="hover:text-foreground">Tarifs</Link></li>
            <li><Link href="/boursiers" className="hover:text-foreground">Élèves boursiers</Link></li>
            <li><Link href="/a-propos" className="hover:text-foreground">À propos</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Histoflash. Contenus rédigés d'après les programmes du ministère de l'Éducation nationale.</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            <li><Link href="/mentions-legales" className="hover:text-foreground">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-foreground">Confidentialité</Link></li>
            <li><Link href="/cgv" className="hover:text-foreground">CGV</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
