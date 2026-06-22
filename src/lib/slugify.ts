/**
 * Converts free-form text into a lowercase, hyphenated slug.
 */
export function slugify(input: string): string {
  const normalizedInput = input.trim().toLowerCase().replace(/\s+/g, " ");

  return normalizedInput.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
