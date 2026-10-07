"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { BoltMark, CloseIcon, MenuIcon, PhoneIcon } from "./ui/Icons";

/**
 * Sticky header.
 *
 * De belknop staat permanent in beeld en is de enige gevulde knop in de
 * balk — bij een elektricien is bellen de actie met de hoogste waarde. Het
 * telefoonnummer staat er vanaf md zichtbaar náást, met de openingstijden
 * eronder: iemand die op het punt staat te bellen wil weten of er wordt
 * opgenomen.
 */
export function Header() {
  const { business, nav, cta } = siteConfig;
  const [open, setOpen] = useState(false);

  // Het menu mag niet open blijven staan als iemand naar desktop resized.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${business.name} — naar de homepage`}
        >
          <BoltMark className="h-9 w-9 text-brand" />
          <span className="leading-tight">
            <span className="block font-display text-[1.05rem] font-bold tracking-tight text-brand">
              {business.shortName}
            </span>
            <span className="label-mono block text-[0.6rem] text-muted">
              Elektrotechniek
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Hoofdmenu">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.93rem] font-medium text-ink transition-colors hover:text-accent-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Nummer + openingstijden: de bezoeker weet of er opgenomen wordt */}
          <div className="hidden text-right md:block">
            <a
              href={telHref}
              className="block font-display text-[1.02rem] font-bold tracking-tight text-brand hover:text-accent-dark"
            >
              {business.phone.display}
            </a>
            <span className="label-mono block text-[0.6rem] text-muted">
              {business.hoursSummary}
            </span>
          </div>

          <a href={telHref} className="btn btn-call !min-h-11 !px-4 !text-[0.95rem]">
            <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
            <span className="hidden sm:inline">{cta.call.label}</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border border-line text-brand lg:hidden"
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobiel-menu"
          className="border-t border-line bg-paper lg:hidden"
          aria-label="Hoofdmenu"
        >
          <div className="container-x flex flex-col py-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 font-display text-[1.05rem] font-semibold text-ink last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={cta.primary.href}
              onClick={() => setOpen(false)}
              className="btn btn-primary my-3"
            >
              {cta.primary.label}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
