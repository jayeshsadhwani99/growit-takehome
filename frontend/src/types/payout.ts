/** Cash a single investor received from a single hurdle in one run. */
export interface Payout {
  investorId: string;
  hurdleId: string;
  /** Dollars paid. */
  amount: number;
}
