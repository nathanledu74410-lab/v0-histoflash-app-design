import { Fragment } from "react"

/**
 * Rendu minimal des marqueurs **gras** et *italique* utilisés dans les fiches.
 * Volontairement limité : le contenu est rédigé par l'équipe, pas par les utilisateurs.
 */
export function RichText({ text }: { text: string }) {
  const tokens = text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <>
      {tokens.map((token, i) => {
        if (token.startsWith("***") && token.endsWith("***")) {
          return (
            <strong key={i}>
              <em>{token.slice(3, -3)}</em>
            </strong>
          )
        }
        if (token.startsWith("**") && token.endsWith("**")) return <strong key={i}>{token.slice(2, -2)}</strong>
        if (token.startsWith("*") && token.endsWith("*") && token.length > 2) return <em key={i}>{token.slice(1, -1)}</em>
        return <Fragment key={i}>{token}</Fragment>
      })}
    </>
  )
}

/** Version texte brut, pour les métadonnées et le JSON-LD. */
export function stripMarks(text: string) {
  return text.replace(/\*+([^*]+)\*+/g, "$1")
}
