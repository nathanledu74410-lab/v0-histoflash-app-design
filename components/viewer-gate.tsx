"use client"

import { useEffect, useState, type ReactNode } from "react"

type Status = "anonymous" | "free" | "premium"

let cache: Promise<Status> | null = null

function fetchStatus(): Promise<Status> {
  cache ??= fetch("/api/me")
    .then((r) => (r.ok ? r.json() : { status: "anonymous" }))
    .then((d) => d.status as Status)
    .catch(() => "anonymous" as Status)
  return cache
}

export function useViewerStatus() {
  const [status, setStatus] = useState<Status | null>(null)
  useEffect(() => {
    let alive = true
    fetchStatus().then((s) => alive && setStatus(s))
    return () => {
      alive = false
    }
  }, [])
  return status
}

/** Masque son contenu pour les abonnés Premium (encarts promotionnels sur les pages statiques). */
export function HideForPremium({ children }: { children: ReactNode }) {
  const status = useViewerStatus()
  if (status === "premium") return null
  return <>{children}</>
}
