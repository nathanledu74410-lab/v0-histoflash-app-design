import type { Metadata } from "next"
import { ProsePage, ToFill } from "@/components/prose-page"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Quelles données Histoflash collecte, pourquoi, combien de temps elles sont conservées et comment exercer tes droits (RGPD).",
  path: "/confidentialite",
})

export default function PrivacyPage() {
  return (
    <ProsePage
      title="Politique de confidentialité"
      path="/confidentialite"
      intro="Nous collectons le minimum de données nécessaires au fonctionnement du service. Nous ne vendons aucune donnée et n'affichons aucune publicité."
    >
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          <ToFill>identité du responsable du traitement</ToFill> — contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      </section>
      <section>
        <h2>Données collectées</h2>
        <ul>
          <li>Compte : adresse e-mail et identifiant de connexion, gérés par notre prestataire d'authentification Clerk.</li>
          <li>Progression : résultats de quiz, état de révision des flashcards, jours d'activité, nombre de questions posées à l'assistant.</li>
          <li>Abonnement : statut et dates de l'abonnement. Les données de paiement sont traitées uniquement par Stripe.</li>
          <li>Questions à l'assistant IA : transmises à Google (Gemini) pour générer la réponse, sans être stockées par Histoflash.</li>
          <li>Mesure d'audience anonyme (Vercel Analytics), sans cookie publicitaire.</li>
        </ul>
      </section>
      <section>
        <h2>Élèves mineurs</h2>
        <p>
          Histoflash s'adresse à des lycéens, dont certains ont moins de 15 ans. Pour ces élèves, la création d'un compte et la souscription d'un
          abonnement doivent se faire avec l'accord d'un parent ou d'un responsable légal.
        </p>
      </section>
      <section>
        <h2>Durée de conservation</h2>
        <p>Les données du compte sont conservées tant que le compte est actif, puis supprimées dans un délai de 12 mois d'inactivité ou sur demande.</p>
      </section>
      <section>
        <h2>Tes droits</h2>
        <p>
          Tu disposes d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition. Écris à{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Tu peux aussi saisir la CNIL.
        </p>
      </section>
    </ProsePage>
  )
}
