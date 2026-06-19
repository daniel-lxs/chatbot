const DURATION_MULTIPLIERS = {
  ms: 1,
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
} as const;

const DURATION_PATTERN = /^(?<value>\d+(?:\.\d+)?)(?<unit>ms|s|m|h)$/;

export function parseDurationMs(input: string): number {
  if (typeof input !== 'string') {
    throw new TypeError('Duration input must be a string');
  }

  const normalizedInput = input.trim();
  const match = DURATION_PATTERN.exec(normalizedInput);

  if (!match?.groups) {
    throw new Error(
      `Invalid duration "${input}". Expected a value like "500ms", "5s", "2m", or "1h".`,
    );
  }

  const value = Number.parseFloat(match.groups.value);
  const multiplier =
    DURATION_MULTIPLIERS[
      match.groups.unit as keyof typeof DURATION_MULTIPLIERS
    ];

  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`Invalid duration value "${input}".`);
  }

  return value * multiplier;
}
