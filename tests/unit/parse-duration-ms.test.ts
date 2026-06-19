import assert from 'node:assert/strict';
import test from 'node:test';
import { parseDurationMs } from '../../src/utils/parseDurationMs';

test('parseDurationMs converts supported duration suffixes to milliseconds', () => {
  assert.equal(parseDurationMs('500ms'), 500);
  assert.equal(parseDurationMs('5s'), 5000);
  assert.equal(parseDurationMs('2m'), 120000);
  assert.equal(parseDurationMs('1h'), 3600000);
});

test('parseDurationMs throws on invalid duration strings', () => {
  assert.throws(() => parseDurationMs(''));
  assert.throws(() => parseDurationMs('10'));
  assert.throws(() => parseDurationMs('2d'));
  assert.throws(() => parseDurationMs('hello'));
});
