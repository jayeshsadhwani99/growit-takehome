const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

/** This investor's slice of capital raised. An empty cap table is 0%, not NaN. */
export function formatShare(amount: number, total: number): string {
  if (total <= 0) return percent.format(0);
  return percent.format(amount / total);
}
