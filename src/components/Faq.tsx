import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { ChevronDownIcon } from "./ui/Icons";

/**
 * FAQ met native <details>: geen JavaScript, werkt met toetsenbord en in
 * zoekresultaten. De vragen staan ook als FAQPage-schema in de pagina.
 */
export function Faq() {
  const { faq, business } = siteConfig;

  return (
    <section className="section bg-paper">
      <div className="container-x">
        <div className="grid gap-9 lg:grid-cols-[0.6fr_1fr] lg:gap-14">
          <div>
            <p className="label-tech">{faq.eyebrow}</p>
            <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
              {faq.title}
            </h2>
            <p className="mt-3.5 leading-relaxed text-muted">{faq.aside}</p>
            <a href={telHref} className="btn btn-outline mt-5">
              {business.phone.display}
            </a>
          </div>

          <div className="border-t border-line">
            {faq.items.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[1.02rem] font-semibold tracking-tight text-ink marker:content-none">
                  {item.q}
                  <ChevronDownIcon className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-[0.95rem] leading-relaxed text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
