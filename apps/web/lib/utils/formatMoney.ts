export function formatMoney(
  value: number | null | undefined,
  currencyCode?: string | null,
  locale = "es-CO",
): string | null {
  if (value === null || value === undefined) return null;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode ?? "COP",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString(locale)} ${currencyCode ?? ""}`.trim();
  }
}
