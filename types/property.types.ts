export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;
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
  type: string;
  city: string;
  neighborhood?: string;
  country: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  pricePerNight: number;
  originalPrice?: number;
  currency: string;
  rating: number | null;
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
