import { useState } from "react";
import { runsReset, selectRuns } from "@/store/features/runs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/Button";

/** Two steps, because this deletes history and unlocks the waterfall. */
export function ResetRunsButton() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectRuns).length;
  const [confirming, setConfirming] = useState(false);

  if (count === 0) {
    return (
      <Button variant="secondary" disabled>
        Reset runs
      </Button>
    );
  }

  if (!confirming) {
    return (
      <Button variant="secondary" onClick={() => setConfirming(true)}>
        Reset runs
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="danger" onClick={() => dispatch(runsReset())}>
        Clear all runs
      </Button>
      <Button variant="secondary" onClick={() => setConfirming(false)}>
        Cancel
      </Button>
    </div>
  );
}
