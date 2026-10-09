import { describe, expect, it } from "vitest";
import { hurdleFill } from "./hurdleFill";

describe("hurdleFill", () => {
  it("leaves a $0 of $0 hurdle empty instead of fully painted", () => {
    expect(hurdleFill(0, 0)).toEqual({ status: "filled", progress: 0 });
  });

  it("fills the bar only when cash was actually paid", () => {
    expect(hurdleFill(0, 100)).toEqual({ status: "not-reached", progress: 0 });
    expect(hurdleFill(100, 100)).toEqual({ status: "filled", progress: 100 });
  });
});
