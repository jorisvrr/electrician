import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { ArrowRightIcon, PhoneIcon } from "./ui/Icons";

/**
 * Slot-CTA. Herhaalt bewust dezelfde splitsing als de hero: bellen bij een
 * storing, offerte bij gepland werk. Wie tot hier gescrold heeft, hoeft niet
 * terug naar boven om te weten welke knop van hem is.
 */
export function FinalCta() {
  const { finalCta, cta, business } = siteConfig;

  return (
    <section className="bg-accent text-accent-ink">
      <div className="container-x py-12 md:py-16">
        <div className="grid items-center gap-7 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-[1.6rem] leading-tight md:text-[2rem]">
              {finalCta.title}
            </h2>
            <p className="mt-3 leading-relaxed text-accent-ink/80">
              {finalCta.body}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:shrink-0">
            <a
              href={telHref}
              className="btn bg-brand text-white hover:bg-brand-dark"
            >
              <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
              {business.phone.display}
            </a>
            <a
              href={cta.primary.href}
              className="btn bg-accent-ink/10 text-accent-ink hover:bg-accent-ink/20"
            >
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
