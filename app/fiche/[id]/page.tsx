"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Clock, ArrowLeft, Users, MapPin, Lightbulb, TrendingUp, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { Usable, use, useState } from "react"

type Theme = "empires" | "wars" | "societies"

interface DetailedFlashcard {
  id: number
  title: string
  period: string
  summary: string
  theme: Theme
  image: string
  description: string
  keyFigures: string[]
  locations: string[]
  impact: string
  funFacts: string[]
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

const detailedFlashcards: DetailedFlashcard[] = [
  {
    id: 1,
    title: "L'Empire Romain",
    period: "27 av. J.-C. - 476 apr. J.-C.",
    summary:
      "L'un des plus grands empires de l'histoire, s'étendant sur trois continents et influençant profondément la civilisation occidentale.",
    theme: "empires",
    image: "/roman-empire-colosseum.jpg",
    description:
      "L'Empire Romain a été l'une des civilisations les plus influentes de l'histoire. Fondé par Auguste en 27 av. J.-C., il s'est étendu sur trois continents, englobant la Méditerranée, une grande partie de l'Europe, l'Afrique du Nord et le Moyen-Orient. L'empire a apporté des innovations majeures en architecture, en droit, en ingénierie et en gouvernance. Le système juridique romain a jeté les bases du droit moderne dans de nombreux pays. Les Romains ont construit des routes, des aqueducs et des monuments qui subsistent encore aujourd'hui. La langue latine a donné naissance aux langues romanes modernes comme le français, l'espagnol et l'italien.",
    keyFigures: [
      "Auguste - Premier empereur romain",
      "Jules César - Général et homme d'État",
      "Marc Aurèle - Empereur philosophe",
      "Constantin - Premier empereur chrétien",
    ],
    locations: ["Rome, Italie", "Constantinople (Istanbul)", "Alexandrie, Égypte", "Carthage, Tunisie"],
    impact:
      "L'Empire Romain a profondément influencé la civilisation occidentale moderne. Son système juridique, son architecture, sa langue et ses innovations en ingénierie continuent d'avoir un impact aujourd'hui. Le concept de citoyenneté, les institutions républicaines et le christianisme se sont répandus grâce à l'empire.",
    funFacts: [
      "Les Romains ont construit plus de 400 000 km de routes à travers l'empire",
      "Le Colisée pouvait accueillir jusqu'à 80 000 spectateurs",
      "Les Romains ont inventé le béton, permettant des constructions monumentales",
      "L'aqueduc romain de Ségovie en Espagne est toujours debout après 2000 ans",
    ],
  },
  {
    id: 2,
    title: "La Révolution Française",
    period: "1789 - 1799",
    summary:
      "Période de bouleversements sociaux et politiques qui a transformé la France et inspiré des mouvements démocratiques dans le monde entier.",
    theme: "wars",
    image: "/storming-of-the-bastille.png",
    description:
      "La Révolution Française a été un tournant majeur dans l'histoire mondiale. Commencée en 1789 avec la prise de la Bastille, elle a renversé la monarchie absolue et établi les principes de liberté, d'égalité et de fraternité. La Déclaration des Droits de l'Homme et du Citoyen a posé les fondements des droits humains modernes. La révolution a traversé plusieurs phases, de l'Assemblée nationale constituante à la Terreur, puis au Directoire. Elle a profondément transformé la société française, abolissant les privilèges féodaux et établissant une république. Les idées révolutionnaires se sont propagées à travers l'Europe et ont inspiré de nombreux mouvements démocratiques.",
    keyFigures: [
      "Maximilien Robespierre - Leader révolutionnaire",
      "Louis XVI - Dernier roi de France avant la révolution",
      "Napoléon Bonaparte - Général qui a pris le pouvoir après la révolution",
      "Georges Danton - Homme politique révolutionnaire",
    ],
    locations: ["Paris, France", "Versailles", "Lyon", "Marseille"],
    impact:
      "La Révolution Française a établi les principes démocratiques modernes et les droits de l'homme. Elle a inspiré des révolutions et des mouvements d'indépendance dans le monde entier. Le système métrique, le code civil napoléonien et la laïcité sont des héritages directs de cette période.",
    funFacts: [
      "La Marseillaise, l'hymne national français, a été composée pendant la révolution",
      "La guillotine a été adoptée comme méthode d'exécution 'humaine'",
      "Le calendrier révolutionnaire a tenté de remplacer le calendrier grégorien",
      "La devise 'Liberté, Égalité, Fraternité' est devenue le symbole de la République française",
    ],
  },
  {
    id: 3,
    title: "La Renaissance",
    period: "XIVe - XVIIe siècle",
    summary:
      "Mouvement culturel et artistique qui a marqué la transition entre le Moyen Âge et l'époque moderne, célébrant l'humanisme et les arts.",
    theme: "societies",
    image: "/renaissance-art-florence.jpg",
    description:
      "La Renaissance a été une période de renouveau culturel, artistique et intellectuel qui a débuté en Italie au XIVe siècle avant de se répandre dans toute l'Europe. Ce mouvement a marqué la transition entre le Moyen Âge et l'époque moderne. Les artistes et penseurs de la Renaissance ont redécouvert les textes classiques grecs et romains, plaçant l'homme au centre de leurs préoccupations (humanisme). L'art a connu une révolution avec l'invention de la perspective, l'étude de l'anatomie et l'utilisation de nouvelles techniques. Les sciences ont également progressé avec des découvertes en astronomie, en anatomie et en physique. L'imprimerie de Gutenberg a permis la diffusion rapide des connaissances.",
    keyFigures: [
      "Léonard de Vinci - Artiste et inventeur polyvalent",
      "Michel-Ange - Sculpteur et peintre",
      "Raphaël - Peintre et architecte",
      "Galilée - Astronome et physicien",
    ],
    locations: ["Florence, Italie", "Rome, Italie", "Venise, Italie", "Paris, France"],
    impact:
      "La Renaissance a transformé l'art, la science et la pensée européenne. Elle a établi les fondements de la méthode scientifique moderne et a célébré l'individualisme et la créativité humaine. Les œuvres d'art de cette période restent parmi les plus admirées au monde.",
    funFacts: [
      "Léonard de Vinci a peint la Joconde, l'œuvre d'art la plus célèbre au monde",
      "Michel-Ange a peint le plafond de la Chapelle Sixtine en 4 ans",
      "L'imprimerie de Gutenberg a révolutionné la diffusion des connaissances",
      "La Renaissance a vu naître le concept moderne de 'génie' artistique",
    ],
  },
  {
    id: 4,
    title: "L'Empire Ottoman",
    period: "1299 - 1922",
    summary:
      "Empire puissant qui a dominé l'Europe du Sud-Est, l'Asie occidentale et l'Afrique du Nord pendant plus de six siècles.",
    theme: "empires",
    image: "/ottoman-empire-istanbul.jpg",
    description:
      "L'Empire Ottoman a été l'un des empires les plus durables et les plus puissants de l'histoire. Fondé en 1299 par Osman Ier, il a atteint son apogée au XVIe siècle sous le règne de Soliman le Magnifique. L'empire s'étendait sur trois continents, contrôlant des routes commerciales stratégiques entre l'Orient et l'Occident. Constantinople (Istanbul) est devenue sa capitale après sa conquête en 1453, marquant la fin de l'Empire byzantin. L'Empire Ottoman était connu pour sa tolérance religieuse relative, son administration sophistiquée et ses contributions à l'architecture, à l'art et à la culture. Le système des millets permettait aux communautés religieuses de s'auto-gouverner. L'empire a joué un rôle crucial dans l'histoire européenne, asiatique et africaine jusqu'à sa dissolution après la Première Guerre mondiale.",
    keyFigures: [
      "Mehmed II - Conquérant de Constantinople",
      "Soliman le Magnifique - Sultan à l'apogée de l'empire",
      "Osman Ier - Fondateur de l'empire",
      "Mustafa Kemal Atatürk - Fondateur de la Turquie moderne",
    ],
    locations: ["Istanbul (Constantinople), Turquie", "Le Caire, Égypte", "Bagdad, Irak", "Damas, Syrie"],
    impact:
      "L'Empire Ottoman a façonné l'histoire du Moyen-Orient, de l'Europe du Sud-Est et de l'Afrique du Nord. Son héritage architectural, notamment les mosquées et palais, reste visible aujourd'hui. La dissolution de l'empire après la Première Guerre mondiale a redessiné les frontières du Moyen-Orient moderne.",
    funFacts: [
      "La Mosquée Bleue d'Istanbul possède plus de 20 000 carreaux de céramique",
      "Le café a été introduit en Europe par l'Empire Ottoman",
      "Les Janissaires étaient une élite militaire recrutée parmi les enfants chrétiens",
      "L'empire a duré 623 ans, l'un des plus longs de l'histoire",
    ],
  },
  {
    id: 5,
    title: "Napoléon Bonaparte",
    period: "1769 - 1821",
    summary:
      "Général et empereur français qui a dominé l'Europe au début du XIXe siècle, réformant profondément la France et son système juridique.",
    theme: "wars",
    image: "/napoleon-bonaparte.jpg",
    description:
      "Napoléon Bonaparte est l'une des figures les plus influentes de l'histoire moderne. Né en Corse en 1769, il s'est élevé rapidement dans les rangs militaires pendant la Révolution française. En 1799, il prend le pouvoir par un coup d'État et devient Premier Consul, puis se couronne empereur des Français en 1804. Napoléon a mené de nombreuses campagnes militaires à travers l'Europe, créant un vaste empire français. Il a profondément réformé la France avec le Code civil (Code Napoléon) qui influence encore de nombreux systèmes juridiques aujourd'hui. Il a également modernisé l'administration, l'éducation et les finances. Ses guerres ont redessiné la carte de l'Europe, mais sa défaite à Waterloo en 1815 a marqué la fin de son règne. Exilé à Sainte-Hélène, il y meurt en 1821.",
    keyFigures: [
      "Joséphine de Beauharnais - Première épouse et impératrice",
      "Talleyrand - Diplomate et ministre",
      "Maréchal Ney - Un de ses plus fidèles généraux",
      "Wellington - Général britannique qui l'a vaincu à Waterloo",
    ],
    locations: [
      "Ajaccio, Corse (lieu de naissance)",
      "Paris, France",
      "Austerlitz, République tchèque",
      "Waterloo, Belgique",
      "Sainte-Hélène (lieu d'exil)",
    ],
    impact:
      "Napoléon a profondément transformé la France et l'Europe. Le Code Napoléon reste la base du droit civil dans de nombreux pays. Il a modernisé l'administration française, créé le système des lycées et la Banque de France. Ses conquêtes ont diffusé les idées révolutionnaires à travers l'Europe, contribuant à l'éveil des nationalismes. Son héritage militaire et politique continue d'être étudié dans le monde entier.",
    funFacts: [
      "Napoléon mesurait environ 1,68 m, une taille moyenne pour l'époque",
      "Il a créé la Légion d'honneur, toujours la plus haute distinction française",
      "Il dormait en moyenne 4 heures par nuit",
      "Le Code Napoléon a été adopté dans plus de 40 pays",
      "Il a vendu la Louisiane aux États-Unis en 1803 pour financer ses guerres",
    ],
  },
  {
    id: 6,
    title: "Cléopâtre VII",
    period: "69 av. J.-C. - 30 av. J.-C.",
    summary:
      "Dernière pharaonne d'Égypte, connue pour son intelligence politique et ses alliances avec Jules César et Marc Antoine.",
    theme: "empires",
    image: "/cleopatra-vii.jpg",
    description:
      "Cléopâtre VII Philopator a été la dernière souveraine de la dynastie ptolémaïque d'Égypte. Montée sur le trône à 18 ans, elle a régné pendant 21 ans dans une période tumultueuse de l'histoire égyptienne et romaine. Contrairement à la légende, sa beauté n'était pas son principal atout : c'était son intelligence, son charisme et ses compétences linguistiques (elle parlait au moins neuf langues) qui la distinguaient. Elle a formé des alliances stratégiques avec Jules César, avec qui elle a eu un fils, Césarion, puis avec Marc Antoine, avec qui elle a eu trois enfants. Ces alliances visaient à préserver l'indépendance de l'Égypte face à l'expansion romaine. Après la défaite à la bataille d'Actium en 31 av. J.-C., elle s'est suicidée en 30 av. J.-C., marquant la fin de l'Égypte ptolémaïque et son annexion par Rome.",
    keyFigures: [
      "Jules César - Général romain et amant",
      "Marc Antoine - Général romain et époux",
      "Octave (Auguste) - Futur empereur romain, son adversaire",
      "Ptolémée XIII - Son frère et co-régent",
    ],
    locations: ["Alexandrie, Égypte", "Rome, Italie", "Tarse, Turquie", "Actium, Grèce"],
    impact:
      "Cléopâtre reste l'une des femmes les plus célèbres de l'histoire. Elle a tenté de préserver l'indépendance de l'Égypte face à Rome et a été la dernière pharaonne d'Égypte. Son règne a marqué la fin de l'ère hellénistique. Elle est devenue une figure légendaire, inspirant d'innombrables œuvres d'art, de littérature et de cinéma. Son intelligence politique et son éducation en font un symbole du pouvoir féminin dans l'Antiquité.",
    funFacts: [
      "Elle était la première de sa dynastie à apprendre la langue égyptienne",
      "Elle a écrit des traités médicaux et cosmétiques",
      "Sa mort par morsure de serpent est probablement un mythe",
      "Elle a fait construire la Bibliothèque d'Alexandrie",
      "Elle était considérée comme une déesse vivante en Égypte",
    ],
  },
  {
    id: 7,
    title: "Léonard de Vinci",
    period: "1452 - 1519",
    summary:
      "Génie de la Renaissance italienne, artiste, inventeur et scientifique dont les œuvres et inventions continuent d'inspirer le monde.",
    theme: "societies",
    image: "/leonardo-da-vinci.jpg",
    description:
      "Léonard de Vinci incarne le génie universel de la Renaissance. Né en 1452 près de Florence, il était à la fois peintre, sculpteur, architecte, ingénieur, anatomiste, botaniste et inventeur. Ses peintures, notamment la Joconde et la Cène, sont parmi les plus célèbres au monde. Mais Léonard était bien plus qu'un artiste : ses carnets révèlent des milliers de dessins et notes sur l'anatomie humaine, l'ingénierie, l'architecture et les machines volantes. Il a disséqué plus de 30 cadavres pour comprendre l'anatomie humaine, produisant des dessins d'une précision remarquable. Ses inventions conceptuelles incluaient des hélicoptères, des chars d'assaut, des sous-marins et des parachutes, des siècles avant leur réalisation. Il a travaillé pour les Médicis à Florence, puis pour le duc de Milan, et a fini sa vie en France à l'invitation de François Ier.",
    keyFigures: [
      "Laurent de Médicis - Mécène florentin",
      "Ludovic Sforza - Duc de Milan, son protecteur",
      "François Ier - Roi de France qui l'a accueilli",
      "Michel-Ange - Rival et contemporain",
    ],
    locations: [
      "Vinci, Italie (lieu de naissance)",
      "Florence, Italie",
      "Milan, Italie",
      "Rome, Italie",
      "Amboise, France (lieu de décès)",
    ],
    impact:
      "Léonard de Vinci a révolutionné l'art avec ses techniques de sfumato et de perspective atmosphérique. Ses études anatomiques ont fait progresser la médecine. Ses inventions conceptuelles ont anticipé des technologies modernes. Il incarne l'idéal de l'homme de la Renaissance : curieux, polyvalent et créatif. Ses carnets continuent d'inspirer artistes, scientifiques et ingénieurs. Il reste le symbole du génie universel.",
    funFacts: [
      "Il écrivait de droite à gauche en écriture miroir",
      "La Joconde a été volée au Louvre en 1911 et retrouvée deux ans plus tard",
      "Il était végétarien et achetait des oiseaux en cage pour les libérer",
      "Ses carnets contiennent plus de 13 000 pages de notes et dessins",
      "Il a conçu une ville idéale avec des systèmes de canaux et d'égouts",
    ],
  },
  {
    id: 8,
    title: "Marie Curie",
    period: "1867 - 1934",
    summary:
      "Physicienne et chimiste pionnière, première femme à recevoir un prix Nobel et seule personne à en recevoir deux dans des disciplines scientifiques différentes.",
    theme: "societies",
    image: "/marie-curie.jpg",
    description:
      "Marie Curie, née Maria Sklodowska en Pologne en 1867, est l'une des scientifiques les plus importantes de l'histoire. Elle a émigré en France pour étudier à la Sorbonne, où elle a rencontré Pierre Curie qu'elle a épousé en 1895. Ensemble, ils ont découvert deux nouveaux éléments radioactifs : le polonium (nommé d'après sa Pologne natale) et le radium. En 1903, elle devient la première femme à recevoir un prix Nobel (en physique, partagé avec Pierre et Henri Becquerel). Après la mort tragique de Pierre en 1906, elle continue ses recherches et reçoit un second prix Nobel en 1911, cette fois en chimie, pour ses travaux sur le radium. Pendant la Première Guerre mondiale, elle a développé des unités mobiles de radiographie pour soigner les soldats blessés. Elle est morte en 1934 d'une leucémie, probablement causée par son exposition prolongée aux radiations.",
    keyFigures: [
      "Pierre Curie - Époux et collaborateur scientifique",
      "Henri Becquerel - Découvreur de la radioactivité",
      "Irène Joliot-Curie - Sa fille, également prix Nobel de chimie",
      "Paul Langevin - Physicien et ami proche",
    ],
    locations: [
      "Varsovie, Pologne (lieu de naissance)",
      "Paris, France",
      "Sorbonne, Paris",
      "Institut du Radium, Paris",
    ],
    impact:
      "Marie Curie a ouvert la voie aux femmes dans les sciences. Ses découvertes sur la radioactivité ont révolutionné la physique et la médecine, notamment dans le traitement du cancer. Elle a créé l'Institut du Radium (aujourd'hui Institut Curie), un centre de recherche de renommée mondiale. Elle reste un symbole de persévérance, d'excellence scientifique et d'égalité des sexes. En 1995, elle est devenue la première femme à être inhumée au Panthéon pour ses propres mérites.",
    funFacts: [
      "Elle est la seule personne à avoir reçu des prix Nobel dans deux disciplines scientifiques différentes",
      "Ses carnets de laboratoire sont encore radioactifs aujourd'hui",
      "Elle a créé le terme 'radioactivité'",
      "Pendant la guerre, elle a conduit elle-même des ambulances équipées de radiographie",
      "L'élément chimique curium (Cm) a été nommé en son honneur",
    ],
  },
]

const quizzes: Quiz[] = [
  {
    cardId: 1,
    questions: [
      {
        question: "En quelle année Auguste a-t-il fondé l'Empire Romain ?",
        options: ["27 av. J.-C.", "44 av. J.-C.", "14 apr. J.-C.", "100 av. J.-C."],
        correctAnswer: 0,
        explanation: "Auguste a fondé l'Empire Romain en 27 av. J.-C., marquant la fin de la République romaine.",
      },
      {
        question: "Combien de kilomètres de routes les Romains ont-ils construits à travers l'empire ?",
        options: ["100 000 km", "200 000 km", "400 000 km", "600 000 km"],
        correctAnswer: 2,
        explanation:
          "Les Romains ont construit plus de 400 000 km de routes, facilitant le commerce et les déplacements militaires.",
      },
      {
        question: "Quelle langue moderne n'est PAS dérivée du latin ?",
        options: ["Français", "Espagnol", "Allemand", "Italien"],
        correctAnswer: 2,
        explanation:
          "L'allemand est une langue germanique, tandis que le français, l'espagnol et l'italien sont des langues romanes dérivées du latin.",
      },
      {
        question: "Quel empereur romain était connu comme le 'philosophe' ?",
        options: ["Auguste", "Néron", "Marc Aurèle", "Caligula"],
        correctAnswer: 2,
        explanation:
          "Marc Aurèle était connu comme l'empereur philosophe et a écrit les célèbres 'Pensées pour moi-même'.",
      },
      {
        question: "Quelle ville est devenue Constantinople sous l'Empire Romain ?",
        options: ["Athènes", "Byzance", "Alexandrie", "Carthage"],
        correctAnswer: 1,
        explanation:
          "Constantin a rebaptisé Byzance en Constantinople en 330 apr. J.-C., qui est aujourd'hui Istanbul.",
      },
      {
        question: "Combien de spectateurs le Colisée pouvait-il accueillir ?",
        options: ["30 000", "50 000", "80 000", "100 000"],
        correctAnswer: 2,
        explanation: "Le Colisée pouvait accueillir jusqu'à 80 000 spectateurs pour les jeux et spectacles.",
      },
    ],
  },
  {
    cardId: 2,
    questions: [
      {
        question: "En quelle année a commencé la Révolution Française ?",
        options: ["1789", "1792", "1799", "1804"],
        correctAnswer: 0,
        explanation: "La Révolution Française a commencé en 1789 avec la prise de la Bastille le 14 juillet.",
      },
      {
        question: "Quelle est la devise de la République française issue de la Révolution ?",
        options: [
          "Paix, Justice, Fraternité",
          "Liberté, Égalité, Fraternité",
          "Honneur, Patrie, Valeur",
          "Unité, Force, Liberté",
        ],
        correctAnswer: 1,
        explanation: "La devise 'Liberté, Égalité, Fraternité' est devenue le symbole de la République française.",
      },
      {
        question: "Qui était le leader révolutionnaire associé à la période de la Terreur ?",
        options: ["Napoléon Bonaparte", "Louis XVI", "Maximilien Robespierre", "Georges Danton"],
        correctAnswer: 2,
        explanation: "Maximilien Robespierre était le principal leader pendant la Terreur (1793-1794).",
      },
      {
        question: "Quel document fondamental a été adopté en 1789 ?",
        options: [
          "Le Code Civil",
          "La Constitution",
          "La Déclaration des Droits de l'Homme et du Citoyen",
          "Le Concordat",
        ],
        correctAnswer: 2,
        explanation: "La Déclaration des Droits de l'Homme et du Citoyen a été adoptée le 26 août 1789.",
      },
      {
        question: "Quel système de mesure a été créé pendant la Révolution ?",
        options: ["Le système impérial", "Le système métrique", "Le système décimal", "Le système binaire"],
        correctAnswer: 1,
        explanation:
          "Le système métrique a été créé pendant la Révolution française et est maintenant utilisé mondialement.",
      },
      {
        question: "Quel était le sort du roi Louis XVI ?",
        options: ["Il s'est exilé", "Il a été guillotiné", "Il a abdiqué pacifiquement", "Il est mort de maladie"],
        correctAnswer: 1,
        explanation: "Louis XVI a été guillotiné le 21 janvier 1793 après avoir été jugé pour trahison.",
      },
    ],
  },
  {
    cardId: 3,
    questions: [
      {
        question: "Dans quel pays la Renaissance a-t-elle débuté ?",
        options: ["France", "Espagne", "Italie", "Angleterre"],
        correctAnswer: 2,
        explanation: "La Renaissance a débuté en Italie au XIVe siècle, notamment à Florence.",
      },
      {
        question: "Qui a peint la célèbre Joconde ?",
        options: ["Michel-Ange", "Raphaël", "Léonard de Vinci", "Botticelli"],
        correctAnswer: 2,
        explanation: "Léonard de Vinci a peint la Joconde (Mona Lisa) entre 1503 et 1519.",
      },
      {
        question: "Quelle invention de Gutenberg a révolutionné la diffusion des connaissances ?",
        options: ["Le télescope", "L'imprimerie", "La boussole", "Le microscope"],
        correctAnswer: 1,
        explanation:
          "L'imprimerie de Gutenberg (vers 1440) a permis la reproduction rapide des livres et la diffusion des idées.",
      },
      {
        question: "Combien de temps Michel-Ange a-t-il mis pour peindre le plafond de la Chapelle Sixtine ?",
        options: ["2 ans", "4 ans", "6 ans", "8 ans"],
        correctAnswer: 1,
        explanation: "Michel-Ange a peint le plafond de la Chapelle Sixtine entre 1508 et 1512, soit environ 4 ans.",
      },
      {
        question: "Quel mouvement intellectuel plaçait l'homme au centre des préoccupations ?",
        options: ["Le romantisme", "L'humanisme", "Le réalisme", "Le naturalisme"],
        correctAnswer: 1,
        explanation:
          "L'humanisme était le mouvement intellectuel de la Renaissance qui plaçait l'homme et ses capacités au centre.",
      },
      {
        question: "Quelle technique artistique révolutionnaire a été perfectionnée pendant la Renaissance ?",
        options: ["L'aquarelle", "La perspective", "Le collage", "L'abstraction"],
        correctAnswer: 1,
        explanation:
          "La perspective linéaire a été développée et perfectionnée pendant la Renaissance, créant l'illusion de profondeur.",
      },
    ],
  },
  {
    cardId: 4,
    questions: [
      {
        question: "En quelle année l'Empire Ottoman a-t-il été fondé ?",
        options: ["1299", "1453", "1520", "1683"],
        correctAnswer: 0,
        explanation: "L'Empire Ottoman a été fondé en 1299 par Osman Ier en Anatolie.",
      },
      {
        question: "Quel sultan ottoman a conquis Constantinople en 1453 ?",
        options: ["Soliman le Magnifique", "Mehmed II", "Osman Ier", "Selim Ier"],
        correctAnswer: 1,
        explanation:
          "Mehmed II, surnommé 'le Conquérant', a pris Constantinople en 1453, mettant fin à l'Empire byzantin.",
      },
      {
        question: "Combien de temps l'Empire Ottoman a-t-il duré ?",
        options: ["400 ans", "500 ans", "623 ans", "750 ans"],
        correctAnswer: 2,
        explanation: "L'Empire Ottoman a duré 623 ans, de 1299 à 1922, l'un des plus longs empires de l'histoire.",
      },
      {
        question: "Quelle boisson a été introduite en Europe par l'Empire Ottoman ?",
        options: ["Le thé", "Le café", "Le chocolat", "Le vin"],
        correctAnswer: 1,
        explanation: "Le café a été introduit en Europe par l'Empire Ottoman, devenant rapidement populaire.",
      },
      {
        question: "Comment s'appelait l'élite militaire ottomane recrutée parmi les enfants chrétiens ?",
        options: ["Les Mamelouks", "Les Janissaires", "Les Sipahis", "Les Ghazis"],
        correctAnswer: 1,
        explanation:
          "Les Janissaires étaient une élite militaire recrutée via le système du devchirmé parmi les enfants chrétiens.",
      },
      {
        question: "Combien de carreaux de céramique possède la Mosquée Bleue d'Istanbul ?",
        options: ["5 000", "10 000", "20 000", "30 000"],
        correctAnswer: 2,
        explanation:
          "La Mosquée Bleue possède plus de 20 000 carreaux de céramique d'Iznik, lui donnant sa couleur caractéristique.",
      },
    ],
  },
  {
    cardId: 5,
    questions: [
      {
        question: "En quelle année Napoléon s'est-il couronné empereur des Français ?",
        options: ["1799", "1804", "1812", "1815"],
        correctAnswer: 1,
        explanation: "Napoléon s'est couronné empereur des Français le 2 décembre 1804 à Notre-Dame de Paris.",
      },
      {
        question: "Quel code juridique créé par Napoléon influence encore de nombreux pays aujourd'hui ?",
        options: ["Le Code pénal", "Le Code Napoléon", "Le Code de commerce", "Le Code rural"],
        correctAnswer: 1,
        explanation:
          "Le Code Napoléon (Code civil) a été promulgué en 1804 et reste la base du droit civil dans plus de 40 pays.",
      },
      {
        question: "Où Napoléon a-t-il été exilé après sa défaite finale ?",
        options: ["Corse", "Elbe", "Sainte-Hélène", "Sardaigne"],
        correctAnswer: 2,
        explanation:
          "Après sa défaite à Waterloo en 1815, Napoléon a été exilé sur l'île de Sainte-Hélène où il est mort en 1821.",
      },
      {
        question: "Quelle bataille de 1805 est considérée comme le plus grand triomphe militaire de Napoléon ?",
        options: ["Waterloo", "Austerlitz", "Iéna", "Wagram"],
        correctAnswer: 1,
        explanation:
          "La bataille d'Austerlitz (2 décembre 1805) est considérée comme le chef-d'œuvre tactique de Napoléon.",
      },
      {
        question: "Quel territoire Napoléon a-t-il vendu aux États-Unis en 1803 ?",
        options: ["La Floride", "Le Texas", "La Louisiane", "La Californie"],
        correctAnswer: 2,
        explanation:
          "Napoléon a vendu la Louisiane aux États-Unis pour 15 millions de dollars afin de financer ses guerres en Europe.",
      },
      {
        question: "Quelle distinction honorifique Napoléon a-t-il créée en 1802 ?",
        options: [
          "L'Ordre national du Mérite",
          "La Légion d'honneur",
          "La Croix de guerre",
          "L'Ordre de la Libération",
        ],
        correctAnswer: 1,
        explanation:
          "La Légion d'honneur, créée en 1802, reste la plus haute distinction française et récompense les mérites civils et militaires.",
      },
    ],
  },
  {
    cardId: 6,
    questions: [
      {
        question: "Combien de langues Cléopâtre parlait-elle ?",
        options: ["3 langues", "5 langues", "Au moins 9 langues", "12 langues"],
        correctAnswer: 2,
        explanation:
          "Cléopâtre était polyglotte et parlait au moins neuf langues, dont l'égyptien, le grec, l'araméen et le latin.",
      },
      {
        question: "Avec quel général romain Cléopâtre a-t-elle eu un fils nommé Césarion ?",
        options: ["Marc Antoine", "Jules César", "Pompée", "Octave"],
        correctAnswer: 1,
        explanation: "Cléopâtre a eu un fils, Ptolémée XV Césarion, avec Jules César vers 47 av. J.-C.",
      },
      {
        question: "En quelle année Cléopâtre est-elle morte ?",
        options: ["50 av. J.-C.", "40 av. J.-C.", "30 av. J.-C.", "20 av. J.-C."],
        correctAnswer: 2,
        explanation:
          "Cléopâtre s'est suicidée en 30 av. J.-C. après la défaite à Actium et la conquête de l'Égypte par Rome.",
      },
      {
        question: "Quelle était la capitale de l'Égypte sous le règne de Cléopâtre ?",
        options: ["Le Caire", "Thèbes", "Alexandrie", "Memphis"],
        correctAnswer: 2,
        explanation:
          "Alexandrie était la capitale de l'Égypte ptolémaïque et un centre culturel et intellectuel majeur du monde antique.",
      },
      {
        question: "Quelle bataille navale en 31 av. J.-C. a scellé le destin de Cléopâtre ?",
        options: ["La bataille de Pharsale", "La bataille d'Actium", "La bataille de Zama", "La bataille de Salamine"],
        correctAnswer: 1,
        explanation:
          "La bataille d'Actium (31 av. J.-C.) a vu la défaite de Cléopâtre et Marc Antoine face à Octave (futur Auguste).",
      },
      {
        question: "Quelle était la particularité de Cléopâtre parmi les Ptolémées ?",
        options: [
          "Elle était la plus jeune",
          "Elle parlait l'égyptien",
          "Elle était la plus riche",
          "Elle était la plus grande",
        ],
        correctAnswer: 1,
        explanation:
          "Cléopâtre était la première de la dynastie ptolémaïque à apprendre la langue égyptienne, ses prédécesseurs ne parlant que grec.",
      },
    ],
  },
  {
    cardId: 7,
    questions: [
      {
        question: "Quelle est l'œuvre la plus célèbre de Léonard de Vinci ?",
        options: ["La Cène", "La Joconde", "L'Homme de Vitruve", "La Vierge aux rochers"],
        correctAnswer: 1,
        explanation:
          "La Joconde (Mona Lisa) est l'œuvre la plus célèbre de Léonard et l'un des tableaux les plus connus au monde.",
      },
      {
        question: "Pourquoi Léonard écrivait-il en écriture miroir ?",
        options: [
          "Pour cacher ses secrets",
          "Il était gaucher",
          "Pour économiser l'encre",
          "C'était une mode de l'époque",
        ],
        correctAnswer: 1,
        explanation:
          "Léonard était gaucher et écrivait naturellement de droite à gauche en écriture miroir pour éviter de tacher l'encre.",
      },
      {
        question: "Combien de cadavres Léonard a-t-il disséqués pour ses études anatomiques ?",
        options: ["10", "Plus de 30", "50", "100"],
        correctAnswer: 1,
        explanation:
          "Léonard a disséqué plus de 30 cadavres humains pour comprendre l'anatomie, produisant des dessins d'une précision remarquable.",
      },
      {
        question: "Dans quel pays Léonard a-t-il passé les dernières années de sa vie ?",
        options: ["Italie", "France", "Espagne", "Angleterre"],
        correctAnswer: 1,
        explanation:
          "Léonard a passé ses dernières années en France, invité par François Ier, et est mort au château du Clos Lucé à Amboise en 1519.",
      },
      {
        question: "Combien de pages contiennent les carnets de Léonard ?",
        options: ["1 000 pages", "5 000 pages", "Plus de 13 000 pages", "20 000 pages"],
        correctAnswer: 2,
        explanation:
          "Les carnets de Léonard contiennent plus de 13 000 pages de notes, dessins et observations sur tous les sujets imaginables.",
      },
      {
        question: "Quelle technique picturale Léonard a-t-il perfectionnée ?",
        options: ["Le pointillisme", "Le sfumato", "L'impressionnisme", "Le cubisme"],
        correctAnswer: 1,
        explanation:
          "Le sfumato est une technique de transition douce entre les couleurs et les tons, perfectionnée par Léonard dans la Joconde.",
      },
    ],
  },
  {
    cardId: 8,
    questions: [
      {
        question: "Combien de prix Nobel Marie Curie a-t-elle reçus ?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        explanation:
          "Marie Curie a reçu deux prix Nobel : un en physique (1903) et un en chimie (1911), un exploit unique.",
      },
      {
        question: "Quels deux éléments radioactifs Marie Curie a-t-elle découverts ?",
        options: ["Uranium et radium", "Polonium et radium", "Plutonium et uranium", "Césium et francium"],
        correctAnswer: 1,
        explanation:
          "Marie Curie a découvert le polonium (nommé d'après la Pologne) et le radium avec son mari Pierre.",
      },
      {
        question: "Quel terme scientifique Marie Curie a-t-elle créé ?",
        options: ["Atomique", "Radioactivité", "Nucléaire", "Isotope"],
        correctAnswer: 1,
        explanation: "Marie Curie a créé le terme 'radioactivité' pour décrire le phénomène qu'elle étudiait.",
      },
      {
        question: "Pendant quelle guerre Marie Curie a-t-elle développé des unités mobiles de radiographie ?",
        options: [
          "Guerre franco-prussienne",
          "Première Guerre mondiale",
          "Seconde Guerre mondiale",
          "Guerre de Crimée",
        ],
        correctAnswer: 1,
        explanation:
          "Pendant la Première Guerre mondiale, Marie Curie a développé des 'petites Curies', des ambulances équipées de radiographie.",
      },
      {
        question: "En quelle année Marie Curie est-elle devenue la première femme inhumée au Panthéon ?",
        options: ["1934", "1945", "1995", "2000"],
        correctAnswer: 2,
        explanation:
          "En 1995, Marie Curie est devenue la première femme inhumée au Panthéon pour ses propres mérites (avec Pierre).",
      },
      {
        question: "De quelle maladie Marie Curie est-elle probablement morte ?",
        options: ["Cancer du poumon", "Leucémie", "Tuberculose", "Pneumonie"],
        correctAnswer: 1,
        explanation:
          "Marie Curie est morte d'une leucémie en 1934, probablement causée par son exposition prolongée aux radiations.",
      },
    ],
  },
]

function getThemeColor(theme: Theme) {
  switch (theme) {
    case "empires":
      return "bg-blue-500"
    case "wars":
      return "bg-red-500"
    case "societies":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

function getThemeLabel(theme: Theme) {
  switch (theme) {
    case "empires":
      return "Empires"
    case "wars":
      return "Guerres"
    case "societies":
      return "Sociétés"
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
      <Card className="p-8 bg-gradient-to-br from-white to-[#FAF0DC] border-[#E5D5B7]">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#2C2416]">Quiz terminé !</h2>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-[#8B7355]">
              {score}/{quiz.questions.length}
            </p>
            <p className="text-xl text-[#5C4A3A]">Score : {percentage}%</p>
          </div>
          {percentage >= 80 && (
            <p className="text-lg text-green-600 font-medium">Excellent travail ! Vous maîtrisez bien ce sujet.</p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-lg text-blue-600 font-medium">Bon travail ! Continuez à apprendre.</p>
          )}
          {percentage < 60 && (
            <p className="text-lg text-orange-600 font-medium">
              Pas mal ! Relisez la fiche pour améliorer vos connaissances.
            </p>
          )}
          <Button onClick={handleRestartQuiz} size="lg" className="bg-[#8B7355] hover:bg-[#6B5845] text-white">
            Recommencer le quiz
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 bg-white border-[#E5D5B7]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2C2416]">Quiz de connaissances</h2>
          <div className="text-sm text-[#8B7355] font-medium">
            Question {currentQuestion + 1} / {quiz.questions.length}
          </div>
        </div>

        <div className="w-full bg-[#FAF0DC] rounded-full h-2">
          <div
            className="bg-[#8B7355] h-2 rounded-full transition-all duration-300"
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
                          ? "border-[#8B7355] bg-[#FAF0DC]"
                          : "border-[#E5D5B7] hover:border-[#8B7355] hover:bg-[#FAF0DC]"
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
              className="w-full bg-[#8B7355] hover:bg-[#6B5845] text-white"
            >
              {currentQuestion < quiz.questions.length - 1 ? "Question suivante" : "Voir les résultats"}
            </Button>
          )}
        </div>

        <div className="pt-4 border-t border-[#E5D5B7]">
          <p className="text-sm text-[#8B7355] text-center">
            Score actuel : {score} / {currentQuestion + (showExplanation ? 1 : 0)}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default function FichePage({ params }: {params: Usable<{ id: string; }>}) {
  const { id } = use<{id: string}>(params)
  const card = detailedFlashcards.find((c) => c.id === Number.parseInt(id))

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
            <Link href="/?view=fiches">
              <Button variant="ghost" className="text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux fiches
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
              <div className={`${getThemeColor(card.theme)} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                {getThemeLabel(card.theme)}
              </div>
              <div className="flex items-center gap-2 text-[#8B7355]">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{card.period}</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-[#2C2416] text-balance">{card.title}</h1>
            <p className="text-xl text-[#5C4A3A] leading-relaxed">{card.summary}</p>
          </div>

          {/* Hero Image */}
          <Card className="overflow-hidden border-[#E5D5B7]">
            <img src={card.image || "/placeholder.svg"} alt={card.title} className="w-full h-96 object-cover" />
          </Card>

          {/* Description */}
          <Card className="p-8 bg-white border-[#E5D5B7]">
            <h2 className="text-2xl font-bold text-[#2C2416] mb-4">Description détaillée</h2>
            <p className="text-[#5C4A3A] leading-relaxed text-lg">{card.description}</p>
          </Card>

          {/* Key Figures */}
          <Card className="p-8 bg-white border-[#E5D5B7]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Personnages clés</h2>
            </div>
            <ul className="space-y-3">
              {card.keyFigures.map((figure, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#8B7355] mt-2" />
                  <span className="text-[#5C4A3A] text-lg">{figure}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Locations */}
          <Card className="p-8 bg-white border-[#E5D5B7]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Lieux importants</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {card.locations.map((location, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-[#FAF0DC] rounded-lg">
                  <MapPin className="w-5 h-5 text-[#8B7355]" />
                  <span className="text-[#2C2416] font-medium">{location}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Impact */}
          <Card className="p-8 bg-gradient-to-br from-white to-[#FAF0DC] border-[#E5D5B7]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Impact historique</h2>
            </div>
            <p className="text-[#5C4A3A] leading-relaxed text-lg">{card.impact}</p>
          </Card>

          {/* Fun Facts */}
          <Card className="p-8 bg-white border-[#E5D5B7]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2416]">Le saviez-vous ?</h2>
            </div>
            <ul className="space-y-4">
              {card.funFacts.map((fact, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-[#FAF0DC] rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-[#8B7355] text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-[#5C4A3A] leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Quiz Section */}
          <QuizSection cardId={card.id} />

          {/* Back Button */}
          <div className="flex justify-center pt-4">
            <Link href="/?view=fiches">
              <Button size="lg" className="bg-[#8B7355] hover:bg-[#6B5845] text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux fiches
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
