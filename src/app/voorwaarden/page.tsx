import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Algemene voorwaarden — ${siteConfig.business.name}`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Algemene voorwaarden">
      <h2>Offertes</h2>
      <p>
        Offertes zijn vrijblijvend en dertig dagen geldig. De genoemde prijzen
        zijn inclusief btw, tenzij anders vermeld. Meerwerk voeren we alleen uit
        na schriftelijk akkoord.
      </p>
      <h2>Uitvoering</h2>
      <p>
        We plannen de werkzaamheden in overleg en geven vooraf een tijdvak door.
        Werkzaamheden worden uitgevoerd volgens NEN 1010. Als tijdens het werk
        blijkt dat de bestaande installatie niet veilig is, melden we dat
        voordat we verdergaan.
      </p>
      <h2>Storingen</h2>
      <p>
        Storingsmeldingen worden behandeld tijdens onze openingstijden. We
        hebben geen 24-uurs storingsdienst. Bij acuut gevaar, zoals rook of
        brandlucht, schakelt u de hoofdschakelaar uit en belt u bij vlammen 112.
      </p>
      <h2>Garantie</h2>
      <p>
        Op de uitvoering van onze werkzaamheden geldt twee jaar garantie. Op
        geleverde materialen geldt de garantietermijn van de fabrikant. De
        garantie vervalt bij wijzigingen aan de installatie door derden.
      </p>
      <h2>Betaling</h2>
      <p>
        Betaling binnen veertien dagen na factuurdatum. Bij grotere projecten
        werken we met termijnen die in de offerte staan vermeld.
      </p>
      <h2>Contact</h2>
      <p>
        {siteConfig.business.legalName}, KvK {siteConfig.business.kvk}.
      </p>
    </LegalPage>
  );
}
