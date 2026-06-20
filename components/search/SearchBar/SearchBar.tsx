"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { DayPicker, type DateRange } from "react-day-picker";

import { useSearch } from "@/hooks";
import { formatDate } from "@/utils";
import type { GuestCount } from "@/types";

export function SearchBar() {
  const router = useRouter();
  const { criteria, setCriteria } = useSearch();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [destination, setDestination] = useState(criteria.destination);
  const [isDatesOpen, setIsDatesOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: parseDate(criteria.checkIn),
    to: parseDate(criteria.checkOut),
  });
  const [guests, setGuests] = useState<GuestCount>(criteria.guests);

  const totalGuests = guests.adults + guests.children;
  const datesLabel =
    dateRange?.from && dateRange?.to
      ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
      : "Cualquier semana";

  const guestsLabel =
    totalGuests > 0 ? `${totalGuests} huéspedes` : "¿Cuántos?";

  const handleSubmit = () => {
    setCriteria({
      ...criteria,
      destination,
      checkIn: dateRange?.from ? toIsoDate(dateRange.from) : null,
      checkOut: dateRange?.to ? toIsoDate(dateRange.to) : null,
      guests,
    });

    setIsDatesOpen(false);
    setIsGuestsOpen(false);

    router.push("/catalog");
  };

  const handleGuestChange = (key: keyof GuestCount, delta: number) => {
    setGuests((currentGuests) => {
      const nextValue = Math.max(0, currentGuests[key] + delta);

      // Mantiene al menos 1 adulto para evitar búsquedas inconsistentes.
      if (key === "adults" && nextValue === 0) {
        return currentGuests;
      }

      return {
        ...currentGuests,
        [key]: nextValue,
      };
    });
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!searchBarRef.current) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!searchBarRef.current.contains(target)) {
        setIsDatesOpen(false);
        setIsGuestsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDatesOpen(false);
        setIsGuestsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={searchBarRef}
      className="relative z-40 rounded-[28px] border border-white/60 bg-white/95 p-3 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur md:rounded-full md:p-2.5"
    >
      <div className="grid gap-2 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center">
        <SearchField
          label="Destino"
          value={destination}
          placeholder="Explora Buenos Aires, Punta del Este..."
          onChange={setDestination}
        />
        <SummaryField
          label="Fechas"
          value={datesLabel}
          isOpen={isDatesOpen}
          onToggle={() => {
            setIsDatesOpen((open) => !open);
            setIsGuestsOpen(false);
          }}
        >
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            weekStartsOn={1}
            numberOfMonths={1}
            disabled={{ before: new Date() }}
          />
        </SummaryField>
        <SummaryField
          label="Huéspedes"
          value={guestsLabel}
          isOpen={isGuestsOpen}
          onToggle={() => {
            setIsGuestsOpen((open) => !open);
            setIsDatesOpen(false);
          }}
        >
          <div className="space-y-3">
            <GuestRow
              label="Adultos"
              helper="Desde 13 años"
              value={guests.adults}
              onDecrement={() => handleGuestChange("adults", -1)}
              onIncrement={() => handleGuestChange("adults", 1)}
            />
            <GuestRow
              label="Niños"
              helper="De 2 a 12 años"
              value={guests.children}
              onDecrement={() => handleGuestChange("children", -1)}
              onIncrement={() => handleGuestChange("children", 1)}
            />
            <GuestRow
              label="Infantes"
              helper="Menores de 2 años"
              value={guests.infants}
              onDecrement={() => handleGuestChange("infants", -1)}
              onIncrement={() => handleGuestChange("infants", 1)}
            />
            <GuestRow
              label="Mascotas"
              helper="¿Viajas con mascota?"
              value={guests.pets}
              onDecrement={() => handleGuestChange("pets", -1)}
              onIncrement={() => handleGuestChange("pets", 1)}
            />
          </div>
        </SummaryField>
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
  isOpen?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
}

function SummaryField({
  label,
  value,
  isOpen = false,
  onToggle,
  children,
}: SummaryFieldProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-col gap-1 rounded-[22px] px-4 py-3 text-left transition hover:bg-neutral-50 md:px-5 md:py-4"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          {label}
        </span>
        <span className="text-sm font-medium text-neutral-900">{value}</span>
      </button>

      {isOpen && children ? (
        <div className="absolute left-0 right-0 top-full z-[70] mt-2 rounded-2xl border border-black/8 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.16)] md:w-[320px] md:min-w-[320px] md:right-auto">
          {children}
        </div>
      ) : null}
    </div>
  );
}

interface GuestRowProps {
  label: string;
  helper: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function GuestRow({
  label,
  helper,
  value,
  onIncrement,
  onDecrement,
}: GuestRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-neutral-900">{label}</p>
        <p className="text-xs text-neutral-500">{helper}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrement}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-neutral-700"
        >
          −
        </button>
        <span className="w-5 text-center text-sm font-medium text-neutral-900">
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-neutral-700"
        >
          +
        </button>
      </div>
    </div>
  );
}

function parseDate(value: string | null) {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function toIsoDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
