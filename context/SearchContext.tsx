"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import type { SearchCriteria } from "@/types";

interface SearchContextValue {
  criteria: SearchCriteria;
  setCriteria: (criteria: SearchCriteria) => void;
}

const defaultSearchCriteria: SearchCriteria = {
  destination: "",
  checkIn: null,
  checkOut: null,
  guests: {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  },
};

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [criteria, setCriteria] = useState<SearchCriteria>(
    defaultSearchCriteria,
  );

  return (
    <SearchContext.Provider value={{ criteria, setCriteria }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchContext debe usarse dentro de SearchProvider");
  }

  return context;
}
