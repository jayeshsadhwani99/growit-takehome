const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Display dollars. The stored number stays a plain amount; this is presentation only. */
export function formatMoney(amount: number): string {
  return usd.format(amount);
}
