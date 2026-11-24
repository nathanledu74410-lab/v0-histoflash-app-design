import type { ChapterContent } from "../types"

const chapter: ChapterContent = {
  slug: "premiere-guerre-mondiale",
  metaDescription:
    "Fiche Première : la Première Guerre mondiale, un embrasement mondial et ses grandes étapes (1914-1918). Guerre de mouvement, de position, Verdun, 1917. Quiz.",
  updatedAt: "2026-11-24",
  intro:
    "L'attentat de Sarajevo, le 28 juin 1914, déclenche en quelques semaines une guerre entre les grandes puissances européennes. Les belligérants espèrent un conflit court, mais il dure plus de quatre ans et s'étend au monde entier. La Première Guerre mondiale fait environ 10 millions de morts parmi les militaires. Elle fait aussi disparaître quatre empires et marque ce que certains ont appelé le « **suicide de l'Europe** ».",
  problematique:
    "Comment un conflit européen devient-il une guerre mondiale, et quelles en sont les grandes étapes ?",
  sections: [
    {
      title: "De l'attentat de Sarajevo à la guerre européenne",
      paragraphs: [
        "Au début du XXe siècle, l'Europe est divisée en deux systèmes d'alliances : la **Triple-Alliance** (Allemagne, Autriche-Hongrie, Italie) et la **Triple-Entente** (France, Royaume-Uni, Russie). Les rivalités coloniales, économiques et nationales (Alsace-Moselle, Balkans) alimentent les tensions.",
        "Le 28 juin 1914, l'archiduc **François-Ferdinand**, héritier de l'Autriche-Hongrie, est assassiné à **Sarajevo** par un nationaliste serbe de Bosnie. L'Autriche-Hongrie déclare la guerre à la Serbie le 28 juillet. Le jeu des alliances entraîne la Russie, l'Allemagne, la France puis le Royaume-Uni, après l'invasion de la Belgique neutre. L'Italie reste d'abord neutre, puis entre en guerre aux côtés de l'Entente en 1915.",
      ],
    },
    {
      title: "De la guerre de mouvement à la guerre de position",
      paragraphs: [
        "En 1914, l'Allemagne applique le **plan Schlieffen** : vaincre rapidement la France en passant par la Belgique, avant de se retourner contre la Russie. L'offensive allemande est arrêtée lors de la **bataille de la Marne** (septembre 1914). Après la « course à la mer », le front se fige de la mer du Nord à la Suisse.",
        "Commence alors la **guerre de position** : les soldats s'enterrent dans des **tranchées**. Les offensives pour percer le front sont extrêmement meurtrières et n'aboutissent pas. En 1916, la bataille de **Verdun** (février-décembre) fait plus de 300 000 morts français et allemands, et l'offensive de la **Somme** plus d'un million de soldats tués, blessés ou disparus. Les armes nouvelles (gaz, chars, aviation) n'empêchent pas l'impasse.",
      ],
      keyPoints: [
        "Verdun devient le symbole de l'enfer des tranchées et de la résistance française.",
        "Le conflit est aussi une guerre industrielle : l'artillerie cause la majorité des blessures.",
      ],
    },
    {
      title: "Une guerre mondiale",
      paragraphs: [
        "La guerre s'étend hors d'Europe. L'**Empire ottoman** entre en guerre aux côtés des empires centraux fin 1914 ; le **Japon** rejoint l'Entente. Les combats touchent le Proche-Orient (Dardanelles, 1915), l'Afrique et les océans. Les empires coloniaux mobilisent des centaines de milliers de soldats et de travailleurs : la France fait venir des tirailleurs d'Afrique, d'Afrique du Nord et d'Indochine.",
        "L'année **1917** est un tournant. Les **États-Unis** entrent en guerre en avril, notamment à cause de la guerre sous-marine à outrance menée par l'Allemagne. En Russie, deux révolutions renversent le tsar puis portent les bolcheviks au pouvoir ; la Russie signe une paix séparée à **Brest-Litovsk** (mars 1918). Partout, la lassitude provoque des mutineries (France) et des grèves.",
      ],
    },
    {
      title: "1918 : la victoire des Alliés et la fin des empires",
      paragraphs: [
        "Au printemps 1918, l'Allemagne lance de grandes offensives à l'Ouest, mais elles échouent. Renforcés par les troupes américaines et par les chars, les Alliés contre-attaquent à partir de l'été. Les alliés de l'Allemagne capitulent les uns après les autres. L'**armistice** est signé le **11 novembre 1918** à Rethondes.",
        "Le bilan humain est d'environ 10 millions de soldats tués et de millions de blessés, dont les « gueules cassées ». Quatre empires disparaissent : allemand, austro-hongrois, russe et ottoman. La guerre ouvre une période d'instabilité en Europe.",
      ],
    },
  ],
  dates: [
    { date: "28 juin 1914", event: "Assassinat de l'archiduc François-Ferdinand à Sarajevo" },
    { date: "Août 1914", event: "Entrée en guerre des grandes puissances européennes" },
    { date: "Septembre 1914", event: "Bataille de la Marne : fin de la guerre de mouvement" },
    { date: "1915", event: "Expédition des Dardanelles ; génocide des Arméniens dans l'Empire ottoman" },
    { date: "Février-décembre 1916", event: "Bataille de Verdun" },
    { date: "Avril 1917", event: "Entrée en guerre des États-Unis" },
    { date: "Mars 1918", event: "Paix de Brest-Litovsk entre la Russie et l'Allemagne" },
    { date: "11 novembre 1918", event: "Armistice signé à Rethondes" },
  ],
  notions: [
    { term: "Guerre de mouvement", definition: "Phase où les armées se déplacent rapidement pour encercler ou battre l'adversaire (1914, 1918)." },
    { term: "Guerre de position", definition: "Phase où le front se fige et où les armées s'enterrent dans les tranchées (1915-1917)." },
    { term: "Guerre totale", definition: "Guerre qui mobilise toutes les ressources humaines, économiques et morales des belligérants." },
    { term: "Armistice", definition: "Convention qui suspend les combats, avant la signature d'un traité de paix." },
    { term: "Génocide des Arméniens", definition: "Extermination organisée d'environ 1,2 à 1,5 million d'Arméniens par le gouvernement ottoman à partir de 1915." },
    { term: "Mutinerie", definition: "Refus collectif d'obéir des soldats, comme dans l'armée française au printemps 1917." },
  ],
  actors: [
    { name: "François-Ferdinand", role: "Archiduc héritier de l'Autriche-Hongrie, assassiné à Sarajevo." },
    { name: "Georges Clemenceau", role: "Président du Conseil français à partir de novembre 1917, surnommé « le Père la Victoire »." },
    { name: "Philippe Pétain", role: "Général français associé à la défense de Verdun en 1916." },
    { name: "Woodrow Wilson", role: "Président des États-Unis, qui fait entrer son pays dans la guerre en 1917." },
  ],
  sujets: [
    "La Première Guerre mondiale : les grandes étapes d'un embrasement mondial.",
    "1917, une année tournant de la Première Guerre mondiale ?",
    "Pourquoi parle-t-on de guerre mondiale pour le conflit de 1914-1918 ?",
  ],
  flashcards: [
    { front: "Quel événement déclenche la crise de juillet 1914 ?", back: "L'assassinat de l'archiduc François-Ferdinand à Sarajevo, le 28 juin 1914." },
    { front: "Que prévoit le plan Schlieffen ?", back: "Battre rapidement la France en passant par la Belgique, puis se retourner contre la Russie." },
    { front: "Pourquoi la bataille de la Marne est-elle décisive ?", back: "Elle arrête l'offensive allemande en septembre 1914 et met fin à la guerre de mouvement." },
    { front: "Qu'est-ce que Verdun ?", back: "La bataille de février à décembre 1916, qui fait plus de 300 000 morts, devenue le symbole de l'enfer des tranchées." },
    { front: "Pourquoi 1917 est-elle un tournant ?", back: "Les États-Unis entrent en guerre, la Russie sort du conflit après les révolutions, et des mutineries éclatent." },
    { front: "Que signe la Russie en mars 1918 ?", back: "La paix de Brest-Litovsk avec l'Allemagne." },
    { front: "Quels empires disparaissent avec la guerre ?", back: "Les empires allemand, austro-hongrois, russe et ottoman." },
    { front: "Quand et où l'armistice est-il signé ?", back: "Le 11 novembre 1918, à Rethondes, dans la forêt de Compiègne." },
  ],
  quiz: [
    {
      question: "Quels pays forment la Triple-Entente ?",
      options: ["Allemagne, Autriche-Hongrie, Italie", "France, Royaume-Uni, Russie", "France, États-Unis, Japon", "Royaume-Uni, Italie, Serbie"],
      answer: 1,
      explanation: "La Triple-Entente réunit la France, le Royaume-Uni et la Russie. La Triple-Alliance réunit l'Allemagne, l'Autriche-Hongrie et l'Italie, qui rejoint finalement l'Entente en 1915.",
    },
    {
      question: "Quelle bataille met fin à la guerre de mouvement en 1914 ?",
      options: ["Verdun", "La Somme", "La Marne", "Le Chemin des Dames"],
      answer: 2,
      explanation: "La victoire franco-britannique de la Marne, en septembre 1914, arrête l'avancée allemande vers Paris.",
    },
    {
      question: "En quelle année a lieu la bataille de Verdun ?",
      options: ["1914", "1915", "1916", "1918"],
      answer: 2,
      explanation: "Verdun dure de février à décembre 1916.",
    },
    {
      question: "Pourquoi les États-Unis entrent-ils en guerre en 1917 ?",
      options: [
        "À cause de l'attentat de Sarajevo",
        "Notamment à cause de la guerre sous-marine à outrance menée par l'Allemagne",
        "Pour soutenir la révolution russe",
        "Parce que le Japon les attaque",
      ],
      answer: 1,
      explanation: "La guerre sous-marine à outrance menace le commerce américain. Le télégramme Zimmermann, qui propose une alliance au Mexique contre les États-Unis, joue aussi un rôle.",
    },
    {
      question: "Quel traité fait sortir la Russie de la guerre ?",
      options: ["Le traité de Versailles", "Le traité de Brest-Litovsk", "Le traité de Sèvres", "Le traité de Saint-Germain"],
      answer: 1,
      explanation: "Signé en mars 1918 par les bolcheviks, le traité de Brest-Litovsk cède à l'Allemagne de vastes territoires.",
    },
    {
      question: "Quel génocide est perpétré dans l'Empire ottoman à partir de 1915 ?",
      options: ["Le génocide des Arméniens", "La Shoah", "Le génocide des Tutsi", "Le Holodomor"],
      answer: 0,
      explanation: "Le gouvernement jeune-turc organise la déportation et l'extermination des Arméniens, qui fait entre 1,2 et 1,5 million de morts.",
    },
    {
      question: "Quel pays rejoint l'Entente dès 1914 ?",
      options: ["L'Empire ottoman", "La Bulgarie", "Le Japon", "Les États-Unis"],
      answer: 2,
      explanation: "Le Japon déclare la guerre à l'Allemagne en août 1914. L'Empire ottoman et la Bulgarie rejoignent les empires centraux.",
    },
    {
      question: "Que se passe-t-il le 11 novembre 1918 ?",
      options: ["La signature du traité de Versailles", "L'armistice", "La fin de la bataille de Verdun", "L'entrée en guerre des États-Unis"],
      answer: 1,
      explanation: "L'armistice de Rethondes met fin aux combats. Le traité de Versailles, signé avec l'Allemagne, date du 28 juin 1919.",
    },
  ],
}

export default chapter
