import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

type Db = ReturnType<typeof drizzle<typeof schema>>

let instance: Db | null = null

/** Renvoie le client Drizzle, ou `null` si DATABASE_URL n'est pas défini. */
export function getDb(): Db | null {
  if (!process.env.DATABASE_URL) return null
  if (!instance) {
    instance = drizzle(neon(process.env.DATABASE_URL), { schema })
  }
  return instance
}

export { schema }
