import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * Uitgevoerd werk, met de technische specificatie erbij.
 *
 * Een elektricien wordt niet beoordeeld op "mooi geworden" maar op "is het
 * goed gedaan". Daarom staat bij elke klus wat er precies is aangelegd —
 * aantal groepen, type beveiliging, hoe lang het duurde. Dat is bij deze
 * niche het echte verkoopargument, en meteen het bewijs dat er iemand aan
 * het werk was die weet waar hij het over heeft.
 *
 * DEMO: de klussen hieronder zijn verzonnen. Zie `work` in site.ts.
 */
export function WorkExamples() {
  const { work, workIntro, demoMode, demoLabels } = siteConfig;

  return (
    <section id="werk" className="section bg-paper">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="label-tech">{workIntro.eyebrow}</p>
            <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
              {workIntro.title}
            </h2>
            <p className="mt-3.5 text-[1.02rem] leading-relaxed text-muted">
              {workIntro.subtitle}
            </p>
          </div>
          {demoMode && (
            <span className="label-mono bg-shell px-2.5 py-1.5 text-[0.62rem] text-muted">
              {demoLabels.workBadge}
            </span>
          )}
        </div>

        <div className="reveal mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {work.map((item) => (
            <article key={item.title} className="card flex flex-col">
              {item.image && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="label-mono text-[0.62rem] text-muted">{item.place}</p>
                <h3 className="mt-2 text-[1.15rem] leading-snug">{item.title}</h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-muted">
                  {item.summary}
                </p>

                {/* De specificatie: dit is wat een installateur geloofwaardig maakt */}
                <dl className="mt-auto divide-y divide-line border-t border-line pt-1 text-[0.85rem]">
                  {item.specs.map((spec) => (
                    <div key={spec} className="flex gap-2.5 py-2">
                      <span
                        className="mt-[0.4rem] h-1 w-1 shrink-0 bg-accent"
                        aria-hidden="true"
                      />
                      <dd className="text-muted">{spec}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
