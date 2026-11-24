import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Fraunces, Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from "@clerk/localizations"
import { JsonLd } from "@/components/json-ld"
import { Providers } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { authEnabled } from "@/lib/config"
import { absoluteUrl, siteConfig } from "@/lib/site"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Fiches, flashcards et quiz d'histoire-géo et HGGSP`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "fiche de révision histoire",
    "fiche HGGSP",
    "révision bac histoire-géo",
    "flashcards histoire",
    "quiz histoire terminale",
    "méthode dissertation",
    "programme histoire lycée",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  // Pas de canonical ici : il serait hérité par toutes les pages. Chaque page déclare le sien.
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} — Réviser l'histoire-géo et l'HGGSP`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#141824" },
  ],
}

function MaybeClerk({ children }: { children: ReactNode }) {
  if (!authEnabled) return <>{children}</>
  return (
    <ClerkProvider localization={frFR} signInUrl="/connexion" signUpUrl="/inscription">
      {children}
    </ClerkProvider>
  )
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${geist.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh font-sans">
        <MaybeClerk>
          <Providers>
            <SiteHeader />
            <main id="contenu">{children}</main>
            <SiteFooter />
          </Providers>
        </MaybeClerk>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: absoluteUrl("/icon.svg"),
              description: siteConfig.description,
              email: siteConfig.contactEmail,
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              inLanguage: "fr-FR",
            },
          ]}
        />
        <Analytics />
      </body>
    </html>
  )
}
