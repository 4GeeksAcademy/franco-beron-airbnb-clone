import Image from "next/image";

import type { Host } from "@/types";

export interface HostInfoProps {
  host: Host;
}

export function HostInfo({ host }: HostInfoProps) {
  return (
    <section className="space-y-6 border-t border-black/8 pt-10">
      <div className="flex flex-col gap-4 rounded-[32px] bg-white px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={host.avatarUrl}
            alt={host.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold text-neutral-950">
              Conocé a {host.name}
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              {host.job ? `${host.job} · ` : ""}
              {host.bornDecade ? host.bornDecade : "Perfil activo"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <Metric value={String(host.reviewsCount)} label="evaluaciones" />
          <Metric value={host.rating.toFixed(2)} label="calificación" />
          <Metric value={String(host.yearsOfExperience)} label="años" />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-base leading-7 text-neutral-600">{host.bio}</p>
          <button className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(15,23,42,0.2)]">
            Escribile al anfitrión
          </button>
        </div>
        <div className="rounded-[28px] border border-black/5 bg-neutral-50 px-5 py-5 text-sm leading-6 text-neutral-600">
          <p>Índice de respuesta: {host.responseRate}%</p>
          <p className="mt-2">{host.responseTime}</p>
          <p className="mt-4">
            Para proteger tu pago, mantené siempre la conversación y la reserva
            dentro de la plataforma.
          </p>
        </div>
      </div>
    </section>
  );
}

interface MetricProps {
  value: string;
  label: string;
}

function Metric({ value, label }: MetricProps) {
  return (
    <div className="rounded-[22px] bg-neutral-50 px-4 py-3">
      <p className="text-lg font-semibold text-neutral-950">{value}</p>
      <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </p>
    </div>
  );
}
