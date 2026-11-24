import Link from "next/link"
import { Sparkles } from "lucide-react"
import { pricing } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

/** Encart d'incitation à Premium, sobre et informatif. */
export function PremiumCallout({
  title,
  children,
  className,
  compact = false,
}: {
  title: string
  children?: React.ReactNode
  className?: string
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-accent/60 bg-gradient-to-br from-accent/15 via-card to-card p-5",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Sparkles className="size-4" />
        </span>
        <div className="space-y-2">
          <p className="font-semibold">{title}</p>
          {children && <div className="text-sm text-muted-foreground">{children}</div>}
          <div className={cn("flex flex-wrap items-center gap-3", compact ? "pt-1" : "pt-2")}>
            <Button asChild size="sm">
              <Link href="/tarifs">Essayer Premium {pricing.trialDays} jours gratuits</Link>
            </Button>
            <span className="text-xs text-muted-foreground">
              puis {pricing.yearly.monthlyEquivalent}/mois avec l'offre annuelle
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
