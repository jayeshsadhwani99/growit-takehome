import { dollarsToCents } from "./dollarsToCents";

export interface InvestorFormValues {
  name: string;
  amount: string;
  date: string;
}

export interface InvestorFormErrors {
  name?: string;
  amount?: string;
  date?: string;
}

export function validateInvestorForm(values: InvestorFormValues): InvestorFormErrors {
  const errors: InvestorFormErrors = {};
  if (values.name.trim() === "") errors.name = "Name is required.";
  const cents = dollarsToCents(values.amount);
  if (cents === null || cents <= 0) errors.amount = "Amount must be greater than 0.";
  if (values.date.trim() === "") errors.date = "Date is required.";
  return errors;
}
