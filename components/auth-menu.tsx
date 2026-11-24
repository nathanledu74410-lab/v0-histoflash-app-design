"use client"

import Link from "next/link"
import { Show, UserButton } from "@clerk/nextjs"
import { LayoutDashboard } from "lucide-react"
import { authEnabled } from "@/lib/config"
import { Button } from "./ui/button"

/** Boutons de connexion de l'en-tête. Sans Clerk configuré, renvoie vers les pages d'explication. */
export function AuthMenu() {
  if (!authEnabled) {
    return (
      <Button asChild size="sm">
        <Link href="/inscription">
            <span className="sm:hidden">S'inscrire</span>
            <span className="hidden sm:inline">Créer un compte</span>
          </Link>
      </Button>
    )
  }
  return (
    <>
      <Show when="signed-out">
        <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
          <Link href="/connexion">Connexion</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/inscription">
            <span className="sm:hidden">S'inscrire</span>
            <span className="hidden sm:inline">Créer un compte</span>
          </Link>
        </Button>
      </Show>
      <Show when="signed-in">
        <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
          <Link href="/tableau-de-bord">
            <LayoutDashboard />
            Mon espace
          </Link>
        </Button>
        <UserButton />
      </Show>
    </>
  )
}
