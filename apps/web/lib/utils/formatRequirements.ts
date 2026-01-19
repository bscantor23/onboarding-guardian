export function parseRequirements(input: string | null | undefined): string[] {
  if (!input) return [];

  return input
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);
}
