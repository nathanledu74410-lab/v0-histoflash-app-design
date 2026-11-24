import type { Metadata } from "next"
import Link from "next/link"
import { Check, HeartHandshake, Minus } from "lucide-react"
import { CheckoutButton } from "@/components/checkout-button"
import { Faq } from "@/components/faq"
import { JsonLd } from "@/components/json-ld"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl, pricing, siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Tarifs : gratuit ou Premium dès 2,50 €/mois",
  description: `Histoflash est gratuit pour réviser toutes les fiches. Premium à ${pricing.monthly.label}/mois ou ${pricing.yearly.label}/an : répétition espacée, quiz corrigés, IA illimitée. ${pricing.trialDays} jours d'essai.`,
  path: "/tarifs",
})

const rows: { label: string; free: boolean | string; premium: boolean | string }[] = [
  { label: "Fiches de cours de tout le programme", free: true, premium: true },
  { label: "Flashcards de chaque chapitre", free: true, premium: true },
  { label: "Fiches méthode (dissertation, étude critique, croquis, grand oral)", free: true, premium: true },
  { label: "Quiz par chapitre", free: `${pricing.freeQuizQuestions} questions`, premium: "Complet" },
  { label: "Corrections détaillées des quiz", free: false, premium: true },
  { label: "Révisions en répétition espacée", free: false, premium: true },
  { label: "Assistant IA", free: `${pricing.freeAiQuestionsPerDay} questions/jour`, premium: "Illimité*" },
  { label: "Sujets corrigés et grilles d'auto-évaluation", free: false, premium: true },
  { label: "Tableau de bord et série de jours", free: false, premium: true },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto size-5 text-success" aria-label="Inclus" />
  if (value === false) return <Minus className="mx-auto size-5 text-muted-foreground/50" aria-label="Non inclus" />
  return <span className="text-sm font-medium">{value}</span>
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Tarifs</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Un prix pensé pour les lycéens</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Les fiches restent gratuites pour tout le monde. Premium débloque les outils qui font gagner du temps et des points.
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
        <div className="flex flex-col rounded-2xl border bg-card p-7">
          <p className="font-serif text-2xl font-semibold">Gratuit</p>
          <p className="mt-4 font-serif text-4xl font-semibold">0 €</p>
          <p className="mt-1 text-sm text-muted-foreground">Sans carte bancaire</p>
          <p className="mt-5 text-sm text-muted-foreground">Toutes les fiches, les flashcards et un quiz express par chapitre.</p>
          <div className="mt-auto pt-6">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/inscription">Créer un compte gratuit</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border bg-card p-7">
          <p className="font-serif text-2xl font-semibold">Premium mensuel</p>
          <p className="mt-4 font-serif text-4xl font-semibold">
            {pricing.monthly.label}
            <span className="text-base font-normal text-muted-foreground"> / mois</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Sans engagement</p>
          <p className="mt-5 text-sm text-muted-foreground">Idéal pour un sprint de révisions avant un contrôle ou le bac.</p>
          <div className="mt-auto pt-6">
            <CheckoutButton plan="monthly" variant="outline">
              Essayer {pricing.trialDays} jours gratuits
            </CheckoutButton>
          </div>
        </div>

        <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-card p-7 shadow-xl shadow-primary/10">
          <Badge variant="premium" className="absolute -top-3 left-7">
            Le plus choisi · −50 %
          </Badge>
          <p className="font-serif text-2xl font-semibold">Premium annuel</p>
          <p className="mt-4 font-serif text-4xl font-semibold">
            {pricing.yearly.label}
            <span className="text-base font-normal text-muted-foreground"> / an</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Soit {pricing.yearly.monthlyEquivalent} par mois, toute l'année scolaire</p>
          <p className="mt-5 text-sm text-muted-foreground">Pour réviser régulièrement de la rentrée jusqu'aux épreuves.</p>
          <div className="mt-auto pt-6">
            <CheckoutButton plan="yearly">Essayer {pricing.trialDays} jours gratuits</CheckoutButton>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Paiement sécurisé par Stripe. Résiliable à tout moment depuis ton espace. Aucun prélèvement pendant l'essai si tu résilies avant sa fin.
      </p>

      <div className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-2xl border bg-secondary/50 p-6">
        <HeartHandshake className="mt-0.5 size-6 shrink-0 text-primary" />
        <div>
          <p className="font-semibold">Élève boursier ou boursière ?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Nous proposons une réduction aux lycéens boursiers. Le code s'applique directement au moment du paiement.
          </p>
          <Link href="/boursiers" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
            Demander mon code de réduction
          </Link>
        </div>
      </div>

      <section className="mx-auto mt-20 max-w-4xl" aria-labelledby="comparatif">
        <h2 id="comparatif" className="text-center font-serif text-3xl font-semibold">
          Comparer les formules
        </h2>
        <div className="mt-8 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr className="border-b">
                <th scope="col" className="p-4 text-sm font-medium text-muted-foreground">Fonctionnalité</th>
                <th scope="col" className="w-32 p-4 text-center text-sm font-semibold">Gratuit</th>
                <th scope="col" className="w-32 p-4 text-center text-sm font-semibold text-primary">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="p-4 text-sm font-normal">{row.label}</th>
                  <td className="p-4 text-center"><Cell value={row.free} /></td>
                  <td className="p-4 text-center"><Cell value={row.premium} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">* Utilisation raisonnable : jusqu'à 200 questions par jour.</p>
      </section>

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center font-serif text-3xl font-semibold">Questions sur l'abonnement</h2>
        <div className="mt-8">
          <Faq
            items={[
              { q: "Comment fonctionne l'essai gratuit ?", a: `Tu as accès à tout Premium pendant ${pricing.trialDays} jours. Tu peux résilier pendant l'essai sans être prélevé. L'essai est proposé une seule fois par compte.` },
              { q: "Comment résilier ?", a: "Depuis ton tableau de bord, bouton « Gérer mon abonnement ». La résiliation prend effet à la fin de la période déjà payée." },
              { q: "Quels moyens de paiement sont acceptés ?", a: "Carte bancaire et les autres moyens proposés par Stripe selon ton pays. Histoflash ne stocke jamais tes données de carte." },
              { q: "Un parent peut-il payer pour moi ?", a: "Oui : il suffit d'utiliser sa carte au moment du paiement, sur ton compte." },
            ]}
          />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${siteConfig.name} Premium`,
          description: "Abonnement de révision : répétition espacée, quiz corrigés, assistant IA illimité, méthodologie avancée.",
          brand: { "@type": "Brand", name: siteConfig.name },
          url: absoluteUrl("/tarifs"),
          offers: [
            { "@type": "Offer", name: "Premium mensuel", price: pricing.monthly.amount, priceCurrency: "EUR", url: absoluteUrl("/tarifs"), availability: "https://schema.org/InStock" },
            { "@type": "Offer", name: "Premium annuel", price: pricing.yearly.amount, priceCurrency: "EUR", url: absoluteUrl("/tarifs"), availability: "https://schema.org/InStock" },
          ],
        }}
      />
    </div>
  )
}
