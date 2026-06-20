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
