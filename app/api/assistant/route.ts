import { google } from "@ai-sdk/google"
import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { NextResponse } from "next/server"
import { allChapterContents } from "@/content"
import { dailyLimit, incrementAiUsage } from "@/lib/ai-quota"
import { serverConfig } from "@/lib/config"
import { findChapterBySlug } from "@/lib/curriculum"
import { getViewer } from "@/lib/entitlements"

export const maxDuration = 30

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash-lite"
const MAX_HISTORY = 12
const MAX_CHARS = 2000

function buildInstructions() {
  const fiches = allChapterContents()
    .map((c) => {
      const loc = findChapterBySlug(c.slug)
      return loc ? `- ${loc.level.name} · ${loc.subject.name} — ${loc.chapter.title} : ${loc.path}` : null
    })
    .filter(Boolean)
    .join("\n")

  return `Tu es l'assistant de révision de Histoflash, un site pour les lycéens français qui préparent le bac en histoire, géographie et HGGSP.

RÔLE
- Tu aides à comprendre le cours, à réviser, à construire une problématique, un plan de dissertation ou une analyse de document.
- Tu réponds en français, de façon claire, structurée et adaptée à un élève de lycée. Phrases courtes, vocabulaire précis, notions clés en gras.
- Tu t'appuies sur les programmes officiels du lycée (voie générale). Si une question sort du champ histoire-géographie, géopolitique ou sciences politiques, tu le dis poliment et tu recentres.

RIGUEUR
- Tu donnes uniquement des faits établis par l'historiographie. Si tu n'es pas sûr d'une date ou d'un chiffre, dis-le.
- Tu restes neutre sur les sujets politiques et mémoriels : tu présentes les faits, les débats entre historiens et les différents points de vue.
- N'invente jamais de sujet « tombé au bac » ni de citation.

PÉDAGOGIE
- Ne rédige pas une copie entière à la place de l'élève : propose un plan détaillé, des idées, des exemples, et encourage-le à rédiger.
- Termine si utile par une question pour vérifier la compréhension ou par un conseil de méthode.

FICHES DU SITE
Quand la question correspond à l'une de ces fiches, propose-la avec un lien Markdown relatif, par exemple [Voir la fiche](/terminale/histoire/regimes-totalitaires) :
${fiches}`
}

export async function POST(req: Request) {
  if (!serverConfig.ai) {
    return NextResponse.json({ error: "L'assistant IA n'est pas encore configuré sur ce site." }, { status: 503 })
  }

  const viewer = await getViewer()
  // Sans authentification configurée (développement local), l'assistant reste ouvert.
  if (serverConfig.auth) {
    if (viewer.status === "anonymous") {
      return NextResponse.json({ error: "auth_required" }, { status: 401 })
    }
    if (serverConfig.db) {
      const used = await incrementAiUsage(viewer.userId)
      if (used > dailyLimit(viewer.status === "premium")) {
        return NextResponse.json({ error: "quota_exceeded" }, { status: 429 })
      }
    }
  }

  const { messages } = (await req.json()) as { messages: UIMessage[] }
  // Seuls les messages texte élève/assistant sont transmis au modèle.
  const trimmed = (Array.isArray(messages) ? messages : [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-MAX_HISTORY)
    .map((m) => ({
      ...m,
      parts: m.parts.filter((p) => p.type === "text").map((p) => ({ ...p, text: p.text.slice(0, MAX_CHARS) })),
    }))

  const result = streamText({
    model: google(MODEL),
    instructions: buildInstructions(),
    messages: await convertToModelMessages(trimmed),
    maxOutputTokens: 1500,
    temperature: 0.4,
  })

  return result.toUIMessageStreamResponse()
}
