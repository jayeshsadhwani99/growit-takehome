import { dollarsToCents } from "./dollarsToCents";

interface RunSubmitInput {
  investorCount: number;
  hurdleCount: number;
  amount: string;
}

/** Why the Run button stays disabled. A null return means amount, investors, and hurdles are ok. */
export function runSubmitBlock(input: RunSubmitInput): string | null {
  if (input.investorCount === 0) return "Add at least one investor first.";
  if (input.hurdleCount === 0) return "Add at least one hurdle first.";
  const cents = dollarsToCents(input.amount);
  if (cents === null || cents <= 0) return "Enter an amount greater than 0.";
  return null;
}
