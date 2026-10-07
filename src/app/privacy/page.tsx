import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacyverklaring — ${siteConfig.business.name}`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacyverklaring">
      <h2>Welke gegevens we verwerken</h2>
      <p>
        Wanneer u een offerte aanvraagt, verwerken we uw naam, telefoonnummer,
        e-mailadres, postcode en plaats, plus de gegevens over de werkzaamheden
        die u zelf invult. We gebruiken deze gegevens uitsluitend om op uw
        aanvraag te reageren en de werkzaamheden uit te voeren.
      </p>
      <h2>Bewaartermijn</h2>
      <p>
        Aanvragen die niet tot een opdracht leiden bewaren we maximaal twaalf
        maanden. Gegevens die bij een opdracht horen bewaren we zolang de
        wettelijke administratieplicht dat vereist. Meetrapporten van
        installaties bewaren we zolang de installatie in gebruik is, zodat we bij
        een latere storing kunnen terugkijken.
      </p>
      <h2>Delen met anderen</h2>
      <p>
        We verkopen uw gegevens niet. We delen ze alleen met partijen die nodig
        zijn om de dienst te leveren, zoals onze hostingpartij en
        administratiesoftware.
      </p>
      <h2>Uw rechten</h2>
      <p>
        U kunt uw gegevens opvragen, laten corrigeren of laten verwijderen. Stuur
        daarvoor een bericht naar {siteConfig.business.email}.
      </p>
    </LegalPage>
  );
}
