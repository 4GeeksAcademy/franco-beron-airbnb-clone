import { formatDate } from "@/utils";
import type { Review } from "@/types";

export interface PropertyReviewsProps {
  rating: number | null;
  reviews: Review[];
}

export function PropertyReviews({ rating, reviews }: PropertyReviewsProps) {
  return (
    <section id="reviews" className="space-y-5 border-t border-black/8 pt-10">
      <div>
        <h3 className="text-2xl font-semibold text-neutral-950">
          {rating ? `★ ${rating.toFixed(1)} · ` : ""}
          {reviews.length} evaluaciones
        </h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-[28px] border border-black/5 bg-white px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-base font-semibold text-neutral-950">
                  {review.authorName}
                </h4>
                <p className="text-sm text-neutral-500">
                  {review.authorLocation}
                </p>
              </div>
              <div className="text-right text-sm text-neutral-500">
                <p>{"★".repeat(review.rating)}</p>
                <p>{formatDate(review.date, { includeYear: true })}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
