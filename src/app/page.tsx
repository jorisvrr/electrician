import { DemoBanner } from "@/components/DemoBanner";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Pathways } from "@/components/Pathways";
import { Process } from "@/components/Process";
import { QuoteSection } from "@/components/QuoteSection";
import { Reviews } from "@/components/Reviews";
import { Schema } from "@/components/Schema";
import { ServiceArea } from "@/components/ServiceArea";
import { Services } from "@/components/Services";
import { SpecStrip } from "@/components/SpecStrip";
import { WhyUs } from "@/components/WhyUs";
import { WorkExamples } from "@/components/WorkExamples";

/**
 * De volgorde volgt de vraag die een bezoeker stelt:
 *   wie zijn jullie en moet ik bellen → wat doen jullie → kunnen jullie het →
 *   hoe gaat het → wat vinden anderen → kom ik in aanmerking → aanvragen.
 *
 * De splitsing storing/gepland (Hero + Pathways) staat bewust vóór de
 * dienstenlijst: iemand zonder stroom mag niet eerst zeven diensten door
 * voordat hij het telefoonnummer vindt.
 */
export default function HomePage() {
  return (
    <>
      <DemoBanner />
      <Header />
      <main>
        <Hero />
        <SpecStrip />
        <Pathways />
        <Services />
        <WorkExamples />
        <WhyUs />
        <Process />
        <Reviews />
        <ServiceArea />
        <QuoteSection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileActionBar />
      <Schema />
    </>
  );
}
