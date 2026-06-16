const durationUnits = {
  d: 24 * 60 * 60,
  h: 60 * 60,
  m: 60,
  s: 1,
} as const;

export function parseDuration(input: string): number {
  const normalized = input.trim().toLowerCase().replace(/\s+/g, '');

  if (!normalized) {
    throw new Error('Invalid duration');
  }

  let totalSeconds = 0;
  let matchedLength = 0;

  for (const match of normalized.matchAll(/(\d+)([dhms])/g)) {
    const value = Number.parseInt(match[1], 10);
    const unit = match[2] as keyof typeof durationUnits;

    totalSeconds += value * durationUnits[unit];
    matchedLength += match[0].length;
  }

  if (matchedLength !== normalized.length) {
    throw new Error('Invalid duration');
  }

  return totalSeconds;
}
