import { describe, expect, it } from "vitest";
import { formatMoney } from "./formatMoney";

describe("formatMoney", () => {
  it("formats dollars with the US currency symbol", () => {
    expect(formatMoney(479_212)).toBe("$4,792.12");
    expect(formatMoney(1)).toBe("$0.01");
  });
});
