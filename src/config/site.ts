/**
 * ============================================================================
 *  SITE CONFIG — de enige file die je hoeft aan te passen per prospect.
 * ============================================================================
 *
 *  MODUS demo 02 — elektricien / elektrotechnisch installatiebedrijf (NL).
 *
 *  ⚠️  DEMO-CONTENT WAARSCHUWING
 *  "Van Dalen Elektrotechniek" is een VERZONNEN bedrijf. Alle reviews,
 *  uitgevoerd werk, cijfers, adres- en contactgegevens hieronder zijn
 *  voorbeelddata. Alles wat verzonnen is, is gemarkeerd met `DEMO:` in een
 *  comment. Vervang deze velden voordat de site live gaat voor een echte klant.
 *
 *  Snelle personalisatie voor een prospect (±5 minuten):
 *    1. `business`      — naam, telefoon, WhatsApp, e-mail, adres
 *    2. `claims`        — wat dit bedrijf écht belooft (zie blok hieronder)
 *    3. `theme`         — primaire kleur + accentkleur
 *    4. `serviceArea`   — regio + plaatsen
 *    5. `hero`          — kop, subkop, foto
 *    6. `services`      — werk dat dit bedrijf écht doet
 *    7. `reviews`       — echte reviews, of `show: false`
 *    8. `seo`           — title, description, canonical URL
 *    9. Zet `demoMode: false` zodra het geen demo meer is.
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────── TYPES ────

/** Welk icoon bij een dienst hoort. Zie src/components/ui/Icons.tsx. */
export type ServiceIcon =
  | "bolt"
  | "panel"
  | "socket"
  | "light"
  | "charger"
  | "renovation"
  | "building";

export type Service = {
  /** slug — gebruikt als anchor en als id in het aanvraagformulier */
  id: string;
  title: string;
  /** Eén zin: wat je concreet krijgt. Geen marketingtaal. */
  description: string;
  /** 3 bullets. Scanbaar, concreet, technisch waar dat kan. */
  points: string[];
  icon: ServiceIcon;
  /** Hoort dit bij storingen (bellen) of bij gepland werk (offerte)? */
  track: "storing" | "gepland";
  /** DEMO: richtprijzen zijn voorbeelden. Altijd verifiëren bij de echte klant. */
  priceIndication?: string;
};

export type WorkExample = {
  title: string;
  place: string;
  summary: string;
  /** Technische regels — dit is wat een elektricien geloofwaardig maakt */
  specs: string[];
  image?: string;
  imageAlt?: string;
};

export type Review = {
  name: string;
  place: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Welke klus het betrof — maakt de review geloofwaardig en relevant */
  job: string;
  date: string;
};

/**
 * ============================================================================
 *  CLAIMS — alles wat dit bedrijf aan de klant BELOOFT.
 * ============================================================================
 *  Dit zijn de enige harde, bedrijfsspecifieke toezeggingen op de site. Ze
 *  staan hier los, zodat je ze bij het personaliseren voor een prospect in
 *  één oogopslag kunt nalopen: pas de waarde aan, of zet 'm op `null` /
 *  `false` en de claim verdwijnt overal waar hij voorkomt — hero, routes,
 *  USP's, werkwijze, formulier en FAQ.
 *
 *  Beloof niets wat de klant niet waarmaakt: dit is precies het soort tekst
 *  waar iemand je later op afrekent. Bij een elektricien geldt dat dubbel —
 *  bereikbaarheid en veiligheid zijn hier de gevoelige punten.
 * ============================================================================
 */
const claims = {
  /** Reactietermijn op een aanvraag. null = termijn wordt nergens genoemd. */
  responseTime: "1 werkdag" as string | null,
  /**
   * Hoe snel er bij een storing gereageerd wordt, BINNEN openingstijden.
   * null = er wordt geen termijn genoemd en de site vraagt alleen om te bellen.
   */
  faultResponse: "dezelfde dag" as string | null,
  /**
   * ⚠️ 24/7 STORINGSDIENST — standaard UIT.
   *
   * Zet dit alléén op true als de klant daadwerkelijk 's nachts en in het
   * weekend uitrukt. Een elektricien die onterecht 24/7 belooft krijgt om
   * 23:00 een telefoon die hij niet opneemt, en dat is precies de reden dat
   * mensen een installateur niet meer vertrouwen. Zolang dit false is, noemt
   * de site nergens spoed buiten openingstijden.
   */
  emergency247: false,
  /** Buiten openingstijden bereikbaar voor storingen? Bijv. "ma t/m vr tot 20:00". */
  extendedFaultWindow: null as string | null,
  /** Offerte en opname kosten niets. */
  freeQuote: true,
  /** Vaste prijs vooraf, offerte per onderdeel. */
  fixedPrice: true,
  /** Garantietermijn in jaren op uitvoering. null = geen garantieclaim. */
  warrantyYears: 2 as number | null,
  /** Werkt met eigen monteurs in plaats van ingehuurde ZZP'ers. */
  ownStaff: true,
  /** Ruimt op, stofzuigt en levert netjes op. */
  tidyFinish: true,
  /** Voorrijkosten, bijv. "€ 45 binnen de regio". null = niet genoemd. */
  calloutFee: null as string | null,
  /**
   * ⚠️ CERTIFICERINGEN — standaard LEEG.
   *
   * Vul hier NIETS in wat je niet hebt gezien. InstallQ, Techniek Nederland,
   * KOMO, NEN 1010-certificering en vergelijkbare keurmerken zijn
   * verifieerbaar; een onterechte vermelding is op een installatiesite het
   * snelste manier om een prospect te verliezen (of erger). Laat leeg tot de
   * klant het bewijs heeft aangeleverd.
   *
   * Voorbeeld zodra het klopt:
   *   certifications: ["Erkend installateur (InstallQ)"]
   */
  certifications: [] as string[],
};

/** Houdt alleen de ingeschakelde items over, met behoud van het type. */
function enabled<T>(items: (T | null | false | undefined | "" | 0)[]): T[] {
  return items.filter((item): item is T => Boolean(item));
}

/** "1 werkdag" -> "binnen 1 werkdag", of een nette terugvaltekst. */
const within = (value: string | null, fallback: string) =>
  value ? `binnen ${value}` : fallback;

/** ["a","b","c"] -> "a, b en c" */
const sentenceList = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? "")
    : `${items.slice(0, -1).join(", ")} en ${items[items.length - 1]}`;

/**
 * De harde toezeggingen als één lopende zin, of een lege string als er geen
 * enkele claim aan staat.
 *
 * Hierdoor blijven ook de hero-subkop en de SEO-omschrijving kloppen wanneer
 * je claims uitzet. Zonder dit zou daar "Eigen monteurs, vaste prijs vooraf"
 * blijven staan van een bedrijf dat dat niet waarmaakt — precies de belofte
 * waar een prospect je later op afrekent.
 */
const promiseSentence = (() => {
  const parts = enabled([
    claims.ownStaff && "eigen monteurs",
    claims.fixedPrice && "een vaste prijs vooraf",
    claims.warrantyYears && `${claims.warrantyYears} jaar garantie op de uitvoering`,
  ]);
  if (parts.length === 0) return "";
  const sentence = sentenceList(parts);
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`;
})();

export const siteConfig = {
  /**
   * demoMode = true toont overal subtiele "voorbeeld"-labels en een
   * demo-balk bovenaan. Zet op false voor een echte klant.
   */
  demoMode: true,

  /** Weergave-opties die per prospect verschillen. */
  display: {
    /**
     * Richtprijzen bij de diensten tonen.
     *
     * Staat BEWUST uit in het herbruikbare master-template: de bedragen in
     * `services[].priceIndication` zijn voorbeelden, en een installateur die
     * andere tarieven hanteert haakt af zodra hij prijzen ziet die niet de
     * zijne zijn. Zet 'm aan zodra de echte tarieven ingevuld zijn.
     */
    showPriceIndications: false,
  },

  /** Teksten die alleen zichtbaar zijn zolang demoMode aan staat. */
  demoLabels: {
    bannerTitle: "Voorbeeldwebsite",
    bannerBody:
      "is een fictief bedrijf. Teksten, reviews, uitgevoerd werk en contactgegevens zijn demo-content.",
    badge: "Voorbeeld",
    workBadge: "Voorbeeldwerk",
    reviewsNoticeTitle: "Voorbeeldreviews.",
    reviewsNoticeBody:
      "Deze teksten en cijfers zijn demo-content en horen niet bij echte klanten. In de live versie staan hier de echte Google-reviews.",
    quoteNotice:
      "Demo: het formulier verstuurt nog niets. In productie gaat de aanvraag naar e-mail, CRM, een webhook of een afsprakentool.",
    quoteSuccessNotice: "Demo: deze aanvraag is niet echt verstuurd.",
  },

  // ───────────────────────────────────────────────────────────── BEDRIJF ────
  business: {
    /** DEMO: verzonnen bedrijfsnaam */
    name: "Van Dalen Elektrotechniek",
    /** Korte naam voor nav/footer wanneer de volledige naam te lang is */
    shortName: "Van Dalen",
    legalName: "Van Dalen Elektrotechniek B.V.",
    tagline: "Elektricien in Amersfoort en omgeving",
    logoSrc: null as string | null,
    foundedYear: 2012,

    /** DEMO: placeholder-nummer. Overal afgeleid uit deze twee velden. */
    phone: {
      /** Internationaal, zonder spaties — voor tel: en wa.me */
      e164: "+31612345678",
      /** Zoals getoond aan de bezoeker */
      display: "06 1234 5678",
    },
    /** DEMO: zelfde nummer als placeholder. Mag een apart zakelijk WA-nummer zijn. */
    whatsapp: {
      e164: "+31612345678",
      /**
       * Voorgevulde eerste WhatsApp-regel, per context. Houd ze kort en
       * menselijk. Elke WhatsApp-knop op de site kiest hier een van.
       *
       * Let op: WhatsApp is bij een elektricien bewust de TWEEDE keuze. Bij
       * een storing hoort iemand te bellen, niet te appen en te wachten.
       */
      messages: {
        /** Algemene knoppen (header, footer) */
        default:
          "Hallo Van Dalen Elektrotechniek, ik heb een vraag over elektra.",
        /** Knoppen die expliciet om foto's vragen */
        photos:
          "Hallo, ik stuur een foto van de meterkast. Kunnen jullie zeggen wat er nodig is?",
        /** Vanuit het offerteformulier */
        quote:
          "Hallo, ik wil graag een offerte voor elektrawerk. Hierbij een paar foto's.",
      },
      /** Ondersteunende regel bij WhatsApp-knoppen — de niche-specifieke haak */
      photoPrompt:
        "Niet zeker wat u nodig heeft? Stuur een foto van de meterkast of de situatie via WhatsApp.",
      photoPromptShort: "Of stuur een foto via WhatsApp",
      /** Waarom WhatsApp hier níét de eerste keuze is */
      notForFaults: "Bij een storing: bel ons. Dan weet u meteen waar u aan toe bent.",
    },
    /** DEMO: placeholder e-mail */
    email: "info@vandalenelektrotechniek.nl",

    /** DEMO: verzonnen vestigingsadres */
    address: {
      street: "Nijverheidsweg 34",
      postalCode: "3812 PM",
      city: "Amersfoort",
      country: "NL",
      /** Laat op false staan als het bedrijf geen bezoekadres heeft */
      showOnSite: true,
      /** DEMO: coördinaten bij benadering (Amersfoort) — alleen voor schema.org */
      lat: 52.1561,
      lng: 5.3878,
    },

    /** DEMO: verzonnen registratienummers */
    kvk: "00000000",
    btw: "NL000000000B01",

    /**
     * Wanneer je bereikbaar bent. Dit is bij een elektricien het eerste wat
     * iemand met een storing wil weten — en het is de reden dat de site
     * nergens 24/7 belooft zolang `claims.emergency247` uit staat.
     */
    hours: [
      { days: "Maandag t/m vrijdag", time: "07:00 – 17:30" },
      { days: "Zaterdag", time: "Op afspraak" },
      { days: "Zondag", time: "Gesloten" },
    ],
    /** Eén regel naast de telefoonknop */
    hoursSummary: "Ma t/m vr 07:00 – 17:30",

    socials: [
      { label: "LinkedIn", href: "https://linkedin.com/" },
      { label: "Instagram", href: "https://instagram.com/" },
    ],
  },

  // ─────────────────────────────────────────────────────────────── THEMA ────
  /**
   * Twee kleuren bepalen de hele site. Ze worden als CSS-variabelen op <html>
   * gezet (zie app/layout.tsx), dus hier wijzigen is genoeg.
   *   brand  = grafiet: donkere secties, koppen, technische vlakken
   *   accent = signaalamber: de belknop en alles wat aandacht moet trekken
   *
   * Amber is hier bewust gekozen boven blauw: blauw leest als software, en
   * amber is de kleur die in elektrotechniek "let op" betekent. Tekst op
   * amber is donker (zie --color-accent-ink in globals.css), niet wit.
   */
  theme: {
    brand: "#1D232A",
    brandDark: "#141920",
    accent: "#FFB300",
    accentDark: "#E09E00",
  },

  // ────────────────────────────────────────────────────────────────── CTA ────
  /**
   * De conversiehiërarchie van deze niche: BELLEN staat voorop, offerte
   * aanvragen is de tweede actie, WhatsApp de derde. Bij een hovenier is dat
   * andersom; bij een elektricien wil iemand met een storing een stem horen.
   */
  cta: {
    call: { label: "Bellen", labelShort: "Bellen" },
    primary: {
      label: "Offerte aanvragen",
      labelShort: "Offerte",
      href: "#offerte",
    },
    whatsapp: { label: "Stuur een WhatsApp", labelShort: "WhatsApp" },
  },

  // ─────────────────────────────────────────────────────────────── REGIO ────
  serviceArea: {
    /** Gebruikt in koppen en SEO-teksten: "in {region} en omgeving" */
    region: "Amersfoort",
    regionLong: "Amersfoort en omgeving",
    /** Straal die je noemt in de regiosectie */
    radiusKm: 25,
    places: [
      "Amersfoort",
      "Leusden",
      "Soest",
      "Soesterberg",
      "Baarn",
      "Hoevelaken",
      "Nijkerk",
      "Bunschoten-Spakenburg",
      "Woudenberg",
      "Barneveld",
      "Zeist",
      "Scherpenzeel",
    ],
    note: "Staat uw plaats er niet bij? Bel gerust — net buiten de regio rijden we vaak ook.",
    eyebrow: "Werkgebied",
    intro:
      "We werken binnen een straal van ongeveer 25 km rond Amersfoort. Daardoor staan we bij een storing snel voor de deur en hoeft u voor klein werk niet weken te wachten.",
  },

  // ──────────────────────────────────────────────────────────────── HERO ────
  /**
   * De hero moet in één oogopslag drie dingen zeggen: wát we zijn, wáár we
   * werken, en of u moet bellen of een offerte moet aanvragen. Die laatste
   * splitsing is het hele ontwerp van deze pagina.
   */
  hero: {
    /** Eerste regel boven de kop — plaatst het bedrijf direct in de regio */
    eyebrow: "Elektricien in Amersfoort en omgeving",
    /** Zeg WAT je doet en WAAR. Geen "uw partner in elektrotechniek". */
    title: "Storingen verholpen en elektra aangelegd in Amersfoort e.o.",
    subtitle: `Van een groep die eruit vliegt tot een nieuwe groepenkast, laadpaal of complete renovatie.${
      promiseSentence ? ` ${promiseSentence}` : ""
    } U hoort van ons wanneer we komen.`,
    image: "/img/hero-elektricien.jpg",
    imageAlt:
      "Monteur met werkhandschoen houdt een gestripte installatiekabel vast",
    /**
     * De twee routes die de hero aanbiedt. Dit is géén marketingkeuze maar
     * een echte splitsing: de ene bezoeker heeft nu geen stroom, de andere
     * oriënteert zich op een laadpaal. Ze hebben niets aan dezelfde knop.
     */
    routes: {
      fault: {
        label: "Storing of geen stroom",
        body: "Groep eruit, geen stroom, of een schakelaar die het niet meer doet. Bel ons — dan weet u meteen waar u aan toe bent.",
      },
      planned: {
        label: "Gepland elektrawerk",
        body: "Groepenkast, laadpaal, verlichting, extra stroompunten of een renovatie. Vraag vrijblijvend een offerte aan.",
      },
    },
    /** Max 3. Afgeleid van `claims` bovenaan dit bestand. */
    badges: enabled([
      claims.ownStaff && "Eigen monteurs",
      claims.fixedPrice && "Vaste prijs vooraf",
      claims.warrantyYears && `${claims.warrantyYears} jaar garantie op uitvoering`,
    ]),
  },

  // ─────────────────────────────────────────────────── FEITEN / SPECSTRIP ────
  /**
   * Een smalle strip met harde feiten in plaats van een sterrenbalk. Bewust
   * nuchter: cijfers die je kunt nalopen, geen keurmerken die we niet hebben.
   *
   * DEMO: beoordeling en aantallen zijn voorbeeldwaarden.
   */
  specs: {
    rating: 4.8,
    reviewCount: 94,
    reviewSource: "Google",
    items: enabled([
      { label: "Actief sinds", value: "2012" },
      { label: "Werkgebied", value: "25 km rond Amersfoort" },
      claims.responseTime && {
        label: "Reactie op aanvraag",
        value: within(claims.responseTime, "zo snel mogelijk"),
      },
      claims.ownStaff && { label: "Uitvoering", value: "Eigen monteurs" },
    ]),
  },

  // ──────────────────────────────────────────────────────────────── ROUTES ────
  /**
   * De uitgewerkte splitsing tussen storing en gepland werk. Dit is de sectie
   * die deze niche nodig heeft en een hovenier niet: bij elektra bepaalt de
   * urgentie welk kanaal je moet gebruiken.
   */
  pathways: {
    eyebrow: "Twee situaties",
    title: "Weet u of u moet bellen of een offerte moet aanvragen?",
    subtitle:
      "Bij elektra scheelt dat veel tijd. Hieronder staat per situatie wat het snelste werkt.",
    fault: {
      label: "Storing",
      title: "Er is nu iets mis",
      body: "Bel ons. Aan de telefoon horen we meestal binnen een paar minuten of het iets is wat u zelf veilig kunt controleren, of dat we moeten komen.",
      /** Herkenbare symptomen — hieraan ziet iemand dat dit zijn situatie is */
      signals: [
        "Geen stroom in huis of in een deel van het huis",
        "De aardlekschakelaar slaat er steeds uit",
        "Een groep die eruit vliegt zodra u iets aanzet",
        "Brandlucht, een warm stopcontact of knetterende schakelaar",
        "Schakelaar, stopcontact of verlichting die het niet meer doet",
      ],
      /** Veiligheidsadvies. Dit hoort op élke elektricienssite te staan. */
      safetyNote:
        "Ruikt u brandlucht of is er rook? Schakel de hoofdschakelaar uit en bel ons direct. Bij vlammen eerst 112.",
    },
    planned: {
      label: "Gepland werk",
      title: "Er moet iets aangelegd of vervangen worden",
      body: "Vraag een offerte aan. Vier korte vragen, en u krijgt een prijs per onderdeel in plaats van één bedrag waar u niets van kunt nalezen.",
      signals: [
        "Groepenkast vervangen of uitbreiden",
        "Laadpaal voor de auto",
        "Extra stopcontacten of een aparte groep",
        "Binnen- en buitenverlichting",
        "Elektra vernieuwen bij een verbouwing",
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── DIENSTEN ────
  servicesIntro: {
    eyebrow: "Werkzaamheden",
    title: "Wat we doen",
    subtitle:
      "Particulier en zakelijk, van één stopcontact tot de complete elektra van een woning.",
  },

  services: [
    {
      id: "storing",
      title: "Storing oplossen",
      description:
        "Zoeken en verhelpen van de oorzaak, niet alleen de groep terugzetten.",
      points: [
        "Meten met een installatietester, geen gokwerk",
        "U hoort wat de oorzaak was en wat eraan gedaan is",
        "Kleine storingen vaak in één bezoek verholpen",
      ],
      icon: "bolt",
      track: "storing",
      priceIndication: "Storingstarief vanaf € 85 per uur",
    },
    {
      id: "groepenkast",
      title: "Groepenkast vervangen of uitbreiden",
      description:
        "Een nieuwe kast met voldoende groepen en aardlekschakelaars, aangelegd volgens NEN 1010.",
      points: [
        "Uitbreiden van 1-fase naar 3-fase waar dat kan",
        "Aparte groepen voor kookplaat, wasmachine en laadpaal",
        "Groepen duidelijk gelabeld, zodat u ze zelf terugvindt",
      ],
      icon: "panel",
      track: "gepland",
      priceIndication: "Vervangen vanaf € 950",
    },
    {
      id: "stopcontacten",
      title: "Stopcontacten en schakelaars",
      description:
        "Extra stroompunten, verplaatsen van bestaande punten of alles vervangen.",
      points: [
        "Inbouw, opbouw of in de plint weggewerkt",
        "Buitenstopcontacten met de juiste beschermingsgraad",
        "Wandcontactdozen met USB-C waar dat handig is",
      ],
      icon: "socket",
      track: "gepland",
      priceIndication: "Extra stopcontact vanaf € 95",
    },
    {
      id: "verlichting",
      title: "Verlichting",
      description:
        "Binnen- en buitenverlichting aanleggen, vervangen of schakelbaar maken.",
      points: [
        "Inbouwspots, railverlichting en lichtplannen",
        "Tuinverlichting en gevelarmaturen met schemerschakelaar",
        "Dimmers die passen bij uw led — zonder flikkeren",
      ],
      icon: "light",
      track: "gepland",
      priceIndication: "Armatuur plaatsen vanaf € 75",
    },
    {
      id: "laadpaal",
      title: "Laadpaal installeren",
      description:
        "Laadpaal of wallbox aan huis, met een eigen groep en de juiste beveiliging.",
      points: [
        "Controle of uw aansluiting het aankan, vóór de offerte",
        "Eigen groep met type B aardlekbeveiliging",
        "Dynamic load balancing, zodat de hoofdzekering het houdt",
      ],
      icon: "charger",
      track: "gepland",
      priceIndication: "Installatie vanaf € 650 excl. laadpaal",
    },
    {
      id: "renovatie",
      title: "Elektra vernieuwen",
      description:
        "Complete bedrading vervangen bij een verbouwing of in een oudere woning.",
      points: [
        "Oude bedrading zonder aarde volledig vervangen",
        "In overleg gefaseerd, zodat u niet zonder stroom zit",
        "Hak- en freeswerk en herstel netjes afgewerkt",
      ],
      icon: "renovation",
      track: "gepland",
      priceIndication: "Woning vanaf € 4.500",
    },
    {
      id: "zakelijk",
      title: "Zakelijke installaties",
      description:
        "Elektra voor winkels, kantoren, bedrijfspanden en VvE's.",
      points: [
        "Verdeelinrichtingen, krachtstroom en noodverlichting",
        "Werk buiten openingstijden in overleg mogelijk",
        "Onderhoud en periodieke inspectie op afspraak",
      ],
      icon: "building",
      track: "gepland",
      priceIndication: "Op offertebasis",
    },
  ] satisfies Service[],

  // ──────────────────────────────────────────────────── UITGEVOERD WERK ────
  /**
   * DEMO: dit zijn géén echte klantprojecten. De technische specificaties zijn
   * realistisch maar verzonnen. Vervang door eigen werk van de klant — bij een
   * elektricien is één foto van een nette meterkast overtuigender dan een
   * pagina tekst.
   */
  workIntro: {
    eyebrow: "Uitgevoerd werk",
    title: "Recent werk",
    subtitle:
      "Een paar klussen uit de afgelopen maanden, met wat er precies gedaan is.",
  },

  work: [
    {
      title: "Groepenkast vervangen en uitgebreid",
      place: "Leusden",
      summary:
        "Woning uit 1974 met een kast vol oude smeltveiligheden en één aardlek. Nieuwe kast geplaatst zonder dat het gezin een dag zonder stroom zat.",
      specs: [
        "3-fase, 12 groepen",
        "2 aardlekschakelaars, 30 mA",
        "Aparte groep voor kookplaat en wasmachine",
        "Uitgevoerd in 1 dag",
      ],
      image: "/img/groepenkast.jpg",
      imageAlt:
        "Geopende groepenkast met installatieautomaten op DIN-rail en nette bedrading",
    },
    {
      title: "Laadpaal met load balancing",
      place: "Amersfoort",
      summary:
        "11 kW laadpaal op de oprit. Hoofdaansluiting bleek krap, dus met dynamic load balancing geregeld in plaats van de aansluiting te laten verzwaren.",
      specs: [
        "11 kW, 3-fase",
        "Type B aardlekbeveiliging",
        "Dynamic load balancing op de hoofdaansluiting",
        "18 meter grondkabel onder de oprit door",
      ],
      image: "/img/werk-verdeelkast.jpg",
      imageAlt: "Monteur werkt aan een buitenkast met installatieautomaten",
    },
    {
      title: "Storing: aardlek sloeg er steeds uit",
      place: "Soest",
      summary:
        "Aardlekschakelaar viel een paar keer per dag uit, zonder vast patroon. Met een isolatiemeting bleek een beschadigde kabel naar de tuinverlichting de oorzaak.",
      specs: [
        "Isolatieweerstandmeting per groep",
        "Oorzaak: beschadigde grondkabel tuinverlichting",
        "Kabel vervangen en apart gezekerd",
        "Zelfde dag verholpen",
      ],
      image: "/img/storing-meten.jpg",
      imageAlt:
        "Gehandschoende handen meten met multimeterpennen in een verdeelkast",
    },
  ] satisfies WorkExample[],

  // ─────────────────────────────────────────────────────────────── USP'S ────
  /**
   * Geschreven rond de zorgen die iemand bij een elektricien écht heeft:
   * komt hij opdagen, is het veilig, weet ik wat het kost, en hoe ziet mijn
   * huis eruit als hij weg is.
   *
   * Let op: hier staat BEWUST geen enkel keurmerk. Zie claims.certifications.
   */
  whyUs: {
    eyebrow: "Waarom wij",
    title: "Waar mensen ons voor bellen",
    intro:
      "De meeste mensen die ons bellen hebben al eens een installateur gehad die niet terugbelde, of een rekening gekregen die twee keer zo hoog was als afgesproken. Daarom hebben we het zo geregeld:",
    image: "/img/monteur-aan-het-werk.jpg",
    imageAlt:
      "Monteur monteert een buitenarmatuur aan een houten gevel met een accuschroefmachine",
    reasons: enabled([
      {
        title: "U weet waar u aan toe bent",
        body: `${
          claims.responseTime
            ? `Binnen ${claims.responseTime} een reactie op uw aanvraag, en u`
            : "U"
        } krijgt een tijdvak in plaats van "ergens volgende week".`,
      },
      {
        title: "Veilig en volgens NEN 1010",
        body: "Installaties worden gemeten en doorgemeten opgeleverd. U krijgt de meetwaarden, niet alleen de mededeling dat het goed is.",
      },
      claims.fixedPrice && {
        title: "Offerte per onderdeel",
        body: "U ziet wat de kast kost, wat de groepen kosten en wat het arbeidsloon is. Meerwerk alleen na uw akkoord.",
      },
      claims.ownStaff && {
        title: "Eigen monteurs",
        body: "Dezelfde gezichten, geen wisselende inhuur. Degene die uw installatie aanlegde, weet het ook nog als u een jaar later belt.",
      },
      {
        title: "We leggen het uit",
        body: "In gewone taal, en we labelen de groepenkast zodat u zelf ziet welke groep waarbij hoort.",
      },
      claims.tidyFinish && {
        title: "Netjes achtergelaten",
        body: "Hak- en freeswerk wordt hersteld en we zuigen stof op voor we weggaan. Geen bakje schroeven op de vensterbank.",
      },
    ]),
  },

  // ──────────────────────────────────────────────────────── HOE HET WERKT ────
  process: {
    eyebrow: "Werkwijze",
    title: "Zo gaat een aanvraag",
    subtitle:
      "Voor gepland werk. Bij een storing bellen we niet terug maar nemen we direct op — dat scheelt een stap.",
    steps: [
      {
        title: "U doet een aanvraag",
        body: "Vier korte vragen via het formulier, of een foto van de meterkast via WhatsApp. Een globaal idee is genoeg.",
      },
      {
        title: "We bellen u",
        body: `${
          claims.responseTime
            ? `Binnen ${claims.responseTime} nemen we contact op.`
            : "We nemen contact op."
        } Vaak kunnen we aan de telefoon al zeggen wat er nodig is en wat de richting qua prijs is.`,
      },
      {
        title: "Opname of direct offerte",
        body: `Bij kleiner werk krijgt u meteen een offerte. Bij een kast, laadpaal of renovatie komen we eerst kijken${
          claims.freeQuote ? " — dat kost niets" : ""
        }.`,
      },
      {
        title: "Uitvoeren en opleveren",
        body: "U krijgt een datum en een tijdvak. Na afloop lopen we de installatie met u door en leveren we de meetwaarden aan.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── REVIEWS ────
  /**
   * ⚠️ DEMO-REVIEWS — dit zijn VERZONNEN voorbeelden, geen echte klanten.
   * Ze staan er om het ontwerp te laten zien. Vervang ze door:
   *   - echte, met toestemming overgenomen Google-reviews, of
   *   - een Google-reviews-widget, of
   *   - zet `reviewsSection.show: false` tot er echte reviews zijn.
   * Zolang `demoMode: true` staat, toont de site hierbij een zichtbaar
   * "voorbeeld"-label, zodat niemand ze per ongeluk voor echt aanziet.
   */
  reviewsSection: {
    show: true,
    eyebrow: "Reviews",
    title: "Wat klanten zeggen",
    /**
     * Link naar het échte Google-bedrijfsprofiel van de klant.
     *
     * Blijft `null` in het master-template: de reviews hiernaast zijn
     * voorbeelden, en dan hoort er geen knop te staan die naar Google wijst
     * alsof het om echte beoordelingen gaat.
     */
    googleProfileUrl: null as string | null,
    googlePlaceholderLabel: "Hier komen echte Google-reviews",
    googleLinkLabel: "Bekijk op Google",
  },

  reviews: [
    {
      name: "Erik",
      place: "Amersfoort",
      rating: 5,
      text: "'s Ochtends gebeld omdat de aardlek er steeds uit vloog, 's middags stond er iemand. Hij heeft net zo lang doorgemeten tot hij de oorzaak had en uitgelegd wat er kapot was.",
      job: "Storing opgelost",
      date: "2025-09",
    },
    {
      name: "Familie Bosma",
      place: "Leusden",
      rating: 5,
      text: "Nieuwe groepenkast laten plaatsen. Vooraf een offerte waarin per onderdeel stond wat we kregen, en achteraf exact dat bedrag. De kast is netjes gelabeld, dat scheelt zoeken.",
      job: "Groepenkast vervangen",
      date: "2025-07",
    },
    {
      name: "Marloes",
      place: "Soest",
      rating: 5,
      text: "Laadpaal laten plaatsen. Ze hebben eerst gecheckt of onze aansluiting het aankon in plaats van meteen ja te zeggen. Uiteindelijk met load balancing opgelost, scheelde ons een verzwaring.",
      job: "Laadpaal installeren",
      date: "2025-08",
    },
    {
      name: "Jeroen",
      place: "Nijkerk",
      rating: 4,
      text: "Goed werk geleverd bij het vernieuwen van de elektra. De planning schoof een week op door een levering, daar is wel netjes over gebeld.",
      job: "Elektra vernieuwen",
      date: "2025-05",
    },
    {
      name: "VvE Stationsplein",
      place: "Amersfoort",
      rating: 5,
      text: "Doen al twee jaar de noodverlichting en het onderhoud van onze algemene ruimtes. Komen op de afgesproken momenten en melden het als er iets vervangen moet worden.",
      job: "Zakelijk onderhoud",
      date: "2025-03",
    },
    {
      name: "Sandra",
      place: "Baarn",
      rating: 5,
      text: "Buitenverlichting en een extra buitenstopcontact laten maken. Keurig weggewerkt en ze hebben het stof opgezogen voor ze weggingen. Klinkt klein, maar dat maakt wel verschil.",
      job: "Verlichting en stroompunten",
      date: "2025-06",
    },
  ] satisfies Review[],

  // ───────────────────────────────────────────────────────── OFFERTEFLOW ────
  /**
   * Alle teksten en keuzes van het aanvraagformulier. De flow zelf staat in
   * src/components/QuoteForm.tsx; hier staat wat er gevraagd wordt.
   *
   * Opzet voor deze niche:
   *   1. Werkzaamheden — één tik, geen formulier in beeld bij binnenkomst
   *   2. Locatie       — kwalificeert de aanvraag meteen op werkgebied
   *   3. Urgentie      — bepaalt of iemand beter kan bellen
   *   4. Contact       — pas als iemand al geïnvesteerd heeft
   */
  quote: {
    eyebrow: "Offerte",
    title: "Vraag een vrijblijvende offerte aan",
    subtitle: `Vier korte vragen, ongeveer een minuut werk. U krijgt ${within(
      claims.responseTime,
      "zo snel mogelijk",
    )} een reactie van ons.`,
    stepLabels: ["Werkzaamheden", "Locatie", "Urgentie", "Contactgegevens"],
    estimatedTime: "± 1 minuut",

    steps: {
      work: {
        question: "Waar kunnen we mee helpen?",
        help: "Meerdere opties mogen. Weet u het nog niet precies? Kies wat er het dichtst bij komt.",
      },
      location: {
        question: "Waar is het?",
        help: "Zo weten we meteen of u binnen ons werkgebied valt en welke monteur bij u in de buurt zit.",
      },
      urgency: {
        question: "Hoe dringend is het?",
        help: "Een eerlijk antwoord helpt ons de planning kloppend te houden.",
      },
      contact: {
        question: "Hoe kunnen we u bereiken?",
        help: `U krijgt ${within(
          claims.responseTime,
          "zo snel mogelijk",
        )} een reactie. We bellen alleen over uw aanvraag.`,
      },
    },

    /**
     * Stap 1. Dit is bewust een eigen lijst en niet `services`: in het
     * formulier denkt iemand in problemen ("extra stroompunten"), niet in
     * dienstnamen. `isFault` zet de belaanbeveling aan.
     */
    workOptions: [
      { id: "storing", label: "Storing", isFault: true },
      { id: "groepenkast", label: "Groepenkast" },
      { id: "laadpaal", label: "Laadpaal" },
      { id: "verlichting", label: "Verlichting" },
      { id: "stroompunten", label: "Extra stroompunten" },
      { id: "renovatie", label: "Renovatie" },
      { id: "anders", label: "Anders" },
    ],

    /** Optionele kwalificatievraag op stap 2 */
    propertyLabel: "Om wat voor pand gaat het?",
    propertyOptions: [
      "Woning (koop)",
      "Woning (huur)",
      "Bedrijfspand of winkel",
      "VvE of algemene ruimte",
    ],

    /**
     * Stap 3. `isUrgent` schakelt de belaanbeveling in: iemand met een storing
     * hoort niet eerst een formulier af te maken.
     */
    urgencyOptions: [
      {
        id: "nu",
        label: "Nu — er is een storing",
        help: "Er is geen stroom of er is iets mis",
        isUrgent: true,
      },
      {
        id: "asap",
        label: "Zo snel mogelijk",
        help: "Het werkt nog, maar het moet niet blijven liggen",
      },
      {
        id: "weken",
        label: "Binnen enkele weken",
        help: "We kunnen het inplannen",
      },
      {
        id: "orientatie",
        label: "Ik oriënteer mij",
        help: "Ik wil eerst weten wat het kost",
      },
    ],

    /**
     * Wat er gebeurt zodra iemand "Nu — er is een storing" kiest. Bewust een
     * AANBEVELING en geen blokkade: bellen is sneller, maar iemand die om
     * 22:00 op de bank zit mag gewoon het formulier afmaken.
     */
    urgentCallout: {
      title: "Bij een storing kunt u beter bellen",
      body: "Aan de telefoon horen we meestal binnen een paar minuten wat er aan de hand is. Een formulier belandt in de wachtrij; een telefoontje niet.",
      continueLabel: "Toch het formulier afmaken",
    },

    /** Knop- en hulpteksten */
    nextLabel: "Volgende",
    backLabel: "Terug",
    submitLabel: "Verstuur mijn aanvraag",
    sendingLabel: "Versturen…",
    photoHint: "Liever eerst een foto van de meterkast sturen?",
    photoHintLink: "App 'm naar ons",
    privacyNote:
      "Vrijblijvend. Uw gegevens gebruiken we alleen om op uw aanvraag te reageren.",
    directContactTitle: "Liever direct contact?",

    /** Wordt getoond na succesvol versturen */
    successTitle: "Bedankt, uw aanvraag staat bij ons binnen",
    successBody: `We nemen ${within(
      claims.responseTime,
      "zo snel mogelijk",
    )} contact op om de details door te nemen. Haast? Bel ons gerust.`,
  },

  // ─────────────────────────────────────────────────────────────────── FAQ ────
  faq: {
    eyebrow: "Vragen",
    title: "Veelgestelde vragen",
    aside: "Staat uw vraag er niet bij? Bel gerust, dan hebben we het zo uitgelegd.",
    items: enabled([
      {
        q: "Komen jullie ook 's avonds of in het weekend?",
        /**
         * Dit antwoord volgt `claims.emergency247` en
         * `claims.extendedFaultWindow`. Zet die aan en de tekst klopt vanzelf
         * — maar beloof het pas als het waar is.
         */
        a: claims.emergency247
          ? "Ja. We hebben een storingsdienst die 24 uur per dag bereikbaar is, ook in het weekend. Buiten kantooruren geldt een afwijkend tarief; dat zeggen we aan de telefoon."
          : claims.extendedFaultWindow
            ? `Voor storingen zijn we ${claims.extendedFaultWindow} bereikbaar. Daarbuiten kunt u een bericht achterlaten en bellen we u de eerstvolgende werkdag terug. We hebben bewust geen 24-uurs storingsdienst: dan weet u zeker dat we opnemen als we zeggen dat we opnemen.`
            : "We werken op werkdagen van 07:00 tot 17:30 en op zaterdag op afspraak. We hebben bewust geen 24-uurs storingsdienst — liever een duidelijke bereikbaarheid die we waarmaken dan een nummer dat 's nachts overgaat zonder dat er iemand komt. Is het echt onveilig, bijvoorbeeld bij rook of brandlucht? Schakel de hoofdschakelaar uit en bel bij vlammen 112.",
      },
      {
        q: "Wat kost het om een storing te laten verhelpen?",
        /**
         * Bewust zonder bedragen in het master-template: tarieven verschillen
         * per bedrijf. Vul hier de echte tarieven van de klant in zodra je de
         * site personaliseert (en zet dan ook display.showPriceIndications aan).
         */
        a: claims.calloutFee
          ? `We rekenen ${claims.calloutFee} voorrijkosten plus het uurtarief. Aan de telefoon zeggen we vooraf wat u ongeveer kunt verwachten, zodat u niet voor een verrassing staat.`
          : "Dat hangt af van wat er aan de hand is en hoe lang het zoeken duurt. We zeggen aan de telefoon vooraf welk tarief geldt en wat een gemiddelde storing kost, zodat u weet waar u aan begint voordat we langskomen.",
      },
      {
        q: "Moet mijn groepenkast vervangen worden?",
        a: "Niet automatisch. Een oude kast mag blijven zitten zolang hij veilig is. Vervangen is wel verstandig als er geen aardlekschakelaar in zit, als u nog smeltveiligheden heeft, of als u groepen tekortkomt voor bijvoorbeeld een laadpaal of inductiekookplaat. We zeggen eerlijk wanneer het niet nodig is.",
      },
      {
        q: "Kan ik een foto sturen in plaats van een afspraak maken?",
        a: "Graag zelfs. Met een foto van de meterkast en de situatie kunnen we vaak al zeggen wat er nodig is en wat het ongeveer kost. Bij een storing kunt u beter bellen — dan gaat het sneller.",
      },
      {
        q: "Werken jullie volgens NEN 1010?",
        a: "Ja, dat is de norm waaraan elektrische installaties in Nederland moeten voldoen. Nieuwe installaties leveren we doorgemeten op en u krijgt de meetwaarden.",
      },
      {
        q: "In welke plaatsen werken jullie?",
        a: "In Amersfoort en omgeving, binnen ongeveer 25 kilometer: onder andere Leusden, Soest, Soesterberg, Baarn, Hoevelaken, Nijkerk, Bunschoten-Spakenburg, Woudenberg en Barneveld. Staat uw plaats er niet bij, bel dan even — vaak kan het alsnog.",
      },
      {
        q: "Kan ik een laadpaal laten plaatsen bij mijn huidige aansluiting?",
        a: "Meestal wel. We kijken eerst naar uw hoofdaansluiting en de belasting in huis. Past het krap, dan is dynamic load balancing vaak goedkoper dan het verzwaren van de aansluiting. Dat rekenen we uit vóórdat u een offerte krijgt.",
      },
      {
        q: "Werken jullie ook voor bedrijven en VvE's?",
        a: "Ja, voor winkels, kantoren, bedrijfspanden en VvE's. Werk buiten openingstijden is in overleg mogelijk, zodat uw bedrijf niet stil hoeft te liggen.",
      },
      claims.warrantyYears && {
        q: "Zit er garantie op het werk?",
        a: `Ja, ${claims.warrantyYears} jaar garantie op de uitvoering. Op materialen geldt de garantie van de fabrikant. Gaat er iets mis met wat wij hebben aangelegd, dan komen we terug.`,
      },
    ]),
  },

  // ───────────────────────────────────────────────────────────── FINAL CTA ────
  finalCta: {
    title: "Storing, of plannen voor later?",
    body: "Bel ons bij een storing — dan weet u binnen een paar minuten waar u aan toe bent. Gaat het om werk dat gepland kan worden, vraag dan vrijblijvend een offerte aan.",
  },

  // ─────────────────────────────────────────────────────────────────── SEO ────
  seo: {
    /** Zonder trailing slash. Nodig voor canonical, OG en sitemap. */
    url: "https://demo-elektricien.vercel.app",
    title:
      "Elektricien in Amersfoort e.o. | Storingen, groepenkast en laadpaal — Van Dalen Elektrotechniek",
    description: `Elektricien voor storingen, groepenkast vervangen, laadpaal, verlichting en renovatie in Amersfoort, Leusden, Soest, Nijkerk en omgeving.${
      promiseSentence ? ` ${promiseSentence}` : ""
    }`,
    locale: "nl_NL",
    ogImage: "/img/hero-elektricien.jpg",
    /**
     * Google staat alleen échte, verifieerbare reviews toe in rich results.
     * Laat dit op false staan zolang de reviews hierboven demo-content zijn.
     */
    includeAggregateRating: false,
  },

  // ──────────────────────────────────────────────────────────────── FOOTER ────
  footer: {
    about:
      "Elektrotechnisch installatiebedrijf voor storingen, groepenkasten, laadpalen, verlichting en renovatie in Amersfoort en omgeving. Particulier, zakelijk en VvE.",
    legalLinks: [
      { label: "Privacyverklaring", href: "/privacy" },
      { label: "Algemene voorwaarden", href: "/voorwaarden" },
    ],
  },

  // ─────────────────────────────────────────────────────────────── NAVIGATIE ────
  nav: [
    { label: "Storing", href: "#situaties" },
    { label: "Werkzaamheden", href: "#werkzaamheden" },
    { label: "Werk", href: "#werk" },
    { label: "Werkwijze", href: "#werkwijze" },
    { label: "Regio", href: "#regio" },
  ],

  /** Alle claims blijven leesbaar vanuit componenten die ze willen tonen. */
  claims,
};

export type SiteConfig = typeof siteConfig;
