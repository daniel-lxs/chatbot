/**
 * Truncates a string to the requested maximum length.
 */
export function truncate(input: string, max: number): string {
  const limit = Math.max(0, max);

  if (input.length <= limit) {
    return input;
  }

  return `${input.slice(0, limit)}...`;
}
