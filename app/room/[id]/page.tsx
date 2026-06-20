import { notFound } from "next/navigation";
import Image from "next/image";

import { MapView } from "@/components/map";
import {
  AvailabilityCalendar,
  HostInfo,
  ImageGallery,
  PriceCard,
  PropertyAmenities,
  PropertyDetails,
  PropertyReviews,
} from "@/components/property";
import { getPropertyById } from "@/services";

import { PropertyMetaSections } from "@/components/property/PropertyMetaSections";

interface RoomPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 px-4 py-8 md:px-6 lg:px-8">
      <ImageGallery title={property.title} images={property.images} />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_380px] xl:items-start">
        <div className="space-y-10">
          <PropertyDetails property={property} />
          <section
            id="sleeping"
            className="space-y-5 border-t border-black/8 pt-10"
          >
            <h3 className="text-2xl font-semibold text-neutral-950">
              Dónde vas a dormir
            </h3>
            <article className="max-w-sm rounded-[26px] border border-black/8 bg-white p-3 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image
                  src={
                    property.images[0]?.url ??
                    "https://picsum.photos/seed/fallback-sleeping/1200/900"
                  }
                  alt={property.images[0]?.alt ?? property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-neutral-900">
                Recámara
              </p>
              <p className="text-sm text-neutral-600">1 cama matrimonial</p>
            </article>
          </section>
          <PropertyAmenities amenities={property.amenities} />
          <section id="calendar" className="border-t border-black/8 pt-10">
            <AvailabilityCalendar city={property.city} />
          </section>
          <PropertyReviews
            rating={property.rating}
            reviews={property.reviews}
          />
          <section
            id="location"
            className="space-y-5 border-t border-black/8 pt-10"
          >
            <div>
              <h3 className="text-2xl font-semibold text-neutral-950">
                Dónde vas a estar
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                {property.location.description}
              </p>
            </div>
            <MapView properties={[property]} compact />
          </section>
          <HostInfo host={property.host} />
          <PropertyMetaSections property={property} />
        </div>

        <div id="booking" className="xl:sticky xl:top-28">
          <PriceCard
            propertyId={property.id}
            pricePerNight={property.pricePerNight}
            originalPrice={property.originalPrice}
            currency={property.currency}
          />
        </div>
      </div>
    </div>
  );
}
