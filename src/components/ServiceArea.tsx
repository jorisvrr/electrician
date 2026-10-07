import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { MapPinIcon, PhoneIcon } from "./ui/Icons";

/**
 * Werkgebied. Dubbele functie: het kwalificeert de bezoeker ("val ik hieronder?")
 * en het levert de plaatsnamen waar lokale zoekopdrachten op binnenkomen.
 */
export function ServiceArea() {
  const { serviceArea, business } = siteConfig;

  return (
    <section id="regio" className="section bg-shell">
      <div className="container-x">
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
          <div>
            <p className="label-tech">{serviceArea.eyebrow}</p>
            <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
              Werkgebied: {serviceArea.regionLong}
            </h2>
            <p className="mt-3.5 leading-relaxed text-muted">{serviceArea.intro}</p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
              <a href={telHref} className="btn btn-call">
                <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
                {business.phone.display}
              </a>
            </div>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
              {serviceArea.note}
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-px self-start border border-line bg-line sm:grid-cols-3">
            {serviceArea.places.map((place) => (
              <li
                key={place}
                className="flex items-center gap-2 bg-paper px-4 py-3.5 text-[0.92rem]"
              >
                <MapPinIcon className="h-4 w-4 shrink-0 text-accent-dark" />
                {place}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
