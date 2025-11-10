"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Trophy, Clock, ChevronRight, Check, Globe } from "lucide-react"
import Link from "next/link"

type Theme = "empires" | "wars" | "societies"
type HGGSPTheme = "geopolitique" | "puissances" | "tensions" | "environnement"

interface Flashcard {
  id: number
  title: string
  period: string
  summary: string
  theme: Theme
  image: string
}

interface HGGSPFlashcard {
  id: number
  title: string
  subtitle: string
  summary: string
  theme: HGGSPTheme
  image: string
  programLink: string
}

const flashcards: Flashcard[] = [
  {
    id: 1,
    title: "L'Empire Romain",
    period: "27 av. J.-C. - 476 apr. J.-C.",
    summary:
      "L'un des plus grands empires de l'histoire, s'étendant sur trois continents et influençant profondément la civilisation occidentale.",
    theme: "empires",
    image: "/roman-empire-colosseum.jpg",
  },
  {
    id: 2,
    title: "La Révolution Française",
    period: "1789 - 1799",
    summary:
      "Période de bouleversements sociaux et politiques qui a transformé la France et inspiré des mouvements démocratiques dans le monde entier.",
    theme: "wars",
    image: "/storming-of-the-bastille.png",
  },
  {
    id: 3,
    title: "La Renaissance",
    period: "XIVe - XVIIe siècle",
    summary:
      "Mouvement culturel et artistique qui a marqué la transition entre le Moyen Âge et l'époque moderne, célébrant l'humanisme et les arts.",
    theme: "societies",
    image: "/renaissance-art-florence.jpg",
  },
  {
    id: 4,
    title: "L'Empire Ottoman",
    period: "1299 - 1922",
    summary:
      "Empire puissant qui a dominé l'Europe du Sud-Est, l'Asie occidentale et l'Afrique du Nord pendant plus de six siècles.",
    theme: "empires",
    image: "/ottoman-empire-istanbul.jpg",
  },
  {
    id: 5,
    title: "Napoléon Bonaparte",
    period: "1769 - 1821",
    summary:
      "Général et empereur français qui a dominé l'Europe au début du XIXe siècle, réformant profondément la France et son système juridique.",
    theme: "wars",
    image: "/napoleon-bonaparte.jpg",
  },
  {
    id: 6,
    title: "Cléopâtre VII",
    period: "69 av. J.-C. - 30 av. J.-C.",
    summary:
      "Dernière pharaonne d'Égypte, connue pour son intelligence politique et ses alliances avec Jules César et Marc Antoine.",
    theme: "empires",
    image: "/cleopatra-vii.jpg",
  },
  {
    id: 7,
    title: "Léonard de Vinci",
    period: "1452 - 1519",
    summary:
      "Génie de la Renaissance italienne, artiste, inventeur et scientifique dont les œuvres et inventions continuent d'inspirer le monde.",
    theme: "societies",
    image: "/leonardo-da-vinci.jpg",
  },
  {
    id: 8,
    title: "Marie Curie",
    period: "1867 - 1934",
    summary:
      "Physicienne et chimiste pionnière, première femme à recevoir un prix Nobel et seule personne à en recevoir deux dans des disciplines scientifiques différentes.",
    theme: "societies",
    image: "/marie-curie.jpg",
  },
]

const hggspFlashcards: HGGSPFlashcard[] = [
  {
    id: 101,
    title: "La Guerre Froide",
    subtitle: "1947-1991 : L'affrontement bipolaire",
    summary:
      "Conflit idéologique et géopolitique entre les États-Unis et l'URSS qui a structuré les relations internationales pendant près de 50 ans, divisant le monde en deux blocs opposés.",
    theme: "tensions",
    image: "/cold-war-berlin-wall.jpg",
    programLink: "Thème 2 - Faire la guerre, faire la paix",
  },
  {
    id: 102,
    title: "L'Union Européenne",
    subtitle: "Construction et enjeux géopolitiques",
    summary:
      "Projet d'intégration économique et politique unique au monde, l'UE représente une puissance régionale majeure face aux défis de la mondialisation et des tensions géopolitiques.",
    theme: "puissances",
    image: "/european-union-flags.jpg",
    programLink: "Thème 3 - Histoire et mémoires",
  },
  {
    id: 103,
    title: "Le Proche et Moyen-Orient",
    subtitle: "Un foyer de conflits depuis 1945",
    summary:
      "Région stratégique marquée par des tensions religieuses, ethniques et territoriales, des enjeux pétroliers et l'intervention des grandes puissances dans un contexte géopolitique complexe.",
    theme: "tensions",
    image: "/middle-east-map.jpg",
    programLink: "Thème 2 - Faire la guerre, faire la paix",
  },
  {
    id: 104,
    title: "La Chine : Puissance mondiale",
    subtitle: "Ascension et ambitions géopolitiques",
    summary:
      "Deuxième économie mondiale et puissance émergente, la Chine développe son influence à travers les nouvelles routes de la soie et s'affirme comme rival des États-Unis dans l'ordre mondial.",
    theme: "puissances",
    image: "/china-great-wall.jpg",
    programLink: "Thème 1 - De nouveaux espaces de conquête",
  },
  {
    id: 105,
    title: "Les États-Unis : Hyperpuissance",
    subtitle: "Domination et contestation depuis 1945",
    summary:
      "Première puissance mondiale depuis 1945, les États-Unis exercent une influence militaire, économique et culturelle globale, tout en faisant face à de nouveaux défis géopolitiques.",
    theme: "puissances",
    image: "/usa-capitol-washington.jpg",
    programLink: "Thème 1 - De nouveaux espaces de conquête",
  },
  {
    id: 106,
    title: "Le Changement Climatique",
    subtitle: "Enjeu géopolitique du XXIe siècle",
    summary:
      "Défi environnemental majeur qui redessine les relations internationales, avec des impacts sur les migrations, les ressources et les conflits, nécessitant une coopération mondiale.",
    theme: "environnement",
    image: "/climate-change-earth.jpg",
    programLink: "Thème 1 - L'environnement, entre exploitation et protection",
  },
]

function getThemeColor(theme: Theme) {
  switch (theme) {
    case "empires":
      return "bg-blue-500"
    case "wars":
      return "bg-red-500"
    case "societies":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

function getThemeLabel(theme: Theme) {
  switch (theme) {
    case "empires":
      return "Empires"
    case "wars":
      return "Guerres"
    case "societies":
      return "Sociétés"
    default:
      return ""
  }
}

function getHGGSPThemeColor(theme: HGGSPTheme) {
  switch (theme) {
    case "geopolitique":
      return "bg-indigo-500"
    case "puissances":
      return "bg-purple-500"
    case "tensions":
      return "bg-orange-500"
    case "environnement":
      return "bg-teal-500"
    default:
      return "bg-gray-500"
  }
}

function getHGGSPThemeLabel(theme: HGGSPTheme) {
  switch (theme) {
    case "geopolitique":
      return "Géopolitique"
    case "puissances":
      return "Puissances"
    case "tensions":
      return "Tensions"
    case "environnement":
      return "Environnement"
    default:
      return ""
  }
}

export default function HistoflashApp() {
  const searchParams = useSearchParams()
  const [activeView, setActiveView] = useState<"home" | "fiches" | "quiz" | "hggsp">("home")
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [flippedHGGSPCards, setFlippedHGGSPCards] = useState<Set<number>>(new Set())
  const [randomCard, setRandomCard] = useState<((Flashcard | HGGSPFlashcard) & { type: "history" | "hggsp" }) | null>(
    null,
  )

  useEffect(() => {
    const view = searchParams.get("view")
    if (view === "fiches" || view === "quiz" || view === "hggsp") {
      setActiveView(view)
    }
  }, [searchParams])

  useEffect(() => {
    const allCards = [
      ...flashcards.map((card) => ({ ...card, type: "history" as const })),
      ...hggspFlashcards.map((card) => ({ ...card, type: "hggsp" as const })),
    ]
    const randomIndex = Math.floor(Math.random() * allCards.length)
    setRandomCard(allCards[randomIndex])
  }, [])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuizQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuizQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  const toggleCardFlip = (cardId: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const toggleHGGSPCardFlip = (cardId: number) => {
    setFlippedHGGSPCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const quizQuestions: any[] = [
    {
      id: 1,
      question: "En quelle année a commencé la Révolution Française ?",
      options: ["1789", "1776", "1799", "1804"],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Quelle ville était le centre de l'Empire Romain ?",
      options: ["Athènes", "Rome", "Constantinople", "Alexandrie"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Quel mouvement culturel a marqué la transition entre le Moyen Âge et l'époque moderne ?",
      options: ["Les Lumières", "Le Romantisme", "La Renaissance", "Le Baroque"],
      correctAnswer: 2,
    },
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
            <div className="flex gap-4">
              <Button
                variant={activeView === "home" ? "default" : "ghost"}
                onClick={() => setActiveView("home")}
                className="text-sm"
              >
                Accueil
              </Button>
              <Button
                variant={activeView === "fiches" ? "default" : "ghost"}
                onClick={() => setActiveView("fiches")}
                className="text-sm"
              >
                Fiches
              </Button>
              <Button
                variant={activeView === "hggsp" ? "default" : "ghost"}
                onClick={() => setActiveView("hggsp")}
                className="text-sm"
              >
                HGGSP
              </Button>
              <Button
                variant={activeView === "quiz" ? "default" : "ghost"}
                onClick={() => {
                  setActiveView("quiz")
                  resetQuiz()
                }}
                className="text-sm"
              >
                Quiz
              </Button>
              <Link href="/histochat">
                <Button variant="ghost" className="text-sm">
                  HistoChat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeView === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <h2 className="text-5xl md:text-6xl font-bold text-[#2C2416] text-balance">
                Apprenez l'histoire avec élégance
              </h2>
              <p className="text-xl text-[#5C4A3A] max-w-2xl mx-auto text-pretty">
                Découvrez les grands moments de l'histoire à travers des fiches interactives et des quiz captivants.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={() => setActiveView("fiches")}
                  className="bg-[#8B7355] hover:bg-[#6B5845] text-white"
                >
                  Commencer à apprendre
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveView("quiz")}
                  className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355]/10"
                >
                  Tester mes connaissances
                </Button>
              </div>
            </div>

            {/* Le saviez-vous ? */}
            {randomCard && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-bold text-[#2C2416]">Le saviez-vous ?</h3>
                  <p className="text-[#5C4A3A]">Une découverte historique pour enrichir votre culture</p>
                </div>

                <Link
                  href={randomCard.type === "history" ? `/fiche/${randomCard.id}` : `/hggsp/${randomCard.id}`}
                  className="block max-w-4xl mx-auto"
                >
                  <Card className="overflow-hidden bg-white border-[#E5D5B7] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                    <div className="md:flex">
                      <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                        <img
                          src={randomCard.image || "/placeholder.svg"}
                          alt={randomCard.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {randomCard.type === "history" ? (
                          <div
                            className={`absolute top-4 right-4 ${getThemeColor((randomCard as Flashcard).theme)} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
                          >
                            {getThemeLabel((randomCard as Flashcard).theme)}
                          </div>
                        ) : (
                          <div
                            className={`absolute top-4 right-4 ${getHGGSPThemeColor((randomCard as HGGSPFlashcard).theme)} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
                          >
                            {getHGGSPThemeLabel((randomCard as HGGSPFlashcard).theme)}
                          </div>
                        )}
                      </div>
                      <div className="md:w-3/5 p-8 space-y-4">
                        {randomCard.type === "history" ? (
                          <>
                            <div className="flex items-center gap-2 text-sm text-[#8B7355]">
                              <Clock className="w-4 h-4" />
                              <span>{(randomCard as Flashcard).period}</span>
                            </div>
                            <h4 className="text-3xl font-bold text-[#2C2416] group-hover:text-[#8B7355] transition-colors">
                              {randomCard.title}
                            </h4>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                              <Globe className="w-4 h-4" />
                              <span>{(randomCard as HGGSPFlashcard).programLink}</span>
                            </div>
                            <h4 className="text-3xl font-bold text-[#2C2416] group-hover:text-purple-600 transition-colors">
                              {randomCard.title}
                            </h4>
                            <p className="text-sm text-[#8B7355] font-semibold">
                              {(randomCard as HGGSPFlashcard).subtitle}
                            </p>
                          </>
                        )}
                        <div className="h-px bg-[#E5D5B7]" />
                        <p className="text-[#5C4A3A] leading-relaxed line-clamp-3">{randomCard.summary}</p>
                        <div className="flex items-center gap-2 text-[#8B7355] group-hover:text-[#6B5845] font-medium pt-2">
                          <span>Découvrir cette fiche</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            )}

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <Card className="p-6 bg-white border-[#E5D5B7] hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C2416] mb-2">Fiches Interactives</h3>
                <p className="text-[#5C4A3A]">
                  Explorez l'histoire à travers des fiches visuelles et engageantes, organisées par thème.
                </p>
              </Card>

              <Card className="p-6 bg-white border-[#E5D5B7] hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C2416] mb-2">HGGSP</h3>
                <p className="text-[#5C4A3A]">
                  Fiches géopolitiques conformes au programme scolaire français pour préparer vos examens.
                </p>
              </Card>

              <Card className="p-6 bg-white border-[#E5D5B7] hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C2416] mb-2">Quiz Captivants</h3>
                <p className="text-[#5C4A3A]">
                  Testez vos connaissances avec des quiz interactifs et suivez votre progression.
                </p>
              </Card>
            </div>
          </div>
        )}

        {activeView === "fiches" && (
          <div className="space-y-8" id="fiches">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-[#2C2416]">Fiches Historiques</h2>
              <p className="text-lg text-[#5C4A3A]">Explorez les grands moments de l'histoire</p>
              <p className="text-sm text-[#8B7355] italic">Cliquez sur une fiche pour la retourner</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {flashcards.map((card) => {
                const isFlipped = flippedCards.has(card.id)

                return (
                  <div key={card.id} className="perspective-1000">
                    <div
                      className={`relative transition-transform duration-500 transform-style-3d ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <Card
                        className={`overflow-hidden bg-white border-[#E5D5B7] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                          isFlipped ? "invisible" : "visible"
                        }`}
                        style={{
                          backfaceVisibility: "hidden",
                        }}
                        onClick={() => toggleCardFlip(card.id)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={card.image || "/placeholder.svg"}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`absolute top-4 right-4 ${getThemeColor(card.theme)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                          >
                            {getThemeLabel(card.theme)}
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-2 text-sm text-[#8B7355]">
                            <Clock className="w-4 h-4" />
                            <span>{card.period}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-[#2C2416]">{card.title}</h3>
                          <p className="text-sm text-[#8B7355] italic">Cliquez pour voir les détails</p>
                        </div>
                      </Card>

                      <Card
                        className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-white to-[#FAF0DC] border-[#E5D5B7] hover:shadow-xl transition-all duration-300 ${
                          isFlipped ? "visible" : "invisible"
                        }`}
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="p-6 h-full flex flex-col justify-between space-y-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div
                                className={`${getThemeColor(card.theme)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                              >
                                {getThemeLabel(card.theme)}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-[#8B7355]">
                                <Clock className="w-4 h-4" />
                                <span>{card.period}</span>
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#2C2416]">{card.title}</h3>
                            <div className="h-px bg-[#E5D5B7]" />
                            <p className="text-[#5C4A3A] leading-relaxed">{card.summary}</p>
                          </div>
                          <div className="space-y-2">
                            <Link href={`/fiche/${card.id}`} onClick={(e) => e.stopPropagation()}>
                              <Button className="w-full bg-[#8B7355] hover:bg-[#6B5845] text-white">
                                En voir plus
                                <ChevronRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                            <button
                              onClick={() => toggleCardFlip(card.id)}
                              className="w-full text-sm text-[#8B7355] hover:text-[#6B5845] italic"
                            >
                              Cliquez pour retourner
                            </button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeView === "hggsp" && (
          <div className="space-y-8" id="hggsp">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="w-10 h-10 text-purple-600" />
                <h2 className="text-4xl font-bold text-[#2C2416]">Fiches HGGSP</h2>
              </div>
              <p className="text-lg text-[#5C4A3A]">Histoire-Géographie, Géopolitique et Sciences Politiques</p>
              <p className="text-sm text-purple-600 font-medium">Programme officiel français • Terminale</p>
              <p className="text-sm text-[#8B7355] italic">Cliquez sur une fiche pour la retourner</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {hggspFlashcards.map((card) => {
                const isFlipped = flippedHGGSPCards.has(card.id)

                return (
                  <div key={card.id} className="perspective-1000">
                    <div
                      className={`relative transition-transform duration-500 transform-style-3d ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <Card
                        className={`overflow-hidden bg-white border-[#E5D5B7] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                          isFlipped ? "invisible" : "visible"
                        }`}
                        style={{
                          backfaceVisibility: "hidden",
                        }}
                        onClick={() => toggleHGGSPCardFlip(card.id)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={card.image || "/placeholder.svg"}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`absolute top-4 right-4 ${getHGGSPThemeColor(card.theme)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                          >
                            {getHGGSPThemeLabel(card.theme)}
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                            <Globe className="w-4 h-4" />
                            <span>{card.programLink}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-[#2C2416]">{card.title}</h3>
                          <p className="text-sm text-[#8B7355] font-medium">{card.subtitle}</p>
                          <p className="text-sm text-[#8B7355] italic">Cliquez pour voir les détails</p>
                        </div>
                      </Card>

                      <Card
                        className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-white to-[#FAF0DC] border-[#E5D5B7] hover:shadow-xl transition-all duration-300 ${
                          isFlipped ? "visible" : "invisible"
                        }`}
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="p-6 h-full flex flex-col justify-between space-y-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div
                                className={`${getHGGSPThemeColor(card.theme)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                              >
                                {getHGGSPThemeLabel(card.theme)}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                                <Globe className="w-4 h-4" />
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#2C2416]">{card.title}</h3>
                            <p className="text-sm text-[#8B7355] font-semibold">{card.subtitle}</p>
                            <div className="h-px bg-[#E5D5B7]" />
                            <p className="text-[#5C4A3A] leading-relaxed">{card.summary}</p>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                              <p className="text-xs text-purple-700 font-medium">📚 {card.programLink}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Link href={`/hggsp/${card.id}`} onClick={(e) => e.stopPropagation()}>
                              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                En voir plus
                                <ChevronRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                            <button
                              onClick={() => toggleHGGSPCardFlip(card.id)}
                              className="w-full text-sm text-[#8B7355] hover:text-[#6B5845] italic"
                            >
                              Cliquez pour retourner
                            </button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeView === "quiz" && (
          <div className="max-w-3xl mx-auto">
            {!showResult ? (
              <Card className="p-8 bg-white border-[#E5D5B7]">
                <div className="space-y-8">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-[#5C4A3A]">
                      <span>
                        Question {currentQuizQuestion + 1} sur {quizQuestions.length}
                      </span>
                      <span>
                        Score: {score}/{quizQuestions.length}
                      </span>
                    </div>
                    <div className="w-full bg-[#E5D5B7] rounded-full h-2">
                      <div
                        className="bg-[#8B7355] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#2C2416] text-balance">
                      {quizQuestions[currentQuizQuestion].question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                            selectedAnswer === index
                              ? "border-[#8B7355] bg-[#8B7355]/10"
                              : "border-[#E5D5B7] hover:border-[#8B7355]/50 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === index ? "border-[#8B7355] bg-[#8B7355]" : "border-[#E5D5B7]"
                              }`}
                            >
                              {selectedAnswer === index && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-[#2C2416] font-medium">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="w-full bg-[#8B7355] hover:bg-[#6B5845] text-white"
                      size="lg"
                    >
                      {currentQuizQuestion < quizQuestions.length - 1 ? "Question suivante" : "Voir les résultats"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 bg-white border-[#E5D5B7] text-center">
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Trophy className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#2C2416]">Quiz terminé !</h3>
                  <p className="text-5xl font-bold text-[#8B7355]">
                    {score}/{quizQuestions.length}
                  </p>
                  <p className="text-lg text-[#5C4A3A]">
                    {score === quizQuestions.length
                      ? "Parfait ! Vous maîtrisez le sujet !"
                      : score >= quizQuestions.length / 2
                        ? "Bon travail ! Continuez à apprendre."
                        : "Continuez à vous entraîner pour progresser."}
                  </p>
                  <div className="flex gap-4 justify-center pt-4">
                    <Button onClick={resetQuiz} className="bg-[#8B7355] hover:bg-[#6B5845] text-white" size="lg">
                      Recommencer le quiz
                    </Button>
                    <Button
                      onClick={() => setActiveView("fiches")}
                      variant="outline"
                      className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355]/10"
                      size="lg"
                    >
                      Voir les fiches
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-[#E5D5B7] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-[#5C4A3A]">
            <p className="text-sm">© 2025 Histoflash. Apprendre l'histoire avec élégance et simplicité.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
