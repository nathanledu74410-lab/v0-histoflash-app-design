/**
 * Arborescence des programmes officiels du lycée (voie générale).
 * Niveau → matière → thème → chapitre (ou axe / objet de travail conclusif en HGGSP).
 */

export type LevelSlug = "seconde" | "premiere" | "terminale"
export type SubjectSlug = "histoire" | "geographie" | "hggsp"

export interface Level {
  slug: LevelSlug
  name: string
  short: string
  description: string
}

export interface Subject {
  slug: SubjectSlug
  name: string
  short: string
}

export interface ChapterRef {
  slug: string
  title: string
  /** Libellé court : « Chapitre 1 », « Axe 2 », « Objet conclusif »… */
  label: string
  image?: string
}

export interface Theme {
  number: string
  title: string
  chapters: ChapterRef[]
}

export interface Programme {
  level: LevelSlug
  subject: SubjectSlug
  title: string
  description: string
  themes: Theme[]
}

export const levels: Level[] = [
  {
    slug: "seconde",
    name: "Seconde",
    short: "2de",
    description:
      "Histoire : grandes étapes de la formation du monde moderne. Géographie : environnement, développement, mobilité.",
  },
  {
    slug: "premiere",
    name: "Première",
    short: "1re",
    description:
      "Histoire : nations, empires, nationalités (1789-1918). Géographie : les dynamiques d'un monde en recomposition. Spécialité HGGSP.",
  },
  {
    slug: "terminale",
    name: "Terminale",
    short: "Tle",
    description:
      "Histoire : les relations entre les puissances des années 1930 à nos jours. Géographie : des territoires dans la mondialisation. Spécialité HGGSP.",
  },
]

export const subjects: Subject[] = [
  { slug: "histoire", name: "Histoire", short: "Histoire" },
  { slug: "geographie", name: "Géographie", short: "Géo" },
  { slug: "hggsp", name: "HGGSP", short: "HGGSP" },
]

const ch = (slug: string, title: string, label: string, image?: string): ChapterRef => ({ slug, title, label, image })

export const programmes: Programme[] = [
  // ───────────────────────────── SECONDE ─────────────────────────────
  {
    level: "seconde",
    subject: "histoire",
    title: "Grandes étapes de la formation du monde moderne",
    description:
      "De l'héritage méditerranéen antique et médiéval aux sociétés des XVIIe et XVIIIe siècles : ouverture atlantique, Renaissance, affirmation de l'État et Lumières.",
    themes: [
      {
        number: "1",
        title: "Le monde méditerranéen : empreintes de l'Antiquité et du Moyen Âge",
        chapters: [
          ch("mediterranee-antique", "La Méditerranée antique : les empreintes grecques et romaines", "Chapitre 1", "/roman-empire-colosseum.jpg"),
          ch("mediterranee-medievale", "La Méditerranée médiévale : espace d'échanges et de conflits à la croisée de trois civilisations", "Chapitre 2", "/ottoman-empire-istanbul.jpg"),
        ],
      },
      {
        number: "2",
        title: "XVe-XVIe siècles : un nouveau rapport au monde, un temps de mutation intellectuelle",
        chapters: [
          ch("ouverture-atlantique", "L'ouverture atlantique : les conséquences de la découverte du « Nouveau Monde »", "Chapitre 1"),
          ch("renaissance-humanisme-reformes", "Renaissance, humanisme et réformes religieuses : les mutations de l'Europe", "Chapitre 2", "/renaissance-art-florence.jpg"),
        ],
      },
      {
        number: "3",
        title: "L'État à l'époque moderne : France et Angleterre",
        chapters: [
          ch("affirmation-etat-royaume-de-france", "L'affirmation de l'État dans le royaume de France", "Chapitre 1"),
          ch("modele-britannique", "Le modèle britannique et son influence", "Chapitre 2"),
        ],
      },
      {
        number: "4",
        title: "Dynamiques et ruptures dans les sociétés des XVIIe et XVIIIe siècles",
        chapters: [
          ch("lumieres-et-sciences", "Les Lumières et le développement des sciences", "Chapitre 1"),
          ch("societe-d-ordres", "Tensions, mutations et crispations de la société d'ordres", "Chapitre 2"),
        ],
      },
    ],
  },
  {
    level: "seconde",
    subject: "geographie",
    title: "Environnement, développement, mobilité : les défis d'un monde en transition",
    description:
      "Risques, ressources, inégalités de développement, dynamiques démographiques et mobilités : comprendre les transitions du monde contemporain.",
    themes: [
      {
        number: "1",
        title: "Sociétés et environnements : des équilibres fragiles",
        chapters: [
          ch("societes-face-aux-risques", "Les sociétés face aux risques", "Chapitre 1"),
          ch("ressources-sous-pression", "Des ressources majeures sous pression : tensions, gestion", "Chapitre 2", "/water-resources-dam.jpg"),
        ],
      },
      {
        number: "2",
        title: "Territoires, populations et développement : quels défis ?",
        chapters: [
          ch("inegalites-de-developpement", "Des inégalités de développement", "Chapitre 1"),
          ch("trajectoires-demographiques", "Des trajectoires démographiques différenciées : des défis pour le développement durable", "Chapitre 2"),
        ],
      },
      {
        number: "3",
        title: "Des mobilités généralisées",
        chapters: [
          ch("migrations-internationales", "Les migrations internationales", "Chapitre 1"),
          ch("mobilites-touristiques", "Les mobilités touristiques internationales", "Chapitre 2"),
        ],
      },
      {
        number: "4",
        title: "L'Afrique australe : un espace en profonde mutation",
        chapters: [ch("afrique-australe", "L'Afrique australe : un espace en profonde mutation", "Chapitre unique")],
      },
    ],
  },

  // ───────────────────────────── PREMIÈRE ─────────────────────────────
  {
    level: "premiere",
    subject: "histoire",
    title: "Nations, empires, nationalités (de 1789 aux lendemains de la Première Guerre mondiale)",
    description:
      "De la Révolution française à la sortie de la Grande Guerre : naissance de la nation moderne, âge démocratique, industrialisation, Troisième République et empire colonial.",
    themes: [
      {
        number: "1",
        title: "L'Europe face aux révolutions",
        chapters: [
          ch("revolution-francaise-et-empire", "La Révolution française et l'Empire : une nouvelle conception de la nation", "Chapitre 1", "/storming-of-the-bastille.png"),
          ch("europe-restauration-revolution", "L'Europe entre restauration et révolution (1814-1848)", "Chapitre 2"),
        ],
      },
      {
        number: "2",
        title: "La France dans l'Europe des nationalités : politique et société (1848-1871)",
        chapters: [
          ch("deuxieme-republique-second-empire", "La difficile entrée dans l'âge démocratique : la Deuxième République et le Second Empire", "Chapitre 1", "/napoleon-bonaparte.jpg"),
          ch("industrialisation-france", "L'industrialisation et l'accélération des transformations économiques et sociales en France", "Chapitre 2"),
          ch("nouveaux-etats-europe", "La France et la construction de nouveaux États par l'action militaire et diplomatique", "Chapitre 3"),
        ],
      },
      {
        number: "3",
        title: "La Troisième République avant 1914 : un régime politique, un empire colonial",
        chapters: [
          ch("projet-republicain", "La mise en œuvre du projet républicain", "Chapitre 1"),
          ch("societe-francaise-avant-1914", "Permanences et mutations de la société française jusqu'en 1914", "Chapitre 2", "/marie-curie.jpg"),
          ch("metropole-et-colonies", "Métropole et colonies", "Chapitre 3"),
        ],
      },
      {
        number: "4",
        title: "La Première Guerre mondiale : le « suicide de l'Europe » et la fin des empires européens",
        chapters: [
          ch("premiere-guerre-mondiale", "Un embrasement mondial et ses grandes étapes", "Chapitre 1"),
          ch("societes-en-guerre-1914-1918", "Les sociétés en guerre : des civils acteurs et victimes de la guerre", "Chapitre 2"),
          ch("sortir-de-la-guerre-1918", "Sortir de la guerre : la tentative de construction d'un ordre des nations démocratiques", "Chapitre 3"),
        ],
      },
    ],
  },
  {
    level: "premiere",
    subject: "geographie",
    title: "Les dynamiques d'un monde en recomposition",
    description:
      "Métropolisation, recomposition des espaces productifs et multifonctionnalité des espaces ruraux, avec la Chine en étude conclusive.",
    themes: [
      {
        number: "1",
        title: "La métropolisation : un processus mondial différencié",
        chapters: [
          ch("poids-des-metropoles", "Les villes à l'échelle mondiale : le poids croissant des métropoles", "Chapitre 1"),
          ch("metropoles-inegales", "Des métropoles inégales et en mutation", "Chapitre 2"),
        ],
      },
      {
        number: "2",
        title: "Une diversification des espaces et des acteurs de la production",
        chapters: [
          ch("espaces-de-production", "Les espaces de production dans le monde : une diversité croissante", "Chapitre 1"),
          ch("littoralisation-espaces-productifs", "Métropolisation, littoralisation des espaces productifs et accroissement des flux", "Chapitre 2", "/ocean-cargo-ships.jpg"),
        ],
      },
      {
        number: "3",
        title: "Les espaces ruraux : une multifonctionnalité toujours plus marquée",
        chapters: [
          ch("fragmentation-espaces-ruraux", "La fragmentation des espaces ruraux", "Chapitre 1"),
          ch("fonctions-non-agricoles", "Affirmation des fonctions non agricoles et conflits d'usage", "Chapitre 2"),
        ],
      },
      {
        number: "C",
        title: "Thème conclusif",
        chapters: [ch("chine-recompositions-spatiales", "La Chine : des recompositions spatiales multiples", "Conclusion", "/china-great-wall.jpg")],
      },
    ],
  },
  {
    level: "premiere",
    subject: "hggsp",
    title: "Spécialité HGGSP — Première",
    description:
      "Démocratie, puissance, frontières, information et religions : les grands objets de la géopolitique et de la science politique.",
    themes: [
      {
        number: "1",
        title: "Comprendre un régime politique : la démocratie",
        chapters: [
          ch("penser-la-democratie", "Penser la démocratie : démocratie directe et démocratie représentative", "Axe 1"),
          ch("avancees-reculs-democraties", "Avancées et reculs des démocraties", "Axe 2"),
          ch("union-europeenne-et-democratie", "L'Union européenne et la démocratie", "Objet conclusif", "/european-union-flags.jpg"),
        ],
      },
      {
        number: "2",
        title: "Analyser les dynamiques des puissances internationales",
        chapters: [
          ch("essor-declin-puissances", "Essor et déclin des puissances : un regard historique", "Axe 1", "/russia-kremlin.jpg"),
          ch("formes-indirectes-puissance", "Formes indirectes de la puissance : une concurrence entre les États", "Axe 2"),
          ch("puissance-etats-unis", "La puissance des États-Unis aujourd'hui", "Objet conclusif", "/usa-capitol-washington.jpg"),
        ],
      },
      {
        number: "3",
        title: "Étudier les divisions politiques du monde : les frontières",
        chapters: [
          ch("tracer-des-frontieres", "Tracer des frontières, approche géopolitique", "Axe 1"),
          ch("frontieres-en-debat", "Les frontières en débat", "Axe 2"),
          ch("frontieres-union-europeenne", "Les frontières internes et externes de l'Union européenne", "Objet conclusif"),
        ],
      },
      {
        number: "4",
        title: "S'informer : un regard critique sur les sources et modes de communication",
        chapters: [
          ch("revolutions-de-l-information", "Les grandes révolutions techniques de l'information", "Axe 1"),
          ch("liberte-controle-information", "Liberté ou contrôle de l'information : un débat politique fondamental", "Axe 2"),
          ch("information-internet", "L'information à l'heure d'Internet", "Objet conclusif"),
        ],
      },
      {
        number: "5",
        title: "Analyser les relations entre États et religions",
        chapters: [
          ch("pouvoir-et-religion", "Pouvoir et religion : des liens historiques traditionnels", "Axe 1"),
          ch("etats-religions-secularisation", "États et religions : une inégale sécularisation", "Axe 2"),
          ch("etats-religions-inde", "États et religions en Inde", "Objet conclusif", "/india-taj-mahal.jpg"),
        ],
      },
    ],
  },

  // ───────────────────────────── TERMINALE ─────────────────────────────
  {
    level: "terminale",
    subject: "histoire",
    title: "Les relations entre les puissances et l'opposition des modèles politiques, des années 1930 à nos jours",
    description:
      "Crise de 1929, totalitarismes, Seconde Guerre mondiale, guerre froide, décolonisation, construction européenne et monde depuis 1990.",
    themes: [
      {
        number: "1",
        title: "Fragilités des démocraties, totalitarismes et Seconde Guerre mondiale (1929-1945)",
        chapters: [
          ch("crise-de-1929", "L'impact de la crise de 1929 : déséquilibres économiques et sociaux", "Chapitre 1"),
          ch("regimes-totalitaires", "Les régimes totalitaires", "Chapitre 2"),
          ch("seconde-guerre-mondiale", "La Seconde Guerre mondiale", "Chapitre 3"),
        ],
      },
      {
        number: "2",
        title: "La multiplication des acteurs internationaux dans un monde bipolaire (de 1945 au début des années 1970)",
        chapters: [
          ch("nouvel-ordre-mondial-1945", "La fin de la Seconde Guerre mondiale et les débuts d'un nouvel ordre mondial", "Chapitre 1"),
          ch("guerre-froide-bipolarisation", "Une nouvelle donne géopolitique : bipolarisation et émergence du tiers-monde", "Chapitre 2", "/cold-war-berlin-wall.jpg"),
          ch("france-nouvelle-place-monde", "La France : une nouvelle place dans le monde", "Chapitre 3"),
        ],
      },
      {
        number: "3",
        title: "Les remises en cause économiques, politiques et sociales des années 1970 à 1991",
        chapters: [
          ch("grands-equilibres-1970-1991", "La modification des grands équilibres économiques et politiques mondiaux", "Chapitre 1"),
          ch("france-1974-1988", "Un tournant social, politique et culturel, la France de 1974 à 1988", "Chapitre 2"),
        ],
      },
      {
        number: "4",
        title: "Le monde, l'Europe et la France depuis les années 1990, entre coopérations et conflits",
        chapters: [
          ch("rapports-de-puissance-depuis-1990", "Nouveaux rapports de puissance et enjeux mondiaux", "Chapitre 1", "/terrorism-memorial.jpg"),
          ch("construction-europeenne", "La construction européenne entre élargissement, approfondissement et remises en question", "Chapitre 2", "/european-union-flags.jpg"),
          ch("republique-francaise", "La République française", "Chapitre 3"),
        ],
      },
    ],
  },
  {
    level: "terminale",
    subject: "geographie",
    title: "Des territoires dans la mondialisation : entre intégrations et rivalités",
    description:
      "Mers et océans, intégration inégale des territoires, coopérations et tensions, Union européenne et France dans la mondialisation.",
    themes: [
      {
        number: "1",
        title: "Mers et océans : au cœur de la mondialisation",
        chapters: [
          ch("mers-oceans-mondialisation", "Mers et océans : vecteurs essentiels de la mondialisation", "Chapitre 1", "/ocean-cargo-ships.jpg"),
          ch("mers-oceans-appropriation", "Mers et océans : entre appropriation, protection et liberté de circulation", "Chapitre 2"),
        ],
      },
      {
        number: "2",
        title: "Dynamiques territoriales, coopérations et tensions dans la mondialisation",
        chapters: [
          ch("territoires-integration-mondialisation", "Des territoires inégalement intégrés à la mondialisation", "Chapitre 1"),
          ch("cooperations-tensions-regulations", "Coopérations, tensions et régulations aux échelles mondiale, régionale et locale", "Chapitre 2"),
        ],
      },
      {
        number: "3",
        title: "L'Union européenne dans la mondialisation : des dynamiques complexes",
        chapters: [
          ch("ue-espace-ouvert", "L'Union européenne, un espace plus ou moins ouvert sur le monde", "Chapitre 1"),
          ch("france-rayonnement-attractivite", "La France : un rayonnement international différencié et une inégale attractivité dans la mondialisation", "Chapitre 2"),
        ],
      },
      {
        number: "C",
        title: "Thème conclusif",
        chapters: [ch("france-regions-mondialisation", "La France et ses régions dans l'Union européenne et dans la mondialisation", "Conclusion")],
      },
    ],
  },
  {
    level: "terminale",
    subject: "hggsp",
    title: "Spécialité HGGSP — Terminale",
    description:
      "Nouveaux espaces de conquête, guerre et paix, histoire et mémoires, patrimoine, environnement et connaissance : six thèmes pour l'épreuve écrite et le grand oral.",
    themes: [
      {
        number: "1",
        title: "De nouveaux espaces de conquête",
        chapters: [
          ch("conquetes-puissance-rivalites", "Conquêtes, affirmations de puissance et rivalités", "Axe 1", "/space-race-satellites.jpg"),
          ch("espaces-cooperations-diplomatie", "Enjeux diplomatiques et coopérations", "Axe 2"),
          ch("chine-conquete-espace-mers", "La Chine : à la conquête de l'espace, des mers et des océans", "Objet conclusif", "/china-great-wall.jpg"),
        ],
      },
      {
        number: "2",
        title: "Faire la guerre, faire la paix : formes de conflits et modes de résolution",
        chapters: [
          ch("dimension-politique-guerre", "La dimension politique de la guerre : des conflits interétatiques aux enjeux transnationaux", "Axe 1", "/ukraine-flag.jpg"),
          ch("construction-de-la-paix", "Le défi de la construction de la paix", "Axe 2"),
          ch("moyen-orient-conflits", "Le Moyen-Orient : conflits régionaux et tentatives de paix impliquant des acteurs internationaux", "Objet conclusif", "/middle-east-map.jpg"),
        ],
      },
      {
        number: "3",
        title: "Histoire et mémoires",
        chapters: [
          ch("memoires-des-conflits", "Histoire et mémoires des conflits", "Axe 1"),
          ch("histoire-memoire-justice", "Histoire, mémoire et justice", "Axe 2"),
          ch("genocide-juifs-tsiganes", "L'histoire et les mémoires du génocide des Juifs et des Tsiganes", "Objet conclusif"),
        ],
      },
      {
        number: "4",
        title: "Identifier, protéger et valoriser le patrimoine : enjeux géopolitiques",
        chapters: [
          ch("usages-du-patrimoine", "Usages sociaux et politiques du patrimoine", "Axe 1"),
          ch("patrimoine-preservation-tensions", "Patrimoine, la préservation entre tensions et concurrences", "Axe 2"),
          ch("france-et-patrimoine", "La France et le patrimoine, des actions majeures de valorisation et de protection", "Objet conclusif"),
        ],
      },
      {
        number: "5",
        title: "L'environnement, entre exploitation et protection : un enjeu planétaire",
        chapters: [
          ch("exploiter-preserver-proteger", "Exploiter, préserver et protéger", "Axe 1", "/biodiversity-rainforest.jpg"),
          ch("changement-climatique", "Le changement climatique : approches historique et géopolitique", "Axe 2", "/climate-change-earth.jpg"),
          ch("etats-unis-environnement", "Les États-Unis et la question environnementale : tensions et contrastes", "Objet conclusif"),
        ],
      },
      {
        number: "6",
        title: "L'enjeu de la connaissance",
        chapters: [
          ch("produire-diffuser-connaissances", "Produire et diffuser des connaissances", "Axe 1"),
          ch("connaissance-enjeu-geopolitique", "La connaissance, enjeu politique et géopolitique", "Axe 2"),
          ch("cyberespace", "Le cyberespace : conflictualité et coopération entre les acteurs", "Objet conclusif"),
        ],
      },
    ],
  },
]

// ───────────────────────────── Helpers ─────────────────────────────

export interface ChapterLocation {
  level: Level
  subject: Subject
  programme: Programme
  theme: Theme
  chapter: ChapterRef
  path: string
}

export function chapterPath(level: LevelSlug, subject: SubjectSlug, slug: string) {
  return `/${level}/${subject}/${slug}`
}

export function getLevel(slug: string) {
  return levels.find((l) => l.slug === slug)
}

export function getSubject(slug: string) {
  return subjects.find((s) => s.slug === slug)
}

export function getProgramme(level: string, subject: string) {
  return programmes.find((p) => p.level === level && p.subject === subject)
}

export function getProgrammesForLevel(level: string) {
  return programmes.filter((p) => p.level === level)
}

export const allChapters: ChapterLocation[] = programmes.flatMap((programme) =>
  programme.themes.flatMap((theme) =>
    theme.chapters.map((chapter) => ({
      level: getLevel(programme.level)!,
      subject: getSubject(programme.subject)!,
      programme,
      theme,
      chapter,
      path: chapterPath(programme.level, programme.subject, chapter.slug),
    })),
  ),
)

export function findChapter(level: string, subject: string, slug: string) {
  return allChapters.find((c) => c.level.slug === level && c.subject.slug === subject && c.chapter.slug === slug)
}

export function findChapterBySlug(slug: string) {
  return allChapters.find((c) => c.chapter.slug === slug)
}

export function themeLabel(theme: Theme) {
  return theme.number === "C" ? theme.title : `Thème ${theme.number}`
}
