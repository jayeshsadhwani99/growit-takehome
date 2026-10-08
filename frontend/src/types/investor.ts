/** One person on the deal's cap table. */
export interface Investor {
  id: string;
  name: string;
  /** Dollars contributed. */
  amount: number;
  /** YYYY-MM-DD. Preferred return starts accruing on this day. */
  date: string;
}
