import { siteConfig } from "@/config/site";

/** tel:-link — altijd afgeleid uit siteConfig.business.phone.e164 */
export const telHref = `tel:${siteConfig.business.phone.e164.replace(/\s/g, "")}`;

type WhatsAppIntent = keyof typeof siteConfig.business.whatsapp.messages;

/**
 * WhatsApp-deeplink. wa.me verwacht het nummer zonder "+" en zonder leestekens.
 * Het voorgevulde bericht komt uit siteConfig.business.whatsapp.messages, zodat
 * alle WhatsApp-knoppen vanuit één plek te configureren zijn.
 */
export function whatsappHref(intent: WhatsAppIntent = "default"): string {
  const number = siteConfig.business.whatsapp.e164.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(siteConfig.business.whatsapp.messages[intent]);
  return `https://wa.me/${number}?text=${text}`;
}

export const mailHref = `mailto:${siteConfig.business.email}`;
