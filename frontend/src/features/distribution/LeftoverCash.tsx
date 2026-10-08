import { Money } from "@/components";

export function LeftoverCash({ amount }: { amount: number }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface px-3 py-2.5">
      <p className="text-xs text-muted">Undistributed cash</p>
      <p className="mt-0.5 text-right text-sm">
        <Money value={amount} />
      </p>
    </div>
  );
}
