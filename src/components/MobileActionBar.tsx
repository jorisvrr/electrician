"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { ArrowRightIcon, PhoneIcon } from "./ui/Icons";

/**
 * Vaste actiebalk onderaan op mobiel.
 *
 * De conversiehiërarchie van deze niche staat hier letterlijk in:
 * BELLEN | OFFERTE AANVRAGEN — en dus niet WhatsApp. Bij een hovenier is
 * foto's sturen de laagste drempel; bij een elektricien wil iemand met een
 * storing een stem horen, en appen kost hem tijd die hij niet heeft.
 * WhatsApp blijft beschikbaar in de secties zelf, voor niet-urgent werk.
 *
 * - De body heeft padding-bottom (globals.css), dus de balk dekt nooit content af.
 * - Zodra het offerteformulier zelf in beeld is, verdwijnt de balk: anders zit
 *   hij in de weg bij het invullen op een klein scherm.
 */
export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);
  const { cta, business } = siteConfig;

  useEffect(() => {
    const target = document.querySelector("#offerte");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "-20% 0px -35% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/97 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        {/* Primaire actie bij deze niche: bellen. Breder én de amber knop. */}
        <a
          href={telHref}
          className="btn btn-call flex-[1.5] !gap-1.5 !px-2 !text-[0.92rem]"
          aria-label={`${cta.call.label}: ${business.phone.display}`}
        >
          <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
          {cta.call.labelShort}
        </a>
        <a
          href={cta.primary.href}
          className="btn btn-outline flex-1 !gap-1.5 !px-2 !text-[0.92rem]"
        >
          {cta.primary.labelShort}
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
