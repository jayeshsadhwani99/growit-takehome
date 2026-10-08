/** One person on the deal's cap table. */
export interface Investor {
  id: string;
  name: string;
  /** Cents contributed. The form converts dollars on the way in. */
  amount: number;
  /** YYYY-MM-DD. Preferred return starts accruing on this day. */
  date: string;
}
