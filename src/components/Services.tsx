import { siteConfig } from "@/config/site";
import type { ServiceIcon } from "@/config/site";
import { whatsappHref } from "@/lib/contact";
import {
  ArrowRightIcon,
  BoltIcon,
  BuildingIcon,
  ChargerIcon,
  LightIcon,
  PanelIcon,
  RenovationIcon,
  SocketIcon,
  WhatsAppIcon,
} from "./ui/Icons";

/**
 * Werkzaamheden als genummerde technische lijst.
 *
 * Bewust geen fotokaarten: bij een hovenier verkoopt de foto, bij een
 * elektricien verkoopt de specificatie. Iemand wil zien dát u aparte groepen
 * voor de kookplaat legt en wát voor aardlekbeveiliging bij een laadpaal
 * hoort — niet nog een stockfoto van een stopcontact.
 *
 * Richtprijzen staan standaard uit (display.showPriceIndications): bedragen
 * die niet van de prospect zijn, kosten je de prospect.
 */
const icons: Record<ServiceIcon, (p: { className?: string }) => React.ReactElement> = {
  bolt: BoltIcon,
  panel: PanelIcon,
  socket: SocketIcon,
  light: LightIcon,
  charger: ChargerIcon,
  renovation: RenovationIcon,
  building: BuildingIcon,
};

export function Services() {
  const { services, servicesIntro, display, cta, business } = siteConfig;

  return (
    <section id="werkzaamheden" className="section bg-shell">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="label-tech">{servicesIntro.eyebrow}</p>
            <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
              {servicesIntro.title}
            </h2>
            <p className="mt-3.5 text-[1.02rem] leading-relaxed text-muted">
              {servicesIntro.subtitle}
            </p>
          </div>
          <a href={cta.primary.href} className="btn btn-primary">
            {cta.primary.label}
            <ArrowRightIcon />
          </a>
        </div>

        <ul className="reveal mt-9 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <li
                key={service.id}
                id={service.id}
                className="flex scroll-mt-28 flex-col bg-paper p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-7 w-7 text-brand" />
                  <span className="label-mono text-[0.68rem] text-muted tnum">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.18rem] leading-snug">{service.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {service.description}
                </p>

                <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[0.88rem] leading-snug text-muted">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span
                        className="mt-[0.45rem] h-1 w-1 shrink-0 bg-accent"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {display.showPriceIndications && service.priceIndication && (
                  <p className="label-mono mt-4 text-[0.68rem] text-ink">
                    {service.priceIndication}
                  </p>
                )}

                <span
                  className={`label-mono mt-5 inline-flex w-fit px-2 py-1 text-[0.6rem] ${
                    service.track === "storing"
                      ? "bg-accent text-accent-ink"
                      : "bg-shell text-muted"
                  }`}
                >
                  {service.track === "storing" ? "Bellen" : "Offerte"}
                </span>
              </li>
            );
          })}

          {/* Vult de laatste cel van het raster */}
          <li className="flex flex-col justify-center bg-brand p-6 text-white md:p-7 xl:col-span-2">
            <h3 className="text-[1.18rem] leading-snug text-white">
              Staat uw klus er niet bij?
            </h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">
              {business.whatsapp.photoPrompt}
            </p>
            <a
              href={whatsappHref("photos")}
              target="_blank"
              rel="noopener"
              className="btn btn-outline-light mt-5"
            >
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
              {cta.whatsapp.label}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
