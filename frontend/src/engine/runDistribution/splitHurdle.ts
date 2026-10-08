export interface OwedShare {
  investorId: string;
  owed: number;
}

export interface HurdleSplit {
  investorId: string;
  amount: number;
}

/** Someone owed nothing is skipped. The last share takes the remainder so the split sums to the cash used. */
export function splitHurdle(cash: number, shares: OwedShare[]): { payouts: HurdleSplit[]; spent: number } {
  const positive = shares.filter((share) => share.owed > 0);
  const total = positive.reduce((sum, share) => sum + share.owed, 0);
  if (cash <= 0 || total <= 0) return { payouts: [], spent: 0 };

  const spend = Math.min(cash, total);
  let left = spend;
  const payouts = positive.map((share, index) => {
    const amount = index === positive.length - 1 ? left : Math.min(left, (spend * share.owed) / total);
    left -= amount;
    return { investorId: share.investorId, amount };
  });
  return { payouts: payouts.filter((payout) => payout.amount > 0), spent: spend };
}
