import { describe, expect, it } from "vitest";
import { dateToIso } from "./dateToIso";
import { isoToDate } from "./isoToDate";

describe("calendar dates", () => {
  it("round-trips a YYYY-MM-DD value through a local Date", () => {
    const date = isoToDate("2025-07-01");
    expect(date?.getFullYear()).toBe(2025);
    expect(date?.getMonth()).toBe(6);
    expect(date?.getDate()).toBe(1);
    expect(date ? dateToIso(date) : "").toBe("2025-07-01");
  });
});
