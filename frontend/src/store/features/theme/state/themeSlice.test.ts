import { describe, expect, it } from "vitest";
import { resolveTheme } from "./resolveTheme";
import { themeReducer, themeSet } from "./themeSlice";

describe("themeReducer", () => {
  it("starts on the system setting", () => {
    expect(themeReducer(undefined, { type: "unknown" })).toBe("system");
  });

  it("stores an explicit choice", () => {
    expect(themeReducer("system", themeSet("dark"))).toBe("dark");
  });
});

describe("resolveTheme", () => {
  it("follows the system only for the system choice", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});
