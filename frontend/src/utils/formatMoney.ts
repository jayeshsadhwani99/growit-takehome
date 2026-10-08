const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Stored money is integer cents. This is the only place cents become dollars. */
export function formatMoney(cents: number): string {
  return usd.format(cents / 100);
}
