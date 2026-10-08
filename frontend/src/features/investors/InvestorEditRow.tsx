import { useState } from "react";
import { Button, DateField, Input } from "@/components";
import { saveInvestor } from "@/store/features/investors";
import { useAppDispatch } from "@/store/hooks";
import type { Investor } from "@/types";
import { formatShare, validateInvestorForm } from "@/utils";

interface InvestorEditRowProps {
  investor: Investor;
  total: number;
  onDone: () => void;
}

export function InvestorEditRow({ investor, total, onDone }: InvestorEditRowProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(investor.name);
  const [amount, setAmount] = useState(String(investor.amount));
  const [date, setDate] = useState(investor.date);
  const [message, setMessage] = useState<string | null>(null);

  function save(): void {
    const errors = validateInvestorForm({ name, amount, date });
    const first = errors.name ?? errors.amount ?? errors.date;
    if (first) {
      setMessage(first);
      return;
    }
    dispatch(saveInvestor({ ...investor, name: name.trim(), amount: Number(amount), date }));
    onDone();
  }

  return (
    <>
      <tr className="border-b border-border">
        <td className="px-3 py-2">
          <Input aria-label="Name" value={name} onChange={(event) => setName(event.target.value)} />
        </td>
        <td className="px-3 py-2">
          <Input
            aria-label="Amount (USD)"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </td>
        <td className="px-3 py-2">
          <DateField value={date} onChange={setDate} />
        </td>
        <td className="px-3 py-2 text-right font-mono text-sm tabular-nums">{formatShare(investor.amount, total)}</td>
        <td className="px-3 py-2">
          <div className="flex justify-end gap-1.5">
            <Button onClick={save}>Save</Button>
            <Button variant="secondary" onClick={onDone}>
              Cancel
            </Button>
          </div>
        </td>
      </tr>
      {message ? (
        <tr>
          <td colSpan={5} className="px-3 pb-3">
            <p role="alert" className="text-sm text-red-700">
              {message}
            </p>
          </td>
        </tr>
      ) : null}
    </>
  );
}
