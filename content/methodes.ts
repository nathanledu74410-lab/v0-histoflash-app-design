export interface MethodStep {
  title: string
  text: string
  tips?: string[]
}

export interface Method {
  slug: string
  title: string
  short: string
  metaDescription: string
  /** Niveaux et épreuves concernés. */
  scope: string
  duration?: string
  intro: string
  steps: MethodStep[]
  pitfalls: string[]
  checklist: string[]
}

export const methods: Method[] = [
  {
    slug: "dissertation",
    title: "Réussir la dissertation",
    short: "Analyser le sujet, problématiser, construire un plan et rédiger.",
    metaDescription:
      "Méthode de la dissertation en histoire-géographie et HGGSP : analyse du sujet, problématique, plan, introduction et conclusion. Étapes et erreurs à éviter.",
    scope: "HGGSP (épreuve écrite de spécialité) · Histoire-géographie (question problématisée)",
    duration: "Environ 2 heures à l'épreuve de spécialité",
    intro:
      "La dissertation est un raisonnement argumenté qui répond à une problématique. On ne récite pas son cours : on sélectionne des connaissances pour démontrer une idée. Le correcteur évalue la compréhension du sujet, la cohérence du plan et la précision des exemples.",
    steps: [
      {
        title: "Analyser le sujet (15 min)",
        text: "Souligne chaque mot du sujet et définis-le. Repère les bornes chronologiques et l'espace concerné, et demande-toi pourquoi ces bornes ont été choisies. Un mot de liaison (« et », « entre », « face à ») indique souvent une tension à expliquer.",
        tips: ["Écris les définitions au brouillon : elles serviront dans l'introduction.", "Note tout ce que tu sais sur le sujet en vrac, puis trie."],
      },
      {
        title: "Formuler une problématique",
        text: "La problématique est la question à laquelle ta copie répond. Elle reformule le sujet sous forme d'interrogation et fait apparaître un enjeu, une tension ou un paradoxe. Elle doit pouvoir être résolue en deux ou trois parties.",
        tips: ["Évite les questions fermées (réponse oui/non).", "« Dans quelle mesure… », « En quoi… », « Comment… » sont des formulations utiles."],
      },
      {
        title: "Construire le plan",
        text: "Choisis un plan en deux ou trois parties, chacune avec deux ou trois sous-parties. Le plan peut être chronologique (étapes), thématique (aspects) ou analytique (constat, causes, conséquences). Chaque partie défend une idée, pas un thème.",
        tips: ["Rédige le titre de chaque partie comme une phrase-argument.", "Prévois au moins un exemple précis (date, lieu, acteur, chiffre) par sous-partie."],
      },
      {
        title: "Rédiger l'introduction",
        text: "L'introduction comporte une accroche (fait, citation ou événement en lien avec le sujet), la définition des termes et des bornes, la problématique, puis l'annonce du plan.",
      },
      {
        title: "Rédiger le développement",
        text: "Chaque partie commence par une courte phrase qui annonce son idée. Chaque paragraphe suit le schéma : idée, explication, exemple précis. Termine chaque partie par une phrase de transition vers la suivante.",
      },
      {
        title: "Conclure",
        text: "La conclusion répond clairement à la problématique en reprenant les grandes étapes du raisonnement. Elle peut s'ouvrir sur une perspective, à condition qu'elle soit pertinente et non artificielle.",
      },
    ],
    pitfalls: [
      "Faire un hors-sujet en ne respectant pas les bornes chronologiques ou spatiales.",
      "Réciter le cours dans l'ordre du chapitre sans répondre à la problématique.",
      "Oublier les exemples précis : une affirmation sans exemple ne prouve rien.",
      "Écrire une introduction sans problématique ou un plan non annoncé.",
    ],
    checklist: [
      "Tous les termes du sujet sont définis.",
      "La problématique est une vraie question qui pose un enjeu.",
      "Chaque partie défend une idée et contient des exemples précis.",
      "La conclusion répond à la problématique.",
    ],
  },
  {
    slug: "etude-critique-de-document",
    title: "L'étude critique de document(s)",
    short: "Présenter, analyser et critiquer un ou deux documents.",
    metaDescription:
      "Méthode de l'étude critique de document(s) en HGGSP et en histoire-géographie : présentation, analyse, confrontation avec les connaissances, portée et limites.",
    scope: "HGGSP (épreuve écrite) · Histoire-géographie (analyse de document)",
    duration: "Environ 2 heures à l'épreuve de spécialité",
    intro:
      "L'étude critique consiste à expliquer un document en répondant à une consigne, puis à en montrer l'intérêt et les limites. Il faut faire dialoguer le document avec tes connaissances : ni paraphrase, ni récitation du cours.",
    steps: [
      {
        title: "Lire la consigne et le titre",
        text: "La consigne donne le fil directeur de ton analyse. Elle indique souvent les axes à suivre. Le titre et les notes du document te donnent des indices précieux.",
      },
      {
        title: "Présenter le document",
        text: "Indique la nature (discours, carte, article, affiche…), l'auteur et son point de vue, la date et le contexte, le destinataire. Explique en quoi ces éléments influencent le contenu.",
        tips: ["Le contexte doit être précis : ce qui se passe au moment où le document est produit."],
      },
      {
        title: "Analyser le contenu",
        text: "Organise ton analyse en deux ou trois parties qui répondent à la consigne. Cite le document entre guillemets (avec les lignes) ou décris-le précisément, puis explique chaque élément avec tes connaissances.",
      },
      {
        title: "Exercer un regard critique",
        text: "Montre la portée du document (ce qu'il nous apprend) et ses limites : ce qu'il ne dit pas, ce qu'il déforme, le point de vue de l'auteur. Apporte des informations extérieures pour nuancer.",
      },
      {
        title: "Conclure",
        text: "Réponds brièvement à la consigne et résume l'intérêt du document pour comprendre la question étudiée.",
      },
    ],
    pitfalls: [
      "Paraphraser le document sans l'expliquer.",
      "Réciter le cours sans jamais citer le document.",
      "Oublier la critique : un document n'est jamais neutre.",
    ],
    checklist: [
      "Nature, auteur, date, contexte et destinataire sont présentés.",
      "Chaque citation est expliquée avec des connaissances.",
      "Les limites du document sont identifiées.",
      "La réponse suit la consigne.",
    ],
  },
  {
    slug: "croquis-geographie",
    title: "Réaliser un croquis de géographie",
    short: "Construire une légende organisée et un croquis lisible.",
    metaDescription:
      "Méthode du croquis en géographie au lycée : analyser le sujet, construire une légende organisée, choisir les figurés, soigner la réalisation. Conseils et erreurs.",
    scope: "Géographie, de la Seconde à la Terminale",
    duration: "Environ 1 heure",
    intro:
      "Un croquis est une représentation simplifiée et organisée d'un espace, qui répond à un sujet. C'est un raisonnement géographique sous forme graphique : la légende en est le plan.",
    steps: [
      {
        title: "Analyser le sujet",
        text: "Comme pour une dissertation, définis les termes et l'échelle. Liste les informations à représenter : espaces, lieux, flux, limites.",
      },
      {
        title: "Construire la légende",
        text: "Organise la légende en deux ou trois parties titrées, comme un plan. Chaque partie regroupe les figurés qui illustrent une idée.",
        tips: ["Les titres de partie doivent être des phrases-idées, pas des mots isolés."],
      },
      {
        title: "Choisir les figurés",
        text: "Utilise des figurés de surface (aplats de couleur, hachures) pour les espaces, des figurés ponctuels (cercles, triangles) pour les lieux, et des figurés linéaires (flèches, traits) pour les flux et les limites. Respecte les conventions : bleu pour l'eau, rouge pour le dynamisme, etc.",
      },
      {
        title: "Réaliser le croquis",
        text: "Commence par les surfaces, puis les lignes, puis les points, et termine par la nomenclature (noms de lieux) écrite à l'horizontale. Donne un titre au croquis.",
      },
    ],
    pitfalls: [
      "Une légende en liste, sans organisation.",
      "Des couleurs trop nombreuses ou non hiérarchisées.",
      "Oublier le titre ou la nomenclature.",
    ],
    checklist: ["Le croquis a un titre.", "La légende est organisée en parties.", "Les figurés sont adaptés et hiérarchisés.", "Les lieux importants sont nommés."],
  },
  {
    slug: "grand-oral",
    title: "Préparer le grand oral",
    short: "Choisir ses questions, structurer son exposé, gérer l'échange.",
    metaDescription:
      "Méthode du grand oral du bac avec l'HGGSP : choisir ses questions, construire un exposé de 5 minutes, réussir l'échange avec le jury et la partie orientation.",
    scope: "Terminale · épreuve finale du bac",
    duration: "20 minutes de préparation, 20 minutes d'épreuve",
    intro:
      "Le grand oral dure 20 minutes : 5 minutes de présentation d'une question, 10 minutes d'échange avec le jury, puis 5 minutes sur ton projet d'orientation. Tu prépares deux questions liées à tes spécialités ; le jury en choisit une.",
    steps: [
      {
        title: "Choisir de bonnes questions",
        text: "Une bonne question est problématisée, liée au programme d'HGGSP, et te passionne. Elle doit permettre une réponse argumentée en 5 minutes.",
        tips: ["Évite les questions trop larges ou dont la réponse est évidente."],
      },
      {
        title: "Construire l'exposé",
        text: "Accroche, présentation de la question et de son intérêt, réponse en deux ou trois temps, conclusion qui répond clairement. Appuie-toi sur des exemples précis.",
      },
      {
        title: "S'entraîner à l'oral",
        text: "Présente debout, sans notes, en regardant le jury. Chronomètre-toi et entraîne-toi devant d'autres personnes.",
      },
      {
        title: "Réussir l'échange",
        text: "Le jury approfondit ton exposé et teste tes connaissances. Prends le temps de réfléchir, reformule la question si besoin, et assume de nuancer.",
      },
    ],
    pitfalls: ["Réciter un texte appris par cœur.", "Choisir une question sans lien réel avec la spécialité.", "Négliger la partie sur l'orientation."],
    checklist: ["Question problématisée.", "Exposé chronométré à 5 minutes.", "Exemples précis prêts pour l'échange.", "Projet d'orientation relié à la question."],
  },
]

export function getMethod(slug: string) {
  return methods.find((m) => m.slug === slug)
}
