# Contexto del Proyecto

## Objetivo

Construir una versión simplificada de una plataforma de alojamientos utilizando Next.js y React para comprender su arquitectura de componentes, flujos de navegación y organización de datos.

La aplicación debe ser mobile-first, comenzando con un diseño optimizado para un ancho de pantalla de 375px y adaptándose a escritorio a partir de 768px.

## Stack Técnico

- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Lenguaje:** TypeScript
- **Manejo de datos:** JSON local simulando una API, consumido a través de una capa de `services/` con funciones async que imitan un `fetch` real (con delay simulado), de forma que el día de mañana se pueda reemplazar por un endpoint real sin tocar componentes.
- **Estado global:** Context API propio (sin librerías externas como Zustand/Redux). Se define un `SearchContext` para criterios de búsqueda (destino, fechas, huéspedes) y opcionalmente un `FavoritesContext` para manejar favoritos entre vistas.
- **Estilos:** Tailwind CSS, respetando mobile-first (clases base sin prefijo = mobile, `md:` en adelante para breakpoints de tablet/desktop a partir de 768px). No se usan CSS Modules.

## Usuario Objetivo

Personas que desean buscar alojamientos temporales para vacaciones o viajes de trabajo.

Los usuarios necesitan:

- Buscar alojamientos disponibles.
- Explorar resultados de búsqueda.
- Ver información detallada de una propiedad.
- Navegar entre las distintas vistas sin recargar la página.

---

## Arquitectura de Carpetas (Next.js App Router)

```
src/
├── app/
│   ├── layout.tsx                 # Layout raíz: <Header /> + <Footer /> + Providers
│   ├── page.tsx                   # Home (/)
│   ├── catalog/
│   │   └── page.tsx                # Catálogo (/catalog)
│   └── room/
│       └── [id]/
│           └── page.tsx            # Detalle (/room/[id])
│
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── Header.tsx          # estilos inline vía clases Tailwind
│   │   │   └── index.ts            # barrel export
│   │   └── Footer/
│   │       ├── Footer.tsx
│   │       └── index.ts
│   │
│   ├── search/
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── index.ts
│   │   └── FilterBar/
│   │       ├── FilterBar.tsx       # pills de filtros rápidos del catálogo
│   │       └── index.ts
│   │
│   ├── property/
│   │   ├── PropertyCard/
│   │   │   ├── PropertyCard.tsx
│   │   │   └── index.ts
│   │   ├── PropertyList/
│   │   │   ├── PropertyList.tsx
│   │   │   └── index.ts
│   │   ├── PropertyCarousel/        # secciones horizontales del Home
│   │   │   ├── PropertyCarousel.tsx
│   │   │   └── index.ts
│   │   ├── ImageGallery/
│   │   │   ├── ImageGallery.tsx
│   │   │   └── index.ts
│   │   ├── PropertyDetails/
│   │   │   ├── PropertyDetails.tsx
│   │   │   └── index.ts
│   │   ├── PropertyAmenities/
│   │   │   ├── PropertyAmenities.tsx
│   │   │   └── index.ts
│   │   ├── PropertyReviews/
│   │   │   ├── PropertyReviews.tsx
│   │   │   └── index.ts
│   │   ├── HostInfo/
│   │   │   ├── HostInfo.tsx
│   │   │   └── index.ts
│   │   └── PriceCard/
│   │       ├── PriceCard.tsx
│   │       └── index.ts
│   │
│   ├── map/
│   │   ├── MapView/
│   │   │   ├── MapView.tsx          # mapa del catálogo y del detalle
│   │   │   └── index.ts
│   │
│   └── ui/                         # componentes atómicos reutilizables
│       ├── Badge/
│       ├── RatingStars/
│       ├── PriceTag/
│       └── Button/
│
├── context/
│   ├── SearchContext.tsx           # destino, fechas, huéspedes
│   ├── FavoritesContext.tsx        # ids de propiedades favoritas
│   └── index.ts                    # barrel export de providers/hooks
│
├── services/
│   ├── propertyService.ts          # getProperties(), getPropertyById(), getFeaturedSections()
│   └── index.ts
│
├── data/
│   └── properties.mock.json        # dataset simulado de alojamientos
│
├── types/
│   ├── property.types.ts           # Property, PropertyImage, Amenity, Review, Host
│   ├── search.types.ts             # SearchCriteria, GuestCount
│   └── index.ts                    # barrel export de todos los types
│
├── utils/
│   ├── formatPrice.ts              # formateo moneda UYU
│   ├── formatDate.ts               # formateo de fechas (es-UY)
│   └── index.ts
│
└── hooks/
    ├── useSearch.ts                # consume SearchContext
    ├── useFavorites.ts             # consume FavoritesContext
    └── index.ts
```

### Convención de Barrel Exports

Cada carpeta de componente/módulo expone un `index.ts` que re-exporta su contenido, de forma que el import quede limpio. No se usan archivos `.module.css`: todo el estilado vive como clases de Tailwind directamente en el JSX de cada componente.

```ts
// components/property/PropertyCard/index.ts
export { PropertyCard } from "./PropertyCard";
export type { PropertyCardProps } from "./PropertyCard";
```

```ts
// Uso en una page:
import { PropertyCard, PropertyList } from "@/components/property";
```

---

## Types e Interfaces (`types/`)

```ts
// types/property.types.ts

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string; // nombre del ícono (lucide-react)
}

export interface Host {
  id: string;
  name: string;
  avatarUrl: string;
  isSuperhost: boolean;
  yearsOfExperience: number;
  reviewsCount: number;
  rating: number;
  responseRate: number;
  responseTime: string;
  bio: string;
  job?: string;
  bornDecade?: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Property {
  id: string;
  title: string;
  type: string; // "Departamento", "Cabaña", "Hotel", etc.
  city: string;
  neighborhood?: string;
  country: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  pricePerNight: number;
  originalPrice?: number; // para mostrar precio tachado
  currency: string; // "UYU"
  rating: number | null; // null = "Nuevo"
  reviewsCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  images: PropertyImage[];
  amenities: Amenity[];
  description: string;
  host: Host;
  reviews: Review[];
  location: {
    lat: number;
    lng: number;
    description: string;
  };
  cancellationPolicy: string;
  houseRules: string[];
  safetyInfo: string[];
}
```

```ts
// types/search.types.ts

export interface SearchCriteria {
  destination: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: GuestCount;
}

export interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
```

```ts
// types/index.ts
export * from "./property.types";
export * from "./search.types";
```

---

## Services (`services/`)

Simulan una capa de API real. Reciben/devuelven los `types` definidos y agregan un delay artificial para representar latencia de red.

```ts
// services/propertyService.ts
import properties from "@/data/properties.mock.json";
import type { Property } from "@/types";

const SIMULATED_DELAY = 400;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getFeaturedSections(): Promise<
  { title: string; properties: Property[] }[]
> {
  await delay(SIMULATED_DELAY);
  // agrupa el mock por ciudad/categoría para las secciones del Home
  // ...
  return [];
}

export async function getProperties(
  filters?: Partial<SearchCriteria>,
): Promise<Property[]> {
  await delay(SIMULATED_DELAY);
  return properties as Property[];
}

export async function getPropertyById(
  id: string,
): Promise<Property | undefined> {
  await delay(SIMULATED_DELAY);
  return (properties as Property[]).find((p) => p.id === id);
}
```

```ts
// services/index.ts
export * from "./propertyService";
```

---

## Context API (`context/`)

```ts
// context/SearchContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { SearchCriteria } from '@/types';

interface SearchContextValue {
  criteria: SearchCriteria;
  setCriteria: (criteria: SearchCriteria) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    destination: '',
    checkIn: null,
    checkOut: null,
    guests: { adults: 1, children: 0, infants: 0, pets: 0 },
  });

  return (
    <SearchContext.Provider value={{ criteria, setCriteria }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearchContext debe usarse dentro de SearchProvider');
  return context;
}
```

`FavoritesContext` sigue el mismo patrón (guarda un `Set<string>` de ids de propiedades favoritas, con `toggleFavorite(id)` e `isFavorite(id)`).

Ambos providers se montan en `app/layout.tsx` envolviendo `{children}`.

---

## Páginas Principales

### Home (`/`)

Página de inicio enfocada en la búsqueda y el descubrimiento por carruseles temáticos.

**Estructura visual:**

- **Header** sticky: logo a la izquierda; nav central con tabs "Alojamientos" (ícono casa, activo), "Experiencias" (ícono globo, badge "Nuevo"), "Servicios" (ícono campana, badge "Nuevo"); a la derecha "Convertirte en anfitrión", ícono idioma/moneda, botón menú hamburguesa.
- **SearchBar** tipo pill grande centrada, dividida en 3 secciones por líneas verticales: Destino / Fechas / Huéspedes, con botón circular de búsqueda al final.
- **Secciones de PropertyCarousel** (scroll horizontal), cada una con:
  - Título + flecha "→" de link.
  - Subtítulo gris opcional.
  - Flechas de navegación (← →) en círculos blancos.
  - 7 `PropertyCard` visibles por carrusel.
- Secciones previstas: "Alojamientos populares en [ciudad]", "Grandes ofertas en hoteles", "Disponibles en [destino] este fin de semana", "Hospédate en [destino]" — el patrón se repite con distintos destinos del mock.
- Toast fijo inferior centrado: pill rosa "Los precios incluyen todas las tarifas".

**PropertyCard (variante Home):**
Imagen cuadrada con esquinas redondeadas, badge "Favorito entre huéspedes" arriba-izquierda, corazón de favorito arriba-derecha, y debajo: título, precio + "por X noches", rating con ícono de estrella.

Objetivo del usuario: iniciar una búsqueda de alojamiento o descubrir opciones destacadas.

---

### Catálogo de Resultados (`/catalog`)

Muestra una lista de alojamientos disponibles en formato split-view.

**Estructura visual:**

- **Header** compacto: SearchBar colapsada en pill ("Alojamientos en [ciudad]" | "Cualquier fin de semana" | "¿Cuántos?").
- **FilterBar**: botón "Filtros" (ícono sliders) + pills scrolleables: "Estacionamiento gratuito", "WiFi", "Llegada autónoma", "Más de 1 baño", "Aire acondicionado", "Más de 1 cama", "Televisión", "Cocina", "Favorito entre huéspedes".
- **Layout split (2 columnas en desktop, stack en mobile):**
  - Columna izquierda: título "Más de N alojamientos en [ciudad]" + nota "Los precios incluyen todas las tarifas"; `PropertyList` en grid (3 columnas en desktop / 1 columna en mobile).
  - Columna derecha (sticky en desktop): `MapView` con pills de precio flotantes sobre marcadores, controles de zoom y fullscreen.

**PropertyCard (variante Catálogo):**
Imagen con dots de carrusel, badges "Superanfitrión"/"Favorito entre huéspedes" y corazón favorito. Debajo: título + rating alineado a la derecha, descripción secundaria gris (habitaciones/camas/baños), rango de fechas, precio (con tachado si hay descuento) + "por X noches", badge verde opcional de descuento.

Objetivo del usuario: comparar opciones disponibles y seleccionar una propiedad.

---

### Detalle de Habitación (`/room/[id]`)

Muestra la información completa de una propiedad.

**Estructura visual:**

- **Header** simplificado con SearchBar genérica colapsada.
- Título del alojamiento + acciones "Compartir" / "Guardar" alineadas a la derecha.
- **ImageGallery**: 1 imagen grande a la izquierda + grid 2x2 a la derecha + botón overlay "Mostrar todas las fotos".
- **Layout 2 columnas (contenido / sidebar sticky):**
  - **PropertyDetails**: subtítulo tipo de alojamiento, línea de huéspedes/habitaciones/camas/baños, rating, `HostInfo` resumido (avatar + nombre + "SuperAnfitrión · X años"), lista de highlights con íconos (llegada autónoma, zona caminable, superanfitrión), banner de traducción automática, descripción larga con "Mostrar más".
  - **PriceCard** (sticky): precio tachado + precio final + "por X noches", selectores de fecha (LLEGADA/SALIDA), selector de huéspedes, radio buttons de tarifa (No reembolsable / Reembolsable con total), botón "Reservar", texto "Aún no se te cobrará nada", link "Reportar este anuncio".
- Nav de anclas sticky: "Fotos | Amenidades | Evaluaciones | Ubicación".
- **PropertyAmenities**: grid 2 columnas ícono + texto, botón "Mostrar las N amenidades".
- Calendario de disponibilidad: 2 meses lado a lado, rango seleccionado resaltado, link "Borrar fechas".
- **PropertyReviews**: contador de evaluaciones, cards de review (avatar, nombre, ubicación, estrellas, fecha relativa, comentario truncado con "Mostrar más").
- **MapView** de ubicación con pin central tipo casa + descripción del barrio.
- **HostInfo** extendido: avatar grande, métricas (evaluaciones, calificación, años de experiencia), datos personales (nacimiento, trabajo), bio, info de coanfitriones, índice/tiempo de respuesta, botón "Escríbele al anfitrión", nota de seguridad de pagos.
- Sección "Qué debes saber": 3 columnas (Política de cancelación / Reglas de la casa / Seguridad y propiedad), cada una con ícono + lista + link "Más información".

Objetivo del usuario: evaluar una propiedad específica antes de realizar una reserva.

---

## Footer (Global)

Presente en todas las vistas vía `app/layout.tsx`.

- Sección "Descubre otras opciones en [ciudad] y sus alrededores": breadcrumb (StaySphere > País > Ciudad > Región) + grid de 3x3 destinos relacionados (nombre + categoría).
- Footer principal en 3 columnas de links:
  1. **Asistencia**: Centro de ayuda, seguridad, cobertura para huéspedes, seguro de viaje, antidiscriminación, accesibilidad, cancelaciones, problemas en la zona.
  2. **Cómo ser anfitrión**: Publicar tu espacio en StaySphere, ofrecer experiencia/servicio, cobertura para anfitriones, recursos, foro, anfitrión responsable, clases gratuitas, coanfitrión, invitar anfitrión.
  3. **StaySphere**: lanzamientos, prensa, empleo, inversores, tarjetas de regalo, impacto social.
- Barra legal inferior: copyright + Privacidad + Términos (izquierda); selector idioma, selector moneda, íconos redes sociales (derecha).

---

## Navegación

La aplicación utiliza el sistema de rutas de Next.js (App Router).

Rutas previstas:

- `/` → Home
- `/catalog` → Catálogo
- `/room/[id]` → Detalle

La navegación se realiza mediante el componente `<Link>` de `next/link` para evitar recargas completas del navegador. El paso de criterios de búsqueda entre Home → Catálogo se realiza vía `SearchContext`, no vía query params (a menos que se decida sincronizar ambos a futuro).

---

## Consideraciones de Diseño

- Mobile First: diseño base a 375px, breakpoint principal a partir de 768px (tablet/desktop).
- Componentes reutilizables y de responsabilidad única (un componente, una función clara).
- Interfaz inspirada en plataformas modernas de hospitalidad (colores: rosa/coral primario, blanco, grises neutros; tipografía sans-serif redondeada; cards con esquinas muy redondeadas).
- Datos simulados para las propiedades vía `data/properties.mock.json`, accedidos exclusivamente a través de `services/propertyService.ts` (nunca importar el JSON directamente desde un componente).
- Estado de búsqueda y favoritos manejado con Context API propio, sin librerías externas.
- Diseño limpio y enfocado en la experiencia de búsqueda y reserva.
