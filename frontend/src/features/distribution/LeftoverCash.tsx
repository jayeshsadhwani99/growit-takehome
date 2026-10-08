import { Money } from "@/components";

export function LeftoverCash({ amount }: { amount: number }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface px-4 py-4">
      <p className="text-sm text-muted">Undistributed cash</p>
      <p className="mt-1 text-right text-lg">
        <Money value={amount} />
      </p>
    </div>
  );
}
