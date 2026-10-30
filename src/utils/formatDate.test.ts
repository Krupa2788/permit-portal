import { describe, expect, it } from "vitest";
import { formatDate, parseDate } from "./formatDate";

describe("parseDate", () => {
  it("returns a Date for a valid ISO string", () => {
    const date = parseDate("2026-10-27T03:15:00Z");
    expect(date).toBeInstanceOf(Date);
    expect(date?.toISOString()).toBe("2026-10-27T03:15:00.000Z");
  });

  it("returns null for an invalid string", () => {
    expect(parseDate("not a date")).toBe(null);
  });
});

describe("formatDate", () => {
  it("formats a date as a long en-AU date", () => {
    expect(formatDate(new Date("2026-10-27T03:15:00Z"))).toBe(
      "27 October 2026",
    );
  });

  it("uses Brisbane time, not UTC", () => {
    // 15:00 UTC on the 28th is 01:00 on the 29th in Brisbane (UTC+10).
    expect(formatDate(new Date("2026-10-28T15:00:00Z"))).toBe(
      "29 October 2026",
    );
  });
});
