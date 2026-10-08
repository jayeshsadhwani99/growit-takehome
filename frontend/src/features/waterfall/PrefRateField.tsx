import { useState } from "react";
import { FormField, Input } from "@/components";
import { setPrefRate } from "@/store/features/hurdles";
import { useAppDispatch } from "@/store/hooks";
import type { Hurdle } from "@/types";

type PrefHurdle = Extract<Hurdle, { type: "pref" }>;

/** Local text so clearing the box doesn't immediately store 0. Commit on blur. */
export function PrefRateField({ hurdle, locked }: { hurdle: PrefHurdle; locked: boolean }) {
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState(String(hurdle.rate));

  function commit(): void {
    const rate = Number(draft);
    if (!Number.isFinite(rate) || rate < 0) {
      setDraft(String(hurdle.rate));
      return;
    }
    dispatch(setPrefRate(hurdle.id, rate));
    setDraft(String(rate));
  }

  return (
    <FormField id={`rate-${hurdle.id}`} label="Annual rate (%)">
      <Input
        id={`rate-${hurdle.id}`}
        type="number"
        min="0"
        step="0.01"
        value={draft}
        disabled={locked}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
      />
    </FormField>
  );
}
