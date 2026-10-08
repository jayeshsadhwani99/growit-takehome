/** Nearest integer, half up, for non-negative values. */
export function roundDiv(numerator: bigint, denominator: bigint): number {
  return Number((numerator * 2n + denominator) / (denominator * 2n));
}
