import Link from "next/link"
import { Button } from "./ui/button"

/** Affiché sur /connexion et /inscription tant que Clerk n'est pas configuré. */
export function AuthUnavailable({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-md px-4 pt-20 text-center sm:px-6">
      <h1 className="font-serif text-3xl font-semibold">{title}</h1>
      <p className="mt-3 text-muted-foreground">
        Les comptes ouvrent très bientôt. En attendant, toutes les fiches, les flashcards et les quiz express sont accessibles sans inscription.
      </p>
      <Button asChild className="mt-6">
        <Link href="/terminale">Commencer à réviser</Link>
      </Button>
    </div>
  )
}
