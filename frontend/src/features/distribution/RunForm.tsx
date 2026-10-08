import { type FormEvent, useState } from "react";
import { Button, Card, FormField, Input } from "@/components";
import { runDistribution } from "@/engine";
import { selectHurdles } from "@/store/features/hurdles";
import { selectInvestors } from "@/store/features/investors";
import { runAdded, selectLatestRunDate, selectRuns } from "@/store/features/runs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { runDateError, runErrorMessage, runSubmitBlock } from "@/utils";

export function RunForm() {
  const dispatch = useAppDispatch();
  const investors = useAppSelector(selectInvestors);
  const hurdles = useAppSelector(selectHurdles);
  const runs = useAppSelector(selectRuns);
  const latest = useAppSelector(selectLatestRunDate);
  const [date, setDate] = useState("");
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
    if (nextDateError || block) return;
    try {
      dispatch(runAdded(runDistribution(investors, hurdles, runs, date, Number(amount))));
      setAmount("");
    } catch (error) {
      setEngineError(runErrorMessage(error));
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" noValidate>
        <FormField id="run-date" label="Date" error={dateError ?? undefined}>
          <Input
            id="run-date"
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setDateError(null);
            }}
            aria-invalid={Boolean(dateError)}
            aria-describedby={dateError ? "run-date-error" : undefined}
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
        <div className="sm:col-span-2 lg:col-span-1 lg:self-end">
          <Button type="submit" disabled={Boolean(block)} className="w-full">
            Run distribution
          </Button>
        </div>
        {engineError ? (
          <p id="run-engine-error" role="alert" className="text-sm text-red-700 sm:col-span-2 lg:col-span-3">
            {engineError}
          </p>
        ) : null}
        {block ? <p className="text-sm text-muted sm:col-span-2 lg:col-span-3">{block}</p> : null}
      </form>
    </Card>
  );
}
