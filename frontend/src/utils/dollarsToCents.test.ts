import { describe, expect, it } from "vitest";
import { dollarsToCents } from "./dollarsToCents";

describe("dollarsToCents", () => {
  it("turns a dollar string into integer cents", () => {
    expect(dollarsToCents("10.10")).toBe(1010);
    expect(dollarsToCents("10.1")).toBe(1010);
    expect(dollarsToCents("100000")).toBe(10_000_000);
  });

  it("rejects a third decimal and a non-positive amount", () => {
    expect(dollarsToCents("1.005")).toBeNull();
    expect(dollarsToCents("0")).toBe(0);
    expect(dollarsToCents("")).toBeNull();
  });
});
