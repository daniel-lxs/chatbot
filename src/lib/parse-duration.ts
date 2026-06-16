const DURATION_UNITS = {
  d: 24 * 60 * 60,
  h: 60 * 60,
  m: 60,
  s: 1,
} as const;

export function parseDuration(input: string): number {
  const value = input.trim();

  if (!value) {
    return Number.NaN;
  }

  const partPattern = /(\d+)\s*([dhms])/gi;
  let totalSeconds = 0;
  let consumed = '';
  let match: RegExpExecArray | null;

  while ((match = partPattern.exec(value)) !== null) {
    const [token, amount, unit] = match;

    totalSeconds +=
      Number(amount) *
      DURATION_UNITS[unit.toLowerCase() as keyof typeof DURATION_UNITS];
    consumed += token;
  }

  return consumed.replaceAll(/\s+/g, '') === value.replaceAll(/\s+/g, '')
    ? totalSeconds
    : Number.NaN;
}
