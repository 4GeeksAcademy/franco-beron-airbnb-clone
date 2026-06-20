"use client";

import { useState } from "react";

import { useSearch } from "@/hooks";
import { formatPrice } from "@/utils";

interface PriceCardProps {
  pricePerNight: number;
  originalPrice?: number;
  currency: string;
}

export function PriceCard({
  pricePerNight,
  originalPrice,
  currency,
}: PriceCardProps) {
  const { criteria } = useSearch();
  const [policy, setPolicy] = useState<"flexible" | "strict">("flexible");

  const guests = criteria.guests.adults + criteria.guests.children;
  const nights = 5;
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  return (
    <aside className="rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
      <div className="flex items-end gap-3 border-b border-black/8 pb-5">
        <div>
          {originalPrice ? (
            <p className="text-sm text-neutral-400 line-through">
              {formatPrice(originalPrice, currency)}
            </p>
          ) : null}
          <p className="text-3xl font-semibold text-neutral-950">
            {formatPrice(pricePerNight, currency)}
          </p>
        </div>
        <p className="pb-1 text-sm text-neutral-500">por noche</p>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Llegada" value={criteria.checkIn ?? "Agregar fecha"} />
          <Field label="Salida" value={criteria.checkOut ?? "Agregar fecha"} />
        </div>
        <Field label="Huéspedes" value={`${guests} huéspedes`} />
      </div>

      <div className="mt-5 space-y-3 rounded-[24px] bg-neutral-50 p-4 text-sm text-neutral-700">
        <label className="flex items-start gap-3">
          <input
            type="radio"
            name="policy"
            checked={policy === "strict"}
            onChange={() => setPolicy("strict")}
            className="mt-1"
          />
          <span>
            <strong className="block text-neutral-900">No reembolsable</strong>
            Mejor tarifa para asegurar el viaje hoy.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="radio"
            name="policy"
            checked={policy === "flexible"}
            onChange={() => setPolicy("flexible")}
            className="mt-1"
          />
          <span>
            <strong className="block text-neutral-900">
              Reembolsable con total
            </strong>
            Más flexibilidad antes del check-in.
          </span>
        </label>
      </div>

      <button className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-rose-500 px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(244,63,94,0.32)] transition hover:bg-rose-600">
        Reservar
      </button>
      <p className="mt-3 text-center text-sm text-neutral-500">
        Aún no se te cobrará nada
      </p>

      <div className="mt-6 space-y-3 border-t border-black/8 pt-5 text-sm text-neutral-600">
        <Row
          label={`${formatPrice(pricePerNight, currency)} x ${nights} noches`}
          value={formatPrice(subtotal, currency)}
        />
        <Row
          label="Tarifa de servicio"
          value={formatPrice(serviceFee, currency)}
        />
        <Row label="Total" value={formatPrice(total, currency)} bold />
      </div>

      <button className="mt-6 text-sm font-medium text-neutral-500 underline underline-offset-4">
        Reportar este anuncio
      </button>
    </aside>
  );
}

interface FieldProps {
  label: string;
  value: string;
}

function Field({ label, value }: FieldProps) {
  return (
    <div className="rounded-[22px] border border-black/8 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-neutral-900">{value}</p>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
  bold?: boolean;
}

function Row({ label, value, bold = false }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={bold ? "font-semibold text-neutral-950" : undefined}>
        {label}
      </span>
      <span className={bold ? "font-semibold text-neutral-950" : undefined}>
        {value}
      </span>
    </div>
  );
}
