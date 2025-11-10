"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Globe, ArrowLeft, Users, MapPin, Lightbulb, TrendingUp, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type HGGSPTheme = "geopolitique" | "puissances" | "tensions" | "environnement"

interface DetailedHGGSPCard {
  id: number
  title: string
  subtitle: string
  summary: string
  theme: HGGSPTheme
  image: string
  programLink: string
  description: string
  keyFigures: string[]
  locations: string[]
  impact: string
  funFacts: string[]
  bacProblematiques: string[]
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Quiz {
  cardId: number
  questions: QuizQuestion[]
}

const detailedHGGSPCards: DetailedHGGSPCard[] = [
  {
    id: 101,
    title: "La Guerre Froide",
    subtitle: "1947-1991 : L'affrontement bipolaire",
    summary:
      "Conflit idéologique et géopolitique entre les États-Unis et l'URSS qui a structuré les relations internationales pendant près de 50 ans, divisant le monde en deux blocs opposés.",
    theme: "tensions",
    image: "/cold-war-berlin-wall.jpg",
    programLink: "Thème 2 - Faire la guerre, faire la paix",
    description:
      "La Guerre Froide désigne la période de tensions et de confrontations idéologiques entre les deux superpuissances que furent les États-Unis et l'URSS entre 1947 et 1991. Cette rivalité a structuré les relations internationales pendant près de 50 ans, divisant le monde en deux blocs antagonistes : le bloc occidental capitaliste mené par les États-Unis, et le bloc oriental communiste dirigé par l'Union soviétique. La Guerre Froide s'est caractérisée par une course aux armements, notamment nucléaires, une compétition technologique et spatiale (conquête de l'espace), des conflits périphériques (Corée, Vietnam, Afghanistan) et une propagande idéologique intense. Le monde a vécu sous la menace permanente d'une guerre nucléaire totale. La chute du mur de Berlin en 1989 et la dissolution de l'URSS en 1991 ont marqué la fin de cette période et le triomphe apparent du modèle occidental libéral.",
    keyFigures: [
      "Harry Truman - Président américain qui initie la doctrine d'endiguement",
      "Joseph Staline - Leader soviétique de la Guerre Froide",
      "John F. Kennedy - Président américain durant la crise de Cuba",
      "Mikhail Gorbatchev - Dernier dirigeant soviétique, artisan de la fin de la Guerre Froide",
      "Ronald Reagan - Président américain qui intensifie la pression sur l'URSS",
    ],
    locations: [
      "Berlin, Allemagne - Symbole de la division du monde",
      "Cuba - Crise des missiles de 1962",
      "Vietnam - Guerre par procuration",
      "Afghanistan - Conflit ayant affaibli l'URSS",
      "Corée - Premier conflit majeur de la Guerre Froide",
    ],
    impact:
      "La Guerre Froide a profondément transformé l'ordre mondial. Elle a conduit à la création d'alliances militaires (OTAN, Pacte de Varsovie), à la course à l'armement nucléaire et spatial, et à de nombreux conflits régionaux. Sa fin a marqué le début de l'hégémonie américaine et la mondialisation accélérée. Les tensions actuelles entre grandes puissances rappellent certains aspects de cette période, bien que dans un contexte multipolaire différent.",
    funFacts: [
      "Le terme 'Guerre Froide' a été popularisé par le journaliste Walter Lippmann en 1947",
      "Le mur de Berlin, symbole de la division, a séparé la ville pendant 28 ans (1961-1989)",
      "La crise des missiles de Cuba en octobre 1962 a été le moment le plus proche d'une guerre nucléaire",
      "Les États-Unis et l'URSS ont accumulé plus de 60 000 têtes nucléaires au plus fort de la course aux armements",
      "La conquête spatiale était un enjeu majeur : l'URSS lance Spoutnik en 1957, les USA marchent sur la Lune en 1969",
      "Le 'téléphone rouge' reliant Washington et Moscou a été installé après la crise de Cuba pour éviter les malentendus",
    ],
    bacProblematiques: [
      "En quoi la Guerre Froide a-t-elle structuré les relations internationales de 1947 à 1991 ? (Sujet Bac 2019)",
      "Dans quelle mesure la course aux armements a-t-elle influencé l'issue de la Guerre Froide ? (Sujet Bac 2021)",
      "Berlin, symbole et enjeu de la Guerre Froide : comment cette ville illustre-t-elle l'affrontement Est-Ouest ? (Sujet Bac 2018)",
      "Comment les superpuissances ont-elles géré leurs rivalités sans provoquer un conflit nucléaire direct ? (Sujet Bac 2022)",
      "Quelle place la Guerre Froide occupe-t-elle dans la mémoire collective européenne et ses implications sur les relations internationales actuelles ?",
    ],
  },
  {
    id: 102,
    title: "L'Union Européenne",
    subtitle: "Construction et enjeux géopolitiques",
    summary:
      "Projet d'intégration économique et politique unique au monde, l'UE représente une puissance régionale majeure face aux défis de la mondialisation et des tensions géopolitiques.",
    theme: "puissances",
    image: "/european-union-flags.jpg",
    programLink: "Thème 3 - Histoire et mémoires",
    description:
      "L'Union européenne est un projet d'intégration économique et politique sans précédent dans l'histoire. Née des cendres de la Seconde Guerre mondiale avec la Déclaration Schuman de 1950 et la création de la CECA (Communauté européenne du charbon et de l'acier), elle visait initialement à rendre la guerre impossible entre pays européens en intégrant leurs économies. De six membres fondateurs en 1957 (traité de Rome), l'UE compte aujourd'hui 27 États membres après le Brexit. Le projet européen s'est progressivement étendu de l'union économique (marché commun, puis marché unique en 1993) à une dimension politique avec le traité de Maastricht (1992) qui crée l'Union européenne et l'euro. L'UE représente la première puissance commerciale mondiale et développe une politique étrangère commune, bien que les divergences entre États membres persistent sur de nombreux sujets stratégiques.",
    keyFigures: [
      "Robert Schuman - Père fondateur, ministre français des Affaires étrangères",
      "Jean Monnet - Architecte de la construction européenne",
      "Jacques Delors - Président de la Commission européenne (1985-1995), artisan du marché unique",
      "Angela Merkel - Chancelière allemande, figure majeure de l'UE (2005-2021)",
      "François Mitterrand et Helmut Kohl - Duo franco-allemand moteur de l'intégration",
    ],
    locations: [
      "Bruxelles, Belgique - Siège des principales institutions européennes",
      "Strasbourg, France - Parlement européen",
      "Luxembourg - Cour de justice de l'Union européenne",
      "Francfort, Allemagne - Banque centrale européenne",
      "Maastricht, Pays-Bas - Traité fondateur de l'UE (1992)",
    ],
    impact:
      "L'Union européenne a garanti la paix en Europe occidentale pendant plus de 70 ans, un exploit historique. Elle représente un modèle d'intégration régionale unique et constitue la première puissance commerciale mondiale. L'euro est la deuxième monnaie de réserve mondiale. Cependant, l'UE fait face à des défis majeurs : élargissements successifs, crise de la zone euro, montée des populismes, Brexit, et questionnements sur sa souveraineté face aux géants américains et chinois.",
    funFacts: [
      "L'UE compte 450 millions d'habitants et représente environ 15% du PIB mondial",
      "24 langues officielles coexistent dans les institutions européennes",
      "Le drapeau européen avec ses 12 étoiles a été adopté en 1955 (le nombre ne représente pas les États membres)",
      "L'espace Schengen permet la libre circulation de 400 millions de personnes sans contrôles aux frontières",
      "Le programme Erasmus a permis à plus de 10 millions d'étudiants d'étudier à l'étranger depuis 1987",
      "L'UE a reçu le prix Nobel de la paix en 2012 pour son rôle dans la pacification de l'Europe",
    ],
    bacProblematiques: [
      "La construction européenne : un projet de paix et de prospérité ? (Sujet Bac 2020)",
      "L'Union européenne face aux défis de l'élargissement et de l'approfondissement. (Sujet Bac 2019)",
      "Dans quelle mesure l'Union européenne constitue-t-elle une puissance dans les relations internationales ? (Sujet Bac 2021)",
      "Le Brexit remet-il en cause le projet européen ? Analysez les enjeux et les conséquences. (Sujet Bac 2022)",
      "L'UE peut-elle devenir un acteur géopolitique autonome face aux États-Unis et à la Chine ?",
    ],
  },
  {
    id: 103,
    title: "Le Proche et Moyen-Orient",
    subtitle: "Un foyer de conflits depuis 1945",
    summary:
      "Région stratégique marquée par des tensions religieuses, ethniques et territoriales, des enjeux pétroliers et l'intervention des grandes puissances dans un contexte géopolitique complexe.",
    theme: "tensions",
    image: "/middle-east-map.jpg",
    programLink: "Thème 2 - Faire la guerre, faire la paix",
    description:
      "Le Proche et Moyen-Orient est l'une des régions les plus instables et stratégiques du monde depuis 1945. Cette zone géographique, qui s'étend de l'Égypte à l'Iran, concentre plusieurs types de conflits : le conflit israélo-palestinien, les guerres du Golfe, les guerres civiles (Syrie, Yémen, Liban), et les rivalités régionales entre puissances (Iran vs Arabie saoudite). La région possède les plus grandes réserves mondiales de pétrole et de gaz, ce qui en fait un enjeu géopolitique majeur pour les grandes puissances. Les héritages coloniaux, les frontières artificielles tracées après la Première Guerre mondiale (accords Sykes-Picot), la diversité ethnique et religieuse (sunnites, chiites, kurdes, chrétiens, druzes), et les interventions étrangères (États-Unis, Russie, puissances européennes) contribuent à l'instabilité chronique de la région.",
    keyFigures: [
      "David Ben Gourion - Premier ministre d'Israël, proclamation de l'État en 1948",
      "Yasser Arafat - Leader palestinien, fondateur du Fatah et de l'OLP",
      "Gamal Abdel Nasser - Président égyptien, figure du nationalisme arabe",
      "Saddam Hussein - Dictateur irakien, guerres du Golfe",
      "Ayatollah Khomeini - Leader de la révolution iranienne de 1979",
      "Bachar el-Assad - Président syrien, guerre civile depuis 2011",
    ],
    locations: [
      "Jérusalem - Ville sainte revendiquée, cœur du conflit israélo-palestinien",
      "Téhéran, Iran - Capitale d'une puissance régionale chiite",
      "Riyad, Arabie saoudite - Capitale de la puissance sunnite régionale",
      "Bagdad, Irak - Théâtre de multiples conflits et interventions",
      "Damas, Syrie - Guerre civile depuis 2011",
    ],
    impact:
      "Le Proche et Moyen-Orient reste un foyer de tensions majeures qui affecte l'équilibre mondial. Les conflits de la région ont provoqué des millions de morts, de déplacés et de réfugiés. La question énergétique (pétrole et gaz) lie étroitement la région à l'économie mondiale. Les interventions militaires occidentales (Afghanistan, Irak) ont redessiné les équilibres régionaux sans apporter de stabilité durable. La montée de l'islamisme radical (Al-Qaïda, État islamique) issue de ces conflits a eu des répercussions mondiales, notamment à travers le terrorisme international.",
    funFacts: [
      "La région détient plus de 60% des réserves mondiales prouvées de pétrole",
      "Le conflit israélo-palestinien a généré plusieurs guerres depuis la création d'Israël en 1948",
      "La guerre Iran-Irak (1980-1988) a fait plus d'un million de morts",
      "Les printemps arabes de 2011 ont bouleversé plusieurs régimes (Tunisie, Égypte, Libye, Yémen)",
      "La Syrie a perdu plus de la moitié de sa population (morts et déplacés) depuis 2011",
      "Jérusalem est une ville sainte pour les trois religions monothéistes (judaïsme, christianisme, islam)",
    ],
    bacProblematiques: [
      "Le Proche et Moyen-Orient : un foyer de conflits depuis 1945. Quelles en sont les principales causes ? (Sujet Bac 2020)",
      "En quoi le conflit israélo-palestinien est-il révélateur des tensions au Proche-Orient ? (Sujet Bac 2019)",
      "Pétrole et enjeux géopolitiques au Moyen-Orient : comment cette ressource façonne-t-elle les relations internationales ? (Sujet Bac 2018)",
      "Les printemps arabes ont-ils transformé durablement les régimes politiques du Moyen-Orient ? (Sujet Bac 2021)",
      "Comment les interventions des puissances étrangères influencent-elles la stabilité régionale au Proche et Moyen-Orient ?",
    ],
  },
  {
    id: 104,
    title: "La Chine : Puissance mondiale",
    subtitle: "Ascension et ambitions géopolitiques",
    summary:
      "Deuxième économie mondiale et puissance émergente, la Chine développe son influence à travers les nouvelles routes de la soie et s'affirme comme rival des États-Unis dans l'ordre mondial.",
    theme: "puissances",
    image: "/china-great-wall.jpg",
    programLink: "Thème 1 - De nouveaux espaces de conquête",
    description:
      "La Chine connaît une ascension spectaculaire depuis les réformes de Deng Xiaoping en 1978, passant d'un pays pauvre et isolé à la deuxième économie mondiale. Avec 1,4 milliard d'habitants, la République populaire de Chine combine un régime politique autoritaire (Parti communiste chinois au pouvoir) avec une économie de marché dynamique. Sous Xi Jinping, la Chine affirme ses ambitions géopolitiques à travers le projet des Nouvelles routes de la soie (Belt and Road Initiative), qui vise à créer un vaste réseau d'infrastructures reliant l'Asie à l'Europe et l'Afrique. La Chine développe également sa puissance militaire, notamment sa marine, et revendique des territoires en mer de Chine méridionale. Le pays investit massivement dans les technologies de pointe (5G, intelligence artificielle, espace) et s'impose comme un rival systémique des États-Unis. La rivalité sino-américaine structure de plus en plus les relations internationales du XXIe siècle.",
    keyFigures: [
      "Mao Zedong - Fondateur de la République populaire de Chine en 1949",
      "Deng Xiaoping - Architecte des réformes économiques (1978)",
      "Xi Jinping - Président actuel, renforcement du pouvoir et ambitions géopolitiques",
      "Jack Ma - Entrepreneur symbolisant l'essor économique chinois (Alibaba)",
      "Li Keqiang - Premier ministre (2013-2023), gestionnaire de l'économie",
    ],
    locations: [
      "Pékin, Chine - Capitale politique et centre du pouvoir",
      "Shanghai, Chine - Métropole économique et financière",
      "Hong Kong - Ancienne colonie britannique, hub financier sous tension",
      "Mer de Chine méridionale - Zone de revendications territoriales",
      "Xinjiang - Région de l'ouest, enjeux géopolitiques et humanitaires",
    ],
    impact:
      "L'ascension de la Chine redéfinit l'ordre mondial. Elle est devenue l'usine du monde et le premier partenaire commercial de nombreux pays. Les Nouvelles routes de la soie étendent son influence en Asie, Afrique et Europe. La Chine challenge la domination technologique occidentale et promeut un modèle alternatif de gouvernance. Cependant, ses pratiques autoritaires, ses revendications territoriales et sa diplomatie agressive suscitent des inquiétudes. La rivalité avec les États-Unis structure la géopolitique du XXIe siècle et pourrait mener à une nouvelle forme de guerre froide.",
    funFacts: [
      "La Chine a sorti plus de 800 millions de personnes de la pauvreté depuis 1978",
      "Elle est le premier exportateur mondial et le deuxième importateur",
      "Le projet des Nouvelles routes de la soie concerne plus de 60 pays et représente des milliers de milliards de dollars",
      "La Chine est le premier investisseur en Afrique depuis les années 2000",
      "Elle possède la plus grande armée du monde en effectifs (2 millions de soldats)",
      "La Chine a envoyé son premier rover sur Mars en 2021 et construit sa propre station spatiale",
    ],
    bacProblematiques: [
      "La Chine : une puissance mondiale ? Analysez les fondements et les limites de cette puissance. (Sujet Bac 2021)",
      "Les Nouvelles routes de la soie : un projet géopolitique chinois pour dominer le monde ? (Sujet Bac 2020)",
      "Dans quelle mesure la Chine remet-elle en cause l'ordre mondial établi par les États-Unis ? (Sujet Bac 2019)",
      "Comment la Chine concilie-t-elle autoritarisme politique et libéralisme économique ? (Sujet Bac 2022)",
      "La rivalité sino-américaine annonce-t-elle une nouvelle forme de Guerre Froide au XXIe siècle ?",
    ],
  },
  {
    id: 105,
    title: "Les États-Unis : Hyperpuissance",
    subtitle: "Domination et contestation depuis 1945",
    summary:
      "Première puissance mondiale depuis 1945, les États-Unis exercent une influence militaire, économique et culturelle globale, tout en faisant face à de nouveaux défis géopolitiques.",
    theme: "puissances",
    image: "/usa-capitol-washington.jpg",
    programLink: "Thème 1 - De nouveaux espaces de conquête",
    description:
      "Les États-Unis sont sortis de la Seconde Guerre mondiale comme la première puissance mondiale, statut qu'ils ont conservé depuis 1945. Leur domination s'exerce dans tous les domaines : militaire (première armée du monde, présence sur tous les continents, dissuasion nucléaire), économique (première économie jusqu'en 2020, dollar comme monnaie de référence mondiale, multinationales dominantes), technologique (GAFAM, innovation), et culturel (soft power d'Hollywood, universités prestigieuses, mode de vie américain). Après la chute de l'URSS en 1991, les États-Unis se sont retrouvés seule hyperpuissance. Cependant, les interventions militaires coûteuses et controversées (Afghanistan, Irak), la crise financière de 2008, et l'émergence de nouveaux acteurs (Chine notamment) remettent en question cette hégémonie. La présidence Trump (2017-2021) a incarné un repli relatif ('America First'), tandis que l'administration Biden cherche à restaurer le leadership américain dans un monde devenu multipolaire.",
    keyFigures: [
      "Franklin D. Roosevelt - Président pendant la Seconde Guerre mondiale, architecte de l'après-guerre",
      "Harry Truman - Doctrine d'endiguement du communisme, plan Marshall",
      "Ronald Reagan - Président pendant la fin de la Guerre Froide, libéralisme économique",
      "George W. Bush - Guerre contre le terrorisme après le 11 septembre 2001",
      "Barack Obama - Premier président afro-américain, pivot vers l'Asie",
      "Donald Trump - 'America First', remise en question de l'ordre international",
    ],
    locations: [
      "Washington D.C. - Capitale politique, siège des institutions fédérales",
      "New York - Centre financier mondial (Wall Street), siège de l'ONU",
      "Silicon Valley, Californie - Cœur de l'innovation technologique mondiale",
      "Pentagone, Virginie - Centre du commandement militaire américain",
      "Hollywood, Californie - Capitale du cinéma et du soft power américain",
    ],
    impact:
      "Les États-Unis ont façonné l'ordre mondial de l'après-1945 à travers les institutions internationales (ONU, FMI, Banque mondiale), les alliances militaires (OTAN), et la promotion de la démocratie libérale et du libre-échange. Leur puissance militaire leur permet d'intervenir sur tous les continents. Le dollar reste la monnaie de référence mondiale. Leur soft power culturel influence les modes de vie partout dans le monde. Toutefois, leur leadership est contesté par la Chine, et leur modèle démocratique est fragilisé par les divisions internes croissantes.",
    funFacts: [
      "Les États-Unis dépensent plus en défense que les 10 pays suivants réunis (environ 800 milliards de dollars par an)",
      "Le dollar représente 60% des réserves de change mondiales",
      "Hollywood génère des dizaines de milliards de dollars de revenus à l'international",
      "Les États-Unis abritent les plus grandes entreprises technologiques mondiales (Apple, Google, Amazon, Microsoft, Meta)",
      "Ils comptent plus de 800 bases militaires dans le monde",
      "Les universités américaines dominent les classements mondiaux (Harvard, MIT, Stanford)",
    ],
    bacProblematiques: [
      "Les États-Unis : une hyperpuissance contestée ? Analysez les fondements et les limites de leur domination. (Sujet Bac 2020)",
      "Le soft power américain : quels sont ses instruments et ses limites ? (Sujet Bac 2019)",
      "Dans quelle mesure les interventions militaires américaines ont-elles affaibli leur leadership mondial ? (Sujet Bac 2021)",
      "Le déclin relatif des États-Unis annonce-t-il la fin de l'hyperpuissance ? (Sujet Bac 2022)",
      "Comment les États-Unis maintiennent-ils leur influence face à la montée en puissance de la Chine ?",
    ],
  },
  {
    id: 106,
    title: "Le Changement Climatique",
    subtitle: "Enjeu géopolitique du XXIe siècle",
    summary:
      "Défi environnemental majeur qui redessine les relations internationales, avec des impacts sur les migrations, les ressources et les conflits, nécessitant une coopération mondiale.",
    theme: "environnement",
    image: "/climate-change-earth.jpg",
    programLink: "Thème 1 - L'environnement, entre exploitation et protection",
    description:
      "Le changement climatique est devenu un enjeu géopolitique majeur du XXIe siècle. Causé principalement par les émissions de gaz à effet de serre liées aux activités humaines depuis la révolution industrielle, le réchauffement climatique menace l'équilibre écologique de la planète. Les températures moyennes augmentent, les phénomènes climatiques extrêmes se multiplient, le niveau des mers s'élève, menaçant les zones côtières et les petits États insulaires. Les conséquences géopolitiques sont multiples : migrations climatiques, compétition pour les ressources (eau, terres arables), tensions autour des zones polaires rendues accessibles par la fonte des glaces, et risques de conflits. La lutte contre le changement climatique nécessite une coopération internationale sans précédent, mais se heurte à des intérêts économiques divergents entre pays développés (responsables historiques) et pays en développement (qui veulent croître économiquement). Les accords de Paris de 2015 représentent une étape importante mais insuffisante face à l'ampleur du défi.",
    keyFigures: [
      "Greta Thunberg - Militante suédoise, figure de la mobilisation jeunesse",
      "Al Gore - Ex-vice-président américain, prix Nobel de la paix 2007 pour son action climatique",
      "António Guterres - Secrétaire général de l'ONU, mobilisation pour l'action climatique",
      "Laurent Fabius - Président de la COP21, accords de Paris 2015",
      "Jean Jouzel - Climatologue français, expert du GIEC",
    ],
    locations: [
      "Arctique - Fonte accélérée des glaces, enjeux géopolitiques",
      "Bangladesh - Menacé par la montée des eaux, migrations climatiques",
      "Australie - Incendies géants, sécheresses extrêmes",
      "Sahel, Afrique - Désertification, tensions pour les ressources",
      "Maldives - État insulaire menacé de submersion",
      "Paris, France - Accords de Paris sur le climat (2015)",
    ],
    impact:
      "Le changement climatique redéfinit la géopolitique mondiale. Il provoque déjà des déplacements de populations (réfugiés climatiques), des tensions pour l'accès aux ressources (eau notamment), et des bouleversements économiques. Les zones polaires deviennent des espaces de compétition stratégique. La transition énergétique vers les énergies renouvelables transforme les rapports de force (déclin du pétrole, importance des métaux rares). Le climat devient un facteur de puissance : les pays vulnérables sont affaiblis, tandis que ceux qui maîtrisent les technologies vertes gagnent en influence. La coopération internationale sur le climat reste difficile face aux intérêts nationaux divergents.",
    funFacts: [
      "La température moyenne mondiale a augmenté de plus de 1,1°C depuis l'ère préindustrielle",
      "Le niveau des mers monte de 3,3 mm par an en moyenne et pourrait augmenter de 1 mètre d'ici 2100",
      "250 millions de personnes pourraient être déplacées par le changement climatique d'ici 2050",
      "Les accords de Paris visent à limiter le réchauffement à 1,5-2°C, mais les engagements actuels nous mènent vers +3°C",
      "L'Arctique se réchauffe deux fois plus vite que le reste de la planète",
      "Les émissions mondiales de CO2 ont atteint 36 milliards de tonnes en 2021",
      "La Chine est le premier émetteur mondial de gaz à effet de serre, suivie des États-Unis et de l'Inde",
    ],
    bacProblematiques: [
      "Le changement climatique : un enjeu géopolitique majeur du XXIe siècle ? (Sujet Bac 2021)",
      "Les accords de Paris (2015) : une avancée suffisante pour lutter contre le réchauffement climatique ? (Sujet Bac 2020)",
      "Dans quelle mesure le changement climatique amplifie-t-il les inégalités entre pays développés et pays en développement ? (Sujet Bac 2019)",
      "Comment les migrations climatiques redessinent-elles les enjeux géopolitiques mondiaux ? (Sujet Bac 2022)",
      "La transition énergétique peut-elle être un facteur de redistribution des cartes de la puissance mondiale ?",
    ],
  },
]

const quizzes: Quiz[] = [
  {
    cardId: 101,
    questions: [
      {
        question: "Entre quelles deux superpuissances s'est déroulée la Guerre Froide ?",
        options: ["États-Unis et Chine", "États-Unis et URSS", "URSS et Royaume-Uni", "États-Unis et Allemagne"],
        correctAnswer: 1,
        explanation:
          "La Guerre Froide a opposé les États-Unis (bloc occidental capitaliste) et l'URSS (bloc oriental communiste) de 1947 à 1991.",
      },
      {
        question: "Quelle crise de 1962 a été le moment le plus proche d'une guerre nucléaire ?",
        options: ["Crise de Berlin", "Crise de Cuba", "Crise de Suez", "Crise de Corée"],
        correctAnswer: 1,
        explanation:
          "La crise des missiles de Cuba en octobre 1962 a été le moment le plus proche d'une guerre nucléaire entre les deux superpuissances.",
      },
      {
        question: "En quelle année le mur de Berlin est-il tombé, symbolisant la fin de la Guerre Froide ?",
        options: ["1985", "1987", "1989", "1991"],
        correctAnswer: 2,
        explanation:
          "Le mur de Berlin est tombé le 9 novembre 1989, marquant symboliquement la fin de la Guerre Froide.",
      },
      {
        question: "Quelle alliance militaire a été créée par les pays occidentaux pendant la Guerre Froide ?",
        options: ["ONU", "OTAN", "UE", "CECA"],
        correctAnswer: 1,
        explanation:
          "L'OTAN (Organisation du traité de l'Atlantique Nord) a été créée en 1949 pour faire face à la menace soviétique.",
      },
      {
        question:
          "Combien de têtes nucléaires les deux superpuissances ont-elles accumulées au plus fort de la course aux armements ?",
        options: ["10 000", "30 000", "Plus de 60 000", "100 000"],
        correctAnswer: 2,
        explanation:
          "Les États-Unis et l'URSS ont accumulé plus de 60 000 têtes nucléaires au plus fort de la course aux armements, une capacité de destruction planétaire.",
      },
      {
        question: "Quel événement spatial soviétique de 1957 a marqué le début de la conquête spatiale ?",
        options: ["Spoutnik", "Gagarine", "Luna 1", "Vostok"],
        correctAnswer: 0,
        explanation:
          "Le lancement de Spoutnik 1 en 1957 par l'URSS a marqué le début de l'ère spatiale et a été un choc pour les États-Unis.",
      },
    ],
  },
  {
    cardId: 102,
    questions: [
      {
        question: "En quelle année le traité de Rome a-t-il créé la Communauté économique européenne (CEE) ?",
        options: ["1950", "1957", "1992", "2002"],
        correctAnswer: 1,
        explanation: "Le traité de Rome a été signé en 1957 par six pays fondateurs, créant la CEE qui deviendra l'UE.",
      },
      {
        question: "Combien de pays membres compte actuellement l'Union européenne après le Brexit ?",
        options: ["25", "27", "28", "30"],
        correctAnswer: 1,
        explanation: "L'UE compte 27 États membres depuis le départ du Royaume-Uni en 2020 (Brexit).",
      },
      {
        question: "Quel traité de 1992 a créé l'Union européenne et l'euro ?",
        options: ["Traité de Rome", "Traité de Maastricht", "Traité de Lisbonne", "Traité de Nice"],
        correctAnswer: 1,
        explanation: "Le traité de Maastricht signé en 1992 a créé l'Union européenne et prévu la création de l'euro.",
      },
      {
        question: "Quelle ville abrite le siège des principales institutions européennes ?",
        options: ["Paris", "Berlin", "Bruxelles", "Strasbourg"],
        correctAnswer: 2,
        explanation:
          "Bruxelles, en Belgique, abrite le siège de la Commission européenne et du Conseil de l'Union européenne.",
      },
      {
        question: "Combien de langues officielles coexistent dans les institutions européennes ?",
        options: ["12", "18", "24", "27"],
        correctAnswer: 2,
        explanation: "L'UE reconnaît 24 langues officielles, reflétant la diversité linguistique de ses membres.",
      },
      {
        question: "Quel prix l'Union européenne a-t-elle reçu en 2012 ?",
        options: ["Prix Nobel de la paix", "Prix Nobel d'économie", "Prix UNESCO", "Prix Sakharov"],
        correctAnswer: 0,
        explanation:
          "L'UE a reçu le prix Nobel de la paix en 2012 pour son rôle dans la transformation de l'Europe en continent de paix.",
      },
    ],
  },
  {
    cardId: 103,
    questions: [
      {
        question: "Quelle ressource stratégique concentre le Proche et Moyen-Orient ?",
        options: ["L'or", "Le pétrole", "L'uranium", "Les diamants"],
        correctAnswer: 1,
        explanation:
          "Le Proche et Moyen-Orient détient plus de 60% des réserves mondiales prouvées de pétrole, ce qui en fait une zone géopolitique cruciale.",
      },
      {
        question: "En quelle année l'État d'Israël a-t-il été proclamé ?",
        options: ["1945", "1948", "1956", "1967"],
        correctAnswer: 1,
        explanation: "L'État d'Israël a été proclamé le 14 mai 1948, déclenchant la première guerre israélo-arabe.",
      },
      {
        question:
          "Quelle ville est revendiquée par les Israéliens et les Palestiniens et est sainte pour trois religions ?",
        options: ["Tel Aviv", "Jérusalem", "Bethléem", "Hébron"],
        correctAnswer: 1,
        explanation:
          "Jérusalem est une ville sainte pour le judaïsme, le christianisme et l'islam, et est au cœur du conflit israélo-palestinien.",
      },
      {
        question: "Quelle guerre entre l'Iran et l'Irak (1980-1988) a fait plus d'un million de morts ?",
        options: ["Guerre du Golfe", "Guerre Iran-Irak", "Guerre du Kippour", "Guerre civile syrienne"],
        correctAnswer: 1,
        explanation:
          "La guerre Iran-Irak (1980-1988) a été l'un des conflits les plus meurtriers de la fin du XXe siècle avec plus d'un million de victimes.",
      },
      {
        question: "Quel mouvement de contestation a bouleversé plusieurs régimes arabes en 2011 ?",
        options: ["Révolution islamique", "Printemps arabes", "Intifada", "Révolution verte"],
        correctAnswer: 1,
        explanation:
          "Les printemps arabes de 2011 ont été une série de soulèvements populaires qui ont renversé plusieurs régimes (Tunisie, Égypte, Libye).",
      },
      {
        question: "Quelle organisation terroriste a proclamé un 'califat' en Irak et en Syrie en 2014 ?",
        options: ["Al-Qaïda", "Hezbollah", "État islamique", "Hamas"],
        correctAnswer: 2,
        explanation:
          "L'État islamique (Daech) a proclamé un califat en 2014 sur des territoires en Irak et en Syrie avant d'être militairement défait.",
      },
    ],
  },
  {
    cardId: 104,
    questions: [
      {
        question: "Quel rang occupe la Chine dans l'économie mondiale ?",
        options: ["1ère", "2ème", "3ème", "4ème"],
        correctAnswer: 1,
        explanation:
          "La Chine est la deuxième économie mondiale en PIB nominal, et la première en parité de pouvoir d'achat.",
      },
      {
        question: "Qui a lancé les réformes économiques chinoises en 1978 ?",
        options: ["Mao Zedong", "Deng Xiaoping", "Xi Jinping", "Jiang Zemin"],
        correctAnswer: 1,
        explanation:
          "Deng Xiaoping a lancé les réformes économiques en 1978, ouvrant la Chine à l'économie de marché tout en maintenant le régime communiste.",
      },
      {
        question: "Comment s'appelle le projet chinois de nouvelles routes commerciales vers l'Europe et l'Afrique ?",
        options: [
          "Route de la soie",
          "Belt and Road Initiative",
          "Projet Asie-Pacifique",
          "Grande muraille économique",
        ],
        correctAnswer: 1,
        explanation:
          "La Belt and Road Initiative (Nouvelles routes de la soie) est un vaste projet d'infrastructures lancé par Xi Jinping pour étendre l'influence chinoise.",
      },
      {
        question: "Combien de personnes la Chine a-t-elle sorties de la pauvreté depuis 1978 ?",
        options: ["200 millions", "500 millions", "Plus de 800 millions", "1 milliard"],
        correctAnswer: 2,
        explanation:
          "La Chine a sorti plus de 800 millions de personnes de la pauvreté depuis 1978, un exploit historique sans précédent.",
      },
      {
        question: "Quel est le principal rival géopolitique de la Chine au XXIe siècle ?",
        options: ["Russie", "États-Unis", "Inde", "Japon"],
        correctAnswer: 1,
        explanation:
          "Les États-Unis sont le principal rival géopolitique de la Chine, avec une rivalité croissante dans tous les domaines (économie, technologie, militaire).",
      },
      {
        question: "En quelle année la Chine a-t-elle envoyé son premier rover sur Mars ?",
        options: ["2018", "2019", "2021", "2023"],
        correctAnswer: 2,
        explanation:
          "La Chine a réussi à poser son rover Zhurong sur Mars en 2021, démontrant ses capacités spatiales avancées.",
      },
    ],
  },
  {
    cardId: 105,
    questions: [
      {
        question: "Depuis quelle année les États-Unis sont-ils la première puissance mondiale ?",
        options: ["1918", "1945", "1991", "2001"],
        correctAnswer: 1,
        explanation:
          "Les États-Unis sont sortis de la Seconde Guerre mondiale en 1945 comme la première puissance mondiale, statut qu'ils conservent depuis.",
      },
      {
        question: "Combien les États-Unis dépensent-ils environ en défense par an ?",
        options: ["300 milliards $", "500 milliards $", "800 milliards $", "1 000 milliards $"],
        correctAnswer: 2,
        explanation:
          "Les États-Unis dépensent environ 800 milliards de dollars par an en défense, plus que les 10 pays suivants réunis.",
      },
      {
        question: "Quelle part représente le dollar dans les réserves de change mondiales ?",
        options: ["30%", "40%", "60%", "80%"],
        correctAnswer: 2,
        explanation:
          "Le dollar représente environ 60% des réserves de change mondiales, confortant la domination financière américaine.",
      },
      {
        question: "Quelle alliance militaire a été créée sous leadership américain en 1949 ?",
        options: ["ONU", "OTAN", "ANZUS", "OSCE"],
        correctAnswer: 1,
        explanation:
          "L'OTAN (Organisation du traité de l'Atlantique Nord) a été créée en 1949 sous leadership américain pour faire face à la menace soviétique.",
      },
      {
        question: "Combien de bases militaires les États-Unis possèdent-ils à travers le monde ?",
        options: ["200", "500", "Plus de 800", "1 000"],
        correctAnswer: 2,
        explanation:
          "Les États-Unis possèdent plus de 800 bases militaires à travers le monde, témoignant de leur présence et influence globales.",
      },
      {
        question: "Quelle région des États-Unis est le cœur de l'innovation technologique mondiale ?",
        options: ["Wall Street", "Silicon Valley", "Texas", "Seattle"],
        correctAnswer: 1,
        explanation:
          "La Silicon Valley en Californie est le cœur de l'innovation technologique mondiale, abritant les géants comme Apple, Google et Meta.",
      },
    ],
  },
  {
    cardId: 106,
    questions: [
      {
        question: "De combien la température moyenne mondiale a-t-elle augmenté depuis l'ère préindustrielle ?",
        options: ["0,5°C", "1,1°C", "2°C", "3°C"],
        correctAnswer: 1,
        explanation:
          "La température moyenne mondiale a augmenté de plus de 1,1°C depuis l'ère préindustrielle, provoquant déjà des impacts climatiques significatifs.",
      },
      {
        question: "En quelle année les accords de Paris sur le climat ont-ils été signés ?",
        options: ["2009", "2012", "2015", "2018"],
        correctAnswer: 2,
        explanation:
          "Les accords de Paris ont été signés en 2015 lors de la COP21, avec l'objectif de limiter le réchauffement à 1,5-2°C.",
      },
      {
        question: "Combien de personnes pourraient être déplacées par le changement climatique d'ici 2050 ?",
        options: ["50 millions", "100 millions", "250 millions", "500 millions"],
        correctAnswer: 2,
        explanation:
          "Selon les estimations, 250 millions de personnes pourraient être déplacées par le changement climatique d'ici 2050, créant une crise migratoire majeure.",
      },
      {
        question: "Quelle région se réchauffe deux fois plus vite que le reste de la planète ?",
        options: ["Le Sahara", "L'Arctique", "L'Amazonie", "L'Australie"],
        correctAnswer: 1,
        explanation:
          "L'Arctique se réchauffe deux fois plus vite que le reste de la planète, provoquant une fonte accélérée des glaces avec des conséquences mondiales.",
      },
      {
        question: "Quel pays est actuellement le premier émetteur mondial de gaz à effet de serre ?",
        options: ["États-Unis", "Inde", "Chine", "Russie"],
        correctAnswer: 2,
        explanation:
          "La Chine est le premier émetteur mondial de gaz à effet de serre, suivie des États-Unis et de l'Inde.",
      },
      {
        question: "De combien pourrait monter le niveau des mers d'ici 2100 ?",
        options: ["30 cm", "50 cm", "1 mètre", "2 mètres"],
        correctAnswer: 2,
        explanation:
          "Le niveau des mers pourrait augmenter de 1 mètre d'ici 2100, menaçant des centaines de millions de personnes vivant dans les zones côtières.",
      },
    ],
  },
]

function getHGGSPThemeColor(theme: HGGSPTheme) {
  switch (theme) {
    case "geopolitique":
      return "bg-indigo-500"
    case "puissances":
      return "bg-purple-500"
    case "tensions":
      return "bg-orange-500"
    case "environnement":
      return "bg-teal-500"
    default:
      return "bg-gray-500"
  }
}

function getHGGSPThemeLabel(theme: HGGSPTheme) {
  switch (theme) {
    case "geopolitique":
      return "Géopolitique"
    case "puissances":
      return "Puissances"
    case "tensions":
      return "Tensions"
    case "environnement":
      return "Environnement"
    default:
      return ""
  }
}

function QuizSection({ cardId }: { cardId: number }) {
  const quiz = quizzes.find((q) => q.cardId === cardId)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  if (!quiz) return null

  const question = quiz.questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100)
    return (
      <Card className="p-8 bg-gradient-to-br from-white to-purple-50 border-purple-200">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#2C2416]">Quiz HGGSP terminé !</h2>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-purple-600">
              {score}/{quiz.questions.length}
            </p>
            <p className="text-xl text-[#5C4A3A]">Score : {percentage}%</p>
          </div>
          {percentage >= 80 && (
            <p className="text-lg text-purple-600 font-medium">
              Excellent travail ! Vous maîtrisez bien ce sujet géopolitique.
            </p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-lg text-blue-600 font-medium">
              Bon travail ! Continuez à approfondir vos connaissances en HGGSP.
            </p>
          )}
          {percentage < 60 && (
            <p className="text-lg text-orange-600 font-medium">
              Pas mal ! Relisez la fiche pour renforcer vos connaissances géopolitiques.
            </p>
          )}
          <Button onClick={handleRestartQuiz} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            Recommencer le quiz
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 bg-white border-purple-200">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2C2416]">Quiz HGGSP</h2>
          <div className="text-sm text-purple-600 font-medium">
            Question {currentQuestion + 1} / {quiz.questions.length}
          </div>
        </div>

        <div className="w-full bg-purple-100 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#2C2416] leading-relaxed">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectAnswer = index === question.correctAnswer
              const showCorrect = showExplanation && isCorrectAnswer
              const showIncorrect = showExplanation && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showCorrect
                      ? "border-green-500 bg-green-50"
                      : showIncorrect
                        ? "border-red-500 bg-red-50"
                        : isSelected
                          ? "border-purple-600 bg-purple-50"
                          : "border-[#E5D5B7] hover:border-purple-600 hover:bg-purple-50"
                  } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#2C2416] font-medium">{option}</span>
                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              )
            })}
          </div>

          {showExplanation && (
            <div
              className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-blue-50 border border-blue-200"}`}
            >
              <p className="text-sm font-semibold mb-2 text-[#2C2416]">{isCorrect ? "Correct !" : "Explication :"}</p>
              <p className="text-sm text-[#5C4A3A] leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <Button
              onClick={handleNextQuestion}
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {currentQuestion < quiz.questions.length - 1 ? "Question suivante" : "Voir les résultats"}
            </Button>
          )}
        </div>

        <div className="pt-4 border-t border-purple-200">
          <p className="text-sm text-purple-600 text-center">
            Score actuel : {score} / {currentQuestion + (showExplanation ? 1 : 0)}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default function HGGSPFichePage({ params }: { params: { id: string } }) {
  const card = detailedHGGSPCards.find((c) => c.id === Number.parseInt(params.id))

  if (!card) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FAF0DC]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#E5D5B7] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#8B7355]" />
              <h1 className="text-xl font-bold text-[#2C2416]">Histoflash</h1>
            </Link>
            <Link href="/?view=hggsp">
              <Button variant="ghost" className="text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux fiches HGGSP
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`${getHGGSPThemeColor(card.theme)} text-white px-4 py-2 rounded-full text-sm font-medium`}
              >
                {getHGGSPThemeLabel(card.theme)}
              </div>
              <div className="flex items-center gap-2 text-purple-600">
                <Globe className="w-5 h-5" />
                <span className="font-medium text-sm">{card.programLink}</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-[#2C2416] text-balance">{card.title}</h1>
            <p className="text-2xl font-semibold text-purple-600">{card.subtitle}</p>
            <p className="text-xl text-[#5C4A3A] leading-relaxed">{card.summary}</p>
          </div>

          {/* Hero Image */}
          <Card className="overflow-hidden border-purple-200">
            <img src={card.image || "/placeholder.svg"} alt={card.title} className="w-full h-96 object-cover" />
          </Card>

          {/* Description */}
          <Card className="p-8 bg-white border-purple-200">
            <h2 className="text-2xl font-bold text-[#2C2416] mb-4">Analyse géopolitique</h2>
            <p className="text-[#5C4A3A] leading-relaxed text-lg">{card.description}</p>
          </Card>

          {/* Key Figures */}
          <Card className="p-8 bg-white border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Acteurs clés</h2>
            </div>
            <ul className="space-y-3">
              {card.keyFigures.map((figure, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mt-2" />
                  <span className="text-[#5C4A3A] text-lg">{figure}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Locations */}
          <Card className="p-8 bg-white border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Lieux stratégiques</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {card.locations.map((location, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-[#2C2416] font-medium">{location}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Impact */}
          <Card className="p-8 bg-gradient-to-br from-white to-purple-50 border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Impact géopolitique</h2>
            </div>
            <p className="text-[#5C4A3A] leading-relaxed text-lg">{card.impact}</p>
          </Card>

          {/* Fun Facts */}
          <Card className="p-8 bg-white border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Points clés à retenir</h2>
            </div>
            <ul className="space-y-4">
              {card.funFacts.map((fact, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-[#5C4A3A] leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-white to-purple-50 border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Problématiques type bac</h2>
            </div>
            <p className="text-purple-600 font-medium mb-6 text-balance">
              Entraînez-vous avec ces problématiques issues des sujets du bac des années précédentes et générées par IA
              pour maîtriser parfaitement ce thème.
            </p>
            <div className="space-y-4">
              {card.bacProblematiques.map((problematique, index) => (
                <div
                  key={index}
                  className="p-5 bg-white border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <p className="text-[#2C2416] leading-relaxed font-medium text-balance">{problematique}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-purple-100 rounded-lg border border-purple-300">
              <p className="text-sm text-purple-800 leading-relaxed">
                <strong>💡 Conseil :</strong> Pour chaque problématique, essayez d'élaborer un plan détaillé en 2 ou 3
                parties avant de rédiger. Utilisez les informations de cette fiche pour nourrir votre argumentation avec
                des exemples précis et des dates clés.
              </p>
            </div>
          </Card>

          {/* Quiz Section */}
          <QuizSection cardId={card.id} />

          {/* Back Button */}
          <div className="flex justify-center pt-4">
            <Link href="/?view=hggsp">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux fiches HGGSP
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-[#E5D5B7] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-[#5C4A3A]">
            <p className="text-sm">© 2025 Histoflash. Apprendre l'histoire avec élégance et simplicité.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
