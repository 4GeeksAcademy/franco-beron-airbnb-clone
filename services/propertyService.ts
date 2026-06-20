import properties from "@/data/properties.mock.json";
import type { Property, SearchCriteria } from "@/types";

export interface FeaturedSection {
  title: string;
  subtitle?: string;
  properties: Property[];
}

const SIMULATED_DELAY = 400;

const propertyCollection = properties as Property[];

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const normalizeText = (value: string) =>
  value.trim().toLocaleLowerCase("es-UY");

const getRequestedGuests = (filters?: Partial<SearchCriteria>) => {
  if (!filters?.guests) {
    return 0;
  }

  const { adults, children } = filters.guests;
  return adults + children;
};

const matchesDestination = (property: Property, destination?: string) => {
  if (!destination?.trim()) {
    return true;
  }

  const searchTerm = normalizeText(destination);

  return [
    property.title,
    property.city,
    property.country,
    property.neighborhood ?? "",
  ]
    .map(normalizeText)
    .some((value) => value.includes(searchTerm));
};

const matchesGuests = (
  property: Property,
  filters?: Partial<SearchCriteria>,
) => {
  const requestedGuests = getRequestedGuests(filters);

  if (requestedGuests === 0) {
    return true;
  }

  return property.guests >= requestedGuests;
};

const sortByFeaturedScore = (left: Property, right: Property) => {
  const leftScore = (left.rating ?? 0) * 100 + left.reviewsCount;
  const rightScore = (right.rating ?? 0) * 100 + right.reviewsCount;

  return rightScore - leftScore;
};

const applyFilters = (filters?: Partial<SearchCriteria>) =>
  propertyCollection.filter(
    (property) =>
      matchesDestination(property, filters?.destination) &&
      matchesGuests(property, filters),
  );

export async function getProperties(
  filters?: Partial<SearchCriteria>,
): Promise<Property[]> {
  await delay(SIMULATED_DELAY);

  return applyFilters(filters);
}

export async function getPropertyById(
  id: string,
): Promise<Property | undefined> {
  await delay(SIMULATED_DELAY);

  return propertyCollection.find((property) => property.id === id);
}

export async function getFeaturedSections(): Promise<FeaturedSection[]> {
  await delay(SIMULATED_DELAY);

  const featuredSections: FeaturedSection[] = [
    {
      title: "Alojamientos populares en Buenos Aires",
      subtitle: "Opciones urbanas para escapadas cortas y viajes de trabajo.",
      properties: propertyCollection
        .filter((property) => property.city === "Buenos Aires")
        .sort(sortByFeaturedScore)
        .slice(0, 6),
    },
    {
      title: "Escapadas de costa en Maldonado",
      subtitle: "Playa, terrazas y casas para bajar el ritmo.",
      properties: propertyCollection
        .filter((property) =>
          [
            "Punta del Este",
            "La Barra",
            "José Ignacio",
            "Punta Ballena",
            "Manantiales",
          ].includes(property.city),
        )
        .sort(sortByFeaturedScore)
        .slice(0, 6),
    },
    {
      title: "Grandes ofertas en hoteles",
      subtitle: "Tarifas con descuento para reservar sin complicaciones.",
      properties: propertyCollection
        .filter(
          (property) =>
            property.type === "Hotel" &&
            typeof property.originalPrice === "number",
        )
        .sort(sortByFeaturedScore)
        .slice(0, 6),
    },
    {
      title: "Favoritos entre huéspedes",
      subtitle: "Lugares que ya vienen con señal clara de confianza.",
      properties: propertyCollection
        .filter((property) => property.isGuestFavorite)
        .sort(sortByFeaturedScore)
        .slice(0, 6),
    },
  ];

  return featuredSections.filter((section) => section.properties.length > 0);
}
