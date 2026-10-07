import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * USP's, geschreven rond de zorgen die iemand bij een installateur écht
 * heeft: komt hij opdagen, is het veilig, weet ik wat het kost, en hoe ziet
 * mijn huis eruit als hij weg is.
 *
 * Let op: hier staat BEWUST geen keurmerk. Zie claims.certifications in
 * site.ts — een onterecht vermeld keurmerk is op een installatiesite het
 * snelste manier om een prospect (en erger) te verliezen.
 */
export function WhyUs() {
  const { whyUs, claims } = siteConfig;

  return (
    <section className="section bg-brand text-white">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-14">
          <div>
            <p className="label-tech text-white/70">{whyUs.eyebrow}</p>
            <h2 className="mt-4 text-[1.75rem] leading-tight text-white md:text-[2.15rem]">
              {whyUs.title}
            </h2>
            <p className="mt-4 leading-relaxed text-white/75">{whyUs.intro}</p>

            <div className="relative mt-8 aspect-[4/3] overflow-hidden">
              <Image
                src={whyUs.image}
                alt={whyUs.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            {/*
              Certificeringen verschijnen alleen als ze in site.ts zijn
              ingevuld. Standaard is die lijst leeg en staat hier dus niets.
            */}
            {claims.certifications.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {claims.certifications.map((cert) => (
                  <li
                    key={cert}
                    className="label-mono border border-white/20 px-3 py-2 text-[0.62rem] text-white/80"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="grid gap-px self-start bg-white/15 sm:grid-cols-2">
            {whyUs.reasons.map((reason, index) => (
              <li key={reason.title} className="bg-brand p-6">
                <span className="label-mono text-[0.68rem] text-accent tnum">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[1.1rem] leading-snug text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">
                  {reason.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
