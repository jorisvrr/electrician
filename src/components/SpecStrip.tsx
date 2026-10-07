import { siteConfig } from "@/config/site";
import { StarIcon } from "./ui/Icons";

/**
 * Smalle feitenstrip onder de hero.
 *
 * Bewust harde, naleesbare gegevens in plaats van keurmerken: zie
 * claims.certifications in site.ts voor waarom hier geen InstallQ- of
 * NEN-logo's staan.
 */
export function SpecStrip() {
  const { specs, demoMode, demoLabels } = siteConfig;

  return (
    <section className="border-b border-line bg-shell">
      <div className="container-x">
        <dl className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
          {specs.items.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-3 py-3.5 sm:block sm:border-l sm:border-line sm:py-5 sm:pl-5 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="label-mono text-[0.62rem] text-muted">{item.label}</dt>
              <dd className="font-display text-[0.98rem] font-semibold text-ink sm:mt-1.5">
                {item.value}
              </dd>
            </div>
          ))}

          {/* Beoordeling — in demo-mode zichtbaar gelabeld als voorbeeld */}
          <div className="flex items-baseline justify-between gap-3 py-3.5 sm:block sm:border-l sm:border-line sm:py-5 sm:pl-5">
            <dt className="label-mono text-[0.62rem] text-muted">
              {specs.reviewSource}
              {demoMode && ` · ${demoLabels.badge}`}
            </dt>
            <dd className="flex items-center gap-1.5 sm:mt-1.5">
              <StarIcon className="h-3.5 w-3.5 text-accent" />
              <span className="font-display text-[0.98rem] font-semibold text-ink tnum">
                {specs.rating.toLocaleString("nl-NL")}
              </span>
              <span className="text-[0.82rem] text-muted tnum">
                ({specs.reviewCount})
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
