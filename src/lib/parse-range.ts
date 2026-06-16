export function parseRange(input: string): number[] {
  const match = input.trim().match(/^(-?\d+)(?:\s*-\s*(-?\d+))?$/);

  if (!match) {
    return [];
  }

  const start = Number(match[1]);
  const end = match[2] ? Number(match[2]) : start;

  const step = start <= end ? 1 : -1;
  const length = Math.abs(end - start) + 1;

  return Array.from({ length }, (_, index) => start + index * step);
}
