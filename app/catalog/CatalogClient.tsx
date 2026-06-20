"use client";

import { startTransition, useEffect, useMemo, useState } from "react";

import { MapView } from "@/components/map";
import { PropertyList } from "@/components/property";
import { FilterBar } from "@/components/search/FilterBar";
import { useSearch } from "@/hooks";
import { getProperties } from "@/services";
import type { Property } from "@/types";

const filterMatchers: Record<string, (property: Property) => boolean> = {
  parking: (property) =>
    property.amenities.some((amenity) => amenity.id === "parking"),
  wifi: (property) =>
    property.amenities.some((amenity) => amenity.id === "wifi"),
  "self-checkin": (property) =>
    property.amenities.some((amenity) => amenity.id === "self-checkin"),
  bathrooms: (property) => property.bathrooms > 1,
  ac: (property) => property.amenities.some((amenity) => amenity.id === "ac"),
  beds: (property) => property.beds > 1,
  tv: (property) => property.amenities.some((amenity) => amenity.id === "tv"),
  kitchen: (property) =>
    property.amenities.some((amenity) => amenity.id === "kitchen"),
  "guest-favorite": (property) => property.isGuestFavorite,
};

interface CatalogClientProps {
  initialProperties: Property[];
}

export function CatalogClient({ initialProperties }: CatalogClientProps) {
  const { criteria } = useSearch();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<
    string | undefined
  >(initialProperties[0]?.id);

  useEffect(() => {
    let cancelled = false;

    startTransition(() => {
      setIsLoading(true);

      void getProperties(criteria)
        .then((nextProperties) => {
          if (!cancelled) {
            setProperties(nextProperties);
          }
        })
        .finally(() => {
          if (!cancelled) {
            setIsLoading(false);
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [criteria]);

  const filteredProperties = useMemo(
    () =>
      properties.filter((property) =>
        activeFilters.every(
          (filterId) => filterMatchers[filterId]?.(property) ?? true,
        ),
      ),
    [activeFilters, properties],
  );

  const effectiveSelectedPropertyId = useMemo(() => {
    if (filteredProperties.length === 0) {
      return undefined;
    }

    return filteredProperties.some(
      (property) => property.id === selectedPropertyId,
    )
      ? selectedPropertyId
      : filteredProperties[0].id;
  }, [filteredProperties, selectedPropertyId]);

  const heading = criteria.destination?.trim()
    ? `Más de ${filteredProperties.length} alojamientos en ${criteria.destination}`
    : `Más de ${filteredProperties.length} alojamientos disponibles`;

  const toggleFilter = (filterId: string) => {
    setActiveFilters((currentFilters) =>
      currentFilters.includes(filterId)
        ? currentFilters.filter((currentFilter) => currentFilter !== filterId)
        : [...currentFilters, filterId],
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 px-4 py-6 md:px-6 lg:px-8">
      <section className="rounded-[32px] border border-black/5 bg-white px-5 py-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] md:px-6">
        <FilterBar activeFilters={activeFilters} onToggle={toggleFilter} />
      </section>

      <section className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_440px] xl:items-start">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-neutral-500">
              {isLoading
                ? "Actualizando resultados..."
                : "Los precios incluyen todas las tarifas"}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
              {heading}
            </h1>
          </div>

          <PropertyList
            properties={filteredProperties}
            selectedPropertyId={effectiveSelectedPropertyId}
            onSelectProperty={setSelectedPropertyId}
          />
        </div>

        <div className="xl:sticky xl:top-24">
          <MapView
            properties={filteredProperties}
            selectedPropertyId={effectiveSelectedPropertyId}
            onSelectProperty={setSelectedPropertyId}
          />
        </div>
      </section>
    </div>
  );
}
