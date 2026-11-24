import type { ChapterContent } from "../types"

const chapter: ChapterContent = {
  slug: "changement-climatique",
  metaDescription:
    "Fiche HGGSP Terminale, thème 5 axe 2 : le changement climatique, approches historique et géopolitique. GIEC, COP, accord de Paris, inégalités. Quiz.",
  updatedAt: "2026-11-24",
  intro:
    "Le climat de la Terre a toujours varié, mais le réchauffement actuel est d'une rapidité inédite et d'origine humaine. Il est causé principalement par les émissions de gaz à effet de serre liées aux énergies fossiles. Phénomène physique, le **changement climatique** est aussi un objet d'histoire et un **enjeu géopolitique** majeur : il oppose des États aux responsabilités, aux vulnérabilités et aux intérêts très différents.",
  problematique:
    "Comment le changement climatique est-il devenu un enjeu géopolitique mondial, et pourquoi la coopération internationale est-elle si difficile ?",
  sections: [
    {
      title: "Les climats ont une histoire",
      paragraphs: [
        "Les sociétés ont toujours dû s'adapter aux variations du climat. Le **petit âge glaciaire** (XIVe-XIXe siècle environ) a provoqué en Europe de mauvaises récoltes et des famines. L'historien **Emmanuel Le Roy Ladurie** a été un pionnier de l'histoire du climat, en utilisant des sources comme les dates des vendanges.",
        "Depuis la **révolution industrielle**, l'usage massif du charbon, puis du pétrole et du gaz, a fait augmenter la concentration de CO₂ dans l'atmosphère. Selon le GIEC, la température moyenne mondiale a augmenté d'environ **1,1 °C** au début des années 2020 par rapport à l'ère préindustrielle, et l'influence humaine en est la cause « sans équivoque ».",
      ],
    },
    {
      title: "Un savoir scientifique devenu enjeu politique",
      paragraphs: [
        "Le **GIEC** (Groupe d'experts intergouvernemental sur l'évolution du climat), créé en 1988, synthétise les travaux scientifiques mondiaux. Ses rapports successifs ont renforcé la certitude que l'homme est responsable du réchauffement. Il a reçu le prix Nobel de la paix en 2007.",
        "Les conclusions des scientifiques ont pourtant été contestées. Des industries des énergies fossiles ont financé des campagnes de doute, et le **climatoscepticisme** reste influent dans certains pays. Le climat est donc aussi un enjeu de débat public.",
      ],
    },
    {
      title: "La difficile gouvernance mondiale du climat",
      paragraphs: [
        "Au **sommet de la Terre de Rio** (1992) est adoptée la Convention-cadre des Nations unies sur les changements climatiques, qui organise chaque année une **COP** (Conférence des parties). Le **protocole de Kyoto** (1997) impose des réductions d'émissions aux seuls pays développés. Les États-Unis ne le ratifient pas, et les grands pays émergents n'ont pas d'obligations.",
        "L'**accord de Paris** (COP21, 2015) fixe l'objectif de limiter le réchauffement « nettement en dessous de 2 °C », si possible à 1,5 °C. Chaque État définit ses propres engagements. L'accord est universel mais non contraignant. Les États-Unis s'en retirent une première fois sous Donald Trump, le réintègrent en 2021 sous Joe Biden, puis annoncent un nouveau retrait en 2025.",
      ],
      keyPoints: [
        "Principe des « responsabilités communes mais différenciées » entre pays du Nord et du Sud.",
        "La Chine est le premier émetteur annuel ; les États-Unis sont les premiers émetteurs cumulés depuis 1850.",
      ],
    },
    {
      title: "Des tensions et des inégalités face au climat",
      paragraphs: [
        "Les pays les plus vulnérables, comme les petits États insulaires du Pacifique ou les pays du Sahel, sont souvent ceux qui ont le moins émis. Ils réclament une **justice climatique** et des financements. La COP27 (2022) a décidé la création d'un fonds « pertes et dommages ».",
        "Le changement climatique est aussi un « **multiplicateur de menaces** » : il peut aggraver les tensions sur l'eau, l'insécurité alimentaire et les migrations. La fonte des glaces en Arctique ouvre de nouvelles rivalités. Enfin, la **transition énergétique** crée de nouvelles dépendances, par exemple pour les métaux critiques largement raffinés en Chine.",
      ],
    },
  ],
  dates: [
    { date: "1988", event: "Création du GIEC" },
    { date: "1992", event: "Sommet de la Terre de Rio : Convention-cadre sur les changements climatiques" },
    { date: "1997", event: "Protocole de Kyoto" },
    { date: "2007", event: "Prix Nobel de la paix pour le GIEC et Al Gore" },
    { date: "2015", event: "Accord de Paris (COP21)" },
    { date: "2021", event: "6e rapport du GIEC : influence humaine « sans équivoque »" },
    { date: "2022", event: "COP27 : création d'un fonds « pertes et dommages »" },
  ],
  notions: [
    { term: "Changement climatique", definition: "Modification durable du climat mondial. Le réchauffement actuel est principalement dû aux activités humaines." },
    { term: "Gaz à effet de serre", definition: "Gaz (CO₂, méthane…) qui retiennent la chaleur dans l'atmosphère." },
    { term: "GIEC", definition: "Groupe d'experts intergouvernemental qui synthétise l'état des connaissances scientifiques sur le climat." },
    { term: "COP", definition: "Conférence des parties : réunion annuelle des États signataires de la Convention-cadre de 1992." },
    { term: "Justice climatique", definition: "Revendication d'une répartition équitable des efforts et des aides selon les responsabilités et les vulnérabilités." },
    { term: "Transition énergétique", definition: "Passage d'un système fondé sur les énergies fossiles à des énergies bas-carbone." },
  ],
  actors: [
    { name: "GIEC", role: "Instance scientifique de référence sur le climat, créée par l'ONU et l'OMM." },
    { name: "Chine et États-Unis", role: "Premier émetteur annuel et premier émetteur historique de CO₂." },
    { name: "Alliance des petits États insulaires", role: "Coalition d'États très vulnérables à la montée des eaux." },
    { name: "ONG et société civile", role: "Elles mobilisent l'opinion et pèsent sur les négociations, comme lors des marches pour le climat." },
  ],
  sujets: [
    "Le changement climatique, un enjeu géopolitique majeur.",
    "Les difficultés de la gouvernance mondiale du climat depuis 1992.",
    "Histoire du climat et sociétés humaines.",
  ],
  flashcards: [
    { front: "Qu'est-ce que le GIEC ?", back: "Le Groupe d'experts intergouvernemental sur l'évolution du climat, créé en 1988 : il synthétise les connaissances scientifiques." },
    { front: "Quel est l'objectif de l'accord de Paris ?", back: "Limiter le réchauffement nettement en dessous de 2 °C, si possible à 1,5 °C, par rapport à l'ère préindustrielle." },
    { front: "Pourquoi le protocole de Kyoto est-il limité ?", back: "Il n'impose des objectifs qu'aux pays développés, et les États-Unis ne l'ont pas ratifié." },
    { front: "Qu'est-ce qu'une COP ?", back: "La conférence annuelle des États signataires de la Convention-cadre de l'ONU sur les changements climatiques (1992)." },
    { front: "Qu'est-ce que le petit âge glaciaire ?", back: "Une période de refroidissement relatif (XIVe-XIXe siècle environ) qui a provoqué de mauvaises récoltes en Europe." },
    { front: "Qu'est-ce que la justice climatique ?", back: "L'idée que les pays les plus responsables doivent aider les plus vulnérables, qui ont peu émis." },
    { front: "Que décide la COP27 (2022) ?", back: "La création d'un fonds « pertes et dommages » pour les pays vulnérables." },
    { front: "Pourquoi parle-t-on de « multiplicateur de menaces » ?", back: "Parce que le changement climatique aggrave les tensions existantes : eau, alimentation, migrations." },
  ],
  quiz: [
    {
      question: "En quelle année le GIEC est-il créé ?",
      options: ["1972", "1988", "1992", "2015"],
      answer: 1,
      explanation: "Le GIEC est créé en 1988 par l'Organisation météorologique mondiale et le Programme des Nations unies pour l'environnement.",
    },
    {
      question: "Quel accord fixe l'objectif de limiter le réchauffement « nettement en dessous de 2 °C » ?",
      options: ["Le protocole de Kyoto", "L'accord de Paris", "La convention de Rio", "Le protocole de Montréal"],
      answer: 1,
      explanation: "L'accord de Paris est adopté lors de la COP21 en décembre 2015. Le protocole de Montréal (1987) concerne la couche d'ozone.",
    },
    {
      question: "Quel pays est aujourd'hui le premier émetteur annuel de CO₂ ?",
      options: ["Les États-Unis", "L'Inde", "La Chine", "La Russie"],
      answer: 2,
      explanation: "La Chine est le premier émetteur annuel depuis le milieu des années 2000. Les États-Unis restent les premiers émetteurs cumulés.",
    },
    {
      question: "Quel historien a été un pionnier de l'histoire du climat ?",
      options: ["Fernand Braudel", "Emmanuel Le Roy Ladurie", "Marc Bloch", "Pierre Nora"],
      answer: 1,
      explanation: "Emmanuel Le Roy Ladurie publie Histoire du climat depuis l'an mil (1967), en utilisant notamment les dates de vendanges.",
    },
    {
      question: "Quelle est la principale limite de l'accord de Paris ?",
      options: ["Il ne concerne que l'Europe", "Il n'est pas juridiquement contraignant sur les engagements de réduction", "Il exclut la Chine", "Il n'a jamais été signé"],
      answer: 1,
      explanation: "Chaque État fixe librement ses contributions nationales, sans sanction en cas de non-respect.",
    },
    {
      question: "Qu'est-ce que le climatoscepticisme ?",
      options: [
        "Une branche de la climatologie",
        "La remise en cause de la réalité ou de l'origine humaine du réchauffement",
        "Une politique d'adaptation",
        "Un fonds de l'ONU",
      ],
      answer: 1,
      explanation: "Le climatoscepticisme conteste le consensus scientifique. Il a parfois été soutenu par des intérêts liés aux énergies fossiles.",
    },
    {
      question: "Que réclament les petits États insulaires lors des négociations ?",
      options: ["Moins d'ambition climatique", "Une justice climatique et des financements", "La sortie de l'ONU", "Le droit d'exploiter le pétrole arctique"],
      answer: 1,
      explanation: "Très exposés à la montée des eaux, ces États militent pour l'objectif de 1,5 °C et pour l'aide aux pays vulnérables.",
    },
    {
      question: "De combien la température moyenne mondiale a-t-elle augmenté depuis l'ère préindustrielle, selon le GIEC (2021) ?",
      options: ["Environ 0,2 °C", "Environ 1,1 °C", "Environ 3 °C", "Environ 5 °C"],
      answer: 1,
      explanation: "Le 6e rapport du GIEC estime le réchauffement à environ 1,1 °C sur la période 2011-2020 par rapport à 1850-1900.",
    },
  ],
}

export default chapter
