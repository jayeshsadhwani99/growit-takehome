import { type FormEvent, useState } from "react";
import { Button, Card, Dropdown, FormField } from "@/components";
import { DEFAULT_PREF_RATE } from "@/constants";
import { addHurdle } from "@/store/features/hurdles";
import { useAppDispatch } from "@/store/hooks";
import type { HurdleType } from "@/types";
import { createId } from "@/utils";

const HURDLE_OPTIONS = [
  { value: "pref", label: "Preferred return" },
  { value: "roc", label: "Return of capital" },
];

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
      <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-2">
        <div className="w-full sm:w-80">
          <FormField id="hurdle-type" label="Add a hurdle">
            <Dropdown
              id="hurdle-type"
              value={type}
              disabled={locked}
              options={HURDLE_OPTIONS}
              onChange={(value) => setType(value as HurdleType)}
            />
          </FormField>
        </div>
        <Button type="submit" disabled={locked} className="w-full sm:w-auto">
          Add
        </Button>
      </form>
    </Card>
  );
}
