import type { Metadata } from "next"
import { SignIn } from "@clerk/nextjs"
import { AuthUnavailable } from "@/components/auth-unavailable"
import { authEnabled } from "@/lib/config"

export const metadata: Metadata = {
  title: "Connexion",
  alternates: { canonical: "/connexion" },
  robots: { index: false, follow: true },
}

export default function SignInPage() {
  if (!authEnabled) return <AuthUnavailable title="Connexion" />
  return (
    <div className="flex justify-center px-4 py-16">
      <SignIn path="/connexion" signUpUrl="/inscription" fallbackRedirectUrl="/tableau-de-bord" />
    </div>
  )
}
