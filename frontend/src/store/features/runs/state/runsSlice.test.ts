import { describe, expect, it } from "vitest";
import { runAdded, runsReducer, runsReset } from "./runsSlice";

describe("runsReducer", () => {
  it("selects a new run, then clears history on reset", () => {
    const saved = runsReducer(
      undefined,
      runAdded({ id: "r1", date: "2026-01-01", amount: 100, payouts: [], leftover: 100 }),
    );
    expect(saved.selectedId).toBe("r1");
    expect(runsReducer(saved, runsReset())).toEqual({ items: [], selectedId: null });
  });
});
