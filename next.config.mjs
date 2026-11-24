/**
 * Redirections 301 des anciennes URL (/fiche/:id, /hggsp/:id, /histochat)
 * vers la nouvelle organisation par programme, pour conserver le référencement acquis.
 */
const legacyFiches = {
  1: "/seconde/histoire/mediterranee-antique",
  2: "/premiere/histoire/revolution-francaise-et-empire",
  3: "/seconde/histoire/renaissance-humanisme-reformes",
  4: "/seconde/histoire/mediterranee-medievale",
  5: "/premiere/histoire/revolution-francaise-et-empire",
  6: "/seconde/histoire/mediterranee-antique",
  7: "/seconde/histoire/renaissance-humanisme-reformes",
  8: "/premiere/histoire/societe-francaise-avant-1914",
}

const legacyHggsp = {
  101: "/terminale/histoire/guerre-froide-bipolarisation",
  102: "/terminale/histoire/construction-europeenne",
  103: "/terminale/hggsp/moyen-orient-conflits",
  104: "/terminale/hggsp/chine-conquete-espace-mers",
  105: "/premiere/hggsp/puissance-etats-unis",
  106: "/terminale/hggsp/changement-climatique",
  107: "/terminale/hggsp/conquetes-puissance-rivalites",
  108: "/terminale/geographie/mers-oceans-mondialisation",
  109: "/premiere/hggsp/essor-declin-puissances",
  110: "/premiere/hggsp/etats-religions-inde",
  111: "/terminale/hggsp/dimension-politique-guerre",
  112: "/terminale/hggsp/dimension-politique-guerre",
  113: "/seconde/geographie/ressources-sous-pression",
  114: "/terminale/hggsp/exploiter-preserver-proteger",
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...Object.entries(legacyFiches).map(([id, destination]) => ({ source: `/fiche/${id}`, destination, permanent: true })),
      ...Object.entries(legacyHggsp).map(([id, destination]) => ({ source: `/hggsp/${id}`, destination, permanent: true })),
      { source: "/fiche/:id", destination: "/", permanent: true },
      { source: "/hggsp/:id", destination: "/terminale/hggsp", permanent: true },
      { source: "/histochat", destination: "/assistant", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
