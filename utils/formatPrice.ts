const uyCurrencyFormatter = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number, currency = "UYU") {
  if (currency !== "UYU") {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return uyCurrencyFormatter.format(value);
}
