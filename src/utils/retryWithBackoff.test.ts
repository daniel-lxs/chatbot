import assert from 'node:assert/strict';
import test from 'node:test';
import { retryWithBackoff } from './retryWithBackoff';

function withImmediateTimers<T>(run: (delays: number[]) => Promise<T>) {
  const delays: number[] = [];
  const originalSetTimeout = globalThis.setTimeout;

  globalThis.setTimeout = ((handler: TimerHandler, timeout?: number) => {
    delays.push(timeout ?? 0);

    if (typeof handler === 'function') {
      handler();
    }

    return 0 as unknown as ReturnType<typeof setTimeout>;
  }) as unknown as typeof setTimeout;

  return run(delays).finally(() => {
    globalThis.setTimeout = originalSetTimeout;
  });
}

test('retries with exponential backoff until the function succeeds', async () => {
  await withImmediateTimers(async (delays) => {
    let attemptCount = 0;

    const result = await retryWithBackoff(
      async () => {
        attemptCount += 1;

        if (attemptCount < 3) {
          throw new Error(`failure ${attemptCount}`);
        }

        return 'ok';
      },
      { maxAttempts: 4, baseDelayMs: 25 },
    );

    assert.equal(result, 'ok');
    assert.equal(attemptCount, 3);
    assert.deepEqual(delays, [25, 50]);
  });
});

test('throws the last error after exhausting all attempts', async () => {
  await withImmediateTimers(async (delays) => {
    const errors = [
      new Error('failure 1'),
      new Error('failure 2'),
      new Error('failure 3'),
    ];
    let attemptCount = 0;

    await assert.rejects(
      retryWithBackoff(
        async () => {
          const error = errors[attemptCount];
          attemptCount += 1;
          throw error;
        },
        { maxAttempts: 3, baseDelayMs: 10 },
      ),
      (error) => {
        assert.equal(error, errors.at(-1));
        return true;
      },
    );

    assert.equal(attemptCount, 3);
    assert.deepEqual(delays, [10, 20]);
  });
});
