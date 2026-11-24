import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-24 text-center sm:px-6">
      <p className="font-serif text-7xl font-semibold text-primary/80">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold">Cette page n'existe pas (ou plus)</h1>
      <p className="mt-3 text-muted-foreground">Les fiches ont peut-être changé d'adresse avec la nouvelle organisation par programme.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/terminale">Fiches de Terminale</Link>
        </Button>
      </div>
    </div>
  )
}
