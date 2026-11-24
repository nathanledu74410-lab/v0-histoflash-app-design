import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { JsonLd } from "./json-ld"
import { absoluteUrl } from "@/lib/site"

export interface Crumb {
  name: string
  href: string
}

/** Fil d'Ariane visible + balisage BreadcrumbList pour Google. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Accueil", href: "/" }, ...items]
  return (
    <>
      <nav aria-label="Fil d'Ariane" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="line-clamp-1 text-foreground/80">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground hover:underline underline-offset-4">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: absoluteUrl(item.href),
          })),
        }}
      />
    </>
  )
}
