import { type FormEvent, useState } from "react";
import { Button, DateField, FormField, Input } from "@/components";
import { runDistribution } from "@/engine";
import { selectHurdles } from "@/store/features/hurdles";
import { selectInvestors } from "@/store/features/investors";
import { runAdded, selectLatestRunDate, selectRuns } from "@/store/features/runs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dateToIso, dollarsToCents, runDateError, runErrorMessage, runSubmitBlock } from "@/utils";

export function RunForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const investors = useAppSelector(selectInvestors);
  const hurdles = useAppSelector(selectHurdles);
  const runs = useAppSelector(selectRuns);
  const latest = useAppSelector(selectLatestRunDate);
  const [date, setDate] = useState(latest ?? dateToIso(new Date()));
  const [amount, setAmount] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);
  const [engineError, setEngineError] = useState<string | null>(null);
  const block = runSubmitBlock({
    investorCount: investors.length,
    hurdleCount: hurdles.length,
    amount,
  });

  function onSubmit(event: FormEvent): void {
    event.preventDefault();
    const nextDateError = runDateError(date, latest);
    setDateError(nextDateError);
    setEngineError(null);
    const cents = dollarsToCents(amount);
    if (nextDateError || block || cents === null) return;
    try {
      dispatch(runAdded(runDistribution(investors, hurdles, runs, date, cents)));
      onClose();
    } catch (error) {
      setEngineError(runErrorMessage(error));
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-3" noValidate>
      <FormField id="run-date" label="Date" error={dateError ?? undefined}>
        <DateField
          id="run-date"
          value={date}
          min={latest ?? undefined}
          onChange={(next) => {
            setDate(next);
            setDateError(null);
          }}
          invalid={Boolean(dateError)}
          describedBy={dateError ? "run-date-error" : undefined}
        />
      </FormField>
      <FormField id="run-amount" label="Amount (USD)">
        <Input
          id="run-amount"
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </FormField>
      {engineError ? (
        <p id="run-engine-error" role="alert" className="text-xs font-medium text-red-700 dark:text-red-300">
          {engineError}
        </p>
      ) : null}
      {block ? <p className="text-xs text-muted">{block}</p> : null}
      <div className="flex justify-end gap-1.5">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button type="submit" disabled={Boolean(block)}>
          Run distribution
        </Button>
      </div>
    </form>
  );
}
