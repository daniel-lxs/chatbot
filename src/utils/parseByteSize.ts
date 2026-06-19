const UNIT_MULTIPLIERS = {
  kb: 1024,
  mb: 1024 ** 2,
  gb: 1024 ** 3,
} as const;

export function parseByteSize(input: string): number {
  if (typeof input !== "string") {
    throw new TypeError("Invalid byte size input");
  }

  const match = input
    .trim()
    .match(/^(?<value>(?:\d+\.?\d*|\.\d+))\s*(?<unit>kb|mb|gb)?$/i);

  if (!match?.groups) {
    throw new TypeError(`Invalid byte size input: ${input}`);
  }

  const value = Number(match.groups.value);
  const unit = match.groups.unit?.toLowerCase() as
    | keyof typeof UNIT_MULTIPLIERS
    | undefined;

  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError(`Invalid byte size input: ${input}`);
  }

  const bytes = unit ? value * UNIT_MULTIPLIERS[unit] : value;

  if (!Number.isSafeInteger(bytes)) {
    throw new TypeError(`Invalid byte size input: ${input}`);
  }

  return bytes;
}
