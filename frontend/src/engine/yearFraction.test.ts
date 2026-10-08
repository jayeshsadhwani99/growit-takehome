import { describe, expect, it } from "vitest";
import { yearFraction } from "./yearFraction";

describe("yearFraction", () => {
  it("counts a non-leap year as 1", () => {
    expect(yearFraction("2025-01-01", "2026-01-01")).toBe(1);
  });

  it("counts one actual day as 1/365", () => {
    expect(yearFraction("2025-01-01", "2025-01-02")).toBe(1 / 365);
  });

  it("includes the leap day in the numerator, not the denominator", () => {
    expect(yearFraction("2024-02-28", "2024-03-01")).toBe(2 / 365);
    expect(yearFraction("2025-02-28", "2025-03-01")).toBe(1 / 365);
  });

  it("rejects a date that is not YYYY-MM-DD", () => {
    expect(() => yearFraction("01-01-2025", "2025-02-01")).toThrow(/YYYY-MM-DD/);
  });

  it("rejects a calendar day that does not exist", () => {
    expect(() => yearFraction("2025-02-29", "2025-03-01")).toThrow(/YYYY-MM-DD/);
  });
});
