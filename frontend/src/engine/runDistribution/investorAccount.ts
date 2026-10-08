/** Working balance for one investor while a run is calculated. Not stored. */
export interface InvestorAccount {
  investorId: string;
  contributed: number;
  /** YYYY-MM-DD. Accrual starts here, not at the first run. */
  investedOn: string;
  capitalReturned: number;
  /** Prior payments on a hurdle, so the same accrual is not paid twice. */
  paidByHurdle: Record<string, number>;
}
