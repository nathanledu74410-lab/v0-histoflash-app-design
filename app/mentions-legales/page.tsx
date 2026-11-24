import type { Metadata } from "next"
import { ProsePage, ToFill } from "@/components/prose-page"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Histoflash : éditeur, directeur de la publication, hébergeur.",
  path: "/mentions-legales",
})

export default function LegalPage() {
  return (
    <ProsePage title="Mentions légales" path="/mentions-legales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          <ToFill>nom ou raison sociale, forme juridique, adresse du siège, numéro SIREN / RCS</ToFill>
          <br />
          Contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      </section>
      <section>
        <h2>Directeur de la publication</h2>
        <p>
          <ToFill>nom du directeur ou de la directrice de la publication</ToFill>
        </p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les fiches, flashcards, quiz et contenus méthodologiques sont la propriété de Histoflash. Toute reproduction à des fins commerciales est
          interdite sans autorisation. Un usage pédagogique en classe est autorisé avec mention de la source.
        </p>
      </section>
    </ProsePage>
  )
}
