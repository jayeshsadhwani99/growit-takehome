import { describe, expect, it } from "vitest";
import { runDistribution } from "./index";

const alice = { id: "alice", name: "Alice", amount: 10_000_000, date: "2025-01-01" };
const bob = { id: "bob", name: "Bob", amount: 5_000_000, date: "2025-07-01" };
const pref = { id: "pref", type: "pref" as const, rate: 8 };
const roc = { id: "roc", type: "roc" as const };

function paid(run: { payouts: { investorId: string; hurdleId: string; amount: number }[] }, investorId: string, hurdleId?: string) {
  return run.payouts
    .filter((payout) => payout.investorId === investorId && (hurdleId === undefined || payout.hurdleId === hurdleId))
    .reduce((sum, payout) => sum + payout.amount, 0);
}

describe("runDistribution", () => {
  it("pays preferred return in cents and does not reach return of capital", () => {
    const run = runDistribution([alice, bob], [pref, roc], [], "2026-01-01", 600_000);
    expect(paid(run, "alice")).toBe(479_212);
    expect(paid(run, "bob")).toBe(120_788);
    expect(paid(run, "alice") + paid(run, "bob")).toBe(600_000);
    expect(paid(run, "alice", "roc") + paid(run, "bob", "roc")).toBe(0);
    expect(run.shares?.find((share) => share.investorId === "alice" && share.hurdleId === "pref")?.owed).toBe(800_000);
    expect(run.shares?.find((share) => share.investorId === "bob" && share.hurdleId === "pref")?.owed).toBe(201_644);
    expect(run.shares?.find((share) => share.investorId === "bob" && share.hurdleId === "roc")?.owed).toBe(5_000_000);
    expect(run.leftover).toBe(0);
  });

  it("pays only the unpaid increase on a later run", () => {
    const first = runDistribution([alice], [pref], [], "2025-07-01", 10_000_000);
    const second = runDistribution([alice], [pref], [first], "2026-01-01", 10_000_000);
    expect(paid(first, "alice")).toBe(396_712);
    expect(paid(second, "alice")).toBe(403_288);
    expect(second.leftover).toBe(9_596_712);
  });

  it("keeps interest already earned when capital is returned earlier in the same run", () => {
    const laterPref = { id: "pref-2", type: "pref" as const, rate: 8 };
    const run = runDistribution([alice], [pref, roc, laterPref], [], "2026-01-01", 100_000_000);
    expect(paid(run, "alice", "pref")).toBe(800_000);
    expect(paid(run, "alice", "roc")).toBe(10_000_000);
    expect(paid(run, "alice", "pref-2")).toBe(800_000);
    expect(run.leftover).toBe(88_400_000);
  });

  it("pays preferred return after return of capital in the same run", () => {
    const run = runDistribution([alice], [roc, pref], [], "2026-01-01", 10_800_000);
    expect(paid(run, "alice", "roc")).toBe(10_000_000);
    expect(paid(run, "alice", "pref")).toBe(800_000);
    expect(run.leftover).toBe(0);
  });

  it("still records a later preferred return when cash runs out", () => {
    const laterPref = { id: "pref-2", type: "pref" as const, rate: 2 };
    const run = runDistribution([alice], [pref, roc, laterPref], [], "2026-01-01", 1_000_000);
    const later = run.shares?.find((share) => share.hurdleId === "pref-2");
    expect(later?.paid).toBe(0);
    expect(later?.owed).toBe(200_000);
  });

  it("owes nothing before the investor's own date", () => {
    const run = runDistribution([{ ...alice, date: "2026-06-01" }], [pref, roc], [], "2026-01-01", 100_000);
    expect(run.payouts).toEqual([]);
    expect(run.leftover).toBe(100_000);
  });

  it("splits return of capital in proportion to what is still owed", () => {
    const run = runDistribution([alice, { ...bob, date: "2025-01-01" }], [roc], [], "2026-01-01", 9_000_000);
    expect(paid(run, "alice")).toBe(6_000_000);
    expect(paid(run, "bob")).toBe(3_000_000);
  });

  it("accrues another year of preferred return on capital still out", () => {
    const first = runDistribution([alice], [pref, roc], [], "2026-01-01", 10_303_332);
    const second = runDistribution([alice], [pref, roc], [first], "2027-01-01", 100_000_000);
    expect(paid(second, "alice", "pref")).toBe(39_733);
  });

  it("lets a later investor catch up from their own date", () => {
    const first = runDistribution([alice], [pref, roc], [], "2025-07-01", 10_000_000);
    const second = runDistribution([alice, bob], [pref, roc], [first], "2026-01-01", 20_000_000);
    expect(paid(second, "bob", "pref")).toBe(201_644);
    expect(paid(second, "bob", "roc")).toBe(5_000_000);
  });
});
