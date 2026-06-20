import Image from "next/image";
import Link from "next/link";

import { formatDate, formatPrice } from "@/utils";
import type { Property } from "@/types";

export interface PropertyListProps {
  properties: Property[];
}

export function PropertyList({ properties }: PropertyListProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <article
          key={property.id}
          className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]"
        >
          <div className="relative aspect-[1.08] overflow-hidden rounded-[28px]">
            <Image
              src={
                property.images[0]?.url ??
                "https://picsum.photos/seed/fallback-catalog/1200/900"
              }
              alt={property.images[0]?.alt ?? property.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
              <div className="flex gap-2">
                {property.isSuperhost ? (
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-900 shadow-sm">
                    Superhost
                  </span>
                ) : null}
                {property.isGuestFavorite ? (
                  <span className="rounded-full bg-emerald-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm">
                    Favorito
                  </span>
                ) : null}
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-lg text-neutral-700 shadow-sm">
                ♡
              </span>
            </div>
          </div>

          <Link href={`/room/${property.id}`} className="block px-4 pb-5 pt-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-neutral-950">
                {property.title}
              </h3>
              <p className="shrink-0 text-sm font-medium text-neutral-700">
                {property.rating ? `★ ${property.rating.toFixed(1)}` : "Nuevo"}
              </p>
            </div>
            <p className="mt-2 text-sm text-neutral-500">
              {property.type} · {property.bedrooms} hab. · {property.beds} camas
              · {property.bathrooms} baños
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {property.city}, {property.country}
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              {formatDate("2026-07-04")} al {formatDate("2026-07-09")}
            </p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                {property.originalPrice ? (
                  <p className="text-sm text-neutral-400 line-through">
                    {formatPrice(property.originalPrice, property.currency)}
                  </p>
                ) : null}
                <p className="text-base font-semibold text-neutral-950">
                  {formatPrice(property.pricePerNight, property.currency)}
                  <span className="ml-1 text-sm font-medium text-neutral-500">
                    por noche
                  </span>
                </p>
              </div>
              {property.originalPrice ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Oferta
                </span>
              ) : null}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
