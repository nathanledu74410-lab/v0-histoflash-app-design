import type { Metadata } from "next"
import { AssistantChat } from "@/components/assistant/chat"
import { dailyLimit, getAiUsageToday } from "@/lib/ai-quota"
import { serverConfig } from "@/lib/config"
import { getViewer } from "@/lib/entitlements"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Assistant IA de révision en histoire-géo et HGGSP",
  description:
    "Un assistant IA cadré sur les programmes du lycée : explications de cours, problématiques, plans de dissertation et vérification de tes connaissances.",
  path: "/assistant",
})

export default async function AssistantPage({ searchParams }: { searchParams: Promise<{ sujet?: string }> }) {
  const { sujet } = await searchParams
  const viewer = await getViewer()

  let quotaLabel: string | undefined
  if (viewer.status === "free" && serverConfig.db) {
    const remaining = Math.max(0, dailyLimit(false) - (await getAiUsageToday(viewer.userId)))
    quotaLabel = `${remaining} question${remaining > 1 ? "s" : ""} gratuite${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""} aujourd'hui`
  } else if (viewer.status === "premium") {
    quotaLabel = "Premium : questions illimitées"
  }

  const initialPrompt = sujet ? `Aide-moi à analyser ce sujet et à construire un plan : « ${sujet.slice(0, 300)} »` : undefined

  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <header className="mb-8 space-y-3">
        <p className="eyebrow">Assistant IA</p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Ton assistant de révision</h1>
        <p className="text-lg text-muted-foreground">
          Il explique, questionne et t'aide à structurer tes idées. Il ne rédige pas tes copies à ta place : c'est en écrivant que l'on progresse.
        </p>
      </header>
      <AssistantChat initialPrompt={initialPrompt} quotaLabel={quotaLabel} />
    </div>
  )
}
