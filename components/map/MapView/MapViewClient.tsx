"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useMemo, useState } from "react";
import {
  divIcon,
  latLngBounds,
  type LatLngExpression,
  type Map as LeafletMap,
} from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { useFavorites, useSearch } from "@/hooks";
import type { PropertyImage } from "@/types";
import { formatDate, formatPrice } from "@/utils";

import type { MapViewProps } from "./MapView";

export function MapViewClient({
  properties,
  compact = false,
  selectedPropertyId,
  onSelectProperty,
}: MapViewProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { criteria } = useSearch();

  const [localSelectedPinId, setLocalSelectedPinId] = useState<
    string | undefined
  >(undefined);
  const [dismissedPinId, setDismissedPinId] = useState<string | undefined>(
    undefined,
  );
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [mapRenderTick, setMapRenderTick] = useState(0);
  const [carouselIndexByProperty, setCarouselIndexByProperty] = useState<
    Record<string, number>
  >({});

  const markers = useMemo(
    () =>
      properties.map((property) => ({
        id: property.id,
        title: property.title,
        type: property.type,
        city: property.city,
        neighborhood: property.neighborhood,
        rating: property.rating,
        reviewsCount: property.reviewsCount,
        images:
          property.images.length > 0
            ? property.images
            : ([
                {
                  id: `${property.id}-fallback`,
                  url: "https://picsum.photos/seed/fallback-map/1200/900",
                  alt: property.title,
                },
              ] as PropertyImage[]),
        nightlyPrice: property.pricePerNight,
        currency: property.currency,
        price: formatPrice(property.pricePerNight, property.currency),
        hasFreeCancellation: property.cancellationPolicy
          .toLowerCase()
          .includes("gratis"),
        position: [
          property.location.lat,
          property.location.lng,
        ] as LatLngExpression,
      })),
    [properties],
  );

  const candidatePinId = selectedPropertyId ?? localSelectedPinId;
  const activePinId =
    candidatePinId === dismissedPinId ? undefined : candidatePinId;

  const activeMarker = useMemo(
    () => markers.find((marker) => marker.id === activePinId),
    [activePinId, markers],
  );

  const selectedCheckIn = parseDate(criteria.checkIn);
  const selectedCheckOut = parseDate(criteria.checkOut);
  const selectedNights = getNights(selectedCheckIn, selectedCheckOut, 2);
  const dateRangeLabel =
    selectedCheckIn && selectedCheckOut
      ? `${formatDate(selectedCheckIn)} - ${formatDate(selectedCheckOut)}`
      : "Cualquier semana";

  const activeImageIndex = activeMarker
    ? (carouselIndexByProperty[activeMarker.id] ?? 0) %
      activeMarker.images.length
    : 0;

  const activeImage = activeMarker
    ? activeMarker.images[activeImageIndex]
    : null;

  const cardPosition = useMemo(() => {
    const tick = mapRenderTick;

    if (!mapInstance || !activeMarker) {
      return { left: 16, top: 16 };
    }

    const cardWidth = 360;
    const cardHeight = compact ? 232 : 316;
    const padding = 12;
    const point = mapInstance.latLngToContainerPoint(activeMarker.position);
    const mapSize = mapInstance.getSize();

    const clampedLeft = clamp(
      point.x - cardWidth / 2 + tick * 0,
      padding,
      mapSize.x - cardWidth - padding,
    );

    const prefersTop = point.y - cardHeight - 22;
    const nextTop =
      prefersTop >= padding
        ? prefersTop
        : Math.min(point.y + 22, mapSize.y - cardHeight - padding);

    return {
      left: Math.round(clampedLeft),
      top: Math.round(
        clamp(nextTop, padding, mapSize.y - cardHeight - padding),
      ),
    };
  }, [activeMarker, compact, mapInstance, mapRenderTick]);

  const handleMapChanged = () => {
    setMapRenderTick((currentTick) => currentTick + 1);
  };

  const moveCarousel = (
    propertyId: string,
    direction: -1 | 1,
    total: number,
  ) => {
    setCarouselIndexByProperty((current) => {
      const currentIndex = current[propertyId] ?? 0;
      const nextIndex = (currentIndex + direction + total) % total;
      return {
        ...current,
        [propertyId]: nextIndex,
      };
    });
  };

  const setCarouselIndex = (propertyId: string, index: number) => {
    setCarouselIndexByProperty((current) => ({
      ...current,
      [propertyId]: index,
    }));
  };

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[32px] border border-black/5",
        compact ? "h-[320px]" : "h-[460px]",
      ].join(" ")}
    >
      <MapContainer
        ref={setMapInstance}
        center={markers[0]?.position ?? DEFAULT_CENTER}
        zoom={12}
        scrollWheelZoom
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FitMapToMarkers markers={markers} />
        <MapEventBridge onMapChanged={handleMapChanged} />
        <MarkerClusterGroup chunkedLoading>
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={createPriceIcon(
                marker.price,
                marker.id === (activePinId ?? selectedPropertyId),
              )}
              eventHandlers={{
                click: () => {
                  setLocalSelectedPinId(marker.id);
                  setDismissedPinId(undefined);
                  onSelectProperty?.(marker.id);
                },
              }}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <div className="pointer-events-none absolute left-5 top-5 rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Mapa
        </p>
        <p className="mt-1 text-sm font-medium text-neutral-800">
          {properties.length} resultado{properties.length === 1 ? "" : "s"}
        </p>
      </div>

      {activeMarker ? (
        <article
          className="absolute z-[450] w-full max-w-[360px] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.28)]"
          style={{
            left: `${cardPosition.left}px`,
            top: `${cardPosition.top}px`,
          }}
        >
          <div className="relative">
            <Link href={`/room/${activeMarker.id}`}>
              <Image
                src={
                  activeImage?.url ??
                  "https://picsum.photos/seed/fallback-map/1200/900"
                }
                alt={activeImage?.alt ?? activeMarker.title}
                width={720}
                height={420}
                className="h-40 w-full object-cover"
              />
            </Link>

            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {activeMarker.images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  aria-label={`Mostrar imagen ${index + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setCarouselIndex(activeMarker.id, index);
                  }}
                  className={[
                    "pointer-events-auto h-1.5 rounded-full transition-all",
                    index === activeImageIndex
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/55",
                  ].join(" ")}
                />
              ))}
            </div>

            {activeMarker.images.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Imagen anterior"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    moveCarousel(
                      activeMarker.id,
                      -1,
                      activeMarker.images.length,
                    );
                  }}
                  className="absolute left-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-base text-neutral-900 shadow-sm"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Siguiente imagen"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    moveCarousel(
                      activeMarker.id,
                      1,
                      activeMarker.images.length,
                    );
                  }}
                  className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-base text-neutral-900 shadow-sm"
                >
                  ›
                </button>
              </>
            ) : null}

            <div className="absolute right-3 top-3 flex items-center gap-2">
              <button
                type="button"
                aria-label="Guardar alojamiento"
                onClick={() => toggleFavorite(activeMarker.id)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg text-neutral-900 shadow-sm"
              >
                {isFavorite(activeMarker.id) ? "♥" : "♡"}
              </button>
              <button
                type="button"
                aria-label="Cerrar detalle del pin"
                onClick={() => {
                  setDismissedPinId(candidatePinId);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg text-neutral-900 shadow-sm"
              >
                ✕
              </button>
            </div>
          </div>

          <Link
            href={`/room/${activeMarker.id}`}
            className="block px-4 pb-4 pt-3"
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="truncate text-base leading-tight font-semibold text-neutral-900">
                {activeMarker.title}
              </h4>
              <p className="shrink-0 text-sm font-medium text-neutral-800">
                {activeMarker.rating
                  ? `★ ${activeMarker.rating.toFixed(2)} (${activeMarker.reviewsCount})`
                  : "Nuevo"}
              </p>
            </div>

            <p className="mt-1 truncate text-sm text-neutral-600">
              {activeMarker.type} en el corazón de{" "}
              {activeMarker.neighborhood ?? activeMarker.city}
            </p>
            <p className="mt-1 text-sm text-neutral-600">{dateRangeLabel}</p>
            <p className="mt-3 text-xl font-semibold text-neutral-950">
              {formatPrice(
                activeMarker.nightlyPrice * selectedNights,
                activeMarker.currency,
              )}{" "}
              por {selectedNights} {selectedNights === 1 ? "noche" : "noches"}
            </p>
            {activeMarker.hasFreeCancellation ? (
              <span className="mt-2 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                Cancelación gratuita
              </span>
            ) : null}
          </Link>
        </article>
      ) : null}
    </div>
  );
}

function FitMapToMarkers({
  markers,
}: {
  markers: { position: LatLngExpression }[];
}) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) {
      map.setView(DEFAULT_CENTER, 11);
      return;
    }

    if (markers.length === 1) {
      map.setView(markers[0].position, 13);
      return;
    }

    const bounds = latLngBounds(markers.map((marker) => marker.position));
    map.fitBounds(bounds, { padding: [36, 36], maxZoom: 14 });
  }, [map, markers]);

  return null;
}

function createPriceIcon(price: string, isSelected = false) {
  const backgroundColor = isSelected ? "#e11d48" : "#111827";

  return divIcon({
    className: "map-price-marker",
    iconSize: [1, 1],
    iconAnchor: [0, 0],
    popupAnchor: [0, -14],
    html: `<div style="display:inline-flex;align-items:center;line-height:1;background:${backgroundColor};color:#ffffff;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:700;box-shadow:0 12px 28px rgba(15,23,42,0.32);white-space:nowrap;transform:translate(-50%,-100%);">${price}</div>`,
  });
}

const DEFAULT_CENTER: LatLngExpression = [-34.9011, -56.1645];

function parseDate(value: string | null) {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function getNights(checkIn?: Date, checkOut?: Date, fallback = 1) {
  if (!checkIn || !checkOut) {
    return fallback;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.ceil(
    (startOfDay(checkOut).getTime() - startOfDay(checkIn).getTime()) /
      millisecondsPerDay,
  );

  return Math.max(1, diff);
}

function startOfDay(value: Date) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function MapEventBridge({ onMapChanged }: { onMapChanged: () => void }) {
  useMapEvents({
    moveend: onMapChanged,
    zoomend: onMapChanged,
    resize: onMapChanged,
  });

  return null;
}
