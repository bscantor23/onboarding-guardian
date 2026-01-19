const PRODUCT_TYPE_MAP: Record<string, string> = {
  SAVINGS: "Cuenta de ahorros",
  CHECKING: "Cuenta corriente",
  CREDIT: "Crédito",
  LOAN: "Préstamo",
  INVESTMENT: "Inversión",
  DIGITAL: "Cuenta digital",
};

const AUDIENCE_TYPE_MAP: Record<string, string> = {
  ALL: "General",
  NATURAL: "Natural",
  BUSINESS: "Jurídico",
};

function normalize(code?: string | null) {
  if (!code) return "No definido";
  return code
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function parseProductType(code?: string | null): string {
  if (!code) return "No definido";
  return PRODUCT_TYPE_MAP[code.toUpperCase()] ?? normalize(code);
}

export function parseAudienceType(code?: string | null): string {
  if (!code) return "No definido";
  return AUDIENCE_TYPE_MAP[code.toUpperCase()] ?? normalize(code);
}
