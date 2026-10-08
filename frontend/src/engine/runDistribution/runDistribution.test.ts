import { describe, expect, it } from "vitest";
import { yearFraction } from "../yearFraction";
import { runDistribution } from "./index";

const alice = { id: "alice", name: "Alice", amount: 100_000, date: "2025-01-01" };
const bob = { id: "bob", name: "Bob", amount: 50_000, date: "2025-07-01" };
const pref = { id: "pref", type: "pref" as const, rate: 8 };
const roc = { id: "roc", type: "roc" as const };

function paid(run: { payouts: { investorId: string; hurdleId: string; amount: number }[] }, investorId: string, hurdleId?: string) {
  return run.payouts
    .filter((payout) => payout.investorId === investorId && (hurdleId === undefined || payout.hurdleId === hurdleId))
    .reduce((sum, payout) => sum + payout.amount, 0);
}

describe("runDistribution", () => {
  it("pays preferred return and does not reach return of capital", () => {
    const run = runDistribution([alice, bob], [pref, roc], [], "2026-01-01", 6_000);
    expect(Math.abs(paid(run, "alice") - 4792)).toBeLessThanOrEqual(1);
    expect(Math.abs(paid(run, "bob") - 1208)).toBeLessThanOrEqual(1);
    expect(paid(run, "alice", "roc") + paid(run, "bob", "roc")).toBe(0);
    expect(run.shares?.find((share) => share.investorId === "alice" && share.hurdleId === "pref")?.owed).toBeCloseTo(8_000, 5);
    expect(run.shares?.find((share) => share.investorId === "bob" && share.hurdleId === "roc")?.owed).toBe(50_000);
    expect(run.leftover).toBe(0);
    expect(run.date).toBe("2026-01-01");
    expect(run.amount).toBe(6_000);
  });

  it("pays only the unpaid increase on a later run", () => {
    const first = runDistribution([alice], [pref], [], "2025-07-01", 100_000);
    const second = runDistribution([alice], [pref], [first], "2026-01-01", 100_000);
    const still = alice.amount * 0.08 * yearFraction(alice.date, "2026-01-01") - paid(first, "alice");
    expect(paid(second, "alice")).toBeCloseTo(still, 5);
    expect(second.leftover).toBeCloseTo(100_000 - still, 5);
  });

  it("uses capital left after an earlier return of capital in the same run", () => {
    const laterPref = { id: "pref-2", type: "pref" as const, rate: 8 };
    const run = runDistribution([alice], [pref, roc, laterPref], [], "2026-01-01", 1_000_000);
    expect(paid(run, "alice", "pref")).toBeCloseTo(8_000, 5);
    expect(paid(run, "alice", "roc")).toBeCloseTo(100_000, 5);
    expect(paid(run, "alice", "pref-2")).toBe(0);
    expect(run.leftover).toBeCloseTo(892_000, 5);
  });

  it("still records what a later preferred return is owed when cash runs out", () => {
    const laterPref = { id: "pref-2", type: "pref" as const, rate: 2 };
    const run = runDistribution([alice], [pref, roc, laterPref], [], "2026-01-01", 10_000);
    const later = run.shares?.find((share) => share.hurdleId === "pref-2");
    expect(later?.paid).toBe(0);
    expect(later?.owed).toBeGreaterThan(0);
  });

  it("owes nothing before the investor's own date", () => {
    const run = runDistribution([{ ...alice, date: "2026-06-01" }], [pref, roc], [], "2026-01-01", 1_000);
    expect(run.payouts).toEqual([]);
    expect(run.leftover).toBe(1_000);
  });

  it("splits return of capital in proportion to what is still owed", () => {
    const run = runDistribution([alice, { ...bob, date: "2025-01-01" }], [roc], [], "2026-01-01", 90_000);
    expect(paid(run, "alice")).toBeCloseTo(60_000, 5);
    expect(paid(run, "bob")).toBeCloseTo(30_000, 5);
  });

  it("accrues another year of preferred return on capital still out", () => {
    const leave = 4_966.68;
    const first = runDistribution([alice], [pref, roc], [], "2026-01-01", 8_000 + (100_000 - leave));
    const second = runDistribution([alice], [pref, roc], [first], "2027-01-01", 1_000_000);
    expect(paid(second, "alice", "pref")).toBeCloseTo(leave * 0.08, 2);
  });

  it("lets a later investor catch up from their own date", () => {
    const first = runDistribution([alice], [pref, roc], [], "2025-07-01", 100_000);
    const second = runDistribution([alice, bob], [pref, roc], [first], "2026-01-01", 200_000);
    const bobPref = bob.amount * 0.08 * yearFraction(bob.date, "2026-01-01");
    expect(paid(second, "bob", "pref")).toBeCloseTo(bobPref, 5);
    expect(paid(second, "bob", "roc")).toBeCloseTo(bob.amount, 5);
  });
});
