import type { Metadata } from "next"
import { SignUp } from "@clerk/nextjs"
import { Check } from "lucide-react"
import { AuthUnavailable } from "@/components/auth-unavailable"
import { authEnabled } from "@/lib/config"
import { pricing } from "@/lib/site"

export const metadata: Metadata = {
  title: "Créer un compte",
  alternates: { canonical: "/inscription" },
  robots: { index: false, follow: true },
}

export default function SignUpPage() {
  if (!authEnabled) return <AuthUnavailable title="Créer un compte" />
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <div className="space-y-5">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Ton compte Histoflash, gratuit</h1>
        <ul className="space-y-2 text-muted-foreground">
          {[
            `${pricing.freeAiQuestionsPerDay} questions par jour à l'assistant IA`,
            "Tes résultats de quiz enregistrés",
            `${pricing.trialDays} jours de Premium offerts quand tu veux`,
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-success" /> {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center lg:justify-end">
        <SignUp path="/inscription" signInUrl="/connexion" fallbackRedirectUrl="/tableau-de-bord" />
      </div>
    </div>
  )
}
