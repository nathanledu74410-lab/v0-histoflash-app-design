import type { Metadata } from "next"
import { siteConfig } from "./site"

interface PageMeta {
  title: string
  description: string
  path: string
  /** Titre complet, sans le suffixe « | Histoflash ». */
  absoluteTitle?: boolean
  noindex?: boolean
  type?: "website" | "article"
  modifiedTime?: string
}

/** Métadonnées cohérentes : canonical, Open Graph et Twitter propres à chaque page. */
export function pageMetadata({ title, description, path, absoluteTitle, noindex, type = "website", modifiedTime }: PageMeta): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title,
      description,
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
