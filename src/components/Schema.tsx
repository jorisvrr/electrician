import { siteConfig } from "@/config/site";

/**
 * Gestructureerde data voor lokale vindbaarheid.
 *
 *  - LocalBusiness + Electrician: naam, adres, openingstijden, werkgebied,
 *    diensten. "Electrician" is een echt schema.org-type en helpt Google de
 *    branche te plaatsen.
 *  - FAQPage: de vragen onderaan de pagina.
 *
 * aggregateRating staat standaard UIT (seo.includeAggregateRating). Google
 * staat alleen echte, verifieerbare reviews toe in rich results, en de reviews
 * in deze demo zijn voorbeelden. Zet 'm pas aan bij echte klantreviews.
 */
export function Schema() {
  const { business, serviceArea, services, seo, faq, specs } = siteConfig;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Electrician"],
    "@id": `${seo.url}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: seo.description,
    url: seo.url,
    telephone: business.phone.e164,
    email: business.email,
    image: `${seo.url}${seo.ogImage}`,
    priceRange: "€€",
    foundingDate: String(business.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.lat,
      longitude: business.address.lng,
    },
    areaServed: serviceArea.places.map((place) => ({
      "@type": "City",
      name: place,
    })),
    /** Houd gelijk aan business.hours — schema.org wil losse tijden. */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:30",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Elektrotechnische diensten",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: serviceArea.regionLong,
        },
      })),
    },
    sameAs: business.socials.map((social) => social.href),
    ...(seo.includeAggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: specs.rating,
            reviewCount: specs.reviewCount,
          },
        }
      : {}),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
