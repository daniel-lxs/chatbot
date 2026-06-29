import assert from "node:assert/strict";
import test from "node:test";
import { getDocumentTimestampByIndex } from "./utils";

test("getDocumentTimestampByIndex returns the matching timestamp for a valid index", () => {
  const expectedDate = new Date("2024-01-02T00:00:00.000Z");
  const documents = [{ createdAt: new Date("2024-01-01T00:00:00.000Z") }, { createdAt: expectedDate }] as never;

  assert.equal(getDocumentTimestampByIndex(documents, 1), expectedDate);
});

test("getDocumentTimestampByIndex falls back when index equals document count", () => {
  const fallbackStart = Date.now();
  const documents = [{ createdAt: new Date("2024-01-01T00:00:00.000Z") }] as never;

  const result = getDocumentTimestampByIndex(documents, 1);

  assert.ok(result instanceof Date);
  assert.ok(result.getTime() >= fallbackStart);
});
