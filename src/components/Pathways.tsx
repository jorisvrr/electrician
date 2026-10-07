import { siteConfig } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/contact";
import {
  AlertIcon,
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/Icons";

/**
 * De uitgewerkte splitsing tussen een storing en gepland werk.
 *
 * Dit is de sectie die deze niche nodig heeft en een hovenier niet. Bij
 * elektra bepaalt de urgentie welk kanaal werkt: iemand zonder stroom moet
 * bellen, iemand die een laadpaal overweegt moet juist niet gebeld worden
 * maar een prijs willen zien.
 *
 * De herkenningslijstjes zijn belangrijker dan ze lijken: mensen weten vaak
 * niet of hun situatie "een storing" heet. Door de symptomen op te schrijven
 * kiezen ze zelf de goede route.
 */
export function Pathways() {
  const { pathways, cta, business } = siteConfig;

  return (
    <section id="situaties" className="section bg-paper">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="label-tech">{pathways.eyebrow}</p>
          <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
            {pathways.title}
          </h2>
          <p className="mt-3.5 text-[1.02rem] leading-relaxed text-muted">
            {pathways.subtitle}
          </p>
        </div>

        <div className="reveal mt-9 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* ── Route 1: storing ──────────────────────────────────────── */}
          <div className="card card-accent flex flex-col p-6 md:p-8">
            <p className="label-mono text-[0.65rem] text-accent-dark">
              {pathways.fault.label}
            </p>
            <h3 className="mt-3 text-[1.35rem] md:text-[1.5rem]">
              {pathways.fault.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{pathways.fault.body}</p>

            <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
              {pathways.fault.signals.map((signal) => (
                <li key={signal} className="flex gap-3 text-[0.95rem] leading-snug">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-accent-dark" />
                  {signal}
                </li>
              ))}
            </ul>

            {/* Veiligheidsadvies — hoort op elke elektricienssite */}
            <p className="mt-6 flex gap-3 bg-shell p-4 text-[0.88rem] leading-relaxed text-ink">
              <AlertIcon className="mt-0.5 h-[1.1rem] w-[1.1rem] shrink-0 text-accent-dark" />
              <span>{pathways.fault.safetyNote}</span>
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a href={telHref} className="btn btn-call flex-1">
                <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
                {business.phone.display}
              </a>
            </div>
            <p className="mt-2.5 text-[0.8rem] text-muted">
              {business.hours[0].days}: {business.hours[0].time}
            </p>
          </div>

          {/* ── Route 2: gepland werk ─────────────────────────────────── */}
          <div className="card flex flex-col p-6 md:p-8">
            <p className="label-mono text-[0.65rem] text-muted">
              {pathways.planned.label}
            </p>
            <h3 className="mt-3 text-[1.35rem] md:text-[1.5rem]">
              {pathways.planned.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              {pathways.planned.body}
            </p>

            <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
              {pathways.planned.signals.map((signal) => (
                <li key={signal} className="flex gap-3 text-[0.95rem] leading-snug">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-muted" />
                  {signal}
                </li>
              ))}
            </ul>

            <p className="mt-6 bg-shell p-4 text-[0.88rem] leading-relaxed text-muted">
              {business.whatsapp.photoPrompt}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a href={cta.primary.href} className="btn btn-primary flex-1">
                {cta.primary.label}
                <ArrowRightIcon />
              </a>
              <a
                href={whatsappHref("photos")}
                target="_blank"
                rel="noopener"
                className="btn btn-outline sm:w-auto"
                aria-label={cta.whatsapp.label}
              >
                <WhatsAppIcon className="h-[1.15rem] w-[1.15rem] text-whatsapp" />
                {cta.whatsapp.labelShort}
              </a>
            </div>
            <p className="mt-2.5 text-[0.8rem] text-muted">
              {business.whatsapp.notForFaults}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
