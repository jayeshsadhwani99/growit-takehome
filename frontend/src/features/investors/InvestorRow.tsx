import { useState } from "react";
import { Button, Money } from "@/components";
import { selectInvestorLocked } from "@/store/features/investors";
import { useAppSelector } from "@/store/hooks";
import type { Investor } from "@/types";
import { formatDate, formatShare } from "@/utils";
import { DeleteInvestorDialog } from "./DeleteInvestorDialog";
import { InvestorEditRow } from "./InvestorEditRow";

export function InvestorRow({ investor, total }: { investor: Investor; total: number }) {
  const locked = useAppSelector((state) => selectInvestorLocked(state, investor.id));
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);

  if (editing && !locked) {
    return <InvestorEditRow investor={investor} total={total} onDone={() => setEditing(false)} />;
  }

  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-3 py-2">
        <span className="text-sm font-medium">{investor.name}</span>
        {locked ? (
          <span className="mt-1 block text-xs text-muted">
            Paid in a past run, so this record can't be changed.
          </span>
        ) : null}
      </td>
      <td className="px-3 py-2 text-right text-sm">
        <Money value={investor.amount} />
      </td>
      <td className="px-3 py-2 text-sm">{formatDate(investor.date)}</td>
      <td className="px-3 py-2 text-right font-mono text-sm tabular-nums">{formatShare(investor.amount, total)}</td>
      <td className="px-3 py-2">
        <div className="flex justify-end gap-1.5">
          <Button variant="secondary" disabled={locked} onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button variant="danger" disabled={locked} onClick={() => setConfirming(true)}>
            Delete
          </Button>
        </div>
        <DeleteInvestorDialog investor={investor} open={confirming} onOpenChange={setConfirming} />
      </td>
    </tr>
  );
}
