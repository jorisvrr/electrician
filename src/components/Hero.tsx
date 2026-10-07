import Image from "next/image";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { AlertIcon, ArrowRightIcon, CheckIcon, PhoneIcon, ClockIcon } from "./ui/Icons";

/**
 * Hero.
 *
 * Drie dingen moeten binnen één scherm duidelijk zijn: wat we doen, waar we
 * dat doen, en of de bezoeker moet bellen of een offerte moet aanvragen. Die
 * laatste splitsing is geen stijlkeuze — iemand zonder stroom en iemand die
 * een laadpaal overweegt hebben niets aan dezelfde knop.
 *
 * Er staat hier bewust GEEN spoedbelofte. Zolang claims.emergency247 uit staat,
 * noemt de hero alleen de openingstijden die het bedrijf waarmaakt.
 */
export function Hero() {
  const { hero, business, serviceArea, cta, claims } = siteConfig;

  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      {/* Foto rechts op desktop, als achtergrondlaag op mobiel */}
      <div className="absolute inset-0 lg:left-1/2">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-brand/80 lg:bg-gradient-to-r lg:from-brand lg:via-brand/70 lg:to-brand/25"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 grid-blueprint" aria-hidden="true" />

      <div className="container-x relative py-12 md:py-16 lg:py-20">
        <div className="max-w-xl lg:max-w-[33rem]">
          <p className="label-tech text-white/70">{hero.eyebrow}</p>

          <h1 className="mt-5 text-[2.1rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]">
            {hero.title}
          </h1>

          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-white/80">
            {hero.subtitle}
          </p>

          {hero.badges.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {hero.badges.map((badge) => (
                <li
                  key={badge}
                  className="flex items-center gap-2 text-[0.88rem] text-white/75"
                >
                  <CheckIcon className="h-4 w-4 text-accent" />
                  {badge}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── De twee routes ───────────────────────────────────────────────
            Dit is de kern van de pagina: storing = bellen, gepland = offerte. */}
        <div className="mt-9 grid max-w-3xl gap-px bg-white/15 sm:grid-cols-2">
          <div className="bg-brand-dark/80 p-5 backdrop-blur-sm sm:p-6">
            <p className="flex items-center gap-2 font-display text-[1.08rem] font-bold text-white">
              <AlertIcon className="h-[1.15rem] w-[1.15rem] text-accent" />
              {hero.routes.fault.label}
            </p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">
              {hero.routes.fault.body}
            </p>
            <a href={telHref} className="btn btn-call mt-4 w-full">
              <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
              {cta.call.label}: {business.phone.display}
            </a>
            <p className="mt-2.5 flex items-center gap-1.5 text-[0.78rem] text-white/55">
              <ClockIcon className="h-3.5 w-3.5" />
              {business.hoursSummary}
              {claims.faultResponse && ` · bij storing ${claims.faultResponse} langs`}
            </p>
          </div>

          <div className="bg-brand-dark/80 p-5 backdrop-blur-sm sm:p-6">
            <p className="font-display text-[1.08rem] font-bold text-white">
              {hero.routes.planned.label}
            </p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">
              {hero.routes.planned.body}
            </p>
            <a href={cta.primary.href} className="btn btn-outline-light mt-4 w-full">
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
            <p className="mt-2.5 text-[0.78rem] text-white/55">
              Werkgebied: {serviceArea.regionLong}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
