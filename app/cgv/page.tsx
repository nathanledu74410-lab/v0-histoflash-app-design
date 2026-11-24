import type { Metadata } from "next"
import { ProsePage, ToFill } from "@/components/prose-page"
import { pageMetadata } from "@/lib/seo"
import { pricing, siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de l'abonnement Histoflash Premium : prix, essai gratuit, résiliation, droit de rétractation.",
  path: "/cgv",
})

export default function CgvPage() {
  return (
    <ProsePage title="Conditions générales de vente" path="/cgv">
      <section>
        <h2>Objet</h2>
        <p>
          Les présentes conditions régissent la souscription à l'abonnement Histoflash Premium, édité par <ToFill>raison sociale de l'éditeur</ToFill>.
        </p>
      </section>
      <section>
        <h2>Prix</h2>
        <ul>
          <li>Premium mensuel : {pricing.monthly.label} TTC par mois.</li>
          <li>Premium annuel : {pricing.yearly.label} TTC par an.</li>
        </ul>
        <p>Les prix peuvent évoluer ; le prix applicable est celui affiché au moment de la souscription.</p>
      </section>
      <section>
        <h2>Essai gratuit</h2>
        <p>
          Un essai gratuit de {pricing.trialDays} jours est proposé une fois par compte. Sans résiliation avant la fin de l'essai, l'abonnement
          choisi démarre et le premier paiement est prélevé.
        </p>
      </section>
      <section>
        <h2>Durée et résiliation</h2>
        <p>
          L'abonnement est reconduit tacitement à chaque échéance. Il peut être résilié à tout moment depuis le tableau de bord ; la résiliation
          prend effet à la fin de la période en cours.
        </p>
      </section>
      <section>
        <h2>Droit de rétractation</h2>
        <p>
          Conformément au Code de la consommation, tu disposes d'un délai de 14 jours pour te rétracter. En demandant l'accès immédiat au service
          pendant ce délai, tu reconnais que les prestations déjà fournies pourront être facturées au prorata. Demande à adresser à{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </section>
      <section>
        <h2>Médiation</h2>
        <p>
          En cas de litige, tu peux recourir gratuitement au médiateur de la consommation : <ToFill>nom et coordonnées du médiateur</ToFill>.
        </p>
      </section>
    </ProsePage>
  )
}
