import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * Drie schriften met elk een taak:
 *   Archivo        koppen en knoppen — stevig, licht smal, industrieel
 *   IBM Plex Sans  lopende tekst — technisch maar prettig leesbaar
 *   IBM Plex Mono  labels, cijfers en specs — het "meetrapport"-handschrift
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.seo.url,
    siteName: siteConfig.business.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.brand,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /**
   * De merkkleuren uit siteConfig worden hier als CSS-variabelen gezet.
   * Eén wijziging in site.ts verandert daarmee de hele site.
   */
  const themeVars = {
    "--color-brand": siteConfig.theme.brand,
    "--color-brand-dark": siteConfig.theme.brandDark,
    "--color-accent": siteConfig.theme.accent,
    "--color-accent-dark": siteConfig.theme.accentDark,
  } as React.CSSProperties;

  return (
    <html
      lang="nl"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
      style={themeVars}
    >
      <body>{children}</body>
    </html>
  );
}
