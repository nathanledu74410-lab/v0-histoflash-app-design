import { boolean, date, index, integer, pgTable, primaryKey, real, serial, text, timestamp } from "drizzle-orm/pg-core"

/** Un utilisateur Clerk et son abonnement Stripe. */
export const users = pgTable("users", {
  id: text("id").primaryKey(), // identifiant Clerk (user_…)
  email: text("email"),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id"),
  /** Statut Stripe : trialing, active, past_due, canceled, incomplete… */
  subscriptionStatus: text("subscription_status"),
  /** monthly | yearly */
  plan: text("plan"),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
  trialUsed: boolean("trial_used").default(false).notNull(),
  /** Parrainage (interface prévue après le MVP). */
  referralCode: text("referral_code").unique(),
  referredBy: text("referred_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

/** État de répétition espacée (SM-2) d'une flashcard pour un utilisateur. */
export const cardReviews = pgTable(
  "card_reviews",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cardId: text("card_id").notNull(), // « <slug-chapitre>#<index> »
    chapterSlug: text("chapter_slug").notNull(),
    ease: real("ease").default(2.5).notNull(),
    intervalDays: integer("interval_days").default(0).notNull(),
    repetitions: integer("repetitions").default(0).notNull(),
    lapses: integer("lapses").default(0).notNull(),
    dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.cardId] }), index("card_reviews_due_idx").on(t.userId, t.dueAt)],
)

export const quizAttempts = pgTable(
  "quiz_attempts",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    chapterSlug: text("chapter_slug").notNull(),
    score: integer("score").notNull(),
    total: integer("total").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("quiz_attempts_user_idx").on(t.userId, t.createdAt)],
)

/** Jours d'activité, pour la série (streak) et la progression. */
export const activityDays = pgTable(
  "activity_days",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    day: date("day").notNull(),
    reviews: integer("reviews").default(0).notNull(),
    quizzes: integer("quizzes").default(0).notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.day] })],
)

/** Quota quotidien de questions à l'assistant IA. */
export const aiUsage = pgTable(
  "ai_usage",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    day: date("day").notNull(),
    count: integer("count").default(0).notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.day] })],
)

export type User = typeof users.$inferSelect
export type CardReview = typeof cardReviews.$inferSelect
