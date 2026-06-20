"use client";

import { useEffect, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

import { useSearch } from "@/hooks";
import { formatDate } from "@/utils";

interface AvailabilityCalendarProps {
  city: string;
}

export function AvailabilityCalendar({ city }: AvailabilityCalendarProps) {
  const { criteria } = useSearch();
  const [monthsToShow, setMonthsToShow] = useState(2);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const syncMonths = () => {
      setMonthsToShow(mediaQuery.matches ? 1 : 2);
    };

    syncMonths();
    mediaQuery.addEventListener("change", syncMonths);

    return () => {
      mediaQuery.removeEventListener("change", syncMonths);
    };
  }, []);

  const range: DateRange | undefined = {
    from: parseDate(criteria.checkIn),
    to: parseDate(criteria.checkOut),
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-neutral-950">
        {getNights(range?.from, range?.to)}{" "}
        {getNights(range?.from, range?.to) === 1 ? "noche" : "noches"} en {city}
      </h3>
      <p className="text-sm text-neutral-500">
        {range?.from && range?.to
          ? `${formatDate(range.from, { includeYear: true })} - ${formatDate(range.to, { includeYear: true })}`
          : "Selecciona tus fechas de viaje"}
      </p>
      <div className="overflow-x-auto rounded-[28px] border border-black/8 bg-white p-4">
        <DayPicker
          mode="range"
          numberOfMonths={monthsToShow}
          selected={range}
          showOutsideDays
          disabled
        />
      </div>
      <button className="text-sm font-medium text-neutral-500 underline underline-offset-4">
        Borrar fechas
      </button>
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

function getNights(checkIn?: Date, checkOut?: Date) {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / millisecondsPerDay,
  );
  return Math.max(1, diff);
}
