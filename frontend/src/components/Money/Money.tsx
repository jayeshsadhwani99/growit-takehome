import { formatMoney } from "@/utils";

/** Monospace dollars. Right-align the table cell that wraps this. */
export function Money({ value }: { value: number }) {
  return <span className="font-mono text-sm tabular-nums">{formatMoney(value)}</span>;
}
