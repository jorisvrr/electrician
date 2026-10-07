import Link from "next/link";
import { siteConfig } from "@/config/site";
import { DemoBanner } from "./DemoBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Opmaak voor de juridische pagina's. De teksten zelf zijn PLACEHOLDERS:
 * laat ze voor een echte klant opstellen of controleren.
 */
export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoBanner />
      <Header />
      <main className="section">
        <div className="container-x max-w-3xl">
          <Link
            href="/"
            className="label-mono text-[0.68rem] text-accent-dark hover:underline"
          >
            ← Terug naar home
          </Link>
          <h1 className="mt-4 text-[2rem] md:text-[2.5rem]">{title}</h1>
          {siteConfig.demoMode && (
            <p className="mt-6 border-l-[3px] border-accent bg-shell px-4 py-3 text-[0.9rem] text-muted">
              <strong className="font-semibold text-ink">Placeholder.</strong> Deze
              tekst is een voorbeeld en juridisch niet sluitend. Laat de definitieve
              tekst opstellen voordat de site live gaat.
            </p>
          )}
          <div className="mt-8 space-y-5 leading-relaxed text-muted [&_h2]:mt-9 [&_h2]:text-[1.2rem] [&_h2]:text-ink">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
