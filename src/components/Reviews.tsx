import { siteConfig } from "@/config/site";
import { StarIcon } from "./ui/Icons";

/**
 * Reviews.
 *
 * ⚠️ In demo-mode staat hier een zichtbaar kader dat vertelt dat deze reviews
 * voorbeelden zijn. Dat is geen juridische voorzichtigheid maar
 * geloofwaardigheid: een prospect die doorheeft dat je verzonnen reviews als
 * echt presenteert, gelooft de rest van de site ook niet meer.
 *
 * Er staat géén link naar Google zolang `googleProfileUrl` null is — een knop
 * "Bekijk op Google" onder verzonnen reviews is precies de misleiding die we
 * hier niet willen.
 */
export function Reviews() {
  const { reviews, reviewsSection, demoMode, demoLabels } = siteConfig;

  if (!reviewsSection.show) return null;

  return (
    <section id="reviews" className="section bg-paper">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="label-tech">{reviewsSection.eyebrow}</p>
            <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
              {reviewsSection.title}
            </h2>
          </div>

          {reviewsSection.googleProfileUrl ? (
            <a
              href={reviewsSection.googleProfileUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-outline"
            >
              {reviewsSection.googleLinkLabel}
            </a>
          ) : (
            <span className="label-mono border border-dashed border-line-strong px-3 py-2.5 text-[0.62rem] text-muted">
              {reviewsSection.googlePlaceholderLabel}
            </span>
          )}
        </div>

        {demoMode && (
          <p className="mt-6 border-l-[3px] border-accent bg-shell px-4 py-3 text-[0.9rem] leading-relaxed text-muted">
            <strong className="font-semibold text-ink">
              {demoLabels.reviewsNoticeTitle}
            </strong>{" "}
            {demoLabels.reviewsNoticeBody}
          </p>
        )}

        <ul className="reveal mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={`${review.name}-${review.date}`} className="card flex flex-col p-5 md:p-6">
              <div className="flex items-center gap-1" aria-label={`${review.rating} van 5 sterren`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-3.5 w-3.5 ${i < review.rating ? "text-accent" : "text-line-strong"}`}
                  />
                ))}
              </div>

              <blockquote className="mt-3.5 flex-1 text-[0.95rem] leading-relaxed text-ink">
                {review.text}
              </blockquote>

              <footer className="mt-5 border-t border-line pt-3.5">
                <p className="text-[0.92rem] font-semibold text-ink">
                  {review.name}
                  <span className="font-normal text-muted"> · {review.place}</span>
                </p>
                <p className="label-mono mt-1 text-[0.6rem] text-muted">
                  {review.job}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
