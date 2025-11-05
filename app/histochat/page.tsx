"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Send, Sparkles, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import ReactMarkdown from "react-markdown"

export default function HistoChat() {
  const [input, setInput] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/histochat" }),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "in_progress") return

    setErrorMessage(null)

    try {
      const response = await fetch("/api/histochat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", parts: [{ type: "text", text: input }] }],
        }),
      })

      const contentType = response.headers.get("content-type")
      if (contentType?.includes("application/json")) {
        const data = await response.json()
        if (data.error) {
          setErrorMessage(data.message)
          setInput("")
          return
        }
      }

      sendMessage({ text: input })
      setInput("")
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.")
    }
  }

  const suggestedQuestions = [
    "Parle-moi de Napoléon Bonaparte",
    "Qu'est-ce que la Renaissance ?",
    "Qui était Marie Curie ?",
    "Raconte-moi l'Empire Romain",
    "Qu'est-ce que la Révolution Française ?",
  ]

  return (
    <div className="min-h-screen bg-[#FAF0DC]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#E5D5B7] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#8B7355]" />
              <h1 className="text-xl font-bold text-[#2C2416]">Histoflash</h1>
            </div>
            <Link href="/">
              <Button variant="ghost" className="text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B7355] to-[#6B5845] flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-[#2C2416]">HistoChat</h2>
            <p className="text-lg text-[#5C4A3A] max-w-2xl mx-auto">
              Posez vos questions sur l'histoire et découvrez des réponses détaillées grâce à l'intelligence
              artificielle
            </p>
          </div>

          {/* Chat Container */}
          <Card className="bg-white border-[#E5D5B7] overflow-hidden">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6">
                  <div className="text-center space-y-3">
                    <p className="text-[#5C4A3A] text-lg font-medium">Commencez une conversation sur l'histoire</p>
                    <p className="text-[#8B7355] text-sm">Essayez l'une de ces questions :</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center max-w-xl">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInput(question)
                        }}
                        className="px-4 py-2 bg-[#FAF0DC] hover:bg-[#E5D5B7] text-[#2C2416] rounded-full text-sm transition-colors border border-[#E5D5B7]"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-[#8B7355] text-white"
                          : "bg-[#FAF0DC] text-[#2C2416] border border-[#E5D5B7]"
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <div key={index} className="prose prose-sm max-w-none">
                              <ReactMarkdown
                                components={{
                                  a: ({ node, ...props }) => (
                                    <Link
                                      href={props.href || "#"}
                                      className={`${
                                        message.role === "user"
                                          ? "text-white underline hover:text-white/80"
                                          : "text-[#8B7355] underline hover:text-[#6B5845]"
                                      } font-semibold`}
                                    >
                                      {props.children}
                                    </Link>
                                  ),
                                  p: ({ node, ...props }) => (
                                    <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
                                  ),
                                }}
                              >
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                ))
              )}
              {status === "in_progress" && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-[#FAF0DC] border border-[#E5D5B7]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-sm text-[#8B7355]">L'IA réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-red-50 border border-red-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800 leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="border-t border-[#E5D5B7] p-4 bg-white">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question sur l'histoire..."
                  className="flex-1 px-4 py-3 rounded-lg border border-[#E5D5B7] focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent bg-white text-[#2C2416] placeholder:text-[#8B7355]/50"
                  disabled={status === "in_progress"}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || status === "in_progress"}
                  className="bg-[#8B7355] hover:bg-[#6B5845] text-white px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-[#8B7355] mt-2 text-center">
                HistoChat répond uniquement aux questions sur l'histoire. L'IA peut faire des erreurs.
              </p>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">Découvrez nos fiches détaillées</p>
                <p className="text-xs text-blue-700">
                  Quand vous posez une question sur un sujet que nous couvrons, l'IA vous orientera vers nos fiches
                  complètes avec des quiz interactifs !
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
