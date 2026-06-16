export function parseRange(input: string): number[] {
  const [startPart, endPart] = input.split('-').map((part) => part.trim());
  const start = Number.parseInt(startPart, 10);

  if (!Number.isInteger(start)) {
    return [];
  }

  if (!endPart) {
    return [start];
  }

  const end = Number.parseInt(endPart, 10);

  if (!Number.isInteger(end)) {
    return [];
  }

  const step = start <= end ? 1 : -1;
  const length = Math.abs(end - start) + 1;

  return Array.from({ length }, (_, index) => start + index * step);
}
