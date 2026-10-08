import { describe, expect, it } from "vitest";
import { centsToDollarInput } from "./centsToDollarInput";

describe("centsToDollarInput", () => {
  it("shows two decimal places for the edit field", () => {
    expect(centsToDollarInput(1010)).toBe("10.10");
    expect(centsToDollarInput(10_000_000)).toBe("100000.00");
  });
});
