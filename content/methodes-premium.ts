import "server-only"

export interface PremiumMethodContent {
  exercise: {
    sujet: string
    analyse: string[]
    problematique: string
    plan: { partie: string; sousParties: string[] }[]
  }
  grille: { critere: string; detail: string }[]
}

/** Entraînements corrigés réservés aux abonnés Premium. */
export const premiumMethods: Record<string, PremiumMethodContent> = {
  dissertation: {
    exercise: {
      sujet: "Les régimes totalitaires dans l'Europe des années 1930.",
      analyse: [
        "« Régimes totalitaires » : URSS stalinienne, Allemagne nazie, Italie fasciste. Il faut définir le totalitarisme (Hannah Arendt).",
        "« Europe des années 1930 » : de la crise de 1929 à 1939. Il faut justifier ces bornes (crise économique, puis guerre).",
        "Le sujet invite à comparer : points communs (méthodes) et différences (idéologies, degré de contrôle).",
      ],
      problematique:
        "Dans quelle mesure les régimes totalitaires des années 1930 partagent-ils un même projet de contrôle de la société malgré des idéologies opposées ?",
      plan: [
        {
          partie: "I. Des régimes nés des crises de l'après-guerre",
          sousParties: ["Une révolution en Russie, une conquête du pouvoir en Italie et en Allemagne", "Des idéologies opposées mais un même rejet de la démocratie libérale"],
        },
        {
          partie: "II. Un même projet : encadrer et transformer la société",
          sousParties: ["Parti unique et culte du chef", "Propagande et embrigadement de la jeunesse", "La terreur : Goulag, camps de concentration, persécutions"],
        },
        {
          partie: "III. Des différences de nature et de degré",
          sousParties: ["Des finalités différentes : société sans classes, communauté raciale, État-nation", "Un fascisme italien moins totalitaire dans les faits"],
        },
      ],
    },
    grille: [
      { critere: "Compréhension du sujet", detail: "Termes définis, bornes justifiées, problématique pertinente." },
      { critere: "Organisation", detail: "Plan annoncé, parties argumentées, transitions." },
      { critere: "Connaissances", detail: "Exemples précis et exacts dans chaque sous-partie." },
      { critere: "Expression", detail: "Vocabulaire historique maîtrisé, orthographe, clarté." },
    ],
  },
  "etude-critique-de-document": {
    exercise: {
      sujet:
        "Consigne type : « En analysant le discours de Winston Churchill à Fulton (5 mars 1946), montrez comment il annonce la guerre froide, puis portez un regard critique sur ce document. »",
      analyse: [
        "Nature : discours d'un ancien Premier ministre britannique, prononcé aux États-Unis en présence du président Truman.",
        "Contexte : alliance de guerre en voie de rupture, soviétisation de l'Europe de l'Est.",
        "Expression clé : le « rideau de fer » qui coupe l'Europe de la Baltique à l'Adriatique.",
      ],
      problematique: "En quoi ce discours révèle-t-il la naissance d'un monde bipolaire ?",
      plan: [
        { partie: "I. Le constat d'une Europe coupée en deux", sousParties: ["Le « rideau de fer »", "La mainmise soviétique sur l'Europe de l'Est"] },
        { partie: "II. Un appel à l'union des démocraties anglo-saxonnes", sousParties: ["La « relation spéciale » entre Royaume-Uni et États-Unis", "Annoncer l'endiguement avant la doctrine Truman"] },
        { partie: "III. Portée et limites", sousParties: ["Un discours fondateur de la guerre froide", "Le point de vue d'un acteur engagé, qui ne présente pas les arguments soviétiques"] },
      ],
    },
    grille: [
      { critere: "Présentation", detail: "Nature, auteur, date, contexte, destinataire." },
      { critere: "Analyse", detail: "Citations expliquées avec des connaissances, réponse à la consigne." },
      { critere: "Regard critique", detail: "Portée et limites justifiées." },
      { critere: "Expression", detail: "Rédaction claire et vocabulaire précis." },
    ],
  },
  "croquis-geographie": {
    exercise: {
      sujet: "Les mers et les océans, vecteurs essentiels de la mondialisation.",
      analyse: ["Échelle mondiale.", "Représenter les flux, les passages stratégiques, les grandes façades et les ports."],
      problematique: "Comment les espaces maritimes organisent-ils les échanges mondiaux ?",
      plan: [
        { partie: "I. Des flux maritimes massifs et hiérarchisés", sousParties: ["Route maritime principale est-ouest (flèche épaisse)", "Routes secondaires (flèches fines)"] },
        { partie: "II. Des points de passage stratégiques", sousParties: ["Détroits et canaux (Malacca, Ormuz, Suez, Panama)", "Zones de piraterie ou de tensions"] },
        { partie: "III. Des façades et des ports qui polarisent les échanges", sousParties: ["Trois grandes façades (aplats)", "Grands ports à conteneurs (cercles proportionnels)"] },
      ],
    },
    grille: [
      { critere: "Légende", detail: "Organisée en parties titrées par des idées." },
      { critere: "Figurés", detail: "Adaptés (surface, ligne, point) et hiérarchisés." },
      { critere: "Nomenclature", detail: "Lieux essentiels nommés, à l'horizontale." },
      { critere: "Soin", detail: "Titre, lisibilité, couleurs cohérentes." },
    ],
  },
  "grand-oral": {
    exercise: {
      sujet: "Exemple de question : « La conquête spatiale est-elle encore un enjeu de puissance pour les États ? »",
      analyse: ["Question liée au thème 1 de Terminale (nouveaux espaces de conquête).", "Enjeu : rôle croissant des acteurs privés face aux États."],
      problematique: "La conquête spatiale reste-t-elle un instrument de la puissance des États à l'heure du New Space ?",
      plan: [
        { partie: "Accroche", sousParties: ["Un lancement récent de SpaceX ou la station chinoise Tiangong"] },
        { partie: "1. Un enjeu de puissance historique et actuel", sousParties: ["De Spoutnik à Apollo", "Chine, Inde, Europe : de nouvelles puissances spatiales"] },
        { partie: "2. Des États concurrencés mais toujours décisifs", sousParties: ["Le New Space", "Les États restent clients, régulateurs et acteurs militaires"] },
      ],
    },
    grille: [
      { critere: "Qualité de la prise de parole", detail: "Voix, regard, posture, sans notes." },
      { critere: "Qualité de la construction", detail: "Question problématisée, réponse structurée." },
      { critere: "Qualité des connaissances", detail: "Précision et maîtrise lors de l'échange." },
      { critere: "Qualité de l'interaction", detail: "Écoute, réactivité, capacité à nuancer." },
    ],
  },
}
