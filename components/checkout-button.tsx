"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoaderCircle } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type Props = {
  plan: "monthly" | "yearly"
  children: React.ReactNode
  variant?: "default" | "outline"
  className?: string
}

/** Lance Stripe Checkout. Redirige vers l'inscription si l'utilisateur n'est pas connecté. */
export function CheckoutButton({ plan, children, variant = "default", className }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function start() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 401) {
        router.push(`/inscription?redirect_url=${encodeURIComponent("/tarifs")}`)
        return
      }
      if (!res.ok || !data.url) throw new Error(data.error ?? "Impossible de démarrer le paiement.")
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.")
      setLoading(false)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Button onClick={start} disabled={loading} variant={variant} size="lg" className="w-full">
        {loading && <LoaderCircle className="animate-spin" />}
        {children}
      </Button>
      {error && (
        <p role="alert" className="text-center text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function PortalButton({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function open() {
    setLoading(true)
    setError(null)
    const res = await fetch("/api/stripe/portal", { method: "POST" })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.url) window.location.href = data.url
    else {
      setError(data.error ?? "Impossible d'ouvrir l'espace de facturation.")
      setLoading(false)
    }
  }
  return (
    <div className="space-y-2">
      <Button variant="outline" onClick={open} disabled={loading}>
        {loading && <LoaderCircle className="animate-spin" />}
        {children}
      </Button>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
