import { formatMoney } from "@/utils/formatMoney";

/** Monospace dollars. Right-align the table cell that wraps this. */
export function Money({ value }: { value: number }) {
  return <span className="font-mono tabular-nums">{formatMoney(value)}</span>;
}
