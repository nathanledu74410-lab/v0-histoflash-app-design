import { ogSize, renderOg } from "@/lib/og"

export const alt = "Histoflash — Réviser l'histoire-géo et l'HGGSP pour le bac"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({ eyebrow: "Seconde · Première · Terminale", title: "Réviser l'histoire-géo et l'HGGSP, avec méthode." })
}
