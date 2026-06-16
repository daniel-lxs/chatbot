const UNIT_TO_SECONDS = {
  d: 24 * 60 * 60,
  h: 60 * 60,
  m: 60,
  s: 1,
} as const;

export function parseDuration(input: string): number {
  const normalized = input.trim().replace(/\s+/g, "");

  if (!normalized) {
    throw new Error(`Invalid duration: ${input}`);
  }

  let totalSeconds = 0;
  let matchedLength = 0;

  for (const match of normalized.matchAll(/(\d+)([dhms])/g)) {
    const [, value, unitValue] = match;
    const unit = unitValue as keyof typeof UNIT_TO_SECONDS;
    totalSeconds += Number.parseInt(value, 10) * UNIT_TO_SECONDS[unit];
    matchedLength += match[0].length;
  }

  if (matchedLength !== normalized.length) {
    throw new Error(`Invalid duration: ${input}`);
  }

  return totalSeconds;
}
