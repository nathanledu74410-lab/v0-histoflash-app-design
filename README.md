# Histoflash

Plateforme de révision d'histoire, de géographie et d'HGGSP pour les lycéens (Seconde → Terminale) :
fiches de cours conformes aux programmes officiels, flashcards en répétition espacée, quiz corrigés,
méthodologie du bac et assistant IA.

## Stack

- **Next.js 16** (App Router, pages statiques pour les fiches) · **React 19** · **Tailwind CSS 4**
- **Clerk** : comptes · **Neon** + **Drizzle ORM** : base PostgreSQL · **Stripe** : abonnements
- **Google Gemini** via l'AI SDK : assistant IA

## Démarrage

```bash
corepack pnpm install
cp .env.example .env.local   # puis remplir les clés disponibles
corepack pnpm dev
```

Le site fonctionne **sans aucune clé** (mode dégradé) : fiches, flashcards et quiz express sont
accessibles ; les comptes, le paiement, les révisions espacées et l'IA affichent un message clair
tant que le service correspondant n'est pas configuré.

## Modèle gratuit / Premium

| | Gratuit | Premium (4,99 €/mois ou 29,99 €/an, 7 jours d'essai) |
|---|---|---|
| Fiches de cours, flashcards | ✔ | ✔ |
| Quiz | 5 questions, sans corrections | Complet + corrections |
| Répétition espacée, tableau de bord | — | ✔ |
| Assistant IA | 5 questions/jour (compte requis) | Illimité (plafond technique de 200/jour) |
| Méthodologie | Fiches méthode | + sujets corrigés et grilles |

Le contenu Premium n'est jamais envoyé dans le HTML statique : il est servi par des routes API
qui vérifient l'abonnement (`/api/quiz/[slug]`, `/api/revisions`, `/api/methodologie/[slug]`).
Les prix affichés sont centralisés dans `lib/site.ts`.

## Configuration des services

### 1. Clerk (comptes)
1. Créer une application sur <https://dashboard.clerk.com> (e-mail + Google conseillés).
2. Copier `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` et `CLERK_SECRET_KEY` dans `.env.local`.

### 2. Neon (base de données)
1. Créer un projet sur <https://console.neon.tech> et copier la chaîne de connexion dans `DATABASE_URL`.
2. Créer les tables : `corepack pnpm db:push`

### 3. Stripe (paiement)
1. Dans le tableau de bord Stripe (mode test), créer un produit « Histoflash Premium » avec deux prix
   récurrents : **4,99 € / mois** et **29,99 € / an**. Copier leurs identifiants `price_…` dans
   `STRIPE_PRICE_MONTHLY` et `STRIPE_PRICE_YEARLY`, et la clé secrète dans `STRIPE_SECRET_KEY`.
2. Créer un webhook vers `https://<domaine>/api/stripe/webhook` avec les événements
   `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`,
   `customer.subscription.deleted`. Copier le secret de signature dans `STRIPE_WEBHOOK_SECRET`.
   En local : `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
3. Activer le **portail client** (Paramètres → Billing → Customer portal) pour la résiliation.
4. **Remise boursiers** : créer un coupon (ex. −50 %) puis des codes promotionnels à usage unique,
   envoyés à la main après vérification du justificatif (voir `/boursiers`). Le Checkout accepte
   les codes promo.

### 4. Gemini (assistant IA)
Créer une clé sur <https://aistudio.google.com> et la placer dans `GOOGLE_GENERATIVE_AI_API_KEY`.
Le modèle se change avec `GEMINI_MODEL`.

## Contenu

- `lib/curriculum.ts` : arborescence complète des programmes (84 chapitres / axes).
- `content/chapters/*.ts` : fiches rédigées (cours, dates, notions, acteurs, flashcards, quiz).
  Ajouter un fichier puis l'enregistrer dans `content/index.ts` suffit à publier une fiche :
  elle entre automatiquement dans le sitemap et devient indexable.
- Les chapitres sans fiche sont en `noindex` et absents du sitemap jusqu'à leur rédaction.
- `content/methodes.ts` (public) et `content/methodes-premium.ts` (réservé aux abonnés).

## SEO

URL par programme (`/terminale/hggsp/changement-climatique`), métadonnées et canonical par page,
images Open Graph générées, `sitemap.xml`, `robots.txt`, données structurées (LearningResource,
Course, BreadcrumbList, FAQPage, HowTo, Product), redirections 301 des anciennes URL `/fiche/:id`
et `/hggsp/:id` (voir `next.config.mjs`).

## Avant la mise en production

- Compléter les mentions légales, la politique de confidentialité et les CGV (champs surlignés « À compléter »).
- Déconnecter le projet de v0.app pour éviter qu'il ne pousse du code sur le dépôt.
- Renseigner les variables d'environnement sur Vercel.

## Feuille de route

- Parrainage (colonnes `referral_code` / `referred_by` déjà présentes en base).
- Rédaction des chapitres restants.
