import { describe, expect, it } from "vitest";
import { validateInvestorForm } from "./validateInvestorForm";

describe("validateInvestorForm", () => {
  it("accepts a name, a positive amount, and a date", () => {
    expect(validateInvestorForm({ name: "Ada", amount: "100", date: "2025-01-01" })).toEqual({});
  });

  it("requires a name, an amount above zero, and a date", () => {
    expect(validateInvestorForm({ name: "  ", amount: "0", date: "" })).toEqual({
      name: "Name is required.",
      amount: "Amount must be greater than 0.",
      date: "Date is required.",
    });
  });
});
