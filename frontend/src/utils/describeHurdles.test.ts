import { describe, expect, it } from "vitest";
import type { Hurdle, Run } from "@/types";
import { describeHurdles } from "./describeHurdles";

const hurdles: Hurdle[] = [
  { id: "pref", type: "pref", rate: 8 },
  { id: "roc", type: "roc" },
];

function run(payouts: Run["payouts"], leftover: number): Run {
  return { id: "run", date: "2026-01-01", amount: 6000, payouts, leftover };
}

describe("describeHurdles", () => {
  it("marks every hurdle filled when cash is left over", () => {
    const views = describeHurdles(
      run([{ investorId: "a", hurdleId: "pref", amount: 1000 }], 500),
      hurdles,
    );
    expect(views.map((view) => view.status)).toEqual(["filled", "filled"]);
    expect(views[0]?.owed).toBe(1000);
  });

  it("marks the hurdle where cash stopped as partial", () => {
    const views = describeHurdles(
      run([{ investorId: "a", hurdleId: "pref", amount: 6000 }], 0),
      hurdles,
    );
    expect(views.map((view) => view.status)).toEqual(["partial", "not-reached"]);
    expect(views[0]?.owed).toBeNull();
    expect(views[0]?.shares).toEqual([]);
  });

  it("uses stored shares for owed and a real percentage", () => {
    const withShares = run([{ investorId: "a", hurdleId: "roc", amount: 30 }], 0);
    withShares.shares = [
      { investorId: "a", hurdleId: "pref", owed: 10, paid: 10 },
      { investorId: "a", hurdleId: "roc", owed: 100, paid: 30 },
    ];
    const views = describeHurdles(withShares, hurdles);
    expect(views.map((view) => view.status)).toEqual(["filled", "partial"]);
    expect(views[1]?.owed).toBe(100);
    expect(views[1]?.progress).toBe(30);
  });
});
