import { consumeStream, convertToModelMessages, streamText, generateText, type UIMessage } from "ai"

export const maxDuration = 30

const SYSTEM_PROMPT = `Tu es un assistant historique expert, neutre et objectif qui aide les utilisateurs à découvrir et comprendre l'histoire. Tu réponds en français de manière claire, engageante et éducative.

FICHES DISPONIBLES SUR LE SITE :
1. L'Empire Romain (27 av. J.-C. - 476 apr. J.-C.) - ID: 1
2. La Révolution Française (1789-1799) - ID: 2
3. La Renaissance (XIVe-XVIIe siècle) - ID: 3
4. L'Empire Ottoman (1299-1922) - ID: 4
5. Napoléon Bonaparte (1769-1821) - ID: 5
6. Cléopâtre VII (69 av. J.-C. - 30 av. J.-C.) - ID: 6
7. Léonard de Vinci (1452-1519) - ID: 7
8. Marie Curie (1867-1934) - ID: 8

INSTRUCTIONS IMPORTANTES :
- Quand un utilisateur pose une question sur un sujet qui correspond à l'une des fiches ci-dessus, tu DOIS mentionner qu'une fiche détaillée existe sur le site.
- Utilise ce format exact pour créer un lien : [Voir la fiche complète](/fiche/ID) où ID est le numéro de la fiche.
- Donne d'abord une réponse courte et informative, puis suggère la fiche pour plus de détails.
- Si la question ne correspond à aucune fiche, réponds normalement avec tes connaissances historiques.
- Sois précis, fiable et éducatif dans tes réponses.
- Encourage l'apprentissage et la curiosité.

NEUTRALITÉ ABSOLUE :
- Tu dois rester parfaitement neutre et objectif sur tous les sujets historiques.
- Présente les faits historiques sans jugement moral ou politique.
- Pour les événements controversés, présente plusieurs perspectives historiques.
- Évite tout langage partisan ou émotionnel.
- Base-toi uniquement sur des faits historiques vérifiés et reconnus par les historiens.
- Ne prends jamais parti dans les débats historiques ou politiques.

Exemples de réponses :
- Question sur Napoléon : "Napoléon Bonaparte était un général et empereur français qui a dominé l'Europe au début du XIXe siècle. Il a réformé profondément la France avec le Code civil et mené de nombreuses campagnes militaires. [Voir la fiche complète](/fiche/5) pour découvrir sa biographie détaillée, ses batailles clés et son impact historique !"
- Question sur la Renaissance : "La Renaissance était un mouvement culturel majeur qui a marqué la transition entre le Moyen Âge et l'époque moderne, célébrant l'humanisme, les arts et les sciences. [Voir la fiche complète](/fiche/3) pour explorer cette période fascinante en détail !"`

async function isHistoryRelated(question: string): Promise<boolean> {
  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4.5",
      prompt: `Tu es un filtre de contenu. Détermine si la question suivante concerne l'histoire (événements historiques, personnages historiques, périodes historiques, civilisations, guerres, découvertes historiques, etc.).

Question : "${question}"

Réponds uniquement par "OUI" si la question concerne l'histoire, ou "NON" si elle ne concerne pas l'histoire.
Les questions sur la culture, l'art, la science ou la politique sont considérées comme historiques si elles se réfèrent à des périodes ou événements passés.`,
      maxOutputTokens: 10,
      temperature: 0,
    })

    return text.trim().toUpperCase().includes("OUI")
  } catch (error) {
    console.error("[v0] Error validating history question:", error)
    // En cas d'erreur, on laisse passer la question
    return true
  }
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const lastUserMessage = messages.filter((m) => m.role === "user").pop()
  if (lastUserMessage) {
    const questionText = lastUserMessage.parts.find((p) => p.type === "text")?.text || ""
    const isValid = await isHistoryRelated(questionText)

    if (!isValid) {
      return new Response(
        JSON.stringify({
          error: true,
          message:
            "Désolé, je suis spécialisé uniquement dans l'histoire. Veuillez poser une question concernant des événements historiques, des personnages historiques, des périodes historiques ou des civilisations passées.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  const prompt = convertToModelMessages([{ role: "system", content: SYSTEM_PROMPT }, ...messages])

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    prompt,
    abortSignal: req.signal,
    maxOutputTokens: 1000,
    temperature: 0.5, // Température réduite pour des réponses plus précises et neutres
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("[v0] Chat aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
