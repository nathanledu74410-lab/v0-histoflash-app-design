"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import ReactMarkdown from "react-markdown"
import { ArrowUp, Bot, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const suggestions = [
  "Explique-moi la différence entre histoire et mémoire",
  "Propose une problématique sur la guerre froide",
  "Quels sont les points communs des régimes totalitaires ?",
  "Comment réussir l'accroche d'une dissertation ?",
]

function errorMessage(error: Error) {
  const msg = error.message
  if (msg.includes("auth_required")) return { text: "Crée un compte gratuit pour discuter avec l'assistant.", cta: { href: "/inscription", label: "Créer un compte" } }
  if (msg.includes("quota_exceeded"))
    return { text: "Tu as utilisé tes questions gratuites du jour. Reviens demain, ou passe à Premium pour un accès illimité.", cta: { href: "/tarifs", label: "Voir Premium" } }
  if (msg.includes("pas encore configuré")) return { text: "L'assistant IA n'est pas encore activé sur ce site." }
  return { text: "Une erreur est survenue. Réessaie dans un instant." }
}

export function AssistantChat({ initialPrompt, quotaLabel }: { initialPrompt?: string; quotaLabel?: string }) {
  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/assistant" }),
  })
  const [input, setInput] = useState(initialPrompt ?? "")
  const endRef = useRef<HTMLDivElement>(null)
  const busy = status === "submitted" || status === "streaming"

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages])

  function submit(text: string) {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput("")
  }

  const err = error ? errorMessage(error) : null

  return (
    <div className="flex min-h-[60vh] flex-col rounded-2xl border bg-card">
      <div className="flex-1 space-y-6 p-4 sm:p-6" aria-live="polite">
        {messages.length === 0 && (
          <div className="py-6 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
              <Bot className="size-6" />
            </span>
            <p className="mt-4 font-serif text-xl font-semibold">Pose ta question de cours ou de méthode</p>
            <p className="mt-1 text-sm text-muted-foreground">L'assistant connaît le programme et renvoie vers les fiches du site.</p>
            <div className="mx-auto mt-6 grid max-w-xl gap-2 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="rounded-lg border px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed",
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              {m.parts.map((part, i) =>
                part.type === "text" ? (
                  m.role === "user" ? (
                    <p key={i} className="whitespace-pre-wrap">
                      {part.text}
                    </p>
                  ) : (
                    <div key={i} className="space-y-3 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc [&_h3]:font-semibold">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) =>
                            href?.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer nofollow">{children}</a>,
                        }}
                      >
                        {part.text}
                      </ReactMarkdown>
                    </div>
                  )
                ) : null,
              )}
            </div>
          </div>
        ))}
        {status === "submitted" && <p className="text-sm text-muted-foreground">L'assistant réfléchit…</p>}
        {err && (
          <div role="alert" className="rounded-lg border border-accent/60 bg-accent/10 p-4 text-sm">
            <p>{err.text}</p>
            {err.cta && (
              <Button asChild size="sm" className="mt-3">
                <Link href={err.cta.href}>{err.cta.label}</Link>
              </Button>
            )}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(input)
        }}
        className="sticky bottom-0 border-t bg-card/95 p-3 backdrop-blur sm:p-4"
      >
        <div className="flex items-end gap-2">
          <label htmlFor="question" className="sr-only">
            Ta question
          </label>
          <textarea
            id="question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                submit(input)
              }
            }}
            rows={2}
            maxLength={2000}
            placeholder="Ex. : Quelles sont les causes de la guerre froide ?"
            className="min-h-12 flex-1 resize-none rounded-xl border bg-background px-3 py-2.5 text-[0.95rem] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          />
          {busy ? (
            <Button type="button" size="icon-lg" variant="outline" onClick={() => stop()} aria-label="Arrêter">
              <Square />
            </Button>
          ) : (
            <Button type="submit" size="icon-lg" disabled={!input.trim()} aria-label="Envoyer">
              <ArrowUp />
            </Button>
          )}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {quotaLabel ? `${quotaLabel} · ` : ""}L'IA peut se tromper : vérifie les informations importantes dans ton cours.
        </p>
      </form>
    </div>
  )
}
