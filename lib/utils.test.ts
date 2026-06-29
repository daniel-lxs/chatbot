import { describe, expect, it } from "node:test";
import { getDocumentTimestampByIndex } from "./utils";

describe("getDocumentTimestampByIndex", () => {
  it("returns the matching document timestamp when the index exists", () => {
    const firstDate = new Date("2024-01-01T00:00:00.000Z");
    const secondDate = new Date("2024-01-02T00:00:00.000Z");
    const documents = [
      { createdAt: firstDate },
      { createdAt: secondDate },
    ] as Parameters<typeof getDocumentTimestampByIndex>[0];

    expect(getDocumentTimestampByIndex(documents, 0)).toBe(firstDate);
    expect(getDocumentTimestampByIndex(documents, 1)).toBe(secondDate);
  });

  it("falls back to the latest document when the index is out of bounds", () => {
    const firstDate = new Date("2024-01-01T00:00:00.000Z");
    const secondDate = new Date("2024-01-02T00:00:00.000Z");
    const documents = [
      { createdAt: firstDate },
      { createdAt: secondDate },
    ] as Parameters<typeof getDocumentTimestampByIndex>[0];

    expect(getDocumentTimestampByIndex(documents, 2)).toBe(secondDate);
  });
});
