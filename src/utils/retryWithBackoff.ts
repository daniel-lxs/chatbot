export type RetryWithBackoffOptions = {
  maxAttempts: number;
  baseDelayMs: number;
};

const sleep = (delayMs: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  { maxAttempts, baseDelayMs }: RetryWithBackoffOptions,
): Promise<T> {
  if (maxAttempts < 1) {
    throw new RangeError('maxAttempts must be at least 1');
  }

  if (baseDelayMs < 0) {
    throw new RangeError('baseDelayMs must be non-negative');
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        break;
      }

      await sleep(baseDelayMs * 2 ** (attempt - 1));
    }
  }

  throw lastError;
}
