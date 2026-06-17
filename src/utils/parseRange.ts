export function parseRange(input: string): number[] {
  return input.split(',').flatMap((part) => {
    const trimmedPart = part.trim();

    if (!trimmedPart) {
      return [];
    }

    const [startText, endText] = trimmedPart.split('-').map((value) => value.trim());
    const start = Number.parseInt(startText, 10);

    if (endText === undefined) {
      return [start];
    }

    const end = Number.parseInt(endText, 10);
    const step = start <= end ? 1 : -1;
    const range: number[] = [];

    for (
      let value = start;
      step > 0 ? value <= end : value >= end;
      value += step
    ) {
      range.push(value);
    }

    return range;
  });
}
