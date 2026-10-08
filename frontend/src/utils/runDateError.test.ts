import { describe, expect, it } from "vitest";
import { runDateError } from "./runDateError";

describe("runDateError", () => {
  it("allows the first run on any date", () => {
    expect(runDateError("2025-01-01", null)).toBeNull();
  });

  it("allows a run on the same day as the latest one", () => {
    expect(runDateError("2026-01-01", "2026-01-01")).toBeNull();
  });

  it("rejects a run dated before the latest one", () => {
    expect(runDateError("2025-12-31", "2026-01-01")).toBe("Date is before the latest run.");
  });
});
