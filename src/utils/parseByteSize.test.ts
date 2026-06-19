import assert from "node:assert/strict";
import test from "node:test";
import { parseByteSize } from "./parseByteSize";

test("parses raw byte strings", () => {
  assert.equal(parseByteSize("512"), 512);
});

test("parses case-insensitive unit strings", () => {
  assert.equal(parseByteSize("10kb"), 10 * 1024);
  assert.equal(parseByteSize("5MB"), 5 * 1024 ** 2);
  assert.equal(parseByteSize("1.5gb"), 1.5 * 1024 ** 3);
  assert.equal(parseByteSize("2 mb"), 2 * 1024 ** 2);
});

test("throws on invalid byte size strings", () => {
  assert.throws(() => parseByteSize(""));
  assert.throws(() => parseByteSize("10tb"));
  assert.throws(() => parseByteSize("1.2"));
});
