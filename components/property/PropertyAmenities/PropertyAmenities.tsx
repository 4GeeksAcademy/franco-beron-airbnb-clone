import type { Amenity } from "@/types";

export interface PropertyAmenitiesProps {
  amenities: Amenity[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <section id="amenities" className="space-y-5 border-t border-black/8 pt-10">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold text-neutral-950">
          Lo que este lugar ofrece
        </h3>
        <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
          Mostrar las {amenities.length} amenidades
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center gap-3 rounded-[24px] border border-black/5 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100 text-sm font-semibold text-neutral-700">
              {amenity.icon.slice(0, 2)}
            </span>
            <span className="text-sm font-medium text-neutral-800">
              {amenity.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
