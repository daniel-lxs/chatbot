const UNIT_TO_SECONDS = {
  d: 24 * 60 * 60,
  h: 60 * 60,
  m: 60,
  s: 1,
} as const;

const DURATION_PART_PATTERN = /(\d+)([dhms])/g;

export function parseDuration(input: string): number {
  const value = input.trim();

  let total = 0;
  let matchedLength = 0;

  for (const match of value.matchAll(DURATION_PART_PATTERN)) {
    const amount = Number(match[1]);
    const unit = match[2] as keyof typeof UNIT_TO_SECONDS;

    total += amount * UNIT_TO_SECONDS[unit];
    matchedLength += match[0].length;
  }

  if (matchedLength === 0 || matchedLength !== value.length) {
    throw new Error(`Invalid duration: ${input}`);
  }

  return total;
}
