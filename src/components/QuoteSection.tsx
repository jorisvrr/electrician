import { siteConfig } from "@/config/site";
import { telHref, mailHref } from "@/lib/contact";
import { QuoteForm } from "./QuoteForm";
import { ClockIcon, MailIcon, PhoneIcon } from "./ui/Icons";

/**
 * De offertesectie: links de context en het directe contact, rechts het
 * formulier. Op mobiel staat het formulier bovenaan — wie hier komt, komt
 * voor het formulier.
 */
export function QuoteSection() {
  const { quote, business, demoMode, demoLabels } = siteConfig;

  return (
    <section id="offerte" className="section scroll-mt-20 bg-brand text-white">
      <div className="container-x">
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <p className="label-tech text-white/70">{quote.eyebrow}</p>
            <h2 className="mt-4 text-[1.75rem] leading-tight text-white md:text-[2.15rem]">
              {quote.title}
            </h2>
            <p className="mt-3.5 leading-relaxed text-white/75">{quote.subtitle}</p>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="label-mono text-[0.65rem] text-white/60">
                {quote.directContactTitle}
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={telHref}
                    className="-my-1 flex min-h-11 items-center gap-3 py-1 font-display text-[1.15rem] font-bold text-white hover:text-accent"
                  >
                    <PhoneIcon className="h-[1.1rem] w-[1.1rem] text-accent" />
                    {business.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={mailHref}
                    className="-my-1 flex min-h-11 items-center gap-3 py-1 text-[0.95rem] text-white/80 hover:text-white"
                  >
                    <MailIcon className="h-[1.1rem] w-[1.1rem] text-white/50" />
                    {business.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-[0.95rem] text-white/60">
                  <ClockIcon className="h-[1.1rem] w-[1.1rem] text-white/40" />
                  {business.hoursSummary}
                </li>
              </ul>
            </div>

            {demoMode && (
              <p className="mt-7 border-l-[3px] border-accent bg-white/5 px-4 py-3 text-[0.88rem] leading-relaxed text-white/70">
                {demoLabels.quoteNotice}
              </p>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
