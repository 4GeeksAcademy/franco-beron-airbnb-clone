import Link from "next/link";

import { PropertyCard } from "@/components/property/PropertyCard";
import type { FeaturedSection } from "@/services";

export interface PropertyCarouselProps {
  section: FeaturedSection;
}

export function PropertyCarousel({ section }: PropertyCarouselProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              {section.title}
            </h2>
            <Link
              href="/catalog"
              className="text-xl text-rose-500 transition hover:translate-x-1"
            >
              →
            </Link>
          </div>
          {section.subtitle ? (
            <p className="mt-2 text-sm text-neutral-500 md:text-base">
              {section.subtitle}
            </p>
          ) : null}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 shadow-sm">
            ←
          </button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 shadow-sm">
            →
          </button>
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {section.properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
