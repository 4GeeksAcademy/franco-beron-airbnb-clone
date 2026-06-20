import Image from "next/image";

import type { PropertyImage } from "@/types";

export interface ImageGalleryProps {
  title: string;
  images: PropertyImage[];
}

export function ImageGallery({ title, images }: ImageGalleryProps) {
  const [heroImage, ...secondaryImages] = images;
  const visibleSecondaryImages = secondaryImages.slice(0, 4);

  return (
    <section id="photos" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
          {title}
        </h1>
        <div className="hidden items-center gap-3 text-sm font-medium text-neutral-600 md:flex">
          <button className="rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm">
            Compartir
          </button>
          <button className="rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm">
            Guardar
          </button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-[32px] lg:min-h-[520px]">
          <Image
            src={
              heroImage?.url ??
              "https://picsum.photos/seed/fallback-detail/1600/1200"
            }
            alt={heroImage?.alt ?? title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {visibleSecondaryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative min-h-[160px] overflow-hidden rounded-[28px] lg:min-h-[252px]"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
              {index === visibleSecondaryImages.length - 1 ? (
                <button className="absolute bottom-4 right-4 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur">
                  Mostrar todas las fotos
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
