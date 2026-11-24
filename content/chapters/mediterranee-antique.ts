import type { ChapterContent } from "../types"

const chapter: ChapterContent = {
  slug: "mediterranee-antique",
  metaDescription:
    "Fiche Seconde : la Méditerranée antique, empreintes grecques et romaines. Démocratie athénienne, Empire romain, citoyenneté, christianisme. Dates et quiz.",
  updatedAt: "2026-11-24",
  intro:
    "Autour de la Méditerranée, Grecs et Romains ont élaboré des modèles politiques, juridiques et culturels qui marquent encore notre monde. Athènes invente la **démocratie** au Ve siècle av. J.-C. Rome bâtit un empire immense, qui unifie le bassin méditerranéen et étend peu à peu sa citoyenneté. Cet héritage, transmis et réinterprété, est une référence majeure de la civilisation européenne.",
  problematique:
    "Quelles empreintes politiques et culturelles la Grèce et Rome ont-elles laissées dans le monde méditerranéen ?",
  sections: [
    {
      title: "Athènes, l'invention de la démocratie",
      paragraphs: [
        "Au VIe siècle av. J.-C., les réformes de **Clisthène** (vers 508 av. J.-C.) organisent les citoyens athéniens en dix tribus et posent les bases de la **démocratie**, le « pouvoir du peuple ». Au Ve siècle, sous **Périclès**, la démocratie athénienne atteint son apogée.",
        "Les citoyens se réunissent à l'**Ecclésia**, l'assemblée qui vote les lois et décide de la guerre et de la paix. La **Boulè**, un conseil de 500 membres tirés au sort, prépare les décisions. Une indemnité, le **misthos**, permet aux plus pauvres de participer à la vie politique.",
        "Cette démocratie est **directe** mais **limitée** : seuls les hommes adultes, nés de père et de mère athéniens, sont citoyens. Les femmes, les **métèques** (étrangers résidents) et les **esclaves** en sont exclus, soit l'essentiel de la population.",
      ],
      keyPoints: [
        "Démocratie directe : les citoyens votent eux-mêmes les lois.",
        "Le tirage au sort est considéré comme un procédé démocratique.",
      ],
    },
    {
      title: "Rome, de la République à l'Empire",
      paragraphs: [
        "Selon la tradition, Rome est fondée en 753 av. J.-C. Après une période royale, elle devient une **République** (509 av. J.-C.), dirigée par des magistrats élus (consuls) et par le **Sénat**. Rome conquiert progressivement l'Italie puis tout le bassin méditerranéen, que les Romains appellent ***Mare nostrum*** (« notre mer »).",
        "Les guerres civiles du Ier siècle av. J.-C. affaiblissent la République. En 27 av. J.-C., Octave reçoit le titre d'**Auguste** et devient le premier **empereur**. Il conserve les apparences des institutions républicaines, mais concentre l'essentiel des pouvoirs. Aux Ier et IIe siècles, l'Empire connaît une longue période de stabilité, la ***pax romana***.",
      ],
    },
    {
      title: "Un empire unifié par la citoyenneté et la culture",
      paragraphs: [
        "L'Empire unifie un espace immense, de la Bretagne (Grande-Bretagne actuelle) à l'Égypte. Les routes, les villes construites sur le modèle de Rome (forum, thermes, amphithéâtres), le **latin** dans l'Occident et le **grec** dans l'Orient favorisent la **romanisation** des élites locales.",
        "La **citoyenneté romaine** donne des droits (voter, servir dans les légions, être jugé selon le droit romain) et un statut. Elle est progressivement étendue à des provinciaux : en 48, l'empereur Claude ouvre le Sénat à des notables gaulois. En **212**, l'**édit de Caracalla** accorde la citoyenneté à tous les hommes libres de l'Empire.",
      ],
    },
    {
      title: "Une religion nouvelle et un héritage durable",
      paragraphs: [
        "Né en Palestine au Ier siècle, le **christianisme** se diffuse dans l'Empire malgré des persécutions. En **313**, l'empereur **Constantin** autorise le culte chrétien (**édit de Milan**). À la fin du IVe siècle, l'empereur Théodose fait du christianisme la religion officielle de l'Empire.",
        "L'héritage gréco-romain est immense : la démocratie et la citoyenneté, le droit romain, les langues romanes issues du latin, l'architecture, la philosophie et le théâtre. Il est transmis au Moyen Âge, redécouvert à la Renaissance et sans cesse réinterprété jusqu'à aujourd'hui.",
      ],
    },
  ],
  dates: [
    { date: "753 av. J.-C.", event: "Fondation légendaire de Rome" },
    { date: "Vers 508 av. J.-C.", event: "Réformes de Clisthène à Athènes" },
    { date: "509 av. J.-C.", event: "Naissance de la République romaine (date traditionnelle)" },
    { date: "Ve siècle av. J.-C.", event: "Apogée de la démocratie athénienne sous Périclès" },
    { date: "27 av. J.-C.", event: "Octave devient Auguste, premier empereur romain" },
    { date: "212", event: "Édit de Caracalla : citoyenneté pour tous les hommes libres de l'Empire" },
    { date: "313", event: "Édit de Milan : liberté de culte pour les chrétiens" },
  ],
  notions: [
    { term: "Démocratie", definition: "Régime politique dans lequel le pouvoir est exercé par le peuple, c'est-à-dire par l'ensemble des citoyens." },
    { term: "Citoyen", definition: "Membre d'une cité qui dispose de droits politiques et de devoirs (participer à la vie politique, défendre la cité)." },
    { term: "Métèque", definition: "Étranger libre installé à Athènes, sans droits politiques." },
    { term: "Romanisation", definition: "Adoption par les peuples conquis de la langue, du mode de vie et des institutions des Romains." },
    { term: "Empire", definition: "État qui domine de vastes territoires et des peuples divers, sous l'autorité d'un empereur." },
    { term: "Pax romana", definition: "Paix intérieure assurée par Rome dans l'Empire aux Ier et IIe siècles." },
  ],
  actors: [
    { name: "Clisthène", role: "Réformateur athénien, considéré comme le fondateur de la démocratie (vers 508 av. J.-C.)." },
    { name: "Périclès", role: "Stratège athénien au Ve siècle av. J.-C., figure de l'apogée démocratique." },
    { name: "Auguste", role: "Premier empereur romain (27 av. J.-C. – 14 apr. J.-C.)." },
    { name: "Constantin", role: "Empereur qui autorise le christianisme en 313." },
  ],
  sujets: [
    "La démocratie athénienne au Ve siècle av. J.-C. : un modèle politique original.",
    "Rome, un empire qui unifie le monde méditerranéen.",
    "Être citoyen à Athènes et à Rome.",
  ],
  flashcards: [
    { front: "Qui pose les bases de la démocratie athénienne ?", back: "Clisthène, vers 508 av. J.-C." },
    { front: "Qu'est-ce que l'Ecclésia ?", back: "L'assemblée des citoyens athéniens, qui vote les lois et décide de la guerre et de la paix." },
    { front: "Qui est exclu de la citoyenneté à Athènes ?", back: "Les femmes, les métèques et les esclaves." },
    { front: "À quoi sert le misthos ?", back: "C'est une indemnité qui permet aux citoyens pauvres de participer à la vie politique." },
    { front: "Qui est le premier empereur romain ?", back: "Octave, devenu Auguste en 27 av. J.-C." },
    { front: "Que décide l'édit de Caracalla (212) ?", back: "Il accorde la citoyenneté romaine à tous les hommes libres de l'Empire." },
    { front: "Que permet l'édit de Milan (313) ?", back: "La liberté de culte pour les chrétiens, accordée par Constantin." },
    { front: "Qu'est-ce que la romanisation ?", back: "L'adoption par les peuples conquis de la langue, des modes de vie et des institutions romaines." },
  ],
  quiz: [
    {
      question: "Qui siège à l'Ecclésia ?",
      options: ["Tous les habitants d'Athènes", "Les citoyens athéniens", "Les 500 membres de la Boulè", "Les magistrats élus"],
      answer: 1,
      explanation: "L'Ecclésia réunit les citoyens, des hommes adultes nés de parents athéniens. La Boulè est un conseil distinct, de 500 membres tirés au sort.",
    },
    {
      question: "Comment sont désignés les membres de la Boulè ?",
      options: ["Par élection", "Par tirage au sort", "Par héritage", "Par l'empereur"],
      answer: 1,
      explanation: "Les Athéniens considèrent le tirage au sort comme plus démocratique que l'élection, qui favorise les plus riches et les plus connus.",
    },
    {
      question: "En quelle année Octave devient-il Auguste ?",
      options: ["753 av. J.-C.", "44 av. J.-C.", "27 av. J.-C.", "212"],
      answer: 2,
      explanation: "En 27 av. J.-C., le Sénat confère à Octave le titre d'Auguste. En 44 av. J.-C., Jules César est assassiné.",
    },
    {
      question: "Que permet l'édit de Caracalla ?",
      options: ["La liberté de culte", "La citoyenneté pour tous les hommes libres de l'Empire", "L'abolition de l'esclavage", "La création du Sénat"],
      answer: 1,
      explanation: "En 212, Caracalla étend la citoyenneté à tous les hommes libres de l'Empire. Les esclaves restent exclus.",
    },
    {
      question: "Qu'est-ce qu'un métèque à Athènes ?",
      options: ["Un esclave affranchi", "Un étranger libre installé dans la cité", "Un magistrat", "Un soldat"],
      answer: 1,
      explanation: "Les métèques sont libres et paient des taxes, mais ils n'ont pas de droits politiques.",
    },
    {
      question: "Comment les Romains appellent-ils la Méditerranée ?",
      options: ["Pax romana", "Mare nostrum", "Limes", "Forum"],
      answer: 1,
      explanation: "« Mare nostrum » signifie « notre mer » et traduit la domination romaine sur tout le bassin méditerranéen.",
    },
    {
      question: "Quel empereur autorise le christianisme en 313 ?",
      options: ["Auguste", "Néron", "Constantin", "Théodose"],
      answer: 2,
      explanation: "Constantin autorise le christianisme par l'édit de Milan. Théodose en fait la religion officielle à la fin du IVe siècle.",
    },
    {
      question: "Quelle caractéristique de la démocratie athénienne la distingue de nos démocraties ?",
      options: ["Elle est représentative", "Elle est directe et réservée à une minorité", "Elle inclut les femmes", "Elle repose sur une constitution écrite unique"],
      answer: 1,
      explanation: "Les citoyens votent directement les lois, mais la citoyenneté exclut la majorité de la population.",
    },
  ],
}

export default chapter
