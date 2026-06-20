export interface DateInterval {
  from: string;
  to: string;
}

export const propertyAvailability: Record<string, DateInterval[]> = {
  "ba-palermo-loft": [{ from: "2026-07-10", to: "2026-07-13" }],
  "ba-recoleta-studio": [{ from: "2026-07-18", to: "2026-07-20" }],
  "ba-san-telmo-hotel": [{ from: "2026-07-05", to: "2026-07-07" }],
  "pde-brava-apartment": [{ from: "2026-07-22", to: "2026-07-26" }],
  "pde-peninsula-hotel": [{ from: "2026-07-15", to: "2026-07-18" }],
  "piriapolis-cerro-cabin": [{ from: "2026-07-09", to: "2026-07-11" }],
  "piriapolis-rambla-apartment": [{ from: "2026-07-27", to: "2026-07-30" }],
  "montevideo-pocitos-loft": [{ from: "2026-07-12", to: "2026-07-14" }],
  "montevideo-ciudad-vieja-hotel": [{ from: "2026-07-24", to: "2026-07-27" }],
  "jose-ignacio-beach-house": [{ from: "2026-07-19", to: "2026-07-22" }],
  "colonia-barrio-historico-apartment": [
    { from: "2026-07-08", to: "2026-07-10" },
  ],
  "la-barra-design-house": [{ from: "2026-07-29", to: "2026-08-01" }],
  "punta-ballena-ocean-view": [{ from: "2026-07-16", to: "2026-07-19" }],
  "carmelo-vineyard-cabin": [{ from: "2026-07-06", to: "2026-07-08" }],
  "cabo-polonio-dune-cabin": [{ from: "2026-07-14", to: "2026-07-17" }],
  "punta-carretas-urban-flat": [{ from: "2026-07-20", to: "2026-07-23" }],
  "manantiales-ocean-cottage": [{ from: "2026-07-25", to: "2026-07-28" }],
};
