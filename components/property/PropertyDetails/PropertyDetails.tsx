import Image from "next/image";

import type { Property } from "@/types";

export interface PropertyDetailsProps {
  property: Property;
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <section id="details" className="space-y-8">
      <div className="space-y-4 border-b border-black/8 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
          <span className="rounded-full bg-neutral-100 px-3 py-1 font-medium text-neutral-800">
            {property.type}
          </span>
          {property.isSuperhost ? (
            <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700">
              Superhost
            </span>
          ) : null}
          <span>
            {property.city}, {property.country}
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
          {property.guests} huéspedes · {property.bedrooms} habitaciones ·{" "}
          {property.beds} camas · {property.bathrooms} baños
        </h2>
        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <span>
            {property.rating ? `★ ${property.rating.toFixed(1)}` : "Nuevo"}
          </span>
          <span>{property.reviewsCount} evaluaciones</span>
          <span>{property.location.description}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-black/8 pb-8">
        <Image
          src={property.host.avatarUrl}
          alt={property.host.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-neutral-950">
            Anfitrión: {property.host.name}
          </h3>
          <p className="text-sm text-neutral-500">
            {property.host.isSuperhost ? "Superhost · " : ""}
            {property.host.yearsOfExperience} años de experiencia ·{" "}
            {property.host.responseTime}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <HighlightCard
          title="Llegada simple"
          description="Check-in claro y comunicación rápida para entrar sin fricciones."
        />
        <HighlightCard
          title="Ubicación buscada"
          description="Zona cómoda para moverse y explorar el entorno del alojamiento."
        />
        <HighlightCard
          title="Reserva confiable"
          description="Información completa, reseñas y reglas transparentes antes de reservar."
        />
      </div>

      <div className="rounded-[28px] border border-black/6 bg-neutral-50 px-5 py-4 text-sm text-neutral-600">
        Parte de la descripción se puede mostrar traducida automáticamente para
        mejorar la exploración del alojamiento.
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-950">
          Acerca de este lugar
        </h3>
        <p className="max-w-3xl text-base leading-7 text-neutral-600">
          {property.description}
        </p>
      </div>
    </section>
  );
}

interface HighlightCardProps {
  title: string;
  description: string;
}

function HighlightCard({ title, description }: HighlightCardProps) {
  return (
    <div className="rounded-[28px] border border-black/5 bg-white px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
      <h4 className="text-base font-semibold text-neutral-950">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
    </div>
  );
}
