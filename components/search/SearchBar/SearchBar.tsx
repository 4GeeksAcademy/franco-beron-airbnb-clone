"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSearch } from "@/hooks";

export function SearchBar() {
  const router = useRouter();
  const { criteria, setCriteria } = useSearch();
  const [destination, setDestination] = useState(criteria.destination);

  const handleSubmit = () => {
    setCriteria({
      ...criteria,
      destination,
    });

    router.push("/catalog");
  };

  return (
    <div className="rounded-[28px] border border-white/60 bg-white/95 p-3 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur md:rounded-full md:p-2.5">
      <div className="grid gap-2 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center">
        <SearchField
          label="Destino"
          value={destination}
          placeholder="Explora Buenos Aires, Punta del Este..."
          onChange={setDestination}
        />
        <SummaryField
          label="Fechas"
          value={
            criteria.checkIn && criteria.checkOut
              ? "Fechas definidas"
              : "Cualquier semana"
          }
        />
        <SummaryField
          label="Huéspedes"
          value={`${criteria.guests.adults + criteria.guests.children} huéspedes`}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex h-14 items-center justify-center rounded-full bg-rose-500 px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(244,63,94,0.35)] transition hover:-translate-y-0.5 hover:bg-rose-600 md:h-16 md:w-16 md:px-0"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

interface SearchFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function SearchField({
  label,
  value,
  placeholder,
  onChange,
}: SearchFieldProps) {
  return (
    <label className="flex flex-col gap-1 rounded-[22px] px-4 py-3 transition hover:bg-neutral-50 md:px-5 md:py-4">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
      />
    </label>
  );
}

interface SummaryFieldProps {
  label: string;
  value: string;
}

function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div className="flex flex-col gap-1 rounded-[22px] px-4 py-3 transition hover:bg-neutral-50 md:px-5 md:py-4">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </span>
      <span className="text-sm font-medium text-neutral-900">{value}</span>
    </div>
  );
}
