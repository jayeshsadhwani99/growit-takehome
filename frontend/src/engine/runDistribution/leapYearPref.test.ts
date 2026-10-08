import { describe, expect, it } from "vitest";
import { runDistribution } from "./index";

describe("leap year preferred return", () => {
  it("counts 29 February as one extra day and rounds to the cent", () => {
    const alice = { id: "alice", name: "Alice", amount: 10_000_000, date: "2024-01-01" };
    const pref = { id: "pref", type: "pref" as const, rate: 8 };
    const run = runDistribution([alice], [pref], [], "2025-01-01", 100_000_000);
    const owed = run.shares?.find((share) => share.hurdleId === "pref")?.owed;
    expect(owed).toBe(802_192);
  });
});
