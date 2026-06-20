import { notFound } from "next/navigation";

import { MapView } from "@/components/map";
import {
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

      <nav className="sticky top-[73px] z-20 hidden items-center gap-5 rounded-full border border-black/6 bg-white/92 px-5 py-3 text-sm font-medium text-neutral-600 shadow-sm backdrop-blur lg:flex">
        <a href="#photos">Fotos</a>
        <a href="#details">Detalles</a>
        <a href="#amenities">Amenidades</a>
        <a href="#reviews">Evaluaciones</a>
        <a href="#location">Ubicación</a>
      </nav>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_380px] xl:items-start">
        <div className="space-y-10">
          <PropertyDetails property={property} />
          <PropertyAmenities amenities={property.amenities} />
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

        <div className="xl:sticky xl:top-28">
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
