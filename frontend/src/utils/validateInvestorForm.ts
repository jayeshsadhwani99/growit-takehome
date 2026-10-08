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
  const amount = Number(values.amount);
  if (values.amount.trim() === "" || !Number.isFinite(amount) || amount <= 0) {
    errors.amount = "Amount must be greater than 0.";
  }
  if (values.date.trim() === "") errors.date = "Date is required.";
  return errors;
}
