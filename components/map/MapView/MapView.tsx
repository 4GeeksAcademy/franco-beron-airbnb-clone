import { formatPrice } from "@/utils";
import type { Property } from "@/types";

export interface MapViewProps {
  properties: Property[];
  compact?: boolean;
}

export function MapView({ properties, compact = false }: MapViewProps) {
  const positions = getMarkerPositions(properties);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[32px] border border-black/5 bg-[linear-gradient(180deg,#e8f2ff_0%,#dce9d8_100%)]",
        compact ? "min-h-[320px]" : "min-h-[460px]",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.75),transparent_22%),radial-gradient(circle_at_78%_35%,rgba(255,255,255,0.52),transparent_18%),radial-gradient(circle_at_35%_72%,rgba(255,255,255,0.48),transparent_20%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Mapa
        </p>
        <p className="mt-1 text-sm font-medium text-neutral-800">
          {properties.length} resultado{properties.length === 1 ? "" : "s"}
        </p>
      </div>
      {positions.map(({ property, top, left }) => (
        <div
          key={property.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${top}%`, left: `${left}%` }}
        >
          <div className="rounded-full bg-neutral-950 px-3 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)]">
            {formatPrice(property.pricePerNight, property.currency)}
          </div>
        </div>
      ))}
      <div className="absolute bottom-5 right-5 flex flex-col gap-2">
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/92 text-xl text-neutral-700 shadow-sm backdrop-blur">
          +
        </button>
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/92 text-xl text-neutral-700 shadow-sm backdrop-blur">
          −
        </button>
      </div>
    </div>
  );
}

function getMarkerPositions(properties: Property[]) {
  if (properties.length === 0) {
    return [];
  }

  const latitudes = properties.map((property) => property.location.lat);
  const longitudes = properties.map((property) => property.location.lng);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  return properties.map((property, index) => {
    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;
    const top = 20 + ((maxLat - property.location.lat) / latRange) * 55;
    const left = 18 + ((property.location.lng - minLng) / lngRange) * 62;

    return {
      property,
      top: Number.isFinite(top) ? top : 50 + index * 2,
      left: Number.isFinite(left) ? left : 50 + index * 2,
    };
  });
}
