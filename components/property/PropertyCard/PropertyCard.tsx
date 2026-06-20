"use client";

import Link from "next/link";
import Image from "next/image";

import { useFavorites } from "@/hooks";
import { formatPrice } from "@/utils";
import type { Property } from "@/types";

export interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  return (
    <article className="group relative min-w-[280px] max-w-[320px] flex-1 overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
      <div className="relative aspect-[0.92] overflow-hidden rounded-[28px]">
        <Image
          src={
            property.images[0]?.url ??
            "https://picsum.photos/seed/fallback-home/1200/900"
          }
          alt={property.images[0]?.alt ?? property.title}
          fill
          sizes="(max-width: 768px) 280px, 320px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {property.isGuestFavorite ? (
            <span className="rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-900 shadow-sm">
              Favorito entre huéspedes
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            aria-label="Guardar alojamiento"
            onClick={() => toggleFavorite(property.id)}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-neutral-700 shadow-sm backdrop-blur transition hover:scale-105"
          >
            {favorite ? "♥" : "♡"}
          </button>
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
          {property.city}, {property.country}
        </p>
        <p className="mt-4 text-base font-semibold text-neutral-950">
          {formatPrice(property.pricePerNight, property.currency)}
          <span className="ml-1 text-sm font-medium text-neutral-500">
            por noche
          </span>
        </p>
      </Link>
    </article>
  );
}
