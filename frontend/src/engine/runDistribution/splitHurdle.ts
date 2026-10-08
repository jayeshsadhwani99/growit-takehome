export interface OwedShare {
  investorId: string;
  owed: number;
}

export interface HurdleSplit {
  investorId: string;
  amount: number;
}

/** Someone owed nothing is skipped. Remainder pennies go to the largest fractional shares. */
export function splitHurdle(cash: number, shares: OwedShare[]): { payouts: HurdleSplit[]; spent: number } {
  const positive = shares.filter((share) => share.owed > 0);
  const total = positive.reduce((sum, share) => sum + share.owed, 0);
  if (cash <= 0 || total <= 0) return { payouts: [], spent: 0 };

  const spend = Math.min(cash, total);
  const amounts = positive.map((share) => Math.floor((spend * share.owed) / total));
  let remainder = spend - amounts.reduce((sum, amount) => sum + amount, 0);
  const byFraction = positive
    .map((share, index) => ({ index, fraction: (spend * share.owed) % total }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);
  for (const item of byFraction) {
    if (remainder === 0) break;
    amounts[item.index] = (amounts[item.index] ?? 0) + 1;
    remainder -= 1;
  }

  const payouts = positive
    .map((share, index) => ({ investorId: share.investorId, amount: amounts[index] ?? 0 }))
    .filter((payout) => payout.amount > 0);
  return { payouts, spent: spend };
}
