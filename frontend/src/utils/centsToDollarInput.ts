/** Edit fields show dollars. 1010 cents is the string "10.10". */
export function centsToDollarInput(cents: number): string {
  const whole = Math.trunc(cents / 100);
  const frac = String(Math.abs(cents) % 100).padStart(2, "0");
  return `${whole}.${frac}`;
}
