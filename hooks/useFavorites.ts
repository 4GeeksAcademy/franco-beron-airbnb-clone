"use client";

import { useFavoritesContext } from "@/context";

export function useFavorites() {
  return useFavoritesContext();
}
