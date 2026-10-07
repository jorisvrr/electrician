import { siteConfig } from "@/config/site";
import { ArrowRightIcon } from "./ui/Icons";

/**
 * Werkwijze voor gepland werk, als genummerde tijdlijn.
 *
 * Bewust alleen de offerteroute: de storingsroute is één stap (bellen) en
 * staat al in de sectie hierboven. Een werkwijze in vier stappen tonen voor
 * iemand zonder stroom zou precies de verkeerde boodschap zijn.
 */
export function Process() {
  const { process, cta } = siteConfig;

  return (
    <section id="werkwijze" className="section bg-shell">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="label-tech">{process.eyebrow}</p>
          <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
            {process.title}
          </h2>
          <p className="mt-3.5 text-[1.02rem] leading-relaxed text-muted">
            {process.subtitle}
          </p>
        </div>

        <ol className="reveal mt-9 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            <li key={step.title} className="bg-paper p-6 md:p-7">
              <span className="label-mono text-[0.72rem] text-accent-dark tnum">
                Stap {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.1rem] leading-snug">{step.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <a href={cta.primary.href} className="btn btn-primary mt-8">
          {cta.primary.label}
          <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}
