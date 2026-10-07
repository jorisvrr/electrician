import Link from "next/link";
import { siteConfig } from "@/config/site";
import { mailHref, telHref, whatsappHref } from "@/lib/contact";
import { BoltMark, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./ui/Icons";

export function Footer() {
  const { business, footer, nav, serviceArea, services, demoMode, demoLabels } =
    siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <BoltMark className="h-9 w-9 text-white/15" />
              <span className="font-display text-[1.05rem] font-bold tracking-tight text-white">
                {business.shortName}
              </span>
            </div>
            <p className="mt-4 text-[0.9rem] leading-relaxed">{footer.about}</p>
          </div>

          <div>
            <p className="label-mono text-[0.62rem] text-white/45">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[0.92rem]">
              <li>
                <a href={telHref} className="-my-1 flex min-h-11 items-center gap-2.5 py-1 hover:text-white">
                  <PhoneIcon className="h-4 w-4 text-accent" />
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener"
                  className="-my-1 flex min-h-11 items-center gap-2.5 py-1 hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={mailHref} className="-my-1 flex min-h-11 items-center gap-2.5 py-1 hover:text-white">
                  <MailIcon className="h-4 w-4 text-white/40" />
                  {business.email}
                </a>
              </li>
              {business.address.showOnSite && (
                <li className="flex gap-2.5">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                  <span>
                    {business.address.street}
                    <br />
                    {business.address.postalCode} {business.address.city}
                  </span>
                </li>
              )}
            </ul>

            <ul className="mt-5 space-y-1 text-[0.85rem] text-white/50">
              {business.hours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-3">
                  <span>{entry.days}</span>
                  <span className="tnum">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono text-[0.62rem] text-white/45">Werkzaamheden</p>
            <ul className="mt-4 space-y-2 text-[0.92rem]">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={`#${service.id}`} className="hover:text-white">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono text-[0.62rem] text-white/45">Werkgebied</p>
            <p className="mt-4 text-[0.92rem] leading-relaxed">
              {serviceArea.places.join(" · ")}
            </p>

            <p className="label-mono mt-6 text-[0.62rem] text-white/45">Menu</p>
            <ul className="mt-4 space-y-2 text-[0.92rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {demoMode && (
          <p className="mt-10 border border-white/15 px-4 py-3 text-[0.85rem] leading-relaxed text-white/60">
            <span className="label-mono text-accent">{demoLabels.bannerTitle}</span>{" "}
            — {business.name} {demoLabels.bannerBody}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.85rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.legalName} · KvK {business.kvk} · {business.btw}
          </p>
          <ul className="flex flex-wrap gap-5">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            {business.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-white"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
