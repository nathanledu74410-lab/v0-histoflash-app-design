import Link from "next/link"
import { Menu } from "lucide-react"
import { AuthMenu } from "./auth-menu"
import { Logo } from "./logo"
import { ThemeToggle } from "./theme-toggle"

const nav = [
  { href: "/seconde", label: "Seconde" },
  { href: "/premiere", label: "Première" },
  { href: "/terminale", label: "Terminale" },
  { href: "/methodologie", label: "Méthode" },
  { href: "/revisions", label: "Révisions" },
  { href: "/assistant", label: "Assistant IA" },
  { href: "/tarifs", label: "Tarifs" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <Link href="/" aria-label="Histoflash, accueil" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5 lg:ml-0">
          <ThemeToggle />
          <AuthMenu />
          <details className="group relative lg:hidden">
            <summary
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md hover:bg-muted [&::-webkit-details-marker]:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-5" />
            </summary>
            <nav
              aria-label="Navigation mobile"
              className="absolute right-0 top-11 w-60 rounded-xl border bg-popover p-2 shadow-lg"
            >
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t pt-1">
                  <Link href="/tableau-de-bord" className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">
                    Mon espace
                  </Link>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
