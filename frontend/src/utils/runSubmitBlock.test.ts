import { describe, expect, it } from "vitest";
import { runSubmitBlock } from "./runSubmitBlock";

const ready = { investorCount: 1, hurdleCount: 1, amount: "1000" };

describe("runSubmitBlock", () => {
  it("allows a positive amount once investors and hurdles exist", () => {
    expect(runSubmitBlock(ready)).toBeNull();
  });

  it("blocks an empty cap table, an empty waterfall, and a non-positive amount", () => {
    expect(runSubmitBlock({ ...ready, investorCount: 0 })).toMatch(/investor/);
    expect(runSubmitBlock({ ...ready, hurdleCount: 0 })).toMatch(/hurdle/);
    expect(runSubmitBlock({ ...ready, amount: "0" })).toMatch(/greater than 0/);
  });
});
