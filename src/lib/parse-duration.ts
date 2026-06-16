const durationUnits = {
  d: 24 * 60 * 60,
  h: 60 * 60,
  m: 60,
  s: 1,
} as const;

const durationPattern = /(\d+)([dhms])/g;

export function parseDuration(input: string): number {
  const value = input.trim();

  if (!value) {
    return Number.NaN;
  }

  let total = 0;
  let lastIndex = 0;
  let hasMatch = false;

  for (const match of value.matchAll(durationPattern)) {
    const [segment, amount, unit] = match;

    if (match.index !== lastIndex) {
      return Number.NaN;
    }

    total += Number(amount) * durationUnits[unit as keyof typeof durationUnits];
    lastIndex += segment.length;
    hasMatch = true;
  }

  if (!hasMatch || lastIndex !== value.length) {
    return Number.NaN;
  }

  return total;
}
