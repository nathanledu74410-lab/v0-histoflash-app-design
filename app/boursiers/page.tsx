import type { Metadata } from "next"
import { ProsePage } from "@/components/prose-page"
import { pageMetadata } from "@/lib/seo"
import { pricing, siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Réduction pour les lycéens boursiers",
  description: "Histoflash propose une réduction sur Premium aux élèves boursiers du lycée. Comment demander ton code de réduction en quelques minutes.",
  path: "/boursiers",
})

export default function BoursiersPage() {
  const subject = encodeURIComponent("Demande de réduction boursier")
  return (
    <ProsePage
      title="Élèves boursiers"
      path="/boursiers"
      intro="Réviser efficacement ne doit pas dépendre des moyens de sa famille. Les fiches sont gratuites pour tous, et Premium est à prix réduit pour les lycéens boursiers."
    >
      <section>
        <h2>Comment ça marche ?</h2>
        <ul>
          <li>Crée ton compte gratuit sur Histoflash.</li>
          <li>
            Écris-nous à <a href={`mailto:${siteConfig.contactEmail}?subject=${subject}`}>{siteConfig.contactEmail}</a> depuis l'adresse de ton
            compte, en joignant ta notification de bourse de lycée de l'année en cours (tu peux masquer les montants).
          </li>
          <li>Nous te répondons sous quelques jours avec un code de réduction personnel.</li>
          <li>Saisis ce code sur la page de paiement, au moment de souscrire Premium.</li>
        </ul>
      </section>
      <section>
        <h2>Et l'essai gratuit ?</h2>
        <p>
          Les {pricing.trialDays} jours d'essai restent offerts : tu peux tester Premium avant même de recevoir ton code. Le justificatif est supprimé
          dès que la vérification est faite.
        </p>
      </section>
    </ProsePage>
  )
}
