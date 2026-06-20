const shortDateFormatter = new Intl.DateTimeFormat("es-UY", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const fullDateFormatter = new Intl.DateTimeFormat("es-UY", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(
  value: string | Date,
  options?: { includeYear?: boolean },
) {
  const date = parseStableDate(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha inválida";
  }

  if (options?.includeYear) {
    return fullDateFormatter.format(date);
  }

  return shortDateFormatter.format(date);
}

function parseStableDate(value: string | Date) {
  if (value instanceof Date) {
    return new Date(
      Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()),
    );
  }

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1]);
    const month = Number(dateOnlyMatch[2]) - 1;
    const day = Number(dateOnlyMatch[3]);
    return new Date(Date.UTC(year, month, day));
  }

  return new Date(value);
}
