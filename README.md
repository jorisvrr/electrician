# MODUS demo 02 — Elektricien

Demo-website voor een **elektrotechnisch installatiebedrijf**, bedoeld voor koude
acquisitie in de Nederlandse markt: één sterk uitgewerkte site die je naar veel
elektriciens kunt sturen als "dit is het type site dat we voor u kunnen bouwen".

> ⚠️ **Van Dalen Elektrotechniek is een verzonnen bedrijf.** Alle reviews,
> uitgevoerd werk, cijfers, adres- en contactgegevens zijn demo-content. Zolang
> `demoMode: true` staat, is dat op elke pagina zichtbaar gemarkeerd.

Next.js 16 · TypeScript · Tailwind v4 · geen runtime-dependencies buiten React.

---

## Zo personaliseer je de site (±5 minuten)

Alles wat per bedrijf verschilt staat in **één bestand**: `src/config/site.ts`.
Je hoeft geen component open te maken.

1. `business` — naam, telefoon, WhatsApp, e-mail, adres, openingstijden
2. `claims` — wat dit bedrijf écht belooft (zie hieronder)
3. `theme` — twee kleuren bepalen de hele site
4. `serviceArea` — regio + plaatsen
5. `hero` — kop, subkop, foto
6. `services` — werk dat dit bedrijf echt doet
7. `reviews` — echte reviews, of `reviewsSection.show: false`
8. `seo` — title, description, canonical URL
9. Zet `demoMode: false` zodra het geen demo meer is

Vervang daarna de foto's in `public/img/` — zie `public/img/CREDITS.md`.

### Het `claims`-blok

Bovenaan `site.ts` staan alle harde toezeggingen bij elkaar: reactietermijn,
garantie, vaste prijs, eigen monteurs, voorrijkosten, certificeringen. Zet een
claim op `null` of `false` en hij verdwijnt **overal** — hero, feitenstrip,
USP's, werkwijze, formulier, FAQ én de SEO-omschrijving — zonder dat er een
halve zin achterblijft.

Dat is getest: met alle claims uit staat er nergens meer "eigen monteurs",
"vaste prijs" of "2 jaar garantie", en vallen de teksten terug op neutrale
formuleringen ("zo snel mogelijk" in plaats van "binnen 1 werkdag").

Beloof niets wat de klant niet waarmaakt. Bij een installateur is dat geen
detail: bereikbaarheid en veiligheid zijn precies waar mensen je op afrekenen.

### Twee instellingen om bewust te laten staan

| Instelling | Standaard | Waarom |
| --- | --- | --- |
| `claims.emergency247` | `false` | Een elektricien die onterecht 24/7 belooft, krijgt om 23:00 een telefoon die hij niet opneemt. De site noemt nergens spoed buiten openingstijden zolang dit uit staat. Zet 'm alleen aan als de klant écht uitrukt. |
| `claims.certifications` | `[]` (leeg) | InstallQ, Techniek Nederland en NEN-certificeringen zijn verifieerbaar. Vul pas in wat de klant heeft aangetoond. |
| `display.showPriceIndications` | `false` | De bedragen in `services[].priceIndication` zijn voorbeelden. Een installateur met andere tarieven haakt af zodra hij prijzen ziet die niet de zijne zijn. |

---

## Waarom deze site eruitziet zoals hij eruitziet

### De splitsing storing / gepland werk

Dit is het hele ontwerp. Een elektricien heeft twee soorten bezoekers die niets
aan dezelfde knop hebben:

- **Storing** — geen stroom, aardlek eruit, brandlucht. Die persoon moet
  **bellen**. Hij heeft geen zin in een formulier.
- **Gepland werk** — groepenkast, laadpaal, verlichting, renovatie. Die persoon
  wil juist géén verkoopgesprek maar een **prijs per onderdeel**.

Die splitsing zit in de hero, in een eigen sectie (`Pathways`), in een label op
elke dienstkaart, en in de aanvraagflow.

### Conversiehiërarchie: bellen vóór WhatsApp

De mobiele actiebalk is **Bellen | Offerte aanvragen**, met bellen als bredere,
amberkleurige knop. WhatsApp staat bewust niet in de balk; het blijft
beschikbaar in de secties zelf, voor foto's van de meterkast en niet-urgent
werk. Bij een hovenier is foto's sturen de laagste drempel — bij een
elektricien wil iemand met een storing een stem horen.

### De aanvraagflow stuurt storingen weg van het formulier

Vier stappen: werkzaamheden → locatie → urgentie → contactgegevens.

Kiest iemand **"Storing"** in stap 1, dan verschijnt meteen een hint dat bellen
sneller gaat. Kiest iemand **"Nu — er is een storing"** in stap 3, dan springt
het formulier *niet* automatisch door maar toont het een zichtbare
belaanbeveling met het telefoonnummer. Het is een aanbeveling, geen blokkade:
"Toch het formulier afmaken" staat er gewoon onder, want iemand die om 22:00 op
de bank zit moet zijn aanvraag kwijt kunnen.

In de API-route is `urgencyId` het veld om op te routeren — een storingsmelding
hoort niet in de gewone mailbox maar in een kanaal waar iemand hem meteen ziet.

### Vormgeving

Grafiet met signaalamber, haarlijnen in plaats van schaduwen, nul radius, en
mono-labels voor cijfers en specificaties. Amber en niet blauw: blauw leest als
software, amber betekent in de elektrotechniek "let op". Bij uitgevoerd werk
staat de **technische specificatie** (aantal groepen, type beveiliging) in
plaats van een sfeertekst — dat is in deze branche het echte verkoopargument.

Deze demo deelt bewust **geen** componenten of vormgeving met de andere
niche-demo's. Alleen de architectuurconventies zijn gelijk: één centrale
`site.ts`, `demoMode`, configureerbare claims, een niche-eigen meerstapsformulier
en lokale SEO/schema.

---

## Ontwikkelen

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

## Deployen op Vercel

Importeer deze repository als eigen Vercel-project. Next.js wordt automatisch
herkend; er is geen extra configuratie nodig.

**Optioneel — aanvragen laten binnenkomen:** zet in de Vercel environment
variables `QUOTE_WEBHOOK_URL` op een endpoint van Make, Zapier, n8n of je eigen
backend. Zonder die variabele draait het formulier in demo-modus: de aanvraag
wordt gevalideerd en gelogd, maar niet verstuurd. Zie
`src/app/api/quote/route.ts` voor het aansluiten van e-mail (Resend), een CRM of
een afsprakentool.

Voeg bij livegang spam-bescherming toe (honeypot of Turnstile) en stel een
AVG-conforme bewaartermijn in.

## Structuur

```
src/
├── app/
│   ├── api/quote/route.ts    aanvraag-endpoint + integratiepunt voor productie
│   ├── layout.tsx            fonts, metadata, merkkleuren als CSS-variabelen
│   ├── globals.css           design tokens, knoppen, technische labels
│   ├── page.tsx              volgorde van de secties
│   ├── privacy/ voorwaarden/ juridische placeholders
│   └── robots.ts sitemap.ts
├── components/               alle secties — niche-eigen, niet gedeeld
├── config/site.ts            ⬅ de enige file die je per prospect aanpast
└── lib/contact.ts            tel-, WhatsApp- en mailto-links uit site.ts
```

## Nog te doen vóór livegang bij een echte klant

- [ ] `demoMode: false`
- [ ] Echte bedrijfsgegevens, KvK en btw-nummer
- [ ] Echte reviews, of `reviewsSection.show: false`
- [ ] Eigen foto's van uitgevoerd werk
- [ ] `claims` nalopen mét de klant — beloof niets wat hij niet waarmaakt
- [ ] Privacyverklaring en algemene voorwaarden laten opstellen
- [ ] `seo.url` op het echte domein zetten
- [ ] Spam-bescherming op het formulier
