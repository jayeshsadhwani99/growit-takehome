import { type FormEvent, useState } from "react";
import { Button, Card, FormField, Select } from "@/components";
import { DEFAULT_PREF_RATE } from "@/constants";
import { addHurdle } from "@/store/features/hurdles";
import { useAppDispatch } from "@/store/hooks";
import type { HurdleType } from "@/types";
import { createId } from "@/utils";

export function AddHurdleForm({ locked }: { locked: boolean }) {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<HurdleType>("pref");

  function onSubmit(event: FormEvent): void {
    event.preventDefault();
    if (locked) return;
    const hurdle =
      type === "roc"
        ? { id: createId(), type: "roc" as const }
        : { id: createId(), type: "pref" as const, rate: DEFAULT_PREF_RATE };
    dispatch(addHurdle(hurdle));
  }

  return (
    <Card>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <FormField id="hurdle-type" label="Add a hurdle">
          <Select
            id="hurdle-type"
            value={type}
            disabled={locked}
            onChange={(event) => setType(event.target.value as HurdleType)}
          >
            <option value="pref">Preferred return</option>
            <option value="roc">Return of capital</option>
          </Select>
        </FormField>
        <Button type="submit" disabled={locked}>
          Add
        </Button>
      </form>
    </Card>
  );
}
