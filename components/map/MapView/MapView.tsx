"use client";

import dynamic from "next/dynamic";

import type { Property } from "@/types";

export interface MapViewProps {
  properties: Property[];
  compact?: boolean;
  selectedPropertyId?: string;
  onSelectProperty?: (propertyId: string) => void;
}

const MapViewClient = dynamic(
  () => import("./MapViewClient").then((module) => module.MapViewClient),
  {
    ssr: false,
    loading: () => (
      <div className="relative min-h-[460px] overflow-hidden rounded-[32px] border border-black/5 bg-neutral-100" />
    ),
  },
);

export function MapView({
  properties,
  compact = false,
  selectedPropertyId,
  onSelectProperty,
}: MapViewProps) {
  return (
    <MapViewClient
      properties={properties}
      compact={compact}
      selectedPropertyId={selectedPropertyId}
      onSelectProperty={onSelectProperty}
    />
  );
}
