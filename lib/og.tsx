import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }

const colors = {
  paper: "#fbf9f5",
  ink: "#1f2440",
  primary: "#2f3f8f",
  accent: "#e9b949",
  muted: "#6b6f80",
  histoire: "#2f3f8f",
  geographie: "#1f7a5a",
  hggsp: "#9b2f3a",
}

/** Image de partage générée (Open Graph / Twitter) au style de la marque. */
export function renderOg({ eyebrow, title, subject }: { eyebrow: string; title: string; subject?: "histoire" | "geographie" | "hggsp" }) {
  const band = subject ? colors[subject] : colors.primary
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: colors.paper,
          padding: "64px 72px",
          borderLeft: `18px solid ${band}`,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: colors.primary,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: colors.ink }}>Histoflash</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 28, color: band, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 70 ? 54 : 66, lineHeight: 1.1, color: colors.ink, fontWeight: 700 }}>{title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: colors.muted, fontFamily: "sans-serif" }}>
          <div style={{ width: 40, height: 6, background: colors.accent, borderRadius: 3 }} />
          Fiches · Flashcards · Quiz · Méthode du bac
        </div>
      </div>
    ),
    ogSize,
  )
}
