import { defineConfig } from "drizzle-kit"

// drizzle-kit ne charge pas .env.local tout seul.
try {
  process.loadEnvFile(".env.local")
} catch {
  // Fichier absent : on utilise les variables déjà présentes dans l'environnement.
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
})
