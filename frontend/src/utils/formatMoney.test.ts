import { describe, expect, it } from "vitest";
import { formatMoney } from "./formatMoney";

describe("formatMoney", () => {
  it("formats dollars with the US currency symbol", () => {
    expect(formatMoney(4792)).toBe("$4,792.00");
  });
});
