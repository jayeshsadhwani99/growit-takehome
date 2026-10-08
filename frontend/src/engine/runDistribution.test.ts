import { describe, expect, it } from "vitest";
import { runDistribution } from "./runDistribution";

describe("runDistribution", () => {
  it.skip("pays preferred return and does not reach return of capital", () => {
    // rate 8 means 8% per year, matching the waterfall input.
    const run = runDistribution(
      [
        { id: "alice", name: "Alice", amount: 100_000, date: "2025-01-01" },
        { id: "bob", name: "Bob", amount: 50_000, date: "2025-07-01" },
      ],
      [
        { id: "pref", type: "pref", rate: 8 },
        { id: "roc", type: "roc" },
      ],
      [],
      "2026-01-01",
      6_000,
    );

    const paid = (investorId: string) =>
      run.payouts
        .filter((payout) => payout.investorId === investorId)
        .reduce((sum, payout) => sum + payout.amount, 0);

    expect(Math.abs(paid("alice") - 4792)).toBeLessThanOrEqual(1);
    expect(Math.abs(paid("bob") - 1208)).toBeLessThanOrEqual(1);

    const roc = run.payouts
      .filter((payout) => payout.hurdleId === "roc")
      .reduce((sum, payout) => sum + payout.amount, 0);
    expect(roc).toBe(0);
  });
});
