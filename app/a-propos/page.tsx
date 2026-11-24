import type { Metadata } from "next"
import Link from "next/link"
import { ProsePage } from "@/components/prose-page"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "À propos : notre démarche pédagogique",
  description:
    "Histoflash aide les lycéens à réviser l'histoire, la géographie et l'HGGSP : fiches conformes aux programmes officiels, répétition espacée, rigueur et neutralité.",
  path: "/a-propos",
})

export default function AboutPage() {
  return (
    <ProsePage
      title="À propos"
      path="/a-propos"
      intro="Histoflash est né d'un constat simple : on oublie vite ce qu'on a lu une seule fois. Nous voulons aider chaque lycéen à comprendre puis à retenir durablement."
    >
      <section>
        <h2>Des contenus fidèles aux programmes</h2>
        <p>
          Chaque fiche correspond à un chapitre, à un axe ou à un objet de travail conclusif des programmes du lycée général publiés par le
          ministère de l'Éducation nationale, pour l'histoire-géographie et la spécialité HGGSP. Nous reprenons les intitulés officiels et les
          notions attendues.
        </p>
      </section>
      <section>
        <h2>Rigueur et neutralité</h2>
        <p>
          Les fiches présentent des faits établis par l'historiographie et signalent les débats entre historiens. Sur les sujets sensibles, en
          particulier mémoriels et géopolitiques, nous exposons les faits et les différents points de vue sans prendre parti. Les sujets
          d'entraînement sont rédigés par Histoflash : ce ne sont pas des sujets officiels du bac.
        </p>
      </section>
      <section>
        <h2>Une méthode fondée sur la recherche</h2>
        <p>
          La récupération active (se tester plutôt que relire) et la répétition espacée (revoir au bon moment) font partie des techniques
          d'apprentissage les plus solidement validées par la psychologie cognitive. Histoflash les met au service des révisions.
        </p>
      </section>
      <section>
        <h2>Une erreur dans une fiche ?</h2>
        <p>
          Écris-nous à <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Chaque signalement est vérifié et la fiche
          corrigée si besoin. Tu peux aussi consulter nos <Link href="/tarifs">formules</Link> et notre{" "}
          <Link href="/boursiers">offre pour les élèves boursiers</Link>.
        </p>
      </section>
    </ProsePage>
  )
}
