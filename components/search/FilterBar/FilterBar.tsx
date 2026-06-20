"use client";

interface FilterBarProps {
  activeFilters: string[];
  onToggle: (filterId: string) => void;
}

const filters = [
  { id: "parking", label: "Estacionamiento gratuito" },
  { id: "wifi", label: "WiFi" },
  { id: "self-checkin", label: "Llegada autónoma" },
  { id: "bathrooms", label: "Más de 1 baño" },
  { id: "ac", label: "Aire acondicionado" },
  { id: "beds", label: "Más de 1 cama" },
  { id: "tv", label: "Televisión" },
  { id: "kitchen", label: "Cocina" },
  { id: "guest-favorite", label: "Favorito entre huéspedes" },
];

export function FilterBar({ activeFilters, onToggle }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm">
        <span>⚙</span>
        <span>Filtros</span>
      </button>
      {filters.map((filter) => {
        const active = activeFilters.includes(filter.id);

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onToggle(filter.id)}
            className={[
              "shrink-0 rounded-full border px-4 py-3 text-sm font-medium transition",
              active
                ? "border-neutral-950 bg-neutral-950 text-white shadow-sm"
                : "border-black/10 bg-white text-neutral-700 hover:border-neutral-300 hover:text-neutral-950",
            ].join(" ")}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
