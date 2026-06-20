const shortDateFormatter = new Intl.DateTimeFormat("es-UY", {
  day: "numeric",
  month: "short",
});

const fullDateFormatter = new Intl.DateTimeFormat("es-UY", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(
  value: string | Date,
  options?: { includeYear?: boolean },
) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha inválida";
  }

  if (options?.includeYear) {
    return fullDateFormatter.format(date);
  }

  return shortDateFormatter.format(date);
}
