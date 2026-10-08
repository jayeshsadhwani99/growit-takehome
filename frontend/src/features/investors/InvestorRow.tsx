import { useState } from "react";
import { Button, Money } from "@/components";
import { deleteInvestor, selectInvestorLocked } from "@/store/features/investors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Investor } from "@/types";
import { formatDate, formatShare } from "@/utils";
import { InvestorEditRow } from "./InvestorEditRow";

export function InvestorRow({ investor, total }: { investor: Investor; total: number }) {
  const dispatch = useAppDispatch();
  const locked = useAppSelector((state) => selectInvestorLocked(state, investor.id));
  const [editing, setEditing] = useState(false);

  if (editing && !locked) {
    return <InvestorEditRow investor={investor} total={total} onDone={() => setEditing(false)} />;
  }

  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-3 py-3">
        <span className="font-medium">{investor.name}</span>
        {locked ? (
          <span className="mt-1 block text-xs text-muted">
            Paid in a past run, so this record can't be changed.
          </span>
        ) : null}
      </td>
      <td className="px-3 py-3 text-right">
        <Money value={investor.amount} />
      </td>
      <td className="px-3 py-3">{formatDate(investor.date)}</td>
      <td className="px-3 py-3 text-right font-mono tabular-nums">{formatShare(investor.amount, total)}</td>
      <td className="px-3 py-3">
        <div className="flex justify-end gap-2">
          <Button variant="secondary" disabled={locked} onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button variant="danger" disabled={locked} onClick={() => dispatch(deleteInvestor(investor.id))}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
